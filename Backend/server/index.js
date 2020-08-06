const express = require("express");
const server = express();
const cors = require("cors");
const { Technology } = require("../models");

server.use(express.json());
server.use(express.static(__dirname + "/../public"));
server.use(cors());

server.get("/app/technologies", async (req, res) => {
  let technologies = await technology.find();
  technologies = technologies.map(technology => {
    Technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return technology;
     
  });

  return res.send({ error: false, data: technologies });
});

server.get("/app/technology/:id", async (req, res) => {
  const { id } = req.params;
  let technology = await Technology.findById(id);
  Technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;

  return res.send({ error: false, data: technology });
});

server.get("/app/technology/search/:name", async (req, res) => {
  const { name } = req.params;
  let technologies = await Technology.find({
    name: { $regex: new RegExp(name, "i") }
  });

  technologies = technologies.map(technology => {
    Technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
    return technology;
  });

  return res.send({ error: false, data: technologies });
});

module.exports = server;
