const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkxia3dYV0xqOEp3LzFvU2ZCSEdMV1hvZzVVOGtWRHQ2b0NDbFRzT2UwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2tPc0U5MVA5eGpKd09wdk9HTyszU1hNUHZPWjRrb3JkSDRoV05vQkYzbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SFYzbGhpT1lLZGpvMnMrKzA0ZWtaeXhqSWZuUEJiRHlVNkZmWDg4Vm1VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2K3BWWnRJSFRKZjZrZ0ZZREJYTktrVE50bnY3TnROUDBxRDRBNHlOTWs0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1Db0JwYmRWakQ1YTNLVnQyL3hKeVVNZDU4akh1ckovTUVPbFZrWkRpMVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPTXMzc3BCSFRkRmRwN2RvRjl4V2xjTmU0SDl1S243YWZwUnpKUFRHaWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUtBNkg1MDNCeVNnNWN5alg2MWtlZndib2tKeGtvKzhPL0lXOWVCanFrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ095NkpxSUllQVlzM0JPU2hyUDJhSlJvdTNMaXo4ZFNLL3pxMzBwUGtsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEZlhyc3RHTTl5MkRWcG9PMVMzdWdldkV1Zzl0WXNQOEgzTHlQazdMTktyWm9iSEpmTUNuQXJPN1l5UTEyM08wSVArUFREZUI2Wm9iNlVaZjZhcUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJGU3BDUlpjdlVYL0FWWXI2N3E3a285OWhyTWNRclcwa3IyWGJCazJQY1JJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5RElDZWhYUlR0MlV0UUJ5ZTB6UndnIiwicGhvbmVJZCI6IjczMDRmNTllLTExZjMtNDA2ZS1hNDIxLTFkNTg1ZTAxMDFhZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqWFJYRXBVQVJoTlQ4c1NPRTRlNGtnbXpGckk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1V0bHZ1QXYvSFNqa2FDSWFBVGhxOXovQjdNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjM0RDZGWEpEIiwibWUiOnsiaWQiOiIyNTY3NTE2MTc3ODg6NjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01DWHIrQUhFSXFQbGIwR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZVekI0Z1JSR0RZVUJuTEx5QVBNZTBrVFB2V1IxUGlkU2JHblRJcENhRk09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkxhQXNuUGdPaWpmZzVVczd5eXZpdk93V0FSWU9iVGxGSWkrRlJWL2ZxMXVrU1YvWHZBY2ZBUVBIYXN4bFh3aGZsYzZ0S2h6U0VRdnkwbitKN3lNNEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiZk5ISGtFZGdOTGVYNzZmNlQyUHowMlNKQU0wS0VmRVo4TVZYQktTLzVMbjRKM3Bzb2d5UnBnTzA2RUJ2YkQxWndPZlJJT1dtb0hNN3dWWEtKYThCQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc1MTYxNzc4ODo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWVk13ZUlFVVJnMkZBWnl5OGdEekh0SkV6NzFrZFQ0blVteHAweUtRbWhUIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4ODg1MDE2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9lTyJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Bbeltah/Tech-Z',
    OWNER_NAME : process.env.OWNER_NAME || "ZIK",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256751617788",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || 'non',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/002CPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0KmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ SCENE-MD-V2",
    BOT : process.env.BOT_NAME || 'SCENE_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
