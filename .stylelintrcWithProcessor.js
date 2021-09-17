const stylelintrc = require('./.stylelintrc.js')

module.exports = {
  processors: ['stylelint-processor-styled-components'],
  ...stylelintrc,
}
