import { Router } from "express";
import { sampleReview, smapleMovie } from "../model/sample.js";




const user = Router()



user.post('/addMovie',async (req ,res )=>{
    try{
        const {MovieName ,Language ,Year ,Category } = req.body
        const result = await smapleMovie.findOne({movieName:MovieName})
        if(result){
            console.log('Movie already exist.');
            res.status(401).json({msg:'Movie already exist.' })
        }else{
            const newMovie = new smapleMovie({
                movieName: MovieName,
                language : Language,
                year : Year,
                category: Category
            })
            await newMovie.save()
            console.log('Movie details added succsfully');
            res.status(201).json({msg :'Movie details added succsfully'})
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

user.post('/addReview', async (req ,res )=>{
    try{
        const {MovieName,Review} = req.body
        const result = await smapleMovie.findOne({movieName:MovieName})
        if(!result){
            console.log("Invalid movie Name");
            res.status(404).json({msg :"Invalid movie Name"})
        }else{
            const reviewResult = await sampleReview.findOne({movieName:MovieName})
            if(reviewResult){
                reviewResult.review = Review
                await reviewResult.save()
                console.log("latest review added");
                res.status(201).json({msg : "latest review added" })
            }else{
                const newReview = new sampleReview({
                    movieName : MovieName,
                    review : Review
                })
                await newReview.save()
                console.log("new Review Addedd");
                res.status(201).json({msg : "new Review Addedd"}) 
            }
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

user.put('/updateReview',async (req ,res )=>{
    try{
        const {MovieName,Review} = req.body
        const result = await sampleReview.findOne({movieName:MovieName})
        if(!result){
            console.log("Invalid movie Name");
            res.status(404).json({msg :"Invalid movie Name"})
        }else{
            const reviewResult = await sampleReview.findOne({movieName:MovieName})
            if(reviewResult){
                reviewResult.review = Review
                await reviewResult.save()
                console.log("review updated");
                res.status(201).json({msg : "review updated" })
            }else{
                console.log('no review added previously for update');
                res.status(400).json({mag: "no review added previously for update"})
            }
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

user.get('/listMovie',async (req ,res )=>{
    try{
        const result = await smapleMovie.find()
        if(result){
            console.log('movie Names :');
            result.forEach((val)=>{
                console.log(val.movieName);
            })
            res.status(200).json({msg : "displaying movie names"})
        }else{
            console.log("empty movie list");
            res.status(404).json({msg :"empty movie list"})
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

user.get('/showReview',async (req ,res )=>{
    try{
        const {MovieName} = req.body
        const result = await smapleMovie.findOne({movieName:MovieName})
        if(result){
            const reviewResult = await sampleReview.findOne({movieName:MovieName})
            if(reviewResult){
                console.log('Review :');
                console.log(reviewResult.review);
                res.status(200).json({msg :'displaying review'})
            }else{
                console.log('empty movie review');
                res.status(404).json({msg : "empty movie review"})
            }
        }else{
            console.log('Invalid movie name');
            res.status(404).json({msg :'Invalid movie name'})
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})

user.delete('/deleteReview',async (req ,res )=>{
    try{
        const {MovieName} = req.body
        const result = await smapleMovie.findOne({movieName:MovieName})
        if(result){
            const reviewResult = await sampleReview.findOne({movieName:MovieName})
            if(reviewResult){
                await sampleReview.deleteOne({movieName:MovieName})
                console.log('review deleted');
                res.status(200).json({msg :"review deleted"})
            }else{
                console.log('empty movie review');
                res.status(404).json({msg : "empty movie review"})
            }
        }else{
            console.log('Invalid movie name');
            res.status(404).json({msg :'Invalid movie name'})
        }
    }catch(err){
        console.log(err);
        res.status(404).json({msg : "something went wrong.."})
        
    }
})



export default user








