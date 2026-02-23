# Pop Portal (PayShield)

A fast, secure, and automated payment verification system built for student organizations at Ateneo to cross-check GCash, Maya, and BDO receipt screenshots against official transaction history.

## Features

- **Automated Matching:** Instantly cross-references uploaded receipt screenshots with your official transaction history.
- **Batch Processing:** Upload hundreds of receipts at once using drag-and-drop or folder upload.
- **Detailed Reporting:** Generates a comprehensive breakdown of matched, mismatched, and missing transactions.
- **CSV Export:** Download verification results as a CSV file for easy record-keeping and accounting.
- **Privacy-First:** All extraction and verification happens in-memory. Receipts and transaction history data are not stored on our servers.

## Tech Stack

- **Frontend:** React, Vite, CSS Modules (Glassmorphism UI)
- **Backend/API:** Python, FastAPI (Hosted on Vercel)
- **OCR/Vision:** Advanced Vision AI for accurate text extraction from receipts
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Koala3353/pop-portal.git
   cd pop-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

To deploy the frontend to GitHub Pages:
```bash
npm run deploy
```

## How It Works

1. **Upload Receipts:** Gather GCash, Maya, or BDO payment screenshots from your members or customers. Upload them in bulk to the workspace.
2. **Upload Transaction History:** Export your official transaction history (PDF) from your e-wallet or bank app and drop it into the workspace.
3. **Verify:** The system automatically extracts data from the screenshots and matches them against the official history, highlighting any discrepancies or unverified payments.

## License

MIT License
