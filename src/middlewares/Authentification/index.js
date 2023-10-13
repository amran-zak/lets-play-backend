const jwt = require('jsonwebtoken');

const User = require('../../models/users');

exports.verifyTokenAuth = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTH);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('Aucun utilisateur trouvé avec ce token');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Authentification échouée' });
    }
}