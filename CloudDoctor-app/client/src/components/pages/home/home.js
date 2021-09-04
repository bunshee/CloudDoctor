import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import Navbar from "../../navbar/index";
import Card from "./card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import reload from "../../images/make-dicision-128.ico"

SwiperCore.use([Navigation, Pagination, A11y]);

const Home = ({ history }) => {
  function HandleReload ()  {
    history.push("/home");
    localStorage.setItem('searchTerm',null);

  }
  const currentUser = JSON.parse(localStorage.getItem("CP"));
  const Doctors = [];
  let filteredData = [];
  const [privateData, setPrivateData] = useState("");



  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }


    const fetchPrivateData = async () => {
      const config = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/private/allDoctors", config);
        setPrivateData(data.allDoctorsData);
      } catch (error) {
        toast.error("Session fini ... Reconnectez",{ pauseOnHover: false ,autoClose:3000 ,position:"top-center"});
        localStorage.removeItem("authToken");
        history.push("/login");
      }
    
    };
    fetchPrivateData();
  }, [history]);
  let Term;
  if ( JSON.parse(localStorage.getItem('searchTerm'))===null){
    Term="";

  }
  else{
     Term = JSON.parse(localStorage.getItem('searchTerm')).search;
  }

  
  console.log(Term);
  console.log(privateData);
  if (Term ===""){
    filteredData = privateData;}
  else{ 
  for(var j=0; j < privateData.length;j++){
    if (
      privateData[j].specialite.toLowerCase().includes(Term.toLowerCase())
      ||
      privateData[j].nom.toLowerCase().includes(Term.toLowerCase())
      ||
      privateData[j].prenom.toLowerCase().includes(Term.toLowerCase())
      ||
      privateData[j].email.toLowerCase().includes(Term.toLowerCase())
      ||
      privateData[j].location.toLowerCase().includes(Term.toLowerCase())
      ||
      privateData[j].cin.toLowerCase().includes(Term.toLowerCase())
    ){
      filteredData.push(privateData[j]);
    }
  };}
  console.log(filteredData);


  for(var i=0; i < filteredData.length;i++){

    if (!(currentUser.cin===filteredData[i].cin)){  
      Doctors.push((
      <SwiperSlide>
      <Card 
      nom = {filteredData[i].nom } 
      prenom = { filteredData[i].prenom}
      email = { filteredData[i].email}
      motDePasse = { filteredData[i].motDePasse}
      cin = { filteredData[i].cin}
      location = { filteredData[i].location}
      specialite = { filteredData[i].specialite}
      sexe = { filteredData[i].sexe}
      />
     </SwiperSlide>
    ))
  }
}


if (filteredData=="" && Term!=="") {
  toast.error("INFORMATION NON-TROUVE!",{position:"bottom-center"})
  Doctors.push ((
    <img src={reload} alt="reaload" className="reload" onClick={HandleReload}/>
  ))
}
   return (
    <div id="mainDiv">
      <div className="header" align="center">
      <ToastContainer/>
        <Navbar />
        <div align="center">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
          >
           {Doctors}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
