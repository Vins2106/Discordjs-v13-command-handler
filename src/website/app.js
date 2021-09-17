module.exports = async client => {
  
  const express = require("express");
  const app = express();
  
  app.set("views", "/app/src/website/views");
  app.use(express.static(__dirname + "/public"));  
  
  app.get("/", async (req, res) => {
    res.render("index.ejs")
  });
  
  app.listen(process.env.PORT || 3000, () => {
    console.log("[WEBSITE] running on port 3000")
  })
  
};