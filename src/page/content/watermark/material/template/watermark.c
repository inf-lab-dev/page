// TODO: add missing #include's
#include "bmp.h"

// struct for bmp_image's similar to the code in the inf.zone "filter" task
typedef struct
{
    BITMAPFILEHEADER bf;
    BITMAPINFOHEADER bi;
    RGBTRIPLE **image;
    int width;
    int height;
    int padding;
} bmp_image;

bmp_image* open_image(char *file_path);
void close_image(bmp_image *bmp);
bool save_image(bmp_image *bmp, char *file_name);


// TODO: implement entire main function here in Task 3

// Loads a bmp image from the given "file_path"
bmp_image* open_image(char *file_path)
{
    // TODO: Open the input BMP file for reading, dont forget to handle errors; name the variable "src"

    // Allocate memory for the bmp_image struct
    bmp_image *bmp = malloc(sizeof(bmp_image));
    if (bmp == NULL)
    {
        printf("Not enough memory to allocate bmp_image struct.\n");
        fclose(src);

        return NULL;
    }

    // Read file and info headers
    fread(&bmp->bf, sizeof(BITMAPFILEHEADER), 1, src);
    fread(&bmp->bi, sizeof(BITMAPINFOHEADER), 1, src);

    // Ensure it's a valid 24-bit uncompressed BMP file
    if (bmp->bf.bfType != 0x4d42 || bmp->bf.bfOffBits != 54 || bmp->bi.biSize != 40 ||
        bmp->bi.biBitCount != 24 || bmp->bi.biCompression != 0)
    {
        printf("ERROR: Unsupported file format.\n");

        fclose(src);
        free(bmp);

        return NULL;
    }

    // Get image dimensions
    bmp->width = bmp->bi.biWidth;
    bmp->height = abs(bmp->bi.biHeight);

    // Determine padding for scanlines
    bmp->padding = (4 - (bmp->width * sizeof(RGBTRIPLE)) % 4) % 4;

    // Allocate memory for pixel data (calloc works like "malloc", but initializes the memory to zero)
    bmp->image = calloc(bmp->height, sizeof(RGBTRIPLE*));

    if (bmp->image == NULL)
    {
        printf("ERROR: Not enough memory to store image data.\n");

        fclose(src);
        free(bmp);
        
        return NULL;
    }

    // Allocate memory for each row of pixels
    for (int i = 0; i < bmp->height; i++)
    {
        // TODO: Allocate memory for the image row, we need an Array with "width" elements, store the pointer in "bmp->image[i]"

        if (bmp->image[i] == NULL)
        {
            printf("ERROR: Not enough memory for image row %d.\n", i);

            fclose(src);
            free(bmp);

            return NULL;
        }
    }

    // Read pixel data
    for (int i = 0; i < bmp->height; i++)
    {
        fread(bmp->image[i], sizeof(RGBTRIPLE), bmp->width, src);

        // Skip padding
        fseek(src, bmp->padding, SEEK_CUR);
    }

    // Close the input file and return the loaded image
    fclose(src);

    return bmp;
}

// Closes the given "bmp" image to free its memory.
void close_image(bmp_image *bmp)
{
    if (bmp == NULL)
    {
        return;
    }

    // Free pixel data
    for (int i = 0; i < bmp->height; i++)
    {
        free(bmp->image[i]);
    }

    // TODO: Free actual image

    // TODO: Free the bmp_image struct
}

// Saves the given "bmp" image to the given "file_name", returns "true" on success, "false" otherwise
bool save_image(bmp_image *bmp, char *file_name)
{
    // TODO: Open the output file for writing, dont forget to handle errors and create the file if it does not exist; name the variable "dest"

    // Write headers
    fwrite(&bmp->bf, sizeof(BITMAPFILEHEADER), 1, dest);
    fwrite(&bmp->bi, sizeof(BITMAPINFOHEADER), 1, dest);

    // Write pixel data
    for (int i = 0; i < bmp->height; i++)
    {
        fwrite(bmp->image[i], sizeof(RGBTRIPLE), bmp->width, dest);

        // Write padding for each row
        for (int k = 0; k < bmp->padding; k++)
        {
            fputc(0x00, dest);
        }
    }

    // Close the output file
    fclose(dest);

    return true;
}