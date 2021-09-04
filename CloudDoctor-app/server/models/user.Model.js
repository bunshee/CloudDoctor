const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
  cin: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  dateDeNaissance: {
    type: Date,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  location: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  nom: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  prenom: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  sexe: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  specialite: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
    unique: [true, "Email Utilisé"],
    validate: [isEmail, "Entrer un email valide"],
  },
  motDePasse: {
    type: String,
    required: [true, "Remplir tous les champs s'il vous plais"],
  },
  role: {
    type:String,
  },
  numero: {
    type:String,
  },
  desc: {
    type:String,
  },
  // image: {
  //   data: Buffer,
  //   contentType: String ,
  // }
});

usersSchema.pre("save", async function (next) {

  const salt = await bcrypt.genSalt();
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

usersSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
