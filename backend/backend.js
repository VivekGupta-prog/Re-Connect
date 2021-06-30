const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.uelencoded({extended:true}));
app.set("view engine", "ejs");
app.listen(9000, () => {
    console.log("Server running on port 9000");
});

//Database
mongoose.connect("mongodb://localhost:27017/reconnectDB", {useNewUrlParser: true, useUnifiedTopology: true});
const bookSchema = {
    title: String,
    description: String,
    author: String,
    about: String,
    isbn: String
};
const Book = mongoose.model("Book", bookSchema);

const userSchema = {
    fname: String,
    lname: String,
    username: String,
    mail: String,
    password: String
};
const User = mongoose.model("User", userSchema);

const ratingSchema = {
    isbn: String,
    rating: {
        username: String,
        rate: Number,
        review: String
    }
};
const Rate = mongoose.model("Rate", ratingSchema);

const reviewSchema = {
    isbn: String,
    review: {
        username: String,
        comment: String
    }
};
const Review = mongoose.model("Review", reviewSchema);

//Backend
app.get("/", (req,res) => {
    res.send("Running");
});
app.get("/login", (req,res) => {

});

app.post("/registration", (req,res) => {
    const userData = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        mail: req.body.mail,
        password: req.body.password
    });
    userData.save((err) => {
        if(!err) {
            res.send("Successfully added new data");
        } else {
            res.send(err);
        }
    });
});

app.post("/", (req,res) => {
    const ratingData = new Rate({
        isbn: req.body.isbn,
        rating: {
            username: req.body.username,
            rate: req.body.rate,
            review: req.body.review
        }
    });
    ratingData.save((err) => {
        if(!err) {
            res.send("Successfully added");
        } else {
            res.send(err);
        }
    });
    const reviewData = new Review({
        isbn: req.body.isbn,
        review: {
            username: req.body.username,
            comment: req.body.comment
        }
    });
    reviewData.save((err) => {
        if(!err) {
            res.send("Successfully added");
        } else {
            res.send(err);
        }
    });
});
