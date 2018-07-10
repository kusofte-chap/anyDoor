const http = require('http')
const chalk = require('chalk')
const path = require('path')
const conf = require('./config/defaultConfig')
const route = require('./helper/route')

const server = http.createServer((req, res) => {
  let filePath = path.join(conf.pwd, req.url)
  route(req, res, filePath)
})

server.listen(conf.port, conf.hostname, () => {
  let address = `http:${conf.hostname}:${conf.port}`
  console.info(`Server startd at ${chalk.green(address)}`)
})
