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

