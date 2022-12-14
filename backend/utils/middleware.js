/********** Helper function that extracts refresh-value from the request **********/
const refreshExtractor = (req, res, next) => {
  let refresh = false
  if(req.body.refresh){
    if(req.body.refresh === 'true'){
      refresh = true
    }
  }
  req.refresh = refresh
  next()
}


module.exports = {
  refreshExtractor
}