const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Exercise = require("./models/exercise");

const app = express();

mongoose
  .connect(
    "mongodb+srv://kieran:DR3s4hRQPBt8jA4y@cluster0-rws4v.mongodb.net/exercises?retryWrites=true"
  )
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch(() => {
    console.log("Connection Error");
  });
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/exercises", (req, res, next) => {
  const exercise = new Exercise({
    dateAdded: req.body.dateAdded,
    exerciseName: req.body.exerciseName,
    duration: req.body.duration,
    calories: req.body.calories
  });
  exercise.save().then(result => {
    res.status(201).json({
      message: "Exercise Added Successfully",
      postId: result.id
    });
  });
});

app.patch("/api/exercises/:id", (req, res, next) => {
  const exercise = new Exercise ({
    _id: req.body.id,
    dateAdded: req.body.dateAdded,
    exerciseName: req.body.exerciseName,
    duration: req.body.duration,
    calories: req.body.calories
  });
  Exercise.updateOne({_id: req.params.id}, exercise)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "update successful"
      })
    });
});

app.get("/api/exercises", (req, res, next) => {
  Exercise.find().then(documents => {
    // console.log(documents);
    // response 200 success
    res.status(200).json({
      message: "exercises fetch from JSON",
      exercises: documents
    });
  });
});

app.delete("/api/exercises/:id", (req, res, next) => {
  Exercise.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Exercise deleted!" });
  });
});

module.exports = app;

//MongoDB
// Username:kieran
// Password: DR3s4hRQPBt8jA4y

//kieranalexwrenn@gmail.com
//Sparky!01
