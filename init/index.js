const mongoose = require("mongoose");
const  initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'


main().then(()=>{                                   //Data base connect hojyega lekin models create krna pdega
    console.log("DB is Connected");
}).catch(err => console.log(err));


async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({    // aise krne se listig me owner add hogya
      ...obj,owner:"6558cb08ac3028ce20478c3b"
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
}

initDB();