const User = require('../models/User.js');

const authMiddleware = async (req, res, next) => {
  try {
    const { sid } = req.session;
    // console.log({ sid });
    if (sid) {
      req.user = await User.findByPk(sid);
      next();
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

module.exports = authMiddleware;
