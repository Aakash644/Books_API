require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//objectives
//1.Give details of each and every book with its author and the genres. done
//2.Provide the support for creating, updating and deleting a book. done
//3.Produce a list of all the authors with their books published. done
//4.Details of each and every author with their published books.done
//5.Provide the support for creating, updating and deleting an author. done

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://aakash:kumar94707@cluster0.mnux1ni.mongodb.net/project1", {
  UseNewUrlParser: true,
});
const author = new mongoose.Schema({
    author_id:Number,
  authorname: String,
  about:String,
  books:String,
  genre: String
});
const authors = mongoose.model("author", author);

const book = new mongoose.Schema({
  book_id: Number,
  bookname: String,
  author: String,
  genre: String,
  published_date: String,
  price: Number,
});
const books = mongoose.model("book", book);


  //books section
 app.post('/books',async (req, res) => {
    const book_id = Math.floor(Math.random()*10000);
    const bookname = req.body.bookname;
    const author = req.body.author;
    const genre = req.body.genre;
    const price = req.body.price;
    const published_date = new Date();
    const find_book = await books.find({bookname: bookname, author:author }).exec();
   
    if (find_book.length!==0) {
      res.json({message:"Bookname has been already published."});
    } 
    else {
      const data = {
        book_id: book_id,
        bookname: bookname,
        author: author,
        genre: genre,
        published_date: published_date,
        price: price,
      }; 
      books(data).save();
      res.json({message:`${bookname} has been successfully published.`});
      
    }
   
  })
app.get('/books',async (req, res) => {
    try{
    const data = await books.find().exec();
    res.json(data);
    }
    catch(err){
        res.send(err);
    }
  })

  //update by book_id
app.put('/books/:book_id',async (req,res)=>{
    try{
        const resp=await books.updateOne({book_id:req.params.book_id},req.body);
        console.log(resp);
        if(resp.modifiedCount >0){
        res.json({message:"Book updated successfully."});
        }
        else{
            
            res.json({message:"Book not found."});
        }
    }
    catch(err){
      console.log(err);
        res.status(500).json({message:"An error occurred while updating."});
    }
    });
//delete by bookname or book_id
 app.delete('/books/:param',async (req, res) => {
  try{
    var resp;
    if(!isNaN(req.params.param)){
    resp=await books.deleteOne({book_id:req.params.param });
     console.log(resp);
    } 
    else{
        resp=await books.deleteOne({author:req.params.param });
        console.log(resp);  
    }
    if(resp.deletedCount>=1){
    res.json({message:`Book has been successfully deleted`});
  }else{
    res.json({message:"No Author of this name or id present in our database."});
  }}
  catch(err){
      console.log(err);
      res.json({message:"error"});
  }
  });



//authors section
//getall authors
app.get('/authors',async (req,res)=>{
    try{
const data=await authors.find().exec();
res.json(data);
    }
    catch(err){
        console.log(err);
        res.json({message:"An error occured while getting the data."});
    }

})
//get a author by author_id or authorname
app.get('/authors/:param',async (req,res)=>{
    try{ 
        
        if(!isNaN(req.params.param)){
    const data=await authors.findOne({author_id:req.params.param}).exec();
     res.json(data);
    }
    else{
        const data=await authors.findOne({authorname:req.params.param}).exec();
        res.json(data);

    }
}
    catch(err){
        console.log(err);
        res.json({message:"An error occured while getting the data."});
    }

})
app.post('/authors',async (req,res)=>{
    try{
        const author_id=Math.floor(Math.random()*10000);
        const authorname=req.body.authorname;
        const books=req.body.books;
        const about=req.body.about;
        const genre=req.body.genre;
        const find_author=await authors.findOne({authorname:authorname,author_id:author_id});
        
        if (find_author) {
            res.json({message:"Author is already present."});
          } 
          else {
            const data = {
                author_id:author_id,
              books:books,
              about: about,
              authorname: authorname,
              genre: genre,
             
            }; 
            authors(data).save();
            res.json({message:`Author is successfully entered into the database.`});
            
          }
         }
         catch(err){
             console.log(err);
             res.json({message:"An unexpected error occured."})
         }
})
//update the author details
app.put('/authors/:author_id',async (req,res)=>{
    try{
        const resp=await authors.updateOne({author_id:req.params.author_id},req.body);
        console.log(resp);
        if(resp.modifiedCount >0){
        res.json({message:"Author details updated successfully."});
        }
        else{
            
            res.json({message:"Author not found."});
        }
    }
    catch(err){
      console.log(err);
        res.status(500).json({message:"An error occurred while updating."});
    }

})

//delete by Authorname or author_id
app.delete('/authors/:param',async (req, res) => {
    try{
    var resp;
    if(!isNaN(req.params.param)){
    resp=await authors.deleteOne({author_id:req.params.param });
     console.log(resp);
    } 
    else{
        resp=await authors.deleteOne({authorname:req.params.param });
        console.log(resp);  
    }
    if(resp.deletedCount>=1){
    res.json({message:`Author has been successfully deleted`});
  }else{
    res.json({message:"No Author of this name or id present in our database."});
  }}
  catch(err){
      console.log(err);
      res.json({message:"error"});
  }
});


app.listen(3000, () => {
  console.log("listening on port 3000.");
});
module.exports = app;
