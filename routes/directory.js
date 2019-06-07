const express = require('express');
const router = express.Router();
const bizModel = require('../models/businesses');
  

router.get('/', async(req, res, next) => {
    const bizInfo = await bizModel.getAll();

    res.render('main', {
        locals: {
            title: 'Merry Hill Directory',
            bizList: bizInfo,
        },
        partials: {
            partial: 'partial-listings'
        }
    });
});

router.post('/', (req,res) => {
    const {name, phone, address, type} = req.body;

    bizModel.update(name, phone, address, type)
    .then(async () => {
        const bizInfo = await bizModel.getAll();

        res.status(200).render('main', {
            locals: {
                title: 'Merry Hill Directory',
                bizList: bizInfo
            },
            partials: {
                partial: 'partial-listings'
            }
        });
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });

});

module.exports = router;
