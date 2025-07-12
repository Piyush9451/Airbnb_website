const express=require("express");
const router=express.Router();

  //posts
 //posts users
 router.get("/",(req,res)=>{
    res.send("get for users");
 })
 //show users
 router.get("/:id",(req,res)=>{
    res.send("get for posts id");
 })
 //post users
 router.get("/",(req,res)=>{
    res.send("post for users id");
 })
 //delete users
 router.get("/:id",(req,res)=>{
    res.send("delete for users id");
 })
 module.exports=router;