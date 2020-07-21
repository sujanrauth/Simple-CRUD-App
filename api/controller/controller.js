const model = require('../model/CRUDmodel');

function Testfun(req){
    if(req.body.Symptoms == "Yes" && req.body.incontact == "Y" ){

        return "Y";
    }
    else{
          
        return "N";
    }
}

exports.createRecord = async function (req,res,next){
    
    const corona = await Testfun(req);
    console.log(corona);
    
    const record = new model({ 
        name : req.body.name,
        Symptoms : req.body.Symptoms,
        conditions: req.body.conditions,
        intravel :req.body.intravel,
        incontact: req.body.incontact,
        location : req.body.location,
        phone :req.body.phone,
        covid: corona
    });
    record.save((err)=>{
        if(err)
        {res.json({
            message:err
        });
        }
        else{
            res.json({
                message:"Inserted into the database"
            })
        }
    });
}

exports.getNumber = function (req, res, next){
    
    const corona = "Y"
    model.find({location: req.body.location, covid:corona}).exec((err,data)=>{
        if (err){
            res.json({
                message:err
            });
        }
        else{
            res.json({
                Total_inArea:data.length
            })
        }
})
}

exports.updates = async function(req, res, next){

    const corona = await Testfun(req);

    model.update({name:req.body.orname,phone:req.body.orphone},{
        Symptoms : req.body.Symptoms,
        conditions: req.body.conditions,
        intravel :req.body.intravel,
        incontact: req.body.incontact,
        covid: corona
    }).exec((err,data)=>{
        if(err)
        {
            res.json({message:err});
        }
        else{
            res.json({message:"Data Updated"});
        }
    });
}

exports.get_Allinloc= function(req,res,next){
    model.find({location:req.body.location}).exec()
    .then(result=>{
        res.json({
            count:result.length,
            details:result
        });
    })
    .catch(err=>{
        res.json({error:err});
    });
}

exports.removeone = (req,res,next)=>{
    model.remove({name:req.body.name,phone:req.body.phone}).exec()
    .then(result=>{
        res.json({
            message:"record deleted",
            record:result
        });
    })
    .catch(err=>{
        res.json({error:err});
    })
}
