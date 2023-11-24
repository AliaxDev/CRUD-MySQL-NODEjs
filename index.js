const app = require('./src/app.js')
const { port } = require('./src/config.js')

app.listen(port, (req, res) => {
    console.log(`Server listen in http://localhost:${port}`)
})