const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createUser }