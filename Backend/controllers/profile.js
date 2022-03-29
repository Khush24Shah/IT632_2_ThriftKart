const Customer = require("../models/customer");
var bcrypt = require("bcrypt");

const updateProfile = async (req,res) =>{
    let profile={}; 
    Customer.findOne({_id:req.user._id},(err,user)=>{
        if(err){profile={}}
        else if(user == null){
            profile={}
        }
        else {
            profile=user;
        }
    });
    console.log(req.body.address);
    Customer.findOneAndUpdate({_id:req.user._id},
    {
        $set:{
            address: req.body.address?req.body.address:profile.adress,
            dob: req.body.dob?req.body.dob:profile.dob,
            id : req.body.id?req.body.id:profile.id,
            fname : req.body.fname?req.body.fname:profile.fname,
            lname : req.body.lname?req.body.lname:profile.lname,
            email : req.body.email?req.body.email:profile.email,
            mobile : req.body.address?req.body.address:profile.adress,
            password : req.body.password?bcrypt.hashSync(req.body.password,8):profile.password,
        },
    },
    {new:true},(err,user)=>{
        if(err) return res.json({err:err});
        else if(user == null){
            return res.json({data:[]});
        }
        else {return res.json({data:user});
        }
    }
    );

};
const getSingleProfile = async (req,res) =>{
   
    
    Customer.findOne({_id:req.user._id},(err,user)=>{
        if(err) return res.json({err:err});
        else if(user == null){
            return res.json({data:[]});
        }
        else {return res.json({data:user});
        }
    })
};
const getAllProfile = async (req,res) =>{
    Customer.find((err,user)=>{
        if(err) return res.json({err:err});
        else if(user == null){
            return res.json({data:[]});
        }
        else {return res.json({data:user});
        }
    })
   
};
const deleteProfile = async (req,res) =>{
    if(req.user)
    {
   try{
    const result = await Customer.findOneAndDelete({_id:req.user._id});
    if(result)
    {
        res.send(result);
    }
    else{
        res.status(400).send("Profile Not found");
    }}
    catch(e)
    {
        res.status(500).send(e);
    }}
    else{
        res.status(400).send("Profile Not found using token");   
    }
};

module.exports ={
    updateProfile,
    getAllProfile,
    getSingleProfile,
    deleteProfile
};