module.exports = (totalSize, req, res) => {
  let range = req.headers['range']
  if (!range) {
    return { code: 200 }
  }
  const size = range.match(/bytes=(\d*)-(\d*)/)
  const end = size[2] ? parseInt(size[2]) : totalSize - 1
  const start = size[1] ? parseInt(size[1]) : totalSize - end

  if (end > totalSize || start < 0 || start > end) {
    return { code: 200 }
  }

  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Ranges', `bytes-${start}-${end}/${totalSize}`)
  res.setHeader('Content-Length', end - start)
  return {code: 206, start, end}
}
