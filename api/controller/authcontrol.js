const auth = require('../model/authmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = "hello_there!";


exports.signup = (req,res,next)=>{
    auth.find({email: req.body.email}).exec().then(user=>{
        if(user.length>=1)
        {
            res.json({
                conflict:"User exists"
            });
        }
        else{

            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.json({
                        error:err
                    });
                }
                else{
                    const newuser= new auth({
                        email:req.body.email,
                        password:hash
                    });
                    newuser.save().then(result=>{
                        res.json({
                            message:{server:"user created",
                        data:result}
                        })
                    }).catch(err=>{
                        res.json({
                            error:err
                        })
                    });
                }
            });
        }
    });  
}

exports.login = (req,res,next)=>{
    auth.find({email:req.body.email}).exec()
    .then(user=>{
            if(user.length<1){
                return res.status(401).json({ message: "Authentication Failed"});
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.json({ message: "Authentication Failed"});
                }
                if(result)
                {
                    const token = jwt.sign({email:user[0].email, _id:user[0]._id},
                                JWT_KEY,
                                {
                                    expiresIn:"1h",
                                }
                            );
                    return res.json({ message : "Authentication success",
                                      token: token});
                }
                res.json({ message: "Authentication Failed"})
            })
    })
    .catch(err=>{
        res.json({error:err});
    })
}

exports.delete = (req,res,next)=>{
    auth.remove({_id:req.params.userId})
    .exec()
    .then(result=>{
        res.json({
            message:{server:"User deleted",
            data:result}
        })
    .catch(err=>{
        res.json({
            error:err
        })
    });
    })
}