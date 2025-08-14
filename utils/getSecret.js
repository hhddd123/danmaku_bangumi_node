const crypto = require('crypto');

const appId = process.env.DANDAN_APP_ID || 'your_app_id';
const appSecret = process.env.DANDAN_APP_SECRET || 'your_app_secret';

function generateSignature(appId, timestamp, path, appSecret) {
    const data = appId + timestamp + path + appSecret;
    return crypto.createHash('sha256').
        update(data).
        digest('base64');
}

module.exports.getSecret = function (path) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(appId, timestamp, path, appSecret);
    return {
        appId: appId,
        timestamp: timestamp,
        signature: signature
    };
}
