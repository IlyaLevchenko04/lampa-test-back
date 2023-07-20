const { User } = require('../schemas/userSchemas/userSchema');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { auth };
