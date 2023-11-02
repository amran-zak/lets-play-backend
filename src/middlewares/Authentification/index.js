const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/users');

// Middleware pour vérifier si l'email ou le username existe déjà
exports.checkExistingUser = async (req, res, next) => {
    try {
        const { email, userName } = req.body;

        // Vérifiez si l'email existe déjà dans la base de données
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Vérifiez si le nom d'utilisateur existe déjà dans la base de données
        const existingUsername = await User.findOne({ userName });

        if (existingUsername) {
            return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
        }

        // Si ni l'email ni le nom d'utilisateur n'existent, passez à l'étape suivante
        next();
    } catch (error) {
        next(error);
    }
};

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
        res.status(401).send({ message: 'Le token d\'authentification est invalide.' });
    }
}

