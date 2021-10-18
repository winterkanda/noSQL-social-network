const errorHandler = (err,req,res,next) => {
    res.status(res.statusCode)
    res.json({message: err.message})
}

module.exports = {errorHandler};