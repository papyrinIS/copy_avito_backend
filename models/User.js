const{Schema,model}=require('mongoose')


const schema=Schema({
    login:{type:String,required:true,unique:true},
    password:{type:String,required: true},
    userName:{type:String}
})



module.exports = model('user', schema)