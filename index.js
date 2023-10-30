// init

import express from "express";
import path from "path";
import mongoose from "mongoose";

// type mongosh in cmd
// mongoose.connect("mongodb://localhost:27017",{
//   dbname:"backend"
// })

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbname: "backend",
  })
  .then(() => console.log("DATABASE Connected"))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Messge = mongoose.model("messages", messageSchema);

const app = express();
//this here is for acess public
app.use(express.static(path.join(path.resolve(), "public")));
// this here is for acess form value
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "CHIRAN" });
  // res.sendFile("index.html")
});

app.get("/add", (req, res) => {
  Messge.create({ name: "chiranteset", email: "sample2@gmail.com" }).then(
    () => {
      res.send("Nice");
    }
  );
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  const messagesdata = { username: req.body.name, email: req.body.email };

  console.log(messagesdata);
  Messge.create(messagesdata);
  res.redirect("/sucess");
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  // user.push({username:req.body.name, email:req.body.email});
  //sucess in a file name
  // res.render("sucess");
  //redirect
  res.redirect("/success");
});

app.listen(1000, () => {
  console.log("Server is working");
});
