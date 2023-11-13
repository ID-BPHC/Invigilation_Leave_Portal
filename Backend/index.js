const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const Hod = require("../Backend/Models/Hod");
const Phd = require("../Backend/Models/Phd");
const Date = require("../Backend/Models/Date");
const Accept = require("../Backend/Models/Accept");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const cors = require("cors");
const connectToMongo = require("../Backend/db");
connectToMongo();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5004;

// submit endpoint when user fills the form for leave
app.post("/submit", async (req, res) => {
  try {
    const { id, name, email, branch, reason, multipleDate } = req.body;
    let newDates = [];
    Phd.findOneAndUpdate(
      { emailId: email },
      {
        $set: {
          date: multipleDate,
          id: id,
          department: branch,
          reason: reason,
          // leave: false,
          leave: null,
          name: name,
        },
      },
      async (err, data) => {
        if (err) {
          // console.log(err);
          return;
        }
        if (data != null) {
          return;
        } else {
          let phD = await Phd.create({
            name: name,
            department: branch,
            id: id,
            campusId: "12345678",
            phoneNo: 1234567890,
            emailId: email,
            // leave: false,
            leave: null,
            reason: reason,
            date: multipleDate,
          });
        }
      }
    );
  } catch (error) {
    // console.log(error);
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
            // console.log(err);
            return;
          }
        }
      );
      res.send(
        "You Have Accepted the leave. If you want to modify your request, you can hit reject/accept in the same mail again"
      );
    } else {
      Phd.findOneAndUpdate(
        { emailId: email },
        { $set: { leave: false } },
        (err, data) => {
          if (err) {
            // console.log(err);
            return;
          }
        }
      );
      res.send(
        "You Have Rejected the leave. If you want to modify your request, you can hit reject/accept in the same mail again"
      );
    }
  } catch (err) {
    // console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// hod endpoint to get list of all phd students from their department.
app.post("/hod/phd", (req, res) => {
  try {
    Phd.find({ department: req.body.department }, (err, phds) => {
      if (err) {
        // console.log("error in finding the list of phds with approved request");
        return;
      }
      return res.send(phds);
    });
  } catch (err) {
    // console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get list of all hods
app.get("/admin/getAllHods", (req, res) => {
  try {
    Hod.find({}, (err, hods) => {
      if (err) {
        // console.log("error in finding list of all hods");
      }
      return res.send(hods);
    });
  } catch (err) {
    // console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get list of all phd students who's request has been approved
app.get("/admin/phdApproved", (req, res) => {
  try {
    Phd.find({ leave: true }, (err, phds) => {
      if (err) {
        // console.log("error in finding the list of phds with approved request");
        return;
      }
      return res.send(phds);
    });
  } catch (err) {
    // console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get list of all phd students.
app.get("/admin/phd", (req, res) => {
  try {
    Phd.find({}, (err, phds) => {
      if (err) {
        // console.log("error in finding the list of phds with approved request");
        return;
      }
      return res.send(phds);
    });
  } catch (err) {
    // console.log(error);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to replace the previous hod
app.post("/admin/changeHod", async (req, res) => {
  try {
    const { nameOfNewHod, deptOfNewHod, hpsrnOfNewHod, emailOfNewHod } =
      req.body;
    // console.log(req.body);
    Hod.findOneAndUpdate(
      { department: deptOfNewHod },
      {
        name: nameOfNewHod,
        department: deptOfNewHod,
        hpsrn: hpsrnOfNewHod,
        email: emailOfNewHod,
      },
      (err, oldHod) => {
        if (err) {
          // console.log(err);
          return res.send(false);
        } else {
          return res.send(true);
        }
      }
    );
  } catch (err) {
    // console.log(err);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to add the new hod to db
app.post("/admin/addHod", async (req, res) => {
  try {
    const { nameOfNewHod, deptOfNewHod, hpsrnOfNewHod, emailOfNewHod } = req.body;
   
    let hod = await Hod.create({
      name: nameOfNewHod,
      department: deptOfNewHod,
      hpsrn: hpsrnOfNewHod,
      email: emailOfNewHod,
    });
    // console.log(hod);
    res.send(hod)
    next()
  } catch (err) {
    // console.log(err);
    res.send("Internal Server Error Occured");
    return res.send(false);
  }
});


// admin endpoint to delete an hod from db
app.delete("/admin/hod/:email", (req, res) => {
  const email = req.params.email;
  // Use Mongoose to find and remove the HOD student record from MongoDB
  Hod.findOneAndRemove({ email: email }, (err, hod) => {
    if (err) {
      // Handle the error (e.g., send an error response)
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!hod) {
      // HOD student record not found, send a not found response
      return res.status(404).json({ message: "HOD not found" });
    }

    // Successfully deleted, send a success response
    return res.status(200).json({ message: hod });
  });
});



// admin endpoint to approve/reject the leave of phd student
app.post("/admin/response", async (req, res) => {
  try {
    var reply = req.body.reply;
    var email = req.body.email;
    Phd.findOneAndUpdate(
      { emailId: email },
      { $set: { leave: reply ? true : false } },
      (err, data) => {
        if (err) {
          return;
        }
      }
    );
    // sending email for confirmation.
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
    Phd.find({ emailId: email }, (err, phd) => {
      if (err) {
        // console.log("error in finding the list of phds with approved request");
        return;
      }
      let mailOptions = {
        from: "noreplytd@hyderabad.bits-pilani.ac.in",
        to: email,
        subject: reply ? "Leave Request Approved" : "Leave Request Denied",
        context: {
          title: "Invigilation Leave Request",
          email: email,
          name: phd[0].name,
          reply: reply ? "Approved" : "Rejected",
          dates: phd[0].date.join(', '),
          url: process.env.BASEURL,
        },
        template: "index",
      };
      // if reply is true then send mail.
      if (true) {
        transporter.sendMail(mailOptions, (err, success) => {
          if (err) {
            console.log(err);
          }
          console.log("Email sent successfully!!");
        });
      }
    });
    return res.send(reply ? true : false);
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error Occured");
  }
});

// admin endpoint to set the start and end date
app.post("/admin/date", async (req, res) => {
  try {
    const dateObj = req.body;
    let date = await Date.create(dateObj);
    // console.log(date);
    return res.send(true);
  } catch (err) {
    // console.log(err);
    return res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get dates
app.get("/admin/getDate", async (req, res) => {
  try {
    Date.find({}, (err, dates) => {
      if (err) {
        // console.log("Error in fetching the dates from Database");
        return;
      }
      const date = dates[dates.length - 1];
      return res.send(date);
    });
  } catch (err) {
    if (err) {
      // console.log(err);
      return res.send("Internal Server Error Occured");
    }
  }
});

// admin endpoint to set the permissions for student and hod portal
app.post("/admin/permission", async (req, res) => {
  try {
    const permission = req.body;
    let accept = await Accept.create(permission);
    // console.log(accept);
    return res.send(true);
  } catch (err) {
    // console.log(err);
    return res.send("Internal Server Error Occured");
  }
});

// admin endpoint to get permissions for student and hod portal
app.get("/admin/getPermission", async (req, res) => {
  try {
    Accept.find({}, (err, permissions) => {
      if (err) {
        // console.log("Error in fetching the permission from Database");
        return;
      }
      const permission = permissions[permissions.length - 1];
      return res.send(permission);
    });
  } catch (err) {
    if (err) {
      // console.log(err);
      return res.send("Internal Server Error Occured");
    }
  }
});

// DELETE request to delete a PhD student record by email
app.delete("/admin/phd/:email", (req, res) => {
  const email = req.params.email;

  // Use Mongoose to find and remove the PhD student record from MongoDB
  Phd.findOneAndRemove({ emailId: email }, (err, phd) => {
    if (err) {
      // Handle the error (e.g., send an error response)
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!phd) {
      // PhD student record not found, send a not found response
      return res.status(404).json({ message: "PhD student not found" });
    }

    // Successfully deleted, send a success response
    return res.status(200).json({ message: "PhD student deleted successfully" });
  });
});

// Delete all PhD student records
app.delete("/admin/phd", async (req, res) => {
  try {
    await Phd.deleteMany({}); 

    res.status(200).json({ message: "All PhD student records deleted successfully." });
  } catch (error) {
    console.error("An error occurred while deleting all PhD records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/", (req, res) => {
  res.send("Hello world /");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Express App started successfully at port number:${PORT}`);
});
