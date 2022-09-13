require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userModel = require("./models/user");
const pubModel = require("./models/publish");
const comModel=require("./models/comments")
const {
    checkExistingUser,
    generatePasswordHash,
  } = require("./middlewares/utility");
const app = express();
const unProtectedRoutes = ["/login", "/signup"];

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server running on 3001 port")
    }
})

mongoose.connect("mongodb://localhost/published", () => {
    console.log("connected to db")
}, (err) => {
    console.log(err);
})

app.use((req, res, next) => {
    if (unProtectedRoutes.includes(req.url)) {
      next();
    } else {
      if (req.headers.authorization) {
        jwt.verify(
          req.headers.authorization,
          process.env.SECRET_KEY,
          (err, mailid) => {
            if (err) {
              return res.sendStatus(403);
            }
            req.mailid = mailid;
            next();
          }
        );
      } else {
        res.send("Authorization required");
      }
    }
  });

app.post("/signup", async (req, res) => {
    if (await checkExistingUser(req.body.mailid)) {
      res.status(400).send("EmailID exists. Please try with different Email");
    } else {
      generatePasswordHash(req.body.password).then((passwordHash) => {
        userModel
          .create({
            mailid: req.body.mailid,
            password: passwordHash,
          })
          .then(() => {
            res.status(200).send(`${req.body.mailid} added successfully`);
          })
          .catch((err) => {
            res.status(400).send(err.message);
          });
      });
    }
  });
  app.post("/login", (req, res) => {
    userModel.find({ mailid: req.body.mailid }).then((userData) => {
      if (userData.length) {
        bcrypt.compare(req.body.password, userData[0].password).then((val) => {
          if (val) {
            const authToken = jwt.sign(
              userData[0].mailid,
              process.env.SECRET_KEY
            );
            res.status(200).send({ authToken });
          } else {
            res.status(400).send("Invalid Password");
          }
        });
      } else {
        res.status(400).send("Unauthorized user");
      }
    });
  });

  app.post("/publish",(req,res)=>{
    const user=req.mailid
    console.log(user)
    pubModel.create({mailid:user,publish:req.body.publish}).then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
  })
  
  app.get("/publish",(req,res)=>{
    // const user=req.mailid
    // console.log(user)
    pubModel.find().sort({_id:-1}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
  })
  
  app.post("/comment",(req,res)=>{
    const user=req.mailid
    console.log(user)
    comModel.create({mailid:user,publish:req.body.publish}).then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
  })

  app.get("/comment",(req,res)=>{
    // const user=req.mailid
    // console.log(user)
    comModel.find().sort({_id:-1}).then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        res.status(400).send(err);
    })
  })
//   app.get("/", async (req, res) => {
//     try {
//       const user = req.mailid;
//       const data = await usercontact.find({ user });
//       const contactsdata = data.map((d) => d.contacts);
//       res.status(200).send(...contactsdata);
//     } catch {
//       res.status(400).send("An error occured while getting data");
//     }
//   });