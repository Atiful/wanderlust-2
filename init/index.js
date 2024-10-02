const initdata = require("./data.js");
const listing = require("../models/listing.js");
const mongoose = require('mongoose');
const user = require("../models/user.js");

main()
.then((res) => {
    console.log("connection of mongoDb is build sucessfully");
})
.catch((error) => {
    console.log(error);
});

async function main() {
  // 'mongodb://127.0.0.1:27017/wanderlust-2'
  await mongoose.connect('mongodb+srv://haquehaque261:Atiful26h27@cluster0.9ruu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , {useNewUrlParser: true,
    useUnifiedTopology: true});
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const initDb = async() => { 

// first the database is cleared
await listing.deleteMany();
// new data get inserted
let newdata = initdata.data.map((data) => ({...data , owner : "66faa81d8eab09b969f14552"}));
await listing.insertMany(newdata);
let userdata = {
  _id: '66faa81d8eab09b969f14552',
    email: 'mdatifulhaque26@gmail.com',
    username: 'atiful haque',
    salt: '8c7ba73506e2f551949f6908cfe98a2b45d79408802f50074ba3df12dab1dc5b',
    hash: 'a0fb8f3d605eae423cc2aa47493600700ec37fd0a2564c28a9b4a8a3e670ab7bfe95d99c7cb9a7a6095352cb31ffd238b40401e8f11ab1cda5c874d7d9321c48bb265be637b565ebd147c20e1f124ab48b8237bc36fae648c8af26aa4324152abf750cea8aaa64d93923b54ea29bdc2341083cda5e353880e9201020e085583ea2e2ed00af68ab4833f9faf6a008f3d45303a3480263b050450b5a5959c7d45f26b0b328d2f0af145125964b8b93c8f32fc5dd4bbc2f35bf30dede2f9a4227ea2f26fa9aae87aba489d0b8a9eab2e27c3ad079d6b97f89b0cebb31039e4bc3395d8f75834f592db7361d19c65f20092cfb4f75b45a1f5c16a96833ce32c2541e41e4a82b13335bebc515e924332f33687a009623909ddd1ad65fd902245b28a7a24e1f78b817af98d771cbce9bc769d76757a3e96c0c6253044216b8c14d5bd3bc7bd3be2e82ecd5eee177c34071e27163157347880d8cd90f3f2e2ea7f266f02492168a6ae5a556c10f082660d72dadd2c5227c4735609eb6038d9003ea29f254f89569db653e5924dd2cecf15a58e54299d4993a239e07e206d5174bf9b1f6670d7b29d347094307639a552635b13d0df7874c809918a45a6afef280e4a50335a5c5278ec64961886196531858934dbedb1e8dd396b1048484018805085755ecb558821a209ccba00cf4abdac69ee46471d0635c21efbd9e16e15a23be375f',
    __v: 0,
    profilepic: 'http://localhost:3000/avatar/avatar-men-child.jpg'
  }
  await user.create(userdata);
console.log("data was initilized sucessfully");
}

initDb();


