const fs = require('fs')
const path = require('path')
const subsetFont = require('subset-font')

const cookieFont = path.join(__dirname, 'fontSources', 'cookie.ttf')
const fontBuffer = fs.readFileSync(cookieFont)

const cookieFontSubsetted = path.join(__dirname, 'public', 'cookieSubset.ttf')

subsetFont(fontBuffer, 'Gitstagram', {
  targetFormat: 'woff',
}).then((subsetBuffer) => {
  fs.writeFileSync(cookieFontSubsetted, subsetBuffer)
})
