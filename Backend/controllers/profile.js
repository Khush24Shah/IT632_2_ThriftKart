const Customer = require("../models/customer");

const updateProfile = async (req,res) =>{
    let profile={}; 
    Customer.findOne({email:req.result.email},(err,result)=>{
        if(err){profile={}}
        else if(result == null){
            profile={}
        }
        else {
            profile=result;
        }
    });
    console.log(req.body.address);
    Customer.findOneAndUpdate({email:req.result.email},
    {
        $set:{
            address: req.body.address?req.body.address:profile.adress,
        },
    },
    {new:true},(err,result)=>{
        if(err) return res.json({err:err});
        else if(result == null){
            return res.json({data:[]});
        }
        else {return res.json({data:result});
        }
    }
    );

};
const getSingleProfile = async (req,res) =>{
   
    
    Customer.findOne({email:req.result.email},(err,result)=>{
        if(err) return res.json({err:err});
        else if(result == null){
            return res.json({data:[]});
        }
        else {return res.json({data:result});
        }
    })
};
const getAllProfile = async (req,res) =>{
    Customer.find((err,result)=>{
        if(err) return res.json({err:err});
        else if(result == null){
            return res.json({data:[]});
        }
        else {return res.json({data:result});
        }
    })
   
};
const deleteProfile = async (req,res) =>{

};

module.exports ={
    updateProfile,
    getAllProfile,
    getSingleProfile,
    deleteProfile
};