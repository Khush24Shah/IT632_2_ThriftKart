const Cart = require("../models/Cart");
const Product = require("../models/product");
const verifyToken = require("../middleware/authVerify");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  const userId = req.user._id; 
   let cart = await Cart.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        let qty =  req.body.products.qty;
        console.log(price);
        if(cart){
          let itemIndex = cart.products.findIndex(p => p.productId == productId);
          console.log(productId);
          console.log(itemIndex);
          if(itemIndex > -1)
            {
                let productItem = cart.products[itemIndex];
                console.log(productItem.qty);
                productItem.qty = productItem.qty + qty;
                console.log(productItem);
                cart.products[itemIndex] = productItem;
            }
            else
            {
              cart.products.push({ productId, name, qty, price });
            }
            cart.bill += qty*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
          
          try {
            
            const savedCart = await Cart.create({
              userId,
              products: [{ productId, name, qty, price }],
              bill: qty*price
          });
            res.status(200).json(savedCart);
          } catch (err) {
            res.status(500).json(err);
          }
        }
  
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;