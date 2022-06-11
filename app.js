//載入express
const express = require('express') 
const port = 3000
const app = express()

//載入express-handlebars 樣本引擎
const exphbs = require('express-handlebars') 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 引用 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//載入method-override
const methodOverride = require('method-override') 
app.use(methodOverride('_method'))

const routes = require('./routes')
require('./config/mongoose')

//設定靜態檔案
app.use(express.static('public')) 

//將request導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})