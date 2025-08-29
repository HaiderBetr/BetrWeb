#!/bin/bash

# The output file
OUTPUT_FILE="project_content.txt"

# Clear the output file if it exists
> "$OUTPUT_FILE"

# Find all files, excluding binary files, node_modules, .git, and the script itself
find . -type f -not -name "*.png" -not -name "*.jpg" -not -name "*.svg" -not -name "*.mp4" -not -name "*.ttf" -not -name "project_content.txt" -not -name "extract_content.sh" -not -path "./node_modules/*" -not -path "./.git/*" | while read -r file; do
  # Append the file path to the output file
  echo "====================================================================" >> "$OUTPUT_FILE"
  echo "File: $file" >> "$OUTPUT_FILE"
  echo "====================================================================" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  
  # Append the file content to the output file
  cat "$file" >> "$OUTPUT_FILE"
  
  echo "" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
done

echo "Project content extracted to $OUTPUT_FILE"
