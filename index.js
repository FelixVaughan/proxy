const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors"); // Install this package via npm/yarn

const app = express();
const port = 4000; // Choose a port for your proxy server

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post("/proxy", async (req, res) => {
  try {
    const { url } = req.body; // Assuming the client sends the YouTube video URL

    if (!url || !url.startsWith("https://www.youtube.com/")) {
      throw new Error("Invalid or missing YouTube URL");
    }

    // Forward the request to YouTube's servers
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data from YouTube");
    }

    // Send the response from YouTube back to the client
    const responseBody = await response.text();
    res.send(responseBody);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/proxy", async (req, res) => {
  console.log(req);
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
