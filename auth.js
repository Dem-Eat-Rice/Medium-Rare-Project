const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const { User } = require('./db/models');
const { jwtConfig } = require('./config');
const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
    const userDataForToken = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(
        { data: userDataForToken },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );

    return token;
}

module.exports = { getUserToken, requireAuth };