const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']
    console.log(req.header['Auth'],'header')
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env.SECRECTKEY)
            console.log(tokenData,'token data')
            req.user = {
                id: tokenData.id,
                
            }
            next()
        } catch (error) {
            res.json(error.message)
        }
    } else {
        res.json({ error: 'Token Not Found :)' })
    }
}
module.exports = authenticate

// const authenticate=(req,res,next)=>{
//     const token=req.header('Authorization').split(' ')[1]
//     console.log(token)
//     next()
// }

// module.exports={
//     authenticate
// }