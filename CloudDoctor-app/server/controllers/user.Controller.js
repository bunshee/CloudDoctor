const User = require("../models/user.Model");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

exports.register = async (req, res, next) => {
  const {
    email,
    motDePasse,
    reMotDePasse,
    cin,
    dateDeNaissance,
    location,
    nom,
    prenom,
    sexe,
    specialite,
    role,
    numero,
    desc,
  } = req.body;

  let spec = true;
  if (role==="Médecin" && !specialite) 
    spec = false;
  try {
    if (
      !email ||
      !motDePasse ||
      !reMotDePasse ||
      !cin ||
      !dateDeNaissance ||
      !location ||
      !nom ||
      !prenom ||
      !sexe ||
      !spec
    )
      return res
        .status(400)
        .json({
           errorMessage: "Remplir tous les champs s'il vous plais" 
          });
    const existingUserCIN = await User.findOne({ cin: cin });
    if (existingUserCIN)
      return res
      .status(400)
      .json({
        errorMessage: "Cette identité est deja utilisé",
        success: false,
      });
    if (cin.length!==8 || isNaN(cin))
      return res.status(400).json({
        errorMessage: "CIN incorrect",
        success: false,
      });
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail)
      return res.status(400).json({
        errorMessage: "Ce email est deja utilisé",
        success: false,
      });
    if (motDePasse != reMotDePasse)
      return res
        .status(400)
        .json({ errorMessage: "Les mot de passe ne sont pas identique" });

    const newUser = new User({
      cin,
      dateDeNaissance,
      location,
      nom,
      prenom,
      sexe,
      specialite,
      email,
      motDePasse,
      role,
      numero,
      desc,
    });

    await newUser.save();

    sendToken(newUser, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.login = async (req, res, next) => {
  const { email, motDePasse } = req.body;
  try {
    if (email == "" || motDePasse == "") {
      return res.status(400).json({
        errorMessage: "Il faut remplir tout les champs, Merci",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (!existingUser)
      return res.status(400).json({
        errorMessage: "Email ou mot de passe incorrect",
      });
    const passCorrect = await bcrypt.compare(
      motDePasse,
      existingUser.motDePasse
    );
    console.log(passCorrect);
    if (!passCorrect)
      return res.status(400).json({
        errorMessage: "Email ou mot de passe incorrect",
      });
    sendToken(existingUser, 200, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.update = async (req, res, next) => {
  const  {numero, desc,cin} = req.body;
  try{
    if (!numero || !desc)  {
      res.
      status(400).json({succes:false,errorMessage:"Il faut remplir tout les champs, Merci"})
    }

  const Det = await User.findOneAndUpdate({ cin: cin },{numero:numero, desc:desc});
  if (!Det)
    {res.status(404).send("data is not found");}

    res.status(200).json({success :  true})
  } 
 catch (err) {
  console.error(err);
  res.status(500).json({ success: false });
}
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
