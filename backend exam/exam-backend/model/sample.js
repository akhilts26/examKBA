import { Schema,model } from "mongoose"


const signupSchema = new Schema({
    userName : {type:String,required:true,unique:true} ,
    firstName : {type:String,required:true}  ,
    lastName : {type:String,require:true} ,
    role : {type:String,require:true,enum:['user']} ,
    password : {type:String,require:true}
})
const sampleSignup = model('signup',signupSchema)

const movieSchema = new Schema({
    movieName :{type:String,required:true,unique:true} ,
    language : {type:String,required:true},
    year : {type:Number,required:true},
    category :String
})
const smapleMovie = model('movie',movieSchema)

const reviewSchema = new Schema({
    movieName :{type:String,required:true,unique:true},
    review : {type:String,required:true}
})
const sampleReview = model('review',reviewSchema)

export {sampleSignup,smapleMovie,sampleReview}








