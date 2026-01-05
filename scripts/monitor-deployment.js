const https = require('https');

const URL = 'https://simulation.formatdisc.hr';
const MAX_RETRIES = 60; // 5 minutes (if 5s interval)
const INTERVAL = 5000;

console.log(`📡 Starting monitoring for ${URL}...`);

let attempts = 0;

const checkStatus = () => {
  attempts++;
  
  const req = https.get(URL, (res) => {
    console.log(`[Attempt ${attempts}] Status: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Simulation environment is LIVE!');
      console.log('🔗 Visit: https://simulation.formatdisc.hr');
      process.exit(0);
    } else {
      if (attempts >= MAX_RETRIES) {
        console.error('❌ Timeout waiting for deployment.');
        process.exit(1);
      }
      setTimeout(checkStatus, INTERVAL);
    }
  });

  req.on('error', (e) => {
    console.log(`[Attempt ${attempts}] Error: ${e.message}`);
    if (attempts >= MAX_RETRIES) {
      console.error('❌ Timeout waiting for deployment.');
      process.exit(1);
    }
    setTimeout(checkStatus, INTERVAL);
  });
};

checkStatus();
