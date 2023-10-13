function errorMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ message: 'Une erreur serveur est survenue!' });
}

module.exports = errorMiddleware;