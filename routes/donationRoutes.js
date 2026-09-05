const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const donationController = require('../controllers/donationController');

const os = require('os');

// Ensure receipts directory exists in writable OS temp folder for serverless & local
const uploadDir = path.join(os.tmpdir(), 'receipts');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'screenshot-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.get('/donate', donationController.renderDonationPage);
router.post('/api/create-donation-order', donationController.createPaymentOrder);
router.post('/api/confirm-donation', donationController.confirmDonation);
router.post('/api/submit-manual-donation', upload.single('screenshot'), donationController.submitManualQRDonation);
router.get('/download-receipt/:receiptNo', donationController.downloadDonationReceipt);

module.exports = router;
