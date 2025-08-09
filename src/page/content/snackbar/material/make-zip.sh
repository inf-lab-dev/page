# Remove if it exists
if [ -f lab-snackbar.zip ]; then
  rm lab-snackbar.zip
fi

# And recreate
zip -j lab-snackbar.zip ./task.pdf