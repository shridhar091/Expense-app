const Category = require('../models/category')
const categoryController={}

categoryController.list = (req, res) => {
    const id = req.user.id;
    console.log(id)
    Category.find({ userId: id })

        .then((categories) => {
            if (categories) {
                res.json(categories);
            } else {
                res.json([]);
            }
        })
        .catch((error) => {
            res.json(error);
        });
};


// categoryController.create = (req, res) => {
//     const category = new Category(req.body);
//     category
//       .save()
//       .then((savedCategory) => {
//         res.json(savedCategory);
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   };
  

categoryController.create = (req, res) => {
    const body = req.body;
    console.log(req.user,'user')
    body.userId = req.user.id;

    const category = new Category(body);
    // category.userId = id;
    category.save()
    
        .then((category) => {
                res.json(category);
        })
        .catch((error) => {
            res.json(error);
        });
};

categoryController.destroy = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    Category.findOneAndDelete({ _id: id, userId: userId })
        .then((category) => {
            if (category) {
                res.json(category);
            } else {
                res.json({});
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

module.exports = categoryController






// categoryController.list=(req,res)=>{
//     Category.find()
//     .then((category) => {
//         res.json(category)
//     }).catch((err) => {
//         res.json(err)
//     });
// }

// categoryController.create = (req, res) => {
//     const category = new Category(req.body);
//     category
//       .save()
//       .then((savedCategory) => {
//         res.json(savedCategory);
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   };
  

// categoryController.show=(req,res)=>{
//     const { id } = req.params
//     Category.findById(id)
//         .then((category) => {
//             if (category) {
//                 res.json(category)
//             } else {
//                 res.json({})
//             }
//         }).catch((err) => {
//             res.json(err)
//         });
// }

// categoryController.update=(req,res)=>{
//     const{id}=req.params
//     Category.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
//     .then((category)=>{
//         if(category){
//             res.json(category)
//         }else{
//             res.json({})
//         }
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

// categoryController.destroy=(req,res)=>{
//     const{id}=req.params
//     Category.findByIdAndDelete(id)
//     .then((category)=>{
//         if(category){
//             res.json(category)
//         }else{
//             res.json({})
//         }
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

// module.exports = categoryController



// categoryController.create=(req,res)=>{
//     console.log(req)
//     Category.save(req.body)
//     .then((category)=>{
//         res.json(category)
//     })
//     .catch((err)=>{
//         res.json(err)
// })