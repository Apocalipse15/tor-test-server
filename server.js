const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const filesDir = path.join(__dirname, "files");

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/download/small", (req, res) => {
  res.download(path.join(filesDir, "small.txt"));
});

app.get("/download/medium", (req, res) => {
  res.download(path.join(filesDir, "medium.bin"));
});

app.get("/download/large", (req, res) => {
  res.download(path.join(filesDir, "large.bin"));
});

// Shutdown endpoint
app.post("/shutdown", (req, res) => {
  res.send("Shutting down server...");

  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });

  // Force exit after 5 seconds if there are open connections
  setTimeout(() => {
    console.log("Forcing shutdown.");
    process.exit(1);
  }, 5000);
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});