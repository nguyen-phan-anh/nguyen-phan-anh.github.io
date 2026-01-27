#!/bin/bash

# Create folders
mkdir -p about projects publications activities contact

# Move html files into folders as index.html
[ -f about.html ] && mv about.html about/index.html
[ -f projects.html ] && mv projects.html projects/index.html
[ -f publications.html ] && mv publications.html publications/index.html
[ -f activities.html ] && mv activities.html activities/index.html
[ -f contact.html ] && mv contact.html contact/index.html
[ -f my-english-class.html ] && mv my-english-class.html my-english-class/index.html

echo "Clean URL structure created!"
