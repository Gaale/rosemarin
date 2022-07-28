const User = require('../models/User.js');

const authMiddleware = async (req, res, next) => {
    try{
        const uid = req.session.sid;

        if(uid) {
            req.user = await User.findByPk(uid);
            next();
        } else {
            res.status(403);
            res.send('Not authorized');
        }
    } catch(error) {
        console.log(error);
        res.status(401).end();
    }
};

module.exports = authMiddleware;