const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteXBheWxvYWREYXRlIjo1ODc0LCJpYXQiOjE2Mzc4MDUzMzV9.940u83o0iCUGPZGQnVrYouskQW1GmLPDKxAgBbz1AQk";

const decodedValue = jwt.verify(token, "stella-key");

console.log(decodedValue);
