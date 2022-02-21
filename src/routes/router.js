const express = require("express");
const userController = require("../controllers/userController");
const packageController = require("../controllers/packageController");
const clientController = require("../controllers/clientController");
const subscribeController = require("../controllers/subscribeController");
const expenseController = require("../controllers/expenseController");
const incomeController = require("../controllers/incomeController");
const complainController = require("../controllers/complainController");
const complainRegisterController = require("../controllers/complainRegisterController");
const router = express.Router();

//user api
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

//package api
router.post("/package", packageController.create);
router.get("/package", packageController.get);
router.put("/package", packageController.update);

//client api
router.post("/client", clientController.create);
router.get("/client", clientController.get);
router.put("/client", clientController.update);

//subscribe api
router.post("/subscribe", subscribeController.create);
router.get("/subscribe", subscribeController.get);
router.put("/subscribe", subscribeController.update);

//Expense api
router.post("/expense", expenseController.create);
router.get("/expense", expenseController.get);
router.put("/expense", expenseController.update);

//Income api
router.post("/income", incomeController.create);
router.get("/income", incomeController.get);
router.put("/income", incomeController.update);


//complain api
router.post("/complain", complainController.create);
router.get("/complain", complainController.get);
router.put("/complain", complainController.update);

//Register Complain api 
router.use("/complainissue", complainRegisterController.complainRegister)




module.exports = router;
