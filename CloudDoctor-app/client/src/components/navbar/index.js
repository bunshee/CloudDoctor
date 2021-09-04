import React,{useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.scss";
import logo from "../images/clouddocLogo.png";

function Navbar() {
  const history = useHistory();
  const [input, setInput] = useState({
    search: "",
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

  function logoutHandler() {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  const searchHandler = () => {
    
      localStorage.setItem("searchTerm",JSON.stringify({search :input.search}));
      history.push("/home");
    
  };

  return (
    <div className="navDIV">
      <div id="logo">
        <Link className="transparent" to="/">
          <img src={logo} className="navLOGO" alt= "" />
        </Link>
      </div>
      <div className="butts">
        <div className="vertical">
          <Link className="transparent" to="/profile">
            <p className="text" id="leftV">
            🧑<span className="textS"> Profile </span>👩
            </p>
          </Link>
        </div>
        </div>
      <input
        className="transparent"
        id="text"
        type="text"
        placeholder="  ✍ rechercher..."
        value={input.search}
        name="search"
        onChange={handleChange}
      />
      <button id="ST" onClick={searchHandler}>
        🔍
      </button>
      <div className="butts">
        <div className="vertical">
          <Link className="transparent" to="/home">
            <p className="text" id="leftV">
              ☁️<span className="textS"> Accueil </span>🏠
            </p>
          </Link>
        </div>
        <div className="vertical">
          <Link className="transparent" to="/RV">
            <p className="text">
              📅<span className="textS"> Rendez-vous </span>📃
            </p>
          </Link>
        </div>
        <div className="vertical">
          <p onClick={logoutHandler} className="transparent">
            <span className="text">
              ⭕️<span className="textS"> Déconnexion </span>📴
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;