import { NavLink, useHistory, Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";

const SpotCards = ({ title, image_url, maker, id }) =>{
    const history = useHistory()
    

    return(
        <>
        <div className='card-container'>
            <div className='image-container'>
                <img src={image_url}></img>
            </div>
            <div className='card-title'>
                {title}
            </div>
            <div className='card-maker'>
                {maker}
            </div>

        </div>
        </>
    )
}

export default SpotCards