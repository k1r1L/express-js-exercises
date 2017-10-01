const faviconHandler = require('./favicon-handler')
const staticHandler = require('./static-file-handler')
const homeHandler = require('./home-handler')
const addMovieHandler = require('./add-movie-handler')
const viewAllMoviesHandler = require('./view-all-movies-handler')
const movieDetailsHandler = require('./movie-details-handler')

module.exports = [ faviconHandler, addMovieHandler, viewAllMoviesHandler, movieDetailsHandler, homeHandler, staticHandler ]
