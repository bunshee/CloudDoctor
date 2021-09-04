import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./details.scss";
import { useHistory } from "react-router-dom";

function Details  ()  {
  const history=useHistory();
  const currentUser = JSON.parse(localStorage.getItem("CP"));
  const [input, setInput] = useState({
    desc: "",
    numero: "",
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

  async function handleClick (event)  {
    event.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    console.log(currentUser);
    const newDetails = {
      desc: input.desc,
      numero: input.numero,
      cin:currentUser.cin,
    };
    try {
     await axios.post(
        "http://localhost:5000/auth/update",
        newDetails,
        config
      );

      history.push("/profile");
    } catch (error) {
      toast.info(error.response.data.errorMessage, { pauseOnHover: false ,autoClose:3000 });
    }
    
  };
  return (
    <div className="detDiv" align="center">
      <ToastContainer/>
      <h4 className="detH4">Ajouter vos details</h4>
      <form>
        <input
          onChange={handleChange}
          value={input.numero}
          className="detIn"
          type="text"
          name="numero"
          placeholder="numero"
        />
        <textarea
          onChange={handleChange}
          value={input.desc}
          className="detIn"
          name="desc"
          placeholder="description..."
        />
        <input
          type="button"
          onClick={handleClick}
          value="Valider"
          name="insc"
          className="detButt"
        />
      </form>
      <br/>
    </div>
  );
};

export default Details;
