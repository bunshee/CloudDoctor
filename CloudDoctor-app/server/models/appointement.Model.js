const mongoose = require("mongoose");

const appointementsSchema = new mongoose.Schema({
    nomCM:{
        type:String,
    },
    cinM:{
        type:String,
    },
    nomCP:{
        type:String,
    },
    cinP:{
        type:String,
    },
    location:{
        type:String,
    },
    date:{
        type:Date,
    },
    desc:{
        type:String,
    },
    etat:{
        type:String,
    }
})

const Appointement = mongoose.model("Appointement", appointementsSchema);

module.exports = Appointement;