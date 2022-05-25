// 生成钱包到指定目录下
const ether = require('ethers');
const path = require('path');
const fse = require('fs-extra');
const csv = require('csv-writer');

const createCsvWriter = csv.createObjectCsvWriter;
const wallets = [];

for (let i = 0; i < 200; i++) {
  const wl = ether.Wallet.createRandom();
  const addr = {
    address: wl.address,
    privateKey: wl.privateKey,
    mnemonic: wl.mnemonic.phrase,
  };
  wallets.push(addr);
}

const resPath = path.join(__dirname, 'result', Date.now() + '.csv');

const csvWriter = createCsvWriter({
  path: resPath,
  header: [
    { id: 'address', title: 'address' },
    { id: 'privateKey', title: 'privateKey'},
    { id: 'mnemonic', title: 'mnemonic'},
  ]
});

csvWriter.writeRecords(wallets).then(() => {
  console.log('✅ wallet gen to %s success!', resPath);
}).catch((e) => {
  console.error(e);
})

// fse.writeFileSync(resPath, JSON.stringify(wallets, null , 2), 'utf8');



