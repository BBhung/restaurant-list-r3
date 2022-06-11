const express = require('express')
const router = express.Router()

// 引用路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurant')
const search = require('./modules/search')

// 設定路由
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

// 匯出路由器
module.exports = router