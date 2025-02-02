const fs = require('node:fs');
const path = require('node:path');
var csv = require("csvtojson");

const {getSheets} = require('./modules/googleSheets.js');

const tabs = [
    'props',
    'backdrops',
    'characters',
    'narrator',
    'endings'
];

(async function () {
    const sheets = await getSheets( tabs );
    console.log(sheets)
    for( const name in sheets ){
        const sheet = sheets[name];
        const sheetAsCsv = await sheet.downloadAsCSV();
        fs.writeFileSync( 
            path.join( __dirname, 'csv', `${name}.csv` ), 
            sheetAsCsv 
        );
        const sheetAsJson = await csv().fromString( sheetAsCsv.toString() );
        console.log( sheetAsJson );
        const out = (name === 'narrator') ? sheetAsJson[0] : sheetAsJson;
        fs.writeFileSync( 
            path.join( __dirname, 'json', `${name}.json` ), 
            JSON.stringify( out, false, 2) 
        );
    }
})();