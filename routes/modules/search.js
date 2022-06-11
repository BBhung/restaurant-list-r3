const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant') 

//設定餐廳名字和類別搜尋找到特定的餐廳
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  Restaurant.find()
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
       restaurant => 
       restaurant.name.toLowerCase().includes(keywords.trim().toLowerCase()) ||
       restaurant.category.includes(keywords.trim().toLowerCase())
      )
      res.render('index', {restaurantsData: filterRestaurantsData, keywords})
    })
    .catch(error => console.log(error))
})

module.exports = router