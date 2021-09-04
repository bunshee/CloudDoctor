import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./inscri.scss";

const InscriptMed = ({ history }) => {
  const [input, setInput] = useState({
    email: "",
    motDePasse: "",
    reMotDePasse: "",
    cin: "",
    dateDeNaissance: "",
    location: "",
    nom: "",
    prenom: "",
    sexe: "",
    specialite: "",
    role:"Médecin",
  });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  }, [history]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleClick = async (event) => {
    event.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const newDoctor = {
      email: input.email,
      motDePasse: input.motDePasse,
      reMotDePasse: input.reMotDePasse,
      cin: input.cin,
      dateDeNaissance: input.dateDeNaissance,
      location: input.location,
      nom: input.nom,
      prenom: input.prenom,
      sexe: input.sexe,
      specialite: input.specialite,
      role: input.role,
      numero:"",
      desc:"",
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/inscription",
        newDoctor,
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/profile");
    } catch (error) {
      toast.info(error.response.data.errorMessage, { pauseOnHover: false ,autoClose:3000 });
    }
    
  }
  return (
    <div className="inscI" align="center">
      <ToastContainer/>
      <h4 className="H4I">
        <span>hello,</span> Cloud Doctor!
      </h4>
      <h4 className="H4I">
        <span className="spanI">👩‍⚕️ Médecin 👨‍⚕️</span>
      </h4>
      <form>
        <input
          onChange={handleChange}
          value={input.cin}
          className="inscIn"
          type="text"
          name="cin"
          placeholder="CIN"
          id="CIN"
        />
        <input
          onChange={handleChange}
          value={input.nom}
          className="inscIn"
          type="text"
          name="nom"
          placeholder="Nom"
          id="FN"
          error='Champs obligatoire!!'
        />
        <input
          onChange={handleChange}
          value={input.prenom}
          className="inscIn"
          type="text"
          name="prenom"
          placeholder="Prénom"
          id="LN"
        />
        <input
          onChange={handleChange}
          value={input.email}
          className="inscIn"
          type="email"
          name="email"
          placeholder="email@example.com"
          id="EM"
        />
        <input
          onChange={handleChange}
          value={input.motDePasse}
          className="inscIn"
          type="password"
          name="motDePasse"
          placeholder="password"
          id="PW"
        />
        <input
          onChange={handleChange}
          value={input.reMotDePasse}
          className="inscIn"
          type="password"
          name="reMotDePasse"
          placeholder="confirm password"
          id="RP"
        />
        <br />
        <label>
          Sexe
          <br />
          <select name="sexe" value={input.sexe} onChange={handleChange}>
            <option></option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </label>
        <input
          onChange={handleChange}
          value={input.dateDeNaissance}
          type="date"
          name="dateDeNaissance"
          placeholder="dateDeNaissance"
          className="inscIn"
        />
        <input
          onChange={handleChange}
          value={input.location}
          className="inscIn"
          type="text"
          name="location"
          id="pays"
          placeholder="Place de naissance"
        />
        <input
          onChange={handleChange}
          value={input.specialite}
          className="inscIn"
          type="text"
          placeholder="Spécialité"
          id="spec"
          name="specialite"
          required
        />
        <input
          type="button"
          onClick={handleClick}
          value="Inscription"
          name="insc"
          className="VIM"
        />
      </form>
      <Link className="backLogin" to="login">J'ai un compte</Link>
      <br/>
    </div>
  );
};

export default InscriptMed;
