#!/bin/bash

# Remove if it exists
if [ -f lab-temperature.zip ]; then
  rm lab-temperature.zip
fi

# And recreate
zip -j lab-temperature.zip ./task.pdf
