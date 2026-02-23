import fitz # PyMuPDF
import sys

def parse():
    doc = fitz.open('test_data/Rose Sale Week Transactions.pdf')
    text = ""
    for page in doc:
        text += page.get_text()
    
    with open('pdf_text_python.txt', 'w') as f:
        f.write(text)
    
    print(f"Extracted {len(text)} characters.")
    
parse()
