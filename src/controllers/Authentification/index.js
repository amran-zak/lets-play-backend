const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = require('../../models/users');


exports.signUp = async (req, res, next) => {
    try {
        const data = req.body;
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


