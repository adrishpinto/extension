const express = require("express");
const app = express();

// Define a route for the root URL
app.get("/", (req, res) => {
  // Changed "" to "/" for better clarity
  const obj = {
    firstName: "Garvit",
    lastName: "Manral",
    email: "garvitmanral@gmail.com",
    gender: "male",
    phone: "1234567890",
    fullName: "Garvit Manral",
  };

  res.json(obj); // Use res.json to send a JSON response
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
