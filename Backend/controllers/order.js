const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/customer');
const config = require('config');
require("dotenv").config();


module.exports.get_orders = async (req,res) => {
    const userId = req.params.id;
    Order.find({userId}).sort({date_added:-1}).then(orders => res.json(orders));
}

module.exports.get_all_orders = async (req,res) => {
    Order.find().sort({date_added:-1}).then(orders => res.json(orders));
}

module.exports.checkout = async (req,res) => {
    try{
        const userId = req.params.id;
        const {source} = req.body;
        let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id: userId});
        const email = user.email;
        if(cart){
           
                const order = await Order.create({
                    userId,
                    products: cart.products,
                    bill: cart.bill
                });
                const data = await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).send(order);
           
        }
        else{
            res.status(500).send("You do not have items in cart");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}