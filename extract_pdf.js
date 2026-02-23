import fs from 'fs';
import pdf from 'pdf-parse';

async function extractText() {
    const dataBuffer = fs.readFileSync('test_data/Rose Sale Week Transactions.pdf');
    const data = await pdf(dataBuffer);
    console.log(data.text);
}

extractText();
