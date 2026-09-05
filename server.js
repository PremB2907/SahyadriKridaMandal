const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./config/db');
const { initCronJobs } = require('./config/cron');

const indexRoutes = require('./routes/indexRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const excelRoutes = require('./routes/excelRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const os = require('os');

// Ensure writable directories exist in OS temp dir for Vercel Serverless
['logs', 'receipts'].forEach(dir => {
  const dirPath = path.join(os.tmpdir(), dir);
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {}
});

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// i18n Language Cookie Middleware
app.use((req, res, next) => {
  let lang = 'en';
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/mcc_lang=(mr|en)/);
  if (match) {
    lang = match[1];
  } else if (req.query.lang === 'mr' || req.query.lang === 'en') {
    lang = req.query.lang;
  }
  res.locals.lang = lang;
  next();
});

// Mount Routes
app.use('/', indexRoutes);
app.use('/', donationRoutes);
app.use('/', adminRoutes);
app.use('/', excelRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2>Ganpati Bappa Morya - Server Encountered an Unexpected Issue</h2>
      <p style="color: #64748b;">${err.message}</p>
      <a href="/" style="display: inline-block; margin-top: 15px; background: #800020; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Return to Home</a>
    </div>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Page Not Found | Sahyadri Krida Mandal',
    activeTab: 'home',
    yatraStatus: db.getYatraStatus(),
    scheduleData: [],
    glimpsesData: [],
    socialWorkData: []
  });
});

// Export Express app for Vercel Serverless Functions
module.exports = app;

// Start Server & Database when running locally
if (process.env.VERCEL !== '1') {
  app.listen(PORT, async () => {
    console.log(`=======================================================`);
    console.log(`🌺 Sahyadri Krida Mandal Official Web Server Started`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
    
    await db.initDB();
    initCronJobs();

    // Initialize Google Sheets tabs and initial Google Drive backup
    const googleSheets = require('./config/googleSheets');
    const googleDrive = require('./config/googleDrive');
    googleSheets.ensureTabs().catch(err => console.error('Google Sheets init error:', err.message));
    googleDrive.backupDatabaseToDrive({ mockStore: db.mockStore, timestamp: new Date() }).catch(err => console.error('Google Drive backup init error:', err.message));
  });
}
