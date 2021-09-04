import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./rvForm.scss";
import Navbar from "../navbar";

function RVForm () {
  const currentDoctor = JSON.parse(localStorage.getItem("CD"));
  const currentUser = JSON.parse(localStorage.getItem("CP"));
  const [input, setInput] = useState({
    nomCM: currentDoctor.nom + " " + currentDoctor.prenom,
    cinM: currentDoctor.cin,
    nomCP: currentUser.nom + " " + currentUser.prenom,
    cinP: currentUser.cin,
    location: currentDoctor.location,
    date: "",
    desc: "",
    etat: "En attente",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handleSubmit  (event) {
    event.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const newAppointement = {
      nomCM: input.nomCM,
      cinM: input.cinM,
      nomCP: input.nomCP,
      cinP: input.cinP,
      location: input.location,
      date: input.date,
      desc: input.desc,
      etat: input.etat,
    };
    try {
      await axios.post(
        "http://localhost:5000/rendez-vous/create",
        newAppointement,
        config,
      ).then(response => response.data)
      .catch(error => {
        throw error;
      });
      console.log("heja");
      toast.success("Rendez-vous envoyé");
    } catch (error) {
       toast.info(error.response.data.errorMessage, { pauseOnHover: false ,autoClose:3000 });
    }

    
    
  };
  return (
    <div className="rvMainDiv" align="center">
      <Navbar />
      <div className="rvDiv" align="center">
      <ToastContainer className="notify"/>      
        <h2 className="rvHeader">
          rendez-vous chez Mr(s)
          <br />
          <span className="rvSpan">
            {currentDoctor.nom + " " + currentDoctor.prenom}
          </span>
        </h2>
        <br />
        <form>
          <textarea
            name="desc"
            onChange={handleChange}
            value={input.desc}
            className="rvFormInput"
            placeholder="Description de votre cas..."
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={input.date}
            className="rvFormInput"
          />
          <input
            className="rvSubmit"
            type="button"
            value="valider"
            onClick={handleSubmit}
          />
        </form>
        <br />
      </div>
    </div>
  );
};

export default RVForm;
