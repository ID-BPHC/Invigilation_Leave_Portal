const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Hod = require("../Backend/Models/Hod");
const Phd = require("../Backend/Models/Phd");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const cors = require("cors");
const connectToMongo = require("../Backend/db");
connectToMongo();
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// submit endpoint when user fills the form for leave
app.post("/submit", async (req, res) => {
  try {
    const { id, name, email, branch, reason, multipleDate } = req.body;
    console.log(req.body);
    let newDates = [];
    for (let date of multipleDate) {
      const today = new Date(date);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday =
        dd.toString() + "/" + mm.toString() + "/" + yyyy.toString();
      newDates.push(formattedToday);
    }
    console.log(newDates);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./view"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./view"),
      extName: ".handlebars",
    };
    transporter.use("compile", hbs(handlebarOptions));

    let hod = await Hod.findOne({ department: branch });
    console.log(hod);

    let hodEmail = hod.email ? hod.email : 'td@hyderabad.bits-pilani.ac.in';

    let mailOptions = {
      from: "",
      to: "",
      subject: "Invigilation Leave Portal",
      context: {
        title: "Request for Invigilation Leave",
        email: email,
        name,
        branch,
        reason,
        newDates,
        url: process.env.BASEURL
      },
      template: "index",
    };

    transporter.sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log("Email sent successfully!!");
    });

    let phD = await Phd.create({
      name: name,
      department: branch,
      id: id,
      campusId: "42131234",
      phoneNo: 1234567890,
      emailId: email,
      leave: false,
      reason: req.body.reason,
      date: req.body.multipleDate,
    });
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// reply endpoint when the hod clicks the button
app.post("/reply", async (req, res) => {
  try {
    var email = req.query.email;
    if (req.body.accept) {
      Phd.findOneAndUpdate(
        { emailId: email },
        { $set: { leave: true } },
        (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      res.send("You Have Accepted the leave. If you want to modify your request, you can hit reject/accept in the same mail again");
    } else {
      Phd.findOneAndUpdate(
        { emailId: email },
        { $set: { leave: false } },
        (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
      res.send("You Have Rejected the leave. If you want to modify your request, you can hit reject/accept in the same mail again");
    }
  } catch (err) {
    console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get list of all hods
app.get("/admin/getAllHods", (req, res) => {
  try{
    Hod.find({}, (err, hods) => {
      if (err) {
        console.log("error in finding list of all hods");
      }
      return res.send(hods);
    })
  }catch(err){
    console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get list of all phd students who's request has been approved
app.get("/admin/phdApproved", (req, res) => {
  try{
    Phd.find({ leave: true }, (err, phds) => {
      if (err) {
        console.log("error in finding the list of phds with approved request");
        return;
      }
      return res.send(phds);
    })
  }catch(err){
    console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to replace the previous hod
app.post("/admin/changeHod",(req, res) => {
  try{
    const{nameOfNewHod,deptOfNewHod,hpsrnOfNewHod,emailOfNewHod} = req.body;
    console.log(req.body);
    Hod.findOneAndUpdate({department:deptOfNewHod},{
        name:nameOfNewHod,
        department:deptOfNewHod,
        hpsrn:hpsrnOfNewHod,
        email:emailOfNewHod},(err,oldHod)=>{
          if(err){
            console.log(err);
            return res.send(false);
          }
          else{
            return res.send(true);
          }
        }
    );
  }catch(err){
    console.log(err);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to add the new hod to db
app.post("/admin/addHod",(req, res) => {
  try{
    const{nameOfNewHod,deptOfNewHod,hpsrnOfNewHod,emailOfNewHod} = req.body;
    console.log(req.body);
    let hod = Hod.create({
        name:nameOfNewHod,
        department:deptOfNewHod,
        hpsrn:hpsrnOfNewHod,
        email:emailOfNewHod});
    console.log(hod);
    return res.send(true);
  }catch(err){
    console.log(err);
    res.send("Internal Server Error Occured");
    return res.send(false);
  }
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Express App started successfully at port number:${PORT}`);
});
