// entry point to our backend

// create basic express server
const express = require('express');

// initialize express
const app = express();

// variable for the port, used for production or for development
const PORT = process.env.PORT || 5000;

// add port to listen on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
