#!/bin/bash

# Remove if it exists
if [ -f lab-watermark.zip ]; then
  rm lab-watermark.zip
fi

# And recreate
zip -j lab-watermark.zip ./task.pdf ./template/bmp.h ./template/watermark.c ./template/overlay.bmp ./template/uni.bmp ./scripts/image.py
