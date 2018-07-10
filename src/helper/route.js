const fs = require('fs')
// const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    res.stateCode = 200
    res.setHeader('Content-Type', 'text/plain')

    if (stats.isFile()) {
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      let files = await readdir(filePath)
      res.end(files.join(','))
    }
  } catch (err) {
    console.log(err)
  }
}
