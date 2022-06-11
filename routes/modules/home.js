const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant') 

//設定首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => console.log(err))
})

//設定排序
router.get('/sort', (req, res) => {
  const sort = req.query.sort
  const sortMethod = {
    name_asc: { name_en: 'asc' },
    name_desc: { name_en: 'desc' },
    category_asc: { category: 'asc' },
    location_asc: { location: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortMethod[sort])
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => console.log(err))
})

module.exports = router