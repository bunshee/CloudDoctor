import {Link} from "react-router-dom"
import './card.scss'
import image from "../../images/doc.jpg";

export default function card(props){
    function handleChange() {
        localStorage.setItem("CD",JSON.stringify(props));
    }
      let Genre
  props.sexe==="M"?( Genre="Masculin"):( Genre="Féminin")
    return(
        <div className="container">
        <div className="card" align="center">
            <img className="profileImageCard" src={image} alt= ""/>
            <h2>{props.specialite}</h2>
            <hr/>
            <div className="textSp">
            <p className="textp">{props.nom} {props.prenom}
            </p>
            <p className="textp">{props.cin}
            </p>
            <p className="textp">{props.location}
            </p>
            <p className="textp">{props.email}
            </p>
            <p className="textp">{Genre}
            </p>
            <p className="textp">{props.numero}
            </p>
            <p className="textp">{props.desc}
            </p>
            </div>
            <Link to="/rvForm" className="ButtonT">
                <button onClick={handleChange}>rendez-vous</button>
            </Link>
        </div>
        </div>
    )
}