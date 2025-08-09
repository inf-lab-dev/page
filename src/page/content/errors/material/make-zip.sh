#!/bin/bash

# Remove if it exists
if [ -f lab-errors.zip ]; then
  rm lab-errors.zip
fi

# And recreate
zip -j lab-errors.zip ./template/search-zone.c ./template/words-lectures-2-arrays-notes2.txt ./template/words-lectures-3-algorithmen-notes3.txt ./template/words-lectures-4-memory-notes4.txt
