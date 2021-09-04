import React, { useState, useEffect } from "react";
import axios from "axios";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Navbar from "../../navbar/index";
import PatientsRendezVous from "./doctorExclusif";
import Appointement from "./appointement";
import "./rendez-vous.scss";

SwiperCore.use([Navigation, Pagination, A11y]);

const RendezVous = ({ history }) => {
  const currentUser = JSON.parse(localStorage.getItem("CP"));
  const MyAppointements = [];
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
        const { data } = await axios.get(
          "/rendez-vous/getAllMyAppointements",
          {
            params: {
              cinP: currentUser.cin,
            },
          },
          config
        );
        setPrivateData(data.allMyAppointements);
      } catch (error) {}
    };
    fetchPrivateData();
  }, [history, currentUser.cin]);
  for (var i = 0; i < privateData.length; i++) {
    MyAppointements.push(
      <div className="AppA">
        <Appointement
          _id={privateData[i]._id}
          nomCD={privateData[i].nomCM}
          cinD={privateData[i].cinM}
          nomCP={privateData[i].nomCP}
          cinP={privateData[i].cinP}
          date={privateData[i].date}
          location={privateData[i].location}
          desc={privateData[i].desc}
          etat={privateData[i].etat}
        />
      </div>
    );
  }
  return currentUser.role === "Patient" ? (
    <div id="mainDiv">
      <Navbar />
      <div id="disApp" align="center">
        <h1 className="MRV">Mes rendez-vous</h1>
      </div>
      {MyAppointements}
    </div>
  ) : (
    <div id="mainDiv">
      <Navbar />
      <Swiper pagination={{ clickable: true }}>
        <SwiperSlide>
          <div id="disApp" align="center">
            <h1 className="MRV">Mes rendez-vous</h1>

            {MyAppointements}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div id="disApp" align="center">
            <h1 className="MRV">Les rendez-vous de mes patients</h1>
            <PatientsRendezVous />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RendezVous;
