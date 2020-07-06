import React from "react";
import propTypes  from "prop-types";

import defaultImg from "./assets/images/room-7.jpeg"
import {Link} from "react-router-dom";

const Room = ({room}) => {
    // console.log(props)
    const {name, slug, images, price} = room
   // console.log(images)
    return (
        <article className="room">

            <div className="img-container">
                <img src={images[0] || defaultImg} alt="single room"/>
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}
Room.propTypes={
 room:propTypes.shape({
     name:propTypes.string.isRequired,
     slug:propTypes.string.isRequired,
     images:propTypes.arrayOf(propTypes.string).isRequired,
     price:propTypes.number.isRequired
 })
}
export default Room;