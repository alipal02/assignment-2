const express = require("express")

const {getMovies,saveMovies} = require("../function/readAndWriteFunction")
const router = express.Router()

router.get('/movies',(req,res)=> {
    try{
        const data = getMovies()
        // console.log(data)
        return res.status(200).send(data)
    }
    catch(err) {
        return res.status(400).send(err.message)
    }
})

router.get('/movies/:id',(req,res)=>{
    try{  
        const _id = req.params.id
        const data = getMovies().find(movie => movie.id === parseInt(_id))
        if(data){
            return res.status(200).send(data)
        }

        res.status(404).send("the movie is not found")       
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})

///////////////////////////////////POST//////////////////////////////////////////
router.post('/movies',(req,res)=>{
    try {
        const reqBody = req.body
        const movies = getMovies()
        const exists = typeof reqBody.title ==="string" && typeof reqBody.description==="string" 
                       && !isNaN(reqBody.year)

        const generateId = (movies) => {
            const validId = movies
                .map(movie => Number(movie.id))
                .filter(id => !isNaN(id))

            return validId.length ? Math.max(...validId) + 1 : 1
            }               

        const duplicatedData = movies.filter((obj)=>{
                return obj.title === reqBody.title
        })

        if(duplicatedData.length===0){
            if(exists) {
                const newMovie = {
                    id:generateId(movies),
                    ...reqBody,
                    year: Number(reqBody.year)
                } 
                movies.push(newMovie)
                saveMovies(movies)
                return res.status(201).send(newMovie)   
            }
        }
        
        return res.status(400).send("the entered data is invalid!")
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})

router.patch('/movies/:id',async(req,res)=>{
    try{
    const _id = req.params.id
    const data = await getMovies()
    if({_id:data.id}) {
        res.status(200).send()
    }
    } catch(err){
        res.status(500).send(err.message)
    }
})


module.exports=router