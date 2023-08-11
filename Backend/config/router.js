const express = require("express")
const userController = require("../app/controller/userCltrs")
const authenticate = require("../app/middlwares/authUser")
const categoryController = require("../app/controller/categoryCltrs")
const expenseController = require("../app/controller/expenseCltrs")

const router = express.Router()

// User
router.post("/user/register", userController.register)
router.post("/user/login", userController.login)
router.put("/user/update",authenticate, userController.update)
router.get("/user/account", authenticate, userController.account)
router.post("/user/budget", authenticate, userController.budget)


//Category
router.get("/user/category", authenticate, categoryController.list)
router.post("/user/category",authenticate, categoryController.create)
router.delete("/user/category/:id", authenticate, categoryController.destroy)

//Expenses
router.get("/user/expenses", authenticate, expenseController.listAll)
// router.get("/user/expenses/search" ,authenticate, expenseController.search)
router.put("/user/expenses/:id", authenticate, expenseController.update)
router.delete("/user/expenses/:id", authenticate, expenseController.destroy)
router.post("/user/expenses/:categoryId", authenticate, expenseController.create)
router.post("/user/expenses", authenticate, expenseController.create)



module.exports = router














// const express=require('express')
// const router=express.Router()
// const userController = require('../app/controller/userCltrs')
// const categoryController = require('../app/controller/categoryCltrs')
// const expenseController = require('../app/controller/expenseCltrs')
// const authenticate = require('../app/middlwares/authUser')


// //User
// router.post('/user/register',userController.register)
// router.post('/user/login',userController.login)
// router.get('/user/info/:id',authenticate,userController.show)
// // router.put('/user/budget',userController.budget)

// //Category
// router.get('/user/category',authenticate,categoryController.list)
// router.post('/user/category',categoryController.create)
// router.get('/user/category/:id',authenticate,categoryController.show)
// router.put('/user/category/:id',authenticate,categoryController.update)
// router.delete('/user/category/:id',authenticate,categoryController.destroy)

// //expense api
//  router.get('/user/expense',authenticate,expenseController.list)
//  router.post('/user/expense',authenticate,expenseController.create)
//  router.get('/user/expense/:id',authenticate,expenseController.show)
//  router.put('/user/expense/:id',authenticate,expenseController.update)
//  router.delete('/user/expense/:id',authenticate,expenseController.destroy)
//  router.put('/user/expense/softdelete/:id',authenticate,expenseController.softDelet)

// module.exports=router