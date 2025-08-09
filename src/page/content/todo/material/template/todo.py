from cs50 import get_int, get_string


def show():
    # TODO: Implement this function that lists all todos
    raise NotImplementedError


def create(task):
    # TODO: Implement this function that creates a todo
    raise NotImplementedError


def complete(index):
    # TODO: Implement this function that completes the todo at the given index
    raise NotImplementedError


def delete(index):
    # TODO: Implement this function that deletes the todo at the given index
    raise NotImplementedError


def update(index, new_task):
    # TODO: Implement this function that updates the todo at the given index with the given new_task
    raise NotImplementedError


def main():
    """
    Main function that interacts with the user and calls the other function
    """

    # Welcome the user
    print("Welcome to the ToDo application!")
    print()

    # Repeat until the user aborts
    while True:
        # Show all possible options to the user
        print("1) List ToDos")
        print("2) Create ToDo")
        print("3) Complete ToDo")
        print("4) Delete ToDo")
        print("5) Update ToDo")
        print("0) Exit")

        # Ask the user for an option
        option = get_int("Select an option: ")

        # Act according to the option
        if option == 0:
            print("Goodbye!")
            break
        elif option == 1:
            show()

        elif option == 2:
            # Ask the user for the todos task
            task = get_string("Enter the task: ")
            create(task)

        elif option == 3:
            # Ask the user for the todos index
            index = get_int("Enter the task index: ")

            try:
                complete(index)
            except ValueError as e:
                print(f"INVALID: {str(e)}")

        elif option == 4:
            # Ask the user for the todos index
            index = get_int("Enter the task index: ")

            try:
                delete(index)
            except ValueError as e:
                print(f"INVALID: {str(e)}")

        elif option == 5:
            # Ask the user for the todos index and task
            index = get_int("Enter the task index: ")
            new_task = get_string("Enter the updated task: ")

            try:
                update(index, new_task)
            except ValueError as e:
                print(f"INVALID: {str(e)}")
        else:
            # Tell the user that his selection was wrong
            print("ERROR: Invalid selection, try again!")


if __name__ == "__main__":
    main()
