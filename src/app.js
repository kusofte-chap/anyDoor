const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const conf = require('./config/defaultConfig')

const setResHeader = (res, option) => {
  res.writeHead(option.stateCode, { 'Content-Type': option.type })
  if (option.txt) {
    res.write(option.txt)
  }
}
const server = http.createServer((req, res) => {
  let filePath = path.join(conf.pwd, req.url)
  fs.stat(filePath, (err, stat) => {
    if (err) {
      setResHeader(res, { stateCode: 404, txt: 'can not find file', type: 'text/plain' })
      res.end()
      return
    }
    setResHeader(res, { stateCode: 200, type: 'text/plain' })

    if (stat.isFile()) {
      fs.createReadStream(filePath).pipe(res)
    //   res.end()
    }

    if (stat.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          return
        }
        res.end(files.join(','))
      })
    }
  })
})

server.listen(conf.port, conf.hostname, () => {
  let address = `http:${conf.hostname}:${conf.port}`
  console.info(`Server startd at ${chalk.green(address)}`)
})
