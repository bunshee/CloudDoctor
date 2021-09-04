import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerRV from "../../managerRV/managerRV";
import "./rendez-vous.scss";

const PatientsRendezVous = ({ history }) => {
    const currentUser = JSON.parse(localStorage.getItem("CP"));
    const PatientsAppointements = [];
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
            "/rendez-vous/getAllMyPatientsAppointements",
            {
              params: {
                cinM: currentUser.cin,
              },
            },
            config
          );
          setPrivateData(data.allMyPatientsAppointements);
        } catch (error) {
        }
        
      };
      fetchPrivateData();
      
}, [history,currentUser.cin]);
for (var i = 0; i < privateData.length; i++) {
    PatientsAppointements.push(
    <div className="AppA">
      <ManagerRV
        _id={privateData[i]._id}
        nomCD={privateData[i].nomCM}
        cinD={privateData[i].cinM}
        nomCP={privateData[i].nomCP}
        cinP={privateData[i].cinP}
        date={privateData[i].date}
        location={privateData[i].location}
        desc={privateData[i].desc}
        etat={privateData[i].etat}
        key={i}
      />
    </div>
  );
}
return(
    <div>
    {PatientsAppointements}
    </div>
)
}

export default PatientsRendezVous;