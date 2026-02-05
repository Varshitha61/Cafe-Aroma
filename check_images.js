const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\varsh\\Desktop\\projects\\cafe-aroma\\pages\\Shop.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Regex to find all Unsplash links
const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g;
const matches = content.match(regex) || [];

console.log('Total images found:', matches.length);

const counts = {};
const duplicates = [];

matches.forEach(url => {
    counts[url] = (counts[url] || 0) + 1;
});

for (const url in counts) {
    if (counts[url] > 1) {
        duplicates.push({ url, count: counts[url] });
    }
}

if (duplicates.length > 0) {
    console.log('DUPLICATES DETECTED:');
    console.log(JSON.stringify(duplicates, null, 2));
} else {
    console.log('NO DUPLICATES FOUND. Each image is unique.');
}
