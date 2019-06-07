const express = require('express');
const router = express.Router();
const bizModel = require('../models/businesses');
const reviewModel = require('../models/reviews');
  

router.get('/', async(req, res, next) => {
    const bizInfo = await bizModel.getAll();
    const reviewInfo = await reviewModel.getAll();

    res.render('main', {
        locals: {
            title: 'Business Directory',
            bizList: bizInfo,
            reviewList: reviewInfo
        },
        partials: {
            partial: 'partial-business'
        }
    });
});

router.post('/', (req,res) => {
    const {title, text_review, business_id} = req.body;

    reviewModel.update(title, text_review, business_id)
    .then(async () => {
        const bizInfo = await bizModel.getOne(business_id);
        const reviewInfo = await reviewModel.getOneFrom();

        res.status(200).render('main', {
            locals: {
                title: 'Business Directory',
                bizList: bizInfo,
                reviewList: reviewInfo
            },
            partials: {
                partial: 'partial-business'
            }
        });
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });

});

module.exports = router;