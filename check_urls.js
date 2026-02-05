const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('c:/Users/varsh/Desktop/projects/cafe-aroma/pages/Shop.tsx', 'utf8');
const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[^'"]+/g)].map(m => m[0]);

async function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        });
        req.on('error', (e) => {
            resolve({ url, status: 'error', error: e.message });
        });
        req.end();
    });
}

async function run() {
    console.log(`Checking ${urls.length} distinct URLs...`);
    const uniqueUrls = [...new Set(urls)];
    const results = [];
    for (const url of uniqueUrls) {
        const res = await checkUrl(url);
        results.push(res);
        // console.log(`${res.status}: ${url}`);
    }
    const broken = results.filter(r => r.status !== 200);
    console.log('Broken URLs found:');
    broken.forEach(b => console.log(`${b.status}: ${b.url}`));
}

run();
