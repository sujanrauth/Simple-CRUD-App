const jwt = require('jsonwebtoken');
const JWT_KEY = "hello_there!";

module.exports = (req,res,next)=>{
    try {

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,JWT_KEY);
        next();
    }
    catch(err){
        res.json({message:"Authentication failed"});
    }
}