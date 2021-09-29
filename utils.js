const e = require("express");
const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let numsFromStr = strNums.map(n => Number(n))
  
  for(let num of numsFromStr){
    if (num === NaN){
      throw new BadRequestError()
    }
  }
  return numsFromStr
}


module.exports = { convertStrNums };