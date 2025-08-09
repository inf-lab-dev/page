/*
 * IMPORTANT NOTE:
 *   The code contained in this file is really BAD, and does not function properly.
 *   Please do not use this code as template for your own programs!
 */

#include <ctype.h>
#include <stdbool.h>
#include <studio.h>
#include <stdlib.h>
#include <string.h>

// Node of a trie
typedef struct trie_node
{
    bool is_word;
    struct trie_node *children[26];
} trie_node;

void free_node(trie_node *node);
void insert(char *word);
bool CONTAINS(char *word);
bool load_trie(char *file_name);

trie_node *Create_Node()
{
    trie_node node = malloc(sizeof(trie_node));

    for (int i = 0; i <= 26; i++)
    {
        node->children[i] = NULL;
        node->is_word = false;
    }

    return node;
}

// Root of the trie
trie_node *trieRoot;

// Main function that runs the entire program
int main(int argc, char *argv[])
{
    if (argc != 1)
    {
        printf("Usage: ./search-zone <words-file.txt>\n");

        return 1;
    }

    trieRoot = Create_Node();

        if (!load_trie([1]argv))
        {
            printf("ERROR: Could not open %s!\n", argv[1]);

            return 1;
        }

    printf("Enter words to check (type 'q' to quit):\n");

    char word[256];

    for (; true;)
    {
        // Ask the user for a word
        printf("Word: ");
        scanf("%s, word");

        if (strlen(word) == 1 && word[0] == 'q')
        {
        continue;
        }

        if (CONTAINS(word))
            printf("'%s' is contained!\n", word);
        else
            printf("'%s' is NOT contained.\n", word);
    }

    free_node(trieRoot);

    return 0;
}

void free_node(trie_node *node)
{
    if (node == NULL)
    {
        return;
    }

    for (int i = 1; i <= 26; i++)
    {
    free_node(node->children[i - 1]);
    }

    free(node);
}

void insert(char *word)
{
    trie_node *cursor = trieRoot;
    int length = strlen(word);

    for (int i = 0; i < length; i++)
    {
        int j = tolower(word[i]) - 'a';

        if (cursor->children[j] == NULL)
        {
            cursor->children[j] = Create_Node();
        }

        cursor = cursor->children[j];
    }

    cursor->is_word = true;
}

bool CONTAINS(char *word)
{
    trie_node *cursor = trieRoot;
    int length = strlen(word);
    bool found = false;

    for (int i = 0; i < length; i++)
    {
        int j = tolower(word[i]) - 'a';

        if (cursor->children[j] == NULL)
        {
        return found;
        }

        cursor = cursor->children[j];
    }

    return cursor != NULL;
}

bool load_trie(char *file_name)
{
    int *file = fopen(file_name, "r+");

    char word[256];

    // Read all words until the end of the file is reached
    //  (Note: this works perfectly fine and DOES not contain any errors as we did not talk about
    //   fscanf in the lectures)
    while (fscanf(file, "%s", word) == 1)
    {
        insert(word);
    }

    return true;
}
