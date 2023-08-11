const Expense = require('../models/expense')
const expenseController ={}

// expenseController.listAll=(req,res)=>{
//     const userId =req.user.id
//     Expense.find({userId:userId})
//     .then((expense) => {
//         res.json(expense)     
//     }).catch((err) => {
//         res.json(err)
//     });
// }


// expenseController.listAll = (req, res) => {
//     const userId = req.user.id;
//     const { type } = req.query;
//     let expenses;
//     let query = { userId: userId };

//     if (type == "alive") {
//         query.isDeleted = false;
//     } else if (type == "deleted") {
//         query.isDeleted = true;
//     }

//     Expense.find(query)
//         .then((result) => {
//             expenses = result;
//             if (expenses) {
//                 res.json(expenses);
//             } else {
//                 res.json([]);
//             }
//         })
//         .catch((error) => {
//             res.json(error);
//         });
// };

expenseController.listAll = async (req, res) => {
    try {
        const userId = req.user.id
        const { type } = req.query
        let expenses
        if (type == "alive") {
            expenses = await Expense.find({ userId: userId, isDeleted: false })
        } else if (type == "deleted") {
            expenses = await Expense.find({ userId: userId, isDeleted: true })
        }
        if (expenses) {
            res.json(expenses)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

expenseController.create = (req, res) => {
    const userId = req.user.id;
    const body = req.body;
    const categoryId = req.params.categoryId;

    Expense.create({ ...body, userId: userId, categoryId: categoryId })
        .then((expense) => {
            if (expense) {
                res.json(expense);
            } else {
                res.json({});
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

expenseController.update = (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    Expense.findOneAndUpdate({ _id: id, userId: userId }, body, { new: true, runValidators: true })
        .then((updatedExpense) => {
            if (updatedExpense) {
                res.json(updatedExpense);
            } else {
                res.json({});
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

// expenseController.destroy=(req,res)=>{
//     const {id}=req.params
//     Expense.findByIdAndDelete(id)
//         .then((expense)=>{
//             if(expense){
//                 res.json(expense)
//             }else{
//                 res.json({})
//             }
//         }).catch((err)=>{
//             res.json(err)
//         })
// }

expenseController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id

        const { type } = req.query
        let expense
        if (type == "delete") {
            expense = await Expense.findOneAndUpdate({ _id: id, userId: userId }, { isDeleted: true }, { new: true, runValidators: true })
        }
        else if (type == "undo") {
            expense = await Expense.findOneAndUpdate({ _id: id, userId: userId }, { isDeleted: false }, { new: true, runValidators: true })
        }
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

expenseController.search = (req, res) => {
    const text = req.query.text;
    const id = req.user.id;
    let expenses;
    let query = { userId: id, isDeleted: false };

    if (text && text.length !== 0) {
        query.note = { $regex: text, $options: "i" };
    }

    Expense.find(query)
        .then((result) => {
            expenses = result;
            if (expenses) {
                res.json(expenses);
            } else {
                res.json([]);
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

module.exports = expenseController;





// expenseController.list=(req,res)=>{
//     Expense.find()
//     .then((expense) => {
//         res.json(expense)     
//     }).catch((err) => {
//         res.json(err)
//     });
// }

// expenseController.create = (req, res) => {
//     const expense = new Expense(req.body);
//     expense.save()
//       .then((savedExpense) => {
//         res.json(savedExpense);
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   };

// expenseController.show=(req,res)=>{
//     const { id } = req.params
//     Expense.findById(id)
//         .then((expense) => {
//             if (expense) {
//                 res.json(expense)
//             } else {
//                 res.json({})
//             }
//         }).catch((err) => {
//             res.json(err)
//         });
// }

// expenseController.update=(req,res)=>{
//     const{id}=req.params
//     Expense.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
//         .then((expense)=>{
//            if(expense){
//             res.json(expense)
//            }else{
//             res.json({})
//            }
//         }).catch((err)=>{
//             res.json(err)
//         })

// }



// expenseController.softDelet=(req,res)=>{    
//     const{id}=req.params
//     Expense.findOneAndUpdate({_id:id},{$set:{isDeleted:true}},{new:true,runValidators:true})
//     .then((expense)=>{
//         if(expense){
//             res.json(expense)
//         }else{
//             res.json({})
//         }
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

// module.exports=expenseController


// expensesController.destroyByCategoryId = (req, res) => {
//     const id = req.params.id;
//     const userId = req.user.id;

//     Expense.deleteMany({ categoryId: id })
//         .then((expenses) => {
//             if (expenses) {
//                 res.json(expenses);
//             } else {
//                 res.json([]);
//             }
//         })
//         .catch((error) => {
//             res.json(error);
//         });
// };

