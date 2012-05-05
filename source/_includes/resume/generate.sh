#!/bin/bash
pandoc resume-header.markdown resume.markdown -o jondkoon.pdf --template=resume-template.tex --latex-engine=xelatex
pandoc resume-header.markdown resume.markdown -o jondkoon.docx --reference-docx template.docx
cp jondkoon.pdf ../../resume/
cp jondkoon.docx ../../resume/
