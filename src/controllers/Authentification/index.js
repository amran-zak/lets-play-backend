const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../../models/users');


exports.signUp = async (req, res, next) => {
    try {
        let data = req.body;
        const user = new User(data);
        await user.save();
        res.status(201).send({ message: 'Inscription réussie!' });
    } catch (error) {
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'L\'email ou mot de passe incorrect' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_AUTH, { expiresIn: '1h' });
        res.send({ message: 'Connexion réussie', token });
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
        next(error);
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const user = req.user;
        const data = {
            ...req.body
        }
        await User.findByIdAndUpdate(
            user._id, 
            data, 
            { runValidators: true, /* Exécuter les validateurs du modèle lors de la mise à jour*/ }
        );
        
        return res.status(201).send({ message: 'Modification réussie!' });
    } catch (err) {
        if (err.codeName === 'DuplicateKey') {
            return res.status(409).send({ message: 'Cet email ou Ce nom d\'utilisateur est déjà utilisé.'});
        } else {
            return res.status(500).send({message : err.message});
        }
        
    }
};
