#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>

void show(void);
void create(string task);
void complete(int index);
void delete(int index);
void update(int index, string new_task);

// Main function that interacts with the user and calls the other function
int main(void)
{
    // Welcome the user
    printf("Welcome to the ToDo application!\n");
    printf("\n");

    // Repeat until the user aborts
    while (true)
    {
        // Show all possible options to the user
        printf("1) List ToDos\n");
        printf("2) Create ToDo\n");
        printf("3) Complete ToDo\n");
        printf("4) Delete ToDo\n");
        printf("5) Update ToDo\n");
        printf("0) Exit\n");

        // Ask the user for an option
        int option = get_int("Select an option: ");

        // Act according to the option
        if (option == 0)
        {
            printf("Goodbye!\n");
            break;
        }
        else if (option == 1)
        {
            show();
        }
        else if (option == 2)
        {
            // Ask the user for the todos task
            string task = get_string("Enter the task: ");
            create(task);
        }
        else if (option == 3)
        {
            // Ask the user for the todos index
            int index = get_int("Enter the task index: ");
            complete(index);
        }
        else if (option == 4)
        {
            // Ask the user for the todos index
            int index = get_int("Enter the task index: ");
            delete (index);
        }
        else if (option == 5)
        {
            // Ask the user for the todos index and task
            int index = get_int("Enter the task index: ");
            string new_task = get_string("Enter the updated task: ");

            update(index, new_task);
        }
        else
        {
            // Tell the user that his selection was wrong
            printf("ERROR: Invalid selection, try again!\n");
        }
    }

    return 0;
}

void show(void)
{
    // TODO: Implement this function that lists all todos
    printf("ERROR: Not implemented, yet!\n");
}

void create(string task)
{
    // TODO: Implement this function that creates a todo
    printf("ERROR: Not implemented, yet!\n");
}

void complete(int index)
{
    // TODO: Implement this function that completes the todo at the given index
    printf("ERROR: Not implemented, yet!\n");
}

void delete(int index)
{
    // TODO: Implement this function that deletes the todo at the given index
    printf("ERROR: Not implemented, yet!\n");
}

void update(int index, string new_task)
{
    // TODO: Implement this function that updates the todo at the given index with the given new_task
    printf("ERROR: Not implemented, yet!\n");
}
