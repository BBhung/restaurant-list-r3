const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/Restaurant') 

//設定新增路由
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//設定每個餐廳資訊
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render('detail', { restaurantsData }))
    .catch(error => console.log(error))
})

//編輯餐廳資訊
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render('edit', { restaurantsData }))
    .catch(error => console.log(error))
})

//更新餐廳資訊
router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.findById(id)
    .then(restaurantsData => {
      restaurantsData.name = body.name
      restaurantsData.name_en = body.name_en
      restaurantsData.category = body.category
      restaurantsData.image = body.image
      restaurantsData.location = body.location
      restaurantsData.phone = body.phone
      restaurantsData.google_map = body.google_map
      restaurantsData.rating = body.rating
      restaurantsData.description = ody.description
      return restaurantsData.save()
    })
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//刪掉餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurantsData => restaurantsData.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router