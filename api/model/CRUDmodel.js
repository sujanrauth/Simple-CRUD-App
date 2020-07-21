const mongoose = require('mongoose');

const CRUDSchema = new mongoose.Schema({
    name : { type :String, required :true },
    Symptoms : { type: String, required :true },
    conditions: { type : String , required : true },
    intravel : { type: String, required : true },
    incontact: { type :String, required : true },
    location : { type :String, required : true },
    phone : { type : Number , required: true},
    covid: { type : String , required : true }
});

module.exports = mongoose.model("CRUDop",CRUDSchema);