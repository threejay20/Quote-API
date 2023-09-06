// Import the Express framework and create an Express application
const express = require('express');
const app = express();

// Import necessary data and utility functions
const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

// Define the port the server will listen on (default to 4001)
const PORT = process.env.PORT || 4001;

// Serve static files from the 'public' directory (e.g., CSS, JavaScript, images)
app.use(express.static('public'));

// JSON middleware to parse JSON request bodies
app.use(express.json());

// Create a route for GET /api/quotes/random
app.get('/api/quotes/random', (req, res) => {
  // Generate a random quote using the getRandomElement function
  const randomQuote = getRandomElement(quotes);

  // Send the random quote as JSON in the response
  res.json({ quote: randomQuote });
});

// Create a route for GET /api/quotes
app.get('/api/quotes', (req, res) => {
  const person = req.query.person;

  if (!person) {
    // If no 'person' query parameter is provided, return all quotes
    res.json({ quotes: quotes });
  } else {
    // If a 'person' query parameter is provided, filter quotes by that person
    const quotesByPerson = quotes.filter(quote => quote.person === person);

    if (quotesByPerson.length === 0) {
      // If no quotes are found for the requested person, send back an empty array
      res.json({ quotes: [] });
    } else {
      // Send the filtered quotes as a response
      res.json({ quotes: quotesByPerson });
    }
  }
});

// Create a route for POST /api/quotes
app.post('/api/quotes', (req, res) => {
  const { quote, person } = req.query;

  if (!quote || !person) {
    // Send a 400 Bad Request response if quote or person is missing
    res.status(400).json({ error: 'Both "quote" and "person" are required fields.' });
  } else {
    // Create a new quote object and add it to the quotes array
    const newQuote = {
      quote: quote,
      person: person,
    };
    quotes.push(newQuote);

    // Send a success response with the added quote
    res.status(201).json({ quote: newQuote });
  }
});

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
