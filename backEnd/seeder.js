const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");

dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGOURI);

// Read the json file 
const bootcamps = JSON.parse( fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8') );
const courses = JSON.parse( fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8') );
const users = JSON.parse( fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8') );

// Import Data
const importData = async() => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete Data 
const deleteData = async() => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log("Data Deleted...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if(process.argv[2] === "-i"){
  importData();
} else if(process.argv[2] === "-d"){
  deleteData();
}