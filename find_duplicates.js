const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\varsh\\Desktop\\projects\\cafe-aroma\\pages\\Shop.tsx', 'utf8');
const regex = /image: '(.*?)'/g;
let match;
const images = [];
while ((match = regex.exec(content)) !== null) {
    images.push(match[1]);
}
const duplicates = images.filter((item, index) => images.indexOf(item) !== index);
console.log(JSON.stringify(duplicates, null, 2));
