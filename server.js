const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("./index.html").status(200);
});

app.post("/add", (req, res) => {
  const { title, status, id } = req.body;

  fs.readFile("./todo.json", (err, data) => {
    const jsonFile = JSON.parse(data);

    let obj = {};
    obj.title = title;
    obj.status = status;
    obj.id = id;
    jsonFile.push(obj);

    fs.writeFile("./todo.json", JSON.stringify(jsonFile), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.json("Sucessfully Added Item");
});

app.get("/gettodolist", (req, res) => {
  fs.readFile("./todo.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;

  fs.readFile("./todo.json", (err, data) => {
    let fileData = JSON.parse(data);

    let filtered_data = fileData.filter((ele) => {
      if (ele.id != id) {
        return true;
      }
    });
    console.log(filtered_data);
    fs.writeFile("./todo.json", JSON.stringify(filtered_data), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.json("Sucessfully Deleted");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started...");
  }
});
