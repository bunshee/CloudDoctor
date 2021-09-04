import Moment from 'moment';
import './appointement.scss'
import '../../welcome.scss'

export default function appointement(props){
    return(

        <div className="mdivapp" align="center">
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
                    </div>
        </div>

    )
}
