import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_BASE_URL = 'https://pop-mr3f5gr9i-keenes-projects-d1636aaf.vercel.app';

async function testApi() {
  try {
    console.log('1. Parsing receipts...');
    const formData1 = new FormData();
    formData1.append('files', fs.createReadStream('./test_data/ORD-BAJ71G5L7_proof_1770908825092.png'));
    formData1.append('files', fs.createReadStream('./test_data/ORD-BMJMYNCZ5_proof_1770875763332.jpg'));
    
    const parseRes = await axios.post(`${API_BASE_URL}/parse-receipts`, formData1, {
      headers: formData1.getHeaders()
    });
    
    console.log('Parse result:', JSON.stringify(parseRes.data, null, 2));
    
    console.log('\n2. Verifying receipts...');
    const formData2 = new FormData();
    formData2.append('history_pdf', fs.createReadStream('./test_data/Rose Sale Week Transactions.pdf'));
    formData2.append('receipts_json', JSON.stringify(parseRes.data.results));
    
    const verifyRes = await axios.post(`${API_BASE_URL}/verify-parsed`, formData2, {
      headers: formData2.getHeaders()
    });
    
    console.log('Verify result:', JSON.stringify(verifyRes.data, null, 2));

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testApi();
