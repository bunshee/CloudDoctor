import React,{useState} from "react";
import axios from "axios";
import Moment from 'moment';

import './managerRV.scss'
import '../pages/rendez-vous/appointement.scss'
import '../welcome.scss'
import '../authPages/loginForm.scss'

const ManagerRV = (props) => {

    const [input, setInput] = useState({
      date: "",
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

    const handleChangeModify = async (event) => {
      window.location.reload();
      event.preventDefault();
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const newState = {
        _id: props._id,
        date: input.date,
        etat: "Validé",
      }
      try {
        await axios.post(
          "http://localhost:5000/rendez-vous/update",
          newState,
          config
        );
        
      } catch (error) {

      }
    };
    
return(
    <div className="mdivapp" align="center" id={props._id}>
    <div className="divapp" align="center" >
        <div className="image"></div>
        <h2 align="center">{Moment(props.date).format("DD-MM-YYYY")}</h2>
        <hr/>
        <div className="docpat">
        <p><span>Nom Médecin : </span>{props.nomCD}</p>
        <p><span>CIN Médecin : </span>{props.cinD}</p>
        <p><span>Nom Patient : </span>{props.nomCP}</p>
        <p><span>Cin Patient : </span>{props.cinP}</p> 
        </div>
        <p><span>Location : </span>{props.location}</p>
        <p><span>Déscription : </span>{props.desc}</p>
        <p><span>Etat : </span>{props.etat}</p>
        <button onClick={handleChangeModify} className="MButt">Valider </button>
        <input 
        name="date"
        onChange={handleChange}
        value={input.date}
        type="date" 
        className="info" 

        />
        <button  onClick={handleChangeModify} className="MButt">Modifier</button>
        </div>
</div>

)

}

export default ManagerRV;