const User = require("../models/user.Model");

exports.getPrivateDataMe =  (req, res, next) => {
    res.status(200).json({userData:req.user});
};

exports.getPrivateDataAllDoctors = async (req, res, next) =>{
    const existingDoctors = await User.find({ role: "Médecin" });
    res.status(200).json(
        {
            userData:req.user,
            allDoctorsData:existingDoctors
        });
};