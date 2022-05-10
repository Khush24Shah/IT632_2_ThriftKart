

const orderController = require('../controllers/order');



const router = require("express").Router();

router.get('/order/:id',orderController.get_orders);

router.get('/order/',orderController.get_all_orders);
router.post('/order/:id',orderController.checkout);

module.exports = router;