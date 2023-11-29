const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function AddEmployee(AddModel) {
    const schema = new Schema({
        addedAdminId:{type: String, required: true},
        Name: { type: String, required: true },
        StartDate: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        aadhaar: { type: Number, required: true},
        designation:{type:String,required:true},
        unique_id:{type:String,required:true},
      
        });

    return mongoose.model(AddModel, schema);
}

module.exports = AddEmployee;
