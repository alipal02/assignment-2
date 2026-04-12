const express = require("express")

const {getMovies,saveMovies} = require("../function/readAndWriteFunction")
const router = express.Router()

router.get('/movies',(req,res)=> {
    try{
        const dataMovies = getMovies()
        return res.status(200).send(dataMovies)
    }
    catch(err) {
        return res.status(500).send(err.message)
    }
})

// ////////////////////////////GET/:ID//////////////////////////////////////////    

router.get('/movies/:id',(req,res)=>{
    try{  
        const _id = req.params.id
        const dataMovie = getMovies().find(movie => movie.id === parseInt(_id))
        if(dataMovie){
            return res.status(200).send(dataMovie)
        }

        res.status(404).send("the movie is not found")       
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})


module.exports=router