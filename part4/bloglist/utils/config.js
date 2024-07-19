// Purpose: This file is used to store the configuration of the server, such as the port number and the MongoDB URI.
require('dotenv').config();

// Define the port number and the MongoDB URI
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://LIU0611:19990611@cluster0.hhxdhcz.mongodb.net/part4?retryWrites=true&w=majority&appName=Cluster0';

// Export the configuration
module.exports = {
  MONGODB_URI,
  PORT
};
