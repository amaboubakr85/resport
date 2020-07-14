import React, {Component} from "react";
import Banner from "../components/Banner";
import {RoomContext} from "../Context";
import {Link} from "react-router-dom";
import defaultBg from "../assets/images/defaultBcg.jpeg";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
    static contextType = RoomContext;

    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBg: defaultBg
        }

//console.log(this.state.slug)
    }

    render() {

        const {getRoom} = this.context;
        let Room = getRoom(this.state.slug);
        //console.log(Room)
        if (!Room) {
            return <div className="error">
                <h3>no such room be found...</h3>
                <Link to="/rooms" className="btn-primary">return to rooms</Link>
            </div>
        }
        const {name, description, capacity, size, price, extras, breakfast, pets, images} = Room;

        //this is destructuring images into one main image , other rest images as defaultImg
        const [mainImg, ...defaultImg] = images;
        //console.log(defaultImg)
        return (
            <React.Fragment>
                <StyledHero img={mainImg || this.state.defaultBg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            back to rooms
                        </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImg.map((image, index) => {
                            return (<img key={index} src={image} alt="room"/>)
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>price : {size} SQFT</h6>
                            <h6>Max Capacity : {capacity > 1 ? `${capacity} people` : `${capacity} person`} </h6>
                            <h6>{pets ? "pets allowed " : "no pets allowed "}</h6>
                            {/* if the breakfast true then will put "free breakfast included if false nothing will rendered "*/}
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {
                            extras.map((extra, index) => {
                                return (<li key={index} className="">- {extra}</li>)
                            })
                        }
                    </ul>
                </section>
            </React.Fragment>
        );
    }
}
