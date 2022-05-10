
const Wish = require("../models/wishlist");
const Product = require("../models/product");
const verifyToken = require("../middleware/authVerify");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newWish = new Wish(req.body);
  const userId = req.user._id; 
   let wish = await Wish.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        if(wish){
          let itemIndex = wish.products.findIndex(p => p.productId == productId);
          console.log(productId);
          console.log(itemIndex);
          if(itemIndex > -1)
            {
                let productItem = wish.products[itemIndex];
                wish.products[itemIndex] = productItem;
            }
            else
            {
              wish.products.push({ productId, name, price });
            }
            wish = await wish.save();
            return res.status(201).send(wish);
        }
        else {
          
          try {
            
            const savedWish = await Wish.create({
              userId,
              products: [{ productId, name, price }],
              });
            res.status(200).json(savedWish);
          } catch (err) {
            res.status(500).json(err);
          }
        }
  
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {

    const newWish = new Wish(req.body);
  const userId = req.user._id; 
   let wish = await Wish.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        
        if(!wish)
        {
          return res.status(400).send("Wish not found");
        }
        else
        {
          console.log("here in else");
          let itemIndex = wish.products.findIndex(p => p.productId == productId);
          
          if(itemIndex == -1)
            {
              return res.status(400).send("Product not found");
            }
            else
            {
              console.log("product item");
         
              let productItem = wish.products[itemIndex];
              wish.products[itemIndex] = productItem;
              console.log(wish);
            }
            wish = await wish.save();
           // console.log(wish);
            return res.status(201).send(wish);
        }  
        

    /* const updatedWish = await Wish.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWish); */
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Wish.findByIdAndDelete(req.params.id);
    res.status(200).json("Wish has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const wish = await Wish.findOne({ userId: req.params.userId });
    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const wishs = await Wish.find();
    res.status(200).json(wishs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;