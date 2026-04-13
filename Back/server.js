const express = require("express")
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
const routerMovies = require("./routes/movie-route")

app.use(routerMovies)

app.get('/test',(req,res)=>{
    res.send("the Server is working")
})



app.listen(port,()=> {
   console.log(`The server is lisiting on port ${port}`)
})