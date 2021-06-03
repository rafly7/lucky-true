const _ = require('lodash')

function uniq(a) {
  const seen = {}
  const out = []
  const len = a.length
  let j = 0
  for (let i = 0; i < len; i++) {
    const item = a[i]
    if (seen[item] !== 1) {
      seen[item] = 1
      out[j++] = item
    }
  }
  return out
}

const a = ['asdsad', '123', 'sdsad\nsdsad', 'ad\nad\nsdsad']
const arrE = []
const arr = a.filter(val => {
  if (val.includes('\n')) {
    const con = val.split('\n')
    uniq(con).forEach(val => {
      arrE.push(val)
    })
  }
  if (!val.includes('\n')) {
    return !val.includes('\n')
  }
})
const bb = ['asd', '123', 'dsd', 'gwgw']
console.log(_.without(bb, ...['123', 'dsd']))