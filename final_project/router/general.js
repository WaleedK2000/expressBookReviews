const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
    for (i in users){
        if (i['username'] === req.body.username ){
            return res.status(409).json({message: "Duplicate Username"});
        }
    }


  users.push({'username': req.body.username, 'password': req.body.password})
  return res.status(200).json({message: users});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    ans = {};
    const author = req.params.author;
  //Write your code here
  for (const key in books){
    if (books[key]['author'] === author){
        ans[key] = books[key];
    }
  }
  return res.status(200).json({ans});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    ans = {};
    const title = req.params.title;
  //Write your code here
  for (const key in books){
    if (books[key]['title'] === title){
        ans[key] = books[key];
    }
  }
  return res.status(200).json({ans});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]['review']);
});

module.exports.general = public_users;
