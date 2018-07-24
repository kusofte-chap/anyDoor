const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const config = require('../config/defaultConfig')
const mimeType = require('./mime')
const compress = require('./compress')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const soure = fs.readFileSync(tplPath)
const template = Handlebars.compile(soure.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    const contentType = mimeType(filePath)
    res.stateCode = 200
    if (stats.isFile()) {
      res.setHeader('Content-Type', contentType)
      let rs = fs.createReadStream(filePath)
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      res.setHeader('Content-Type', 'text/html')
      let files = await readdir(filePath)
      let dir = path.relative(config.root, filePath)
      let data = {
        title: path.basename(dir),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => ({ file }))
      }
      res.end(template(data))
    }
  } catch (err) {
    console.log(err)
    res.stateCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}
