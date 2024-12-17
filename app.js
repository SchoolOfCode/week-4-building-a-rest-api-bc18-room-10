import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async (req, res) => { //create get request. /quotes url.
  const quotes = await getQuotes(); 
  res.status(200).send(quotes); //response should be to send getQuotes
});

//needed to be an async function with await, as getQuotes is an async function, so this function was fulfulling before the getQuotes function, so returning an empty object.

app.get("/quotes/:id", async (req, res) =>{ 
  const { id } = req.params; //take the ID from the URL
  const quoteId = await getQuoteByID(id);
  res.status(200).send(quoteId);
})


/* This is what is I type in the body in postman.
{
  "quoteText": "This is a great quote",
  "author": "Ollie"
} */

app.post("/quotes", async (req, res) => {
  const newQuoteText = req.body.quoteText; //getting the quote text from what is given in the bodfy in postman
  const newAuthor = req.body.author //getting the author from what is given in the body in postman.
  const newQuote = await addQuote(newQuoteText, newAuthor); //passing the new text and new author into the function.
  res.status(201).send(newQuote);
});

app.patch("/quotes/:id", async (req, res) => {
  const { id } = req.params; //needs to be in the curly brackets for some reason.
  const newQuoteText = req.body.quoteText;
  const newAuthor = req.body.author;
  const editedQuote = await editQuote(id, newQuoteText, newAuthor);
  res.status(200).send(editedQuote);
})

app.delete("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  const deletedQuote = await deleteQuote(id);
  res.status(200).send(deletedQuote);
})

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});