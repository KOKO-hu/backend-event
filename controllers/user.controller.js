const User = require("../models/user.model");
const authToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFYSID;
const accountSid = process.env.YOUR_TWILIO_ACCOUNT_SID;
const _phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const bcrypt = require("bcrypt");
const multer = require("multer");
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");

const code_verified = async (req, res) => {
/*   const { phoneNumber } = req.body;
  console.log(phoneNumber); */
  const userId = req.auth.userId;
  const verificationCode = generateVerificationCode();
  try {
    const utilisateurModifie = await User.findByIdAndUpdate(
      userId,
      { code: verificationCode },
      { new: true }
    );
    res.json({ success: true, user:utilisateurModifie });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
    res.status(500).json({ error: "Failed to update user" });
  }
  /*   if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
  
    const verificationCode = generateVerificationCode();
  
    client.messages
      .create({
        body: `Votre code de vérification est : ${verificationCode}`,
        from: _phoneNumber,
        to: phoneNumber
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error sending verification code:', error);
        res.status(500).json({ error: 'Failed to send verification code' });
      }); */
};
const get_code_berified = async (req, res) => {

  const userId = req.auth.userId;
  try {
    const utilisateur = await User.findById(userId);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({ user:utilisateur });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
}
const Create_user = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        localisation: req.body.localisation,
        imageUrl: req.file.filename,
        background: req.body.background,
      });

      user
        .save()
        .then(() => {
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(201).json({ token: token, message: "Utilisateur créé !" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000);
}
module.exports = {
  code_verified,
  Create_user,
  get_code_berified
};
