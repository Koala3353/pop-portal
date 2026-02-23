const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText() {
  const dataBuffer = fs.readFileSync('test_data/Rose Sale Week Transactions.pdf');
  const parseFn = pdf.default || pdf;
  const data = await parseFn(dataBuffer);
  console.log(data.text);
}

extractText();
