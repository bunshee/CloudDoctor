import React ,{useState, useEffect}from "react";
import axios from "axios";
import Moment from 'moment';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./profileCard.scss";

 const ProfileCard =({history}) =>{
  const [privateData, setPrivateData] = useState({
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
    role: "",
  });

  localStorage.setItem("CP",JSON.stringify(privateData));
  
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const data  = await axios.get("/private/me", config);
        setPrivateData(
        {
          nom:(data.data.userData.nom),
          email:(data.data.userData.email),
          motDePasse:(data.data.userData.motDePasse),
          cin:(data.data.userData.cin),
          dateDeNaissance:(data.data.userData.dateDeNaissance),
          location:(data.data.userData.location),
          prenom:(data.data.userData.prenom),
          sexe:(data.data.userData.sexe),
          specialite:(data.data.userData.specialite),
          role:(data.data.userData.role),
        });

      } catch (error) {
        toast.error("Session fini ... Reconnectez",{ pauseOnHover: false ,autoClose:3000 ,position:"top-center"});
        localStorage.removeItem("authToken");
        window.location.reload();
      }
    };

    fetchPrivateDate();
  }, [history]);
  let Genre
  privateData.sexe==="M"?( Genre="Masculin"):( Genre="Féminin")
    return (
      <div className="containerp">
        <ToastContainer/>
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="cardp">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center" align="center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin"
                      className="rounded-circle"
                      width={150}
                    />
                    <br/>
                    <input type="file" className="imageUp" />
                    <div className="mt-3">
                      <h4>{privateData.nom} {privateData.prenom}</h4>
                      <p className="text-secondary mb-1"></p>
                      <p className="text-muted font-size-sm">
                      {privateData.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="cardp mb-3">
                <div className="card-body" align="center">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">CIN</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{privateData.cin}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{privateData.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date de naissance</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{Moment(privateData.dateDeNaissance).format("DD-MM-YYYY")}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Role</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{privateData.role}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Genre</h6>
                    </div>
                    {Genre}
                    <div className="col-sm-9 text-secondary">
                    <hr />
                    <Link to="/details" className="deButt">
                      Ajouter des détails
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}

export default ProfileCard;