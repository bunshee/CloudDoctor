const Appointement = require("../models/appointement.Model");

exports.create = async (req, res, next) => {
  const { nomCM, cinM, nomCP, cinP, location, date, etat, desc } = req.body;
  const varDate = new Date(date);
  const today=new Date();
  try {
    if (
      !date ||
      !desc
    )
      return res
        .status(400)
        .json({ errorMessage: "Tous les champs sont obligatoires!" });
    if (varDate<today)
      return res
        .status(400)
        .json({ errorMessage: "Date doit être superieur a la date de l'instant" });
    const newAppointement = new Appointement({
      nomCM,
      cinM,
      nomCP,
      cinP,
      location,
      date,
      etat,
      desc,
    });

    await newAppointement.save();
    res.status(200).json({success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.getAllMyAppointements = async (req, res, next) => {
  const  cinP = req.query.cinP;
  console.log(cinP);
  try{
  const appointements = await Appointement.find({ cinP: cinP });
  res.status(200).json({
    allMyAppointements: appointements,
  });
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false });
}
};

exports.getAllMyPatientsAppointements = async (req, res, next) => {
  const  cinM = req.query.cinM;
  try{
  const appointements = await Appointement.find({ cinM: cinM });
  res.status(200).json({
    allMyPatientsAppointements: appointements,
  });
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false });
}
};

exports.update = async (req, res, next) => {
  const  {_id, date, etat} = req.body;
  try{
  const appointement = await Appointement.findOne({ _id: _id });
  console.log(appointement);
  if (!appointement)
    {res.status(404).send("data is not found");}
    if (!date){
      appointement.etat=etat;
      console.log(appointement);
    }
    else {
      appointement.etat=etat;
      appointement.date=date;
      console.log(appointement);
      
    }

    await appointement.save();
  } 
 catch (err) {
  console.error(err);
  res.status(500).json({ success: false });
}
}