const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');

let driveClient = null;
let initPromise = null;

async function getDriveClient() {
  if (driveClient) return driveClient;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      let authOptions = { scopes: SCOPES };

      if (process.env.GOOGLE_CREDENTIALS) {
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }
        authOptions.credentials = credentials;
      } else if (fs.existsSync(CREDENTIALS_PATH)) {
        authOptions.keyFile = CREDENTIALS_PATH;
      } else {
        console.log('⚠️ No Google credentials found. Google Drive backup disabled.');
        initPromise = null;
        return null;
      }

      const auth = new google.auth.GoogleAuth(authOptions);
      const authClient = await auth.getClient();
      driveClient = google.drive({ version: 'v3', auth: authClient });
      console.log('✅ Google Drive API client authenticated successfully.');
      return driveClient;
    } catch (err) {
      console.error('⚠️ Google Drive authentication failed:', err.message);
      initPromise = null;
      return null;
    }
  })();

  return initPromise;
}

/**
 * Backup Database / State JSON to Google Drive
 */
async function backupDatabaseToDrive(dbData) {
  const client = await getDriveClient();
  if (!client) return false;

  try {
    const fileName = 'sahyadri_db_backup.json';
    const fileContent = JSON.stringify(dbData, null, 2);

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID || '';
    const query = folderId
      ? `'${folderId}' in parents and name = '${fileName}' and trashed = false`
      : `name = '${fileName}' and trashed = false`;

    // Check if file already exists in Drive
    const searchRes = await client.files.list({
      q: query,
      fields: 'files(id, name)'
    });

    if (searchRes.data.files && searchRes.data.files.length > 0) {
      // Update existing file
      const fileId = searchRes.data.files[0].id;
      await client.files.update({
        fileId: fileId,
        media: {
          mimeType: 'application/json',
          body: fileContent
        }
      });
      console.log(`✅ Updated existing database backup in Google Drive (File ID: ${fileId})`);
    } else {
      // Create new file
      const fileMetadata = {
        name: fileName,
        mimeType: 'application/json'
      };
      if (folderId) {
        fileMetadata.parents = [folderId];
      }

      const createRes = await client.files.create({
        requestBody: fileMetadata,
        media: {
          mimeType: 'application/json',
          body: fileContent
        }
      });
      console.log(`✅ Created new database backup in Google Drive (File ID: ${createRes.data.id})`);
    }
    return true;
  } catch (err) {
    console.error('⚠️ Failed to backup database to Google Drive:', err.message);
    return false;
  }
}

module.exports = {
  getDriveClient,
  backupDatabaseToDrive
};
