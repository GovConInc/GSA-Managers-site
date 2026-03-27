# Google Sheets Tracking Setup

This guide explains how to automatically log form submissions from the Contact page into a Google Sheet.

The `functions/api/contact.ts` endpoint is configured to look for an environment variable named `GOOGLE_SHEETS_WEBHOOK_URL`. If this variable is set, the API will send a POST request with the form data to the URL.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a new blank spreadsheet.
2. Name it something like "GSA Managers Contact Submissions".
3. In the first row, add the following headers starting from column A to H:
   - **Date**
   - **Name**
   - **Email**
   - **Company**
   - **Phone**
   - **CAGE Code**
   - **Interest**
   - **Best Time**

## Step 2: Create a Google Apps Script Web App

1. In your Google Sheet, click on **Extensions** > **Apps Script** in the top menu.
2. Replace any existing code in the script editor with the following:

\`\`\`javascript
const sheetName = 'Sheet1'; // Change this if your sheet has a different name

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Add a new row to the sheet
    sheet.appendRow([
      data.date || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.company || '',
      data.phone || '',
      data.cage || '',
      data.interest || '',
      data.bestTime || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

3. Save the script (Ctrl+S / Cmd+S) and name the project.
4. Click the **Deploy** button in the top right corner and select **New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set the configuration as follows:
   - **Description:** "Contact Form Webhook"
   - **Execute as:** "Me" (your email)
   - **Who has access:** "Anyone" (This is required so your server can send POST requests without authenticating)
7. Click **Deploy**.
8. Google will ask for permission to authorize the script. Click **Authorize access** and follow the prompts. (You may see a warning saying the app isn't verified; click "Advanced" and then "Go to [Project Name]").
9. Once deployed, copy the **Web app URL**.

## Step 3: Configure Cloudflare Pages

1. Go to your Cloudflare Dashboard.
2. Navigate to **Workers & Pages** and select your Pages project.
3. Go to **Settings** > **Environment variables**.
4. Add a new variable:
   - **Variable name:** `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value:** Paste the Web app URL you copied in Step 2.
5. Save the variable.
6. Trigger a new deployment of your site so the environment variable takes effect.

Now, whenever someone submits a contact form, the data will be emailed to you (via Resend) AND logged in your Google Sheet!
