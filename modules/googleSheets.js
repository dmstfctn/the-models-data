import fs from "node:fs";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const keys = JSON.parse(fs.readFileSync('./keys.json'));
const SHEET_ID = '1ui1DJmrJ0f6mh9F9BRmGA-H0mR9rjNyIyyE-gpENML0';

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  // env var values here are copied from service account credentials generated by google
  // see "Authentication" section in docs for more info
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});



export async function getSheets( tabs ){
    const doc = new GoogleSpreadsheet( SHEET_ID, serviceAccountAuth);
    await doc.loadInfo(); // loads document properties and worksheets
    const result = {};
    tabs.forEach( (tab) => {
        result[tab] = doc.sheetsByTitle[tab]
    });
    
    return result;
}

