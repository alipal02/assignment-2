const express = require("express")

const {getMovies,saveMovies} = require("../function/readAndWriteFunction")
const router = express.Router()

router.get('/movies',(req,res)=> {
    try{
        const dataMovies = getMovies()
        return res.status(200).send(dataMovies)
    }
    catch(err) {
        return res.status(400).send(err.message)
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

///////////////////////////////////POST//////////////////////////////////////////
router.post('/movies',(req,res)=>{
    try {
        const reqBody = req.body
        const dataMovies = getMovies()
        const exists = typeof reqBody.title ==="string" && typeof reqBody.description==="string" 
                       && !isNaN(reqBody.year)

          const generateId = (dataMovies) => {
             const validId = dataMovies
                .map(movie => Number(movie.id))
                .filter(id => !isNaN(id))

              return validId.length ? Math.max(...validId) + 1 : 1
            }               

            const duplicatedData = dataMovies.filter((obj)=>{
                return obj.title === reqBody.title
            })
            
            if(duplicatedData.length===0){
                if(exists) {
                    const newMovie = {
                        id:generateId(dataMovies),
                        ...reqBody,
                        year: Number(reqBody.year)
                    } 
                    dataMovies.push(newMovie)
                    saveMovies(dataMovies)
                    return res.status(201).send(newMovie)   
                }
            }
        return res.status(400).send("The film is found!")
        
    }
    catch(err) {
        res.status(500).send(err.message)
    }
})

//////////////////////////////////////PATCH//////////////////////////////////////////
router.patch('/movies/:id',(req, res)=>{

    try {
            const _id = parseInt(req.params.id)
            const dataMovies = getMovies()
            const reqBody = req.body
            

            const indexMovie = dataMovies.findIndex(movie => movie.id === _id)

            if(indexMovie === -1) {
                return res.status(400).send("Movie is not found!!")
            }
            if(!reqBody.title) {
                return res.status(400).send("the title is required!")
                
            }
            if(!reqBody.description) {
                return res.status(400).send("the description is required!")
                
            } 
            if(isNaN(reqBody.year)){
                return res.status(400).send("the year is must number!")
            }
            
            dataMovies[indexMovie] = {
                ...dataMovies[indexMovie],
                ...reqBody
            }
             saveMovies(dataMovies)
             return res.status(200).send(dataMovies[indexMovie])

        } catch (err) {
            return res.status(400).send(err.message)
        }
})

////////////////////////////////////////DELETE////////////////////////////////// 

router.delete('/movies/:id',(req, res)=>{

    try {
            const _id = parseInt(req.params.id)
            const dataMovies = getMovies()

            const deleteMovie = dataMovies.filter((movie) => {
                return movie.id !== _id
            })

            saveMovies(deleteMovie)

            return res.status(200).send(deleteMovie)

        } catch (err) {
           return res.status(500).send(err.message)
    }
})

router.get('/movies/search=/:title',(req,res)=>{
    try{
        const title = req.params.title
        const dataMovies = getMovies()
        const data = dataMovies.filter(movie => movie.title === title)     
        if(data) {  
            res.status(200).send(data)
        }
     } catch(err){
          res.status(400).send(err.message)
    }
})

router.get('/movies/limit=/:num',(req,res)=>{

    try{
        const num = parseInt(req.params.num)
        const dataMovies = getMovies()
        const result= []
        if(num<=0) {
            return res.status(400).send("the num is invalid")
        }
        for(let movie = 0 ; movie<=num ; movie++){
            result.push(dataMovies[movie])  
        }
        return res.send(result)
    
        }catch(err){
          res.status(400).send(err.message)
    }

})


module.exports=router