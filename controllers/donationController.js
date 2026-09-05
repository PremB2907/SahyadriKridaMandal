const db = require('../config/db');
const razorpay = require('../config/razorpay');
const twilio = require('../config/twilio');
const pdfController = require('./pdfController');
const googleSheets = require('../config/googleSheets');
const mailer = require('../config/mailer');
const googleDrive = require('../config/googleDrive');

module.exports = {
  // Render Donation Page
  renderDonationPage(req, res) {
    res.render('donate', {
      title: 'ऑनलाइन देणगी पोर्टल (८०जी कर सवलत) | Sahyadri Krida Mandal',
      activeTab: 'donate',
      razorpayKeyId: razorpay.getKeyId()
    });
  },

  // Create Razorpay Payment Order
  async createPaymentOrder(req, res) {
    try {
      const { amount } = req.body;
      if (!amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid donation amount.' });
      }

      const tempReceiptNo = `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`;
      const orderResponse = await razorpay.createOrder(amount, tempReceiptNo);

      res.json({
        success: true,
        receipt_no: tempReceiptNo,
        order: orderResponse
      });
    } catch (err) {
      console.error('Create payment order error:', err);
      res.status(500).json({ success: false, message: 'Failed to initiate donation payment.' });
    }
  },

  // Confirm Donation & Save Record
  async confirmDonation(req, res) {
    try {
      const {
        receipt_no, donor_name, phone, email, amount,
        payment_id, order_id, signature, pan_number
      } = req.body;

      if (!donor_name || !phone || !amount) {
        return res.status(400).json({ success: false, message: 'Missing required donation details.' });
      }

      const isValidSignature = razorpay.verifyPaymentSignature(order_id, payment_id, signature);
      if (!isValidSignature) {
        return res.status(400).json({ success: false, message: 'Payment verification failed.' });
      }

      const donationData = {
        receipt_no: receipt_no || `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        donor_name: donor_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        amount: parseFloat(amount),
        category: 'General Mandal Donation & Seva',
        payment_id: payment_id || `pay_sim_${Date.now()}`,
        order_id: order_id || `order_sim_${Date.now()}`,
        pan_number: (pan_number || '').toUpperCase().trim(),
        status: 'SUCCESS'
      };

      const createdDonation = await db.createDonation(donationData);
      db.addLog('DONATION', `New Donation received: ₹${createdDonation.amount} from ${createdDonation.donor_name}`);

      // Sync to Google Sheets, Send Email, and Backup to Google Drive concurrently
      Promise.allSettled([
        googleSheets.appendDonation(createdDonation),
        mailer.sendDonationEmail(createdDonation),
        db.getDonations().then(donations => googleDrive.backupDatabaseToDrive({ donations, mockStore: db.mockStore }))
      ]).catch(err => console.error('Donation sync error:', err.message));

      // Dispatch SMS notification via Twilio
      twilio.sendDonationReceiptSMS(createdDonation).catch(err => console.error('Donation SMS error:', err));

      res.json({
        success: true,
        receipt_no: createdDonation.receipt_no,
        message: 'Donation successfully processed. Thank you for your Seva!'
      });
    } catch (err) {
      console.error('Confirm donation error:', err);
      res.status(500).json({ success: false, message: 'Error recording donation payment.' });
    }
  },

  // Download 80G PDF Receipt
  async downloadDonationReceipt(req, res) {
    const { receiptNo } = req.params;
    const donation = await db.getDonationByReceipt(receiptNo);

    if (!donation) {
      return res.status(404).send('Donation receipt not found.');
    }

    pdfController.generateDonationPDF(donation, res);
  },

  // Submit Manual QR Code Payment with Screenshot Upload
  async submitManualQRDonation(req, res) {
    try {
      const {
        donor_name, phone, email, amount,
        category, pan_number, payment_ref
      } = req.body;

      if (!donor_name || !phone || !amount || parseFloat(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'कृपया तुमचे नाव, मोबाईल नंबर व देणगी रक्कम भरा. (Please enter your name, phone number, and donation amount.)'
        });
      }

      const donationData = {
        receipt_no: `MCC-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        donor_name: donor_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        amount: parseFloat(amount),
        category: category || 'General Mandal Donation & Seva',
        payment_id: (payment_ref || '').trim() || `UPI_${Date.now()}`,
        order_id: `qr_manual_${Date.now()}`,
        pan_number: (pan_number || '').toUpperCase().trim(),
        status: 'SUCCESS'
      };

      const createdDonation = await db.createDonation(donationData);
      db.addLog('DONATION', `New QR Donation received: ₹${createdDonation.amount} from ${createdDonation.donor_name} (UTR: ${createdDonation.payment_id})`);

      // Generate 80G PDF Receipt Buffer
      let pdfBuffer = null;
      try {
        pdfBuffer = await pdfController.generateDonationPDFBuffer(createdDonation);
      } catch (err) {
        console.error('PDF receipt buffer generation error:', err.message);
      }

      const screenshotPath = req.file ? req.file.path : null;

      // Concurrently dispatch Email with PDF Receipt Attachment, Google Sheets sync, & Google Drive backup
      Promise.allSettled([
        mailer.sendDonationEmail(createdDonation, pdfBuffer, screenshotPath),
        googleSheets.appendDonation(createdDonation),
        db.getDonations().then(donations => googleDrive.backupDatabaseToDrive({ donations, mockStore: db.mockStore }))
      ]).catch(err => console.error('Manual donation sync error:', err.message));

      // Dispatch SMS notification via Twilio
      twilio.sendDonationReceiptSMS(createdDonation).catch(err => console.error('Donation SMS error:', err));

      res.json({
        success: true,
        receipt_no: createdDonation.receipt_no,
        message: 'जय गणेश! तुमची देणगी व पेमेंट स्क्रीनशॉट यशस्वीरित्या नोंदवले गेले आहेत. अधिकृत ८०जी पावती ईमेलवर पाठवली गेली आहे.'
      });
    } catch (err) {
      console.error('Submit manual QR donation error:', err);
      res.status(500).json({
        success: false,
        message: 'देणगी माहिती नोंदवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
      });
    }
  }
};
