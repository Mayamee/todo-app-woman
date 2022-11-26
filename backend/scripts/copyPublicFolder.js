const copyfiles = require('copyfiles')
const mkdirp = require('mkdirp')

copyfiles([`app/public/**/*`, 'build/app'], { up: 1, error: true }, (err) => {
  if (err) {
    console.info('Problem copying public folder content:', err.message)
    mkdirp('build/app/public')
      .then(() => {
        console.info('Public folder created in build/app.')
      })
      .catch((err) => {
        console.info('Problem creating public folder in build/app', err.message, '\n')
      })
    return
  }
  console.info('Backend public content copied.')
})
