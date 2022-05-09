const Order = require("../models/Order");
const Product = require("../models/product");
const verifyToken = require("../middleware/authVerify");


const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  const userId = req.user._id; 
   let order = await Order.findOne({userId:req.user._id});
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
        if(order){
          let itemIndex = order.products.findIndex(p => p.productId == productId);
          console.log(productId);
          console.log(itemIndex);
          if(itemIndex > -1)
            {
                let productItem = order.products[itemIndex];
                console.log(productItem.qty);
                productItem.qty = productItem.qty + qty;
                console.log(productItem);
                order.products[itemIndex] = productItem;
            }
            else
            {
              order.products.push({ productId, name, qty, price });
            }
            order.bill += qty*price;
            order = await order.save();
            return res.status(201).send(order);
        }
        else {
          
          try {
            
            const savedOrder = await Order.create({
              userId,
              products: [{ productId, name, qty, price }],
              bill: qty*price
          });
            res.status(200).json(savedOrder);
          } catch (err) {
            res.status(500).json(err);
          }
        }
  
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {

    const newOrder = new Order(req.body);
  const useId = req.user._id; 
   let order = await Order.findOne({userId:req.user._id});
        console.log(req.body.products.productId);
        let product = await Product.findOne({_id: req.body.products.productId});
        if(!product){
            res.status(404).send('Item not found!')
        }
        const price = product.price;
        const name = product.name;
        const productId = req.body.products.productId;
        let qty =  req.body.products.qty;
        
        if(!order)
        {
          return res.status(400).send("Order not found");
        }
        else
        {
          console.log("here in else");
          let itemIndex = order.products.findIndex(p => p.productId == productId);
          
          if(itemIndex == -1)
            {
              return res.status(400).send("Product not found");
            }
            else
            {
              console.log("product item");
         
              let productItem = order.products[itemIndex];
              productItem.qty = qty;
              order.products[itemIndex] = productItem;
              console.log(order);
            }
            order.bill = order.products.reduce((sum, product) => sum + product.price * product.qty,0);
            if(product.qty == 0)
            {
             order.products.splice(itemIndex,1);
            }   
            }
            order = await order.save();
           // console.log(order);
            return res.status(201).send(order);
            
        

    /* const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder); */
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;