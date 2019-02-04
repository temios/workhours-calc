const randomstring = require('randomstring')

const stringHelper = {}

/**
 * Find object in array where field equals needle
 * @param needle
 * @param arr
 * @param field
 * @returns {index|*|number|BigInt|T}
 */
stringHelper.findStringInArray = (needle, arr, field) => {
  const modifyNeedle = needle.toLowerCase().trim()
  return arr.find(item => {
    return item[field].toLowerCase().trim() === modifyNeedle
  })
}

/**
 * Generate random name with old extension
 * @param pictureName
 * @returns {string}
 */
stringHelper.generatePictureName = (pictureName) => {
  return randomstring.generate(32) + '.' + pictureName.split('.').pop()
}

module.exports.stringHelper = stringHelper