import { Router } from "express";
import { sampleSignup } from "../model/sample.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router()

router.post('/signup',async (req ,res )=>{
    try{
        const {UserName ,FirstName ,LastName ,Role ,Password} = req.body
        const result = await sampleSignup.findOne({userName:UserName})
        if(result){
            console.log('Invalid UserName');
            res.status(400).json({msg :'Invalid UserName'})
        }else{
            const newPassword = await bcrypt.hash(Password,10)
            const newSignup = new sampleSignup({
                userName : UserName,
                firstName : FirstName,
                lastName : LastName,
                role : Role,
                password : newPassword
            })
            await newSignup.save()
            console.log('signup successfully..');
            res.status(201).json({msg :'signup successfully..' })
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

router.post('/login' ,async (req ,res )=>{
    try{
        const {UserName,Password} = req.body
        const result = await sampleSignup.findOne({userName:UserName})
        if(!result){
            console.log('Invalid UserName');
            res.status(404).json({msg : 'Invalid UserName'})
        }else{
            const valid = await bcrypt.compare(Password,result.password)
            if(valid){
                const token = jwt.sign({UserName,Role:result.role},process.env.SCERET_KEY,{expiresIn: "3h"})
                if(token){
                    res.cookie('authToken',token,{
                        httpOnly :true
                    })
                    console.log('successfully logedin..');
                    res.status(200).json({msg : "successfully logedin.."})
                }
            }else{
                console.log("invalid Password");
                res.status(400).json({msg : "invalid Password"})
            }


        }

    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

router.get('/logout' ,(req ,res )=>{
    res.clearCookie('authToken')
    res.status(200).json({msg : "logout successfully.."})
    
})




export default router





