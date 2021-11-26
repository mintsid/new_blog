const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjo1ODc0LCJpYXQiOjE2Mzc4Mjc3NjZ9.tdf33XNMf6mtx_l8047f7k_MhjhVbw8iIdPDPZxwOKQ'';

const  decodedValue = jwt.verify(token, "stella-key");

console.log(decodedValue)

//https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjo1ODc0LCJpYXQiOjE2Mzc4Mjc3NjZ9.frPx1HTz2zRyYL39ycDVNvftEhhb28-DvwAaYIQAuB4