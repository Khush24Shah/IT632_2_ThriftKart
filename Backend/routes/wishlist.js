const Wishlist = require("../models/Wishlist");
const Product = require("../models/product");
const verifyToken = require("../middleware/authVerify");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  const userId = req.user._id; 
   let wishlist = await Wishlist.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        console.log(price);
        if(wishlist){
          let itemIndex = wishlist.products.findIndex(p => p.productId == productId);
          console.log(productId);
          console.log(itemIndex);
          if(itemIndex > -1)
            {
                let productItem = wishlist.products[itemIndex];
                console.log(productItem);
                wishlist.products[itemIndex] = productItem;
            }
            else
            {
              wishlist.products.push({ productId, name, price });
            }
            
            wishlist = await wishlist.save();
            return res.status(201).send(wishlist);
        }
        else {
          
          try {
            
            const savedWishlist = await Wishlist.create({
              userId,
              products: [{ productId, name, price }],
          });
            res.status(200).json(savedWishlist);
          } catch (err) {
            res.status(500).json(err);
          }
        }
  
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {

    const newWishlist = new Wishlist(req.body);
  const userId = req.user._id; 
   let wishlist = await Wishlist.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        if(!wishlist)
        {
          return res.status(400).send("Wishlist not found");
        }
        else
        {
          console.log("here in else");
          let itemIndex = wishlist.products.findIndex(p => p.productId == productId);
          
          if(itemIndex == -1)
            {
              return res.status(400).send("Product not found");
            }
            else
            {
              console.log("product item");
         
              let productItem = wishlist.products[itemIndex];
              wishlist.products[itemIndex] = productItem;
              console.log(wishlist);
            }
            if(product.qty == 0)
            {
             wishlist.products.splice(itemIndex,1);
            }   
            }
            wishlist = await wishlist.save();
           // console.log(wishlist);
            return res.status(201).send(wishlist);
            
        

    /* const updatedWishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWishlist); */
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json("Wishlist has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;