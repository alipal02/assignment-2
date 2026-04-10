const fs = require('fs')

const getMovies = () => {
  return JSON.parse(fs.readFileSync('movies-db.json', 'utf-8'))
}

const saveMovies = (movies) => {
  fs.writeFileSync('movies-db.json', JSON.stringify(movies, null, 3))
}
module.exports = { 
    getMovies, 
    saveMovies 
}

