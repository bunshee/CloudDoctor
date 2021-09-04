import "./loginForm.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../images/clouddocLogo.png";

const Login = ({ history }) => {
  const [input, setInput] = useState({
    email: "",
    motDePasse: "",
  });
  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  },[history]);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const login = {
      email: input.email,
      motDePasse: input.motDePasse,
    };
    try {
      const  {data}  = await axios.post(
        "http://localhost:5000/auth/login",
        login,
        config
      );
      
      localStorage.setItem("authToken", data.token);
      
      history.push("/profile");
      
    } catch (error) {
      toast.info(error.response.data.errorMessage, { pauseOnHover: false ,autoClose:3000 });
    }
  }
  return (
    <>
    <ToastContainer />
    <div className="insc">
      <img src={logo} alt="logo" className="tlogo" />
      <div align="center">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="name"
            name="email"
            placeholder="e-mail"
            className="info"
            value={input.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            type="password"
            id="password"
            name="motDePasse"
            className="info"
            placeholder="mot de passe"
            value={input.motDePasse}
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="submit" id="connect" value="connexion" />
        </form>
        <div className="separator">Inscription</div>
        <Link to="/inscriptionP" className="Inscr" id="P">
          Patient
        </Link>
        <Link to="/inscriptionM" className="Inscr" id="M">
          Médecin
        </Link>
      </div>
    </div>
    </>
  );
};

export default Login;
