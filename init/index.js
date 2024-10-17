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
  // 'mongodb+srv://haquehaque261:Atiful26h27@cluster0.9ruu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , {useNewUrlParser: true,
  //   useUnifiedTopology: true}
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust-2');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const initDb = async() => { 

// first the database is cleared
await listing.deleteMany();
// new data get inserted
let newdata = initdata.data.map((data) => ({...data , owner : "66faa81d8eab09b969f14552"}));
await listing.insertMany(newdata);
console.log("data was initilized sucessfully");
}


initDb();


