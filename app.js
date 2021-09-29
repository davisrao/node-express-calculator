"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

//import stat fxns from stats.js
const {findMean , findMode, findMedian} = require("./stats")

//import str num convert from utils
const {convertStrNums} = require ("./utils")

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req,res){
  if (!req.query.nums) throw new BadRequestError(MISSING);
  let strNums = req.query.nums.split(",");

  let nums = convertStrNums(strNums);

  let mean = findMean(nums);

  return res.json({
    operation: "mean",
    result: mean,
  });
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function(req,res){
  if (!req.query.nums) throw new BadRequestError(MISSING);
  let strNums = req.query.nums.split(",");

  let nums = convertStrNums(strNums);

  let median = findMedian(nums);

  return res.json({
    operation: "median",
    result: median,
  });
})


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function(req,res){
  if (!req.query.nums) throw new BadRequestError(MISSING);
  let strNums = req.query.nums.split(",");

  let nums = convertStrNums(strNums);

  let mode = findMode(nums);

  return res.json({
    operation: "mode",
    result: mode,
  });
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;