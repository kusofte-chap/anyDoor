const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const Handlebars = require('handlebars')
const config = require('../config/defaultConfig')
const mimeType = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isfresh = require('./cache')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const soure = fs.readFileSync(tplPath)
const template = Handlebars.compile(soure.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    const contentType = mimeType(filePath)

    if (stats.isFile()) {
      let rs
      let { code, start, end } = range(stat.size, req, res)
      res.setHeader('Content-Type', contentType)

      if (isfresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      if (code === 200) {
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      } else if (code === 206) {
        res.statusCode = 206
        rs = fs.createReadStream(filePath, { start, end })
      }

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
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}
