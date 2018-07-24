// function timerout (ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }
// async function asyncPrint (value, ms) {
//   await timerout(ms)
//   console.log(value)
// }
// asyncPrint('hello world', 1000)

// function* f() {
//   for (let i = 0; true, i++) {
//     let reset = yield i
//     if (rest) {
//       i = -1
//     }
//   }
// }

// function * foo (x) {
//   let y = 2 * (yield (x + 1))
//   let z = yield (y / 3)
//   return (x + y + z)
// }
// let a = foo(5)
// console.log(a.next().value)
// console.log(a.next(12).value)
// console.log(a.next(13).value)

// function * dataConsumer () {
//   console.log('Started')
//   console.log(`1. ${yield}`)
//   console.log(`2. ${yield}`)
//   return 'result'
// }

// let genObj = dataConsumer()
// genObj.next()
// // Started
// console.log(genObj.next('a').value)
// // 1. a
// console.log(genObj.next('b').value)

// const stats = function asyncFn () {
//   return new Promise()
// }
// stats().then(function (data) {
//   console.log(data)
// }, function (error) {
//   console.log(error)
// })

// function timeout (ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done')
//   })
// }
// timeout(100).then(value => {
//   console.log(value)
// })

// const getJson = function (url) {
//   const promise = new Promise(function (resolve, reject) {
//     const handler = function () {
//       if (this.readyState !== 4) {
//         return
//       }
//       if (this.status === 200) {
//         resolve(this.response)
//       } else {
//         reject(new Error('this.statusText'))
//       }
//     }

//     const client = new XMLHttpRequest()
//     client.open('get', url)
//     client.onreadystatechange = handler
//     client.resposeType = 'json'
//     client.setRequestHeader('Accept', 'application/json')
//     client.send()
//   })
//   return promise
// }

// getJson('/url').then(function (json) {
//   console.log(json)
// })

// const promise = new Promise(function (resolve, reject) {
//   if (success) {
//     // do something
//     resolve(data)
//   }
//   if (errpr) {
//     // do error something
//     reject(new Error())
//   }
// })

// promise().then((data) => {
//   // 接受执行成功后的方法
//   do (data)
// }, (error) => {
//     do (data)
// })

// const p1 = new Promise()
// const p2 = new Promise()

// Promise.all([p1, p2]).then(function (data)=> {
//   resolve(data)
// }).catch(err){
//   console.log(err)
// }
// const p = new Promise(function (resolve, reject) {
//   setTimeout(resolve, 1000)
// })

// async function getStockPriceByName (name) {
//   const symbol = await p
//   console.log(1)
//   return 'stockPrice'
// }

// getStockPriceByName().then(function (result) {
//   console.log(result)
// })

// async function getUrl(urls) {
//   let response = []
//   let i = 0
//   for (let item of urls) {
//     response[i] = await fetch(item).then((data) => {
//       return data
//     }).catch((e) => {
//       console.log(e)
//     })
//   }
//   return response
// }
