const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const Expense =require('../models/expense')
const Category= require('../models/category')
const userController={} 


userController.register = async (req, res) => {
    try {
        const { body } = req
        console.log(body)
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        hashpassword = await bcrypt.hash(userObj.password, salt)
        userObj.password = hashpassword
        const user = await userObj.save()
        res.json(user)

    } catch (error) {
        res.json(error)
    }
}

userController.login = (req, res) => {
    const { body } = req
    User.findOne({ email: body.email })
        .then((user) => {
            if (!user) {
                res.json({ error: 'invalid password or email' })
            } else {
                bcrypt.compare(body.password, user.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = {
                                id: user._id,
                                email: user.email,
                                name: user.name
                            }
                            const token = jwt.sign(tokenData, process.env.SECRECTKEY)
                            res.json({
                                token: token
                            })
                        } else {
                            res.json({ error: 'invalid email or password' })
                        }

                    })
            }
        }).catch((err) => {
            res.json(err)
        })
}


// userController.update = (req, res) => {
//     const body = req.body;
//     // delete body.email;
//     // delete body.password;

//     const userId = req.user.id;

//     User.findOneAndUpdate({ _id: userId }, body, { new: true, runValidators: true })
//         .then((userObj) => {
//             if (userObj) {
//                 res.json(userObj);
//             } else {
//                 res.json({});
//             }
//         })
//         .catch((error) => {
//             res.json(error);
//         });
// };

userController.update = async (req, res) => {
    try {
        const body = req.body
        //Ensuring not to change email and password
        delete body.email
        delete body.password

        const userId = req.user.id
        const userObj = await User.findOneAndUpdate({ _id: userId }, body, { new: true, runValidators: true })
        if (userObj) {
            res.json(userObj)
        } else {
            res.json({})
        }

    } catch (error) {
        res.json(error)
    }
}

userController.account = (req, res) => {
    const id = req.user.id;

    User.findById(id)
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.json({});
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

userController.budget = (req, res) => {
    const userId = req.user.id;
    const body = req.body;

    Promise.all([User.findById(userId), Expense.find({ userId: userId, isDeleted: false })])
        .then((result) => {
            const [userObj, expenses] = result;
            const totalUsedBudget = expenses.reduce((pv, cv) => {
                return pv + cv.amount;
            }, 0);

            const remainingBudget = userObj.budget - totalUsedBudget - body.amount;

            if (remainingBudget > 0) {
                res.json({
                    message: `Budget Remaining - ${remainingBudget}`,
                });
            } else {
                res.json({
                    error: `Budget limit is reached`,
                });
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

module.exports = userController;



// userController.show = (req, res) => {
//     const { id } = req.params
//     User.findById(id)
//         .then((user) => {
//             if (user) {
//                 res.json(user)
//             } else {
//                 res.json({})
//             }
//         }).catch((err) => {
//             res.json(err)
//         });
// }

// userController.register = async (req, res) => {
//     try {
//         const { body } = req
//         console.log(body)
//         const userObj = new User(body)
//         const salt = await bcrypt.genSalt()
//         hashpassword = await bcrypt.hash(userObj.password, salt)
//         userObj.password = hashpassword
//         const user = await userObj.save()
//         res.json(user)

//     } catch (error) {
//         res.json(error)
//     }
// }



// userController.list = (req, res) => {
//     User.find()
//         .then((user) => {
//             res.json(user)
//         }).catch((err) => {
//             res.json(err)
//         });
// }
// module.exports=userController


// usersController.destroyAccount = (req, res) => {
    //     const id = req.user.id;
    //     const body = req.body;
    
    //     User.findById(id)
    //         .then((userObj) => {
    //             return bcrypt.compare(body.password, userObj.password).then((compare) => {
    //                 if (compare) {
    //                     const deleteUser = User.findByIdAndDelete(id);
    //                     const categories = Category.deleteMany({ userId: id });
    //                     const expense = Expense.deleteMany({ userId: id });
    
    //                     return Promise.all([deleteUser, categories, expense]).then((deleteAll) => {
    //                         res.json(deleteAll);
    //                     });
    //                 } else {
    //                     res.json({
    //                         error: "Enter a valid password",
    //                     });
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             res.json(error);
    //         });
    // };

    // userController.login = (req, res) => {
//     const body = req.body;

//     User.findOne({ email: body.email })
//         .then((userObj) => {
//             if (userObj) {
//                 return bcrypt.compare(body.password, userObj.password).then((match) => {
//                     if (match) {
//                         const tokenData = {
//                             id: userObj._id,
//                             name: userObj.profile.username
                            
//                         };
//                         const token = jwt.sign(tokenData, process.env.SECRECTKEY);
//                         console.log(token)
//                         res.json({
//                             token: `Bearer ${token}`,
//                         });
//                     } else {
//                         res.json({
//                             errors: "Invalid Email or Password",
//                         });
//                     }
//                 });
//             } else {
//                 res.json({
//                     errors: "Invalid Email or Password",
//                 });
//             }
//         })
//         .catch((error) => {
//             res.json(error);
//         });
// };


// userController.register = (req, res) => {
//     const body = req.body;
//     const userObj = new User(body);

//     bcrypt.genSalt()
//         .then((salt) => bcrypt.hash(body.password, salt))
//         .then((hashPassword) => {
//             userObj.password = hashPassword;
//             return userObj.save();
//         })
//         .then((user) => {
//             if (user) {
//                 res.json(user);
//             } else {
//                 res.json({});
//             }
//         })
//         .catch((error) => {
//             res.json(error);
//         });
// };
