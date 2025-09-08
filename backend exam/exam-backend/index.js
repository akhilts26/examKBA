import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/loginRoutes.js'
import authenticate from './midleware/auth.js'
import userAuth from './midleware/userAuth.js'
import user from './routes/userRoutes.js'


dotenv.config()
const app = express()

app.use(json())
app.use('/',router)
app.use('/user/',authenticate,userAuth,user)

app.listen(process.env.PORT,()=>{
    console.log('server is listening'); 
})

mongoose.connect("mongodb://localhost:27017/movie").then(()=>{
    console.log('database connected successfully');
    
})
.catch(err=>{
    console.log('database connetion error :',err);
    
})





