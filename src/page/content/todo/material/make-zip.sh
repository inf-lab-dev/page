#!/bin/bash

# Remove if it exists
if [ -f lab-todo.zip ]; then
  rm lab-todo.zip
fi

# And recreate
zip -j lab-todo.zip ./template/todo.c ./template/todo.py ./template/test_todo.py
