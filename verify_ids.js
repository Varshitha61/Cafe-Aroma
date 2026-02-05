const https = require('https');

const ids = [
    '1541167760496-1628856ab772', // Americano
    '1447933631175-0b01fa5f7dfa', // Latte
    '1510591509098-f4fdc6d0ff04', // Flat White
    '1522992319-0373029ef321', // Macchiato
    '1512568400610-62da28bc8a13', // Mocha
    '1544145945-f904253db0ad', // Cinnamon
    '1495474472287-4d71bcdd2085', // Toffee
    '1461023058943-07fcbe16d735', // Cold Brew
    '1553909489-ee654eeb8409', // Nitro
    '1499961024600-ad094db305cc', // Shaken
    '1517701550927-30cf4bb1dba5', // Honey
    '1517701604599-bb29b565090c', // Cascade
    '1572490122747-3968b75cc699', // Mint
    '1579306194872-64d3b7bac4c2', // Crunch
    '1504104040909-0d287383a17e', // Crimson (New)
    '1611162458314-7224bc68428d', // Choco Chip (New)
    '1596073413908-4402740d5f42', // Vanilla
    '1582733315364-84bb97850406', // Matcha
    '1544787210-282f93393853', // Chai
    '1556679343-c7306c1976bc', // Mango
    '1594631252845-29fc458695d7', // Strawberry
    '1558160074-4d7d8bdf4256', // Hibiscus
    '1555507036-ab1f4038808a', // Croissant
    '1525351484163-7529414344d8', // Toast
    '1626700051175-6818013e1d4f', // Wrap
    '1509482560494-4126f8225994', // Bacon
    '1482049016688-2d3e1b311543', // Bagel
    '1504754524776-8f4f37790ca0', // Avocado
    '1546069901-ba9599a7e63c', // Impossible
    '1533134242443-d4fd215305ad', // Cheesecake
    '1506459225024-1428097a7e18', // Brownie
    '1511018556340-d16986a1c194', // Danish
    '1565958011703-44f9829ba187', // Cake Pop
    '1588195538326-c3b199705286', // Loaf
    '1488477181946-6428a0291777', // Swirl
    '1578985545062-69928b1d9587', // Confetti
    '1580915411954-282cb1b0d780', // Chemex
    '151766555370-4cc49171f114', // Press
    '1585514162492-3836d5b035f8', // Blend
    '1521017419170-55e1d457639d', // Calyx
    '1459755486867-b55449bb39ff', // Grinder
    '1444418185997-11116e6719b5', // Kettle
    '1475090169767-40ed8d18f67d', // Apron
    '1501339817308-44b29fadd1d2', // Interior
    '1442512595331-e89e73853f31' // Flagship
];

async function checkId(id) {
    return new Promise((resolve) => {
        const url = `https://images.unsplash.com/photo-${id}?w=200`;
        const req = https.get(url, (res) => {
            resolve({ id, status: res.statusCode });
        });
        req.on('error', (e) => resolve({ id, status: 'error' }));
        req.end();
    });
}

async function run() {
    const results = await Promise.all(ids.map(checkId));
    const broken = results.filter(r => r.status !== 200);
    console.log('Broken IDs:', broken);
    if (broken.length === 0) console.log('All IDs are working!');
}

run();
