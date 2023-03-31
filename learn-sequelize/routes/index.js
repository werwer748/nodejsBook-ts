const express = require('express');
const { sequelize } = require('../models');
const User = require('../models/user');


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        //* 시퀄라이즈 기본
        // const users = await User.findAll();
        //* 시퀄라이브에서 쿼리 사용
        const [users, metadata] = await sequelize.query('select * from users');
        // console.log('???', users);
        res.render('sequelize', { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;