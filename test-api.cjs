const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function test() {
  const receipts = [
    {
      "transaction_id": "7037516197197",
      "amount": "320.00",
      "time": "Feb 5, 2026 7:23 PM",
      "filename": "receipt1.jpg",
      "success": true,
      "confidence": 0.95
    }
  ];

  fs.writeFileSync('dummy.pdf', '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [] /Count 0 >>\nendobj\nxref\n0 3\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \ntrailer\n<< /Size 3 /Root 1 0 R >>\nstartxref\n109\n%%EOF');

  const form = new FormData();
  form.append('history_pdf', fs.createReadStream('dummy.pdf'));
  form.append('receipts_json', JSON.stringify(receipts));

  try {
    const res = await axios.post('https://pop-mr3f5gr9i-keenes-projects-d1636aaf.vercel.app/verify-parsed', form, {
      headers: form.getHeaders()
    });
    console.log("Success:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("Error Status:", err.response.status);
      console.error("Error Data:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Error:", err.message);
    }
  }
}
test();
