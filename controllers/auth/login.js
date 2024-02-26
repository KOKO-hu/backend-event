const User = require("../../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
const logout = (req, res) => {
    // Vous pouvez simplement renvoyer une réponse vide
    // ou inclure un message pour indiquer que l'utilisateur est déconnecté.
    res.status(200).json({ message: 'Déconnexion réussie.' });
    
};
module.exports = {
    login,
    logout
  };