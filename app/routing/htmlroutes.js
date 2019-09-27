const routes = require('express').Router();
const path = require("path");
const express = require("express");

routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

routes.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "survey.html"));
});


module.exports = routes;