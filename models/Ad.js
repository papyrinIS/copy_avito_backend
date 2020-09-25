

const{Schema,model,Types}=require('mongoose')


const schema=Schema({
    title:{type:String,required:true},
    userId:{type:String,required:true},
    userName:{type:String,required:true},
    address:{type:String,required: true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    date:{type:String,required:true},
    photo:{type:String,required:true}
})



module.exports = model('ad', schema)