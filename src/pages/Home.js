import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import Services from "../components/Home/Services";
import FeaturedRooms from "../components/Home/FeaturedRooms";


const Home = () => {
    //optional to add the props of hero="defaultHero" cause we had added Hero.defaultProps:"defaultHero" in hero component
    return (
        <React.Fragment>
            <Hero
                // hero="defaultHero"
            >
                <Banner title="Luxurious rooms" subtitle="Deluxe rooms starting from 255$ ">
                    <Link to="/rooms" className="btn-primary">Our Rooms</Link>
                </Banner>
            </Hero>
            <Services/>
            <FeaturedRooms></FeaturedRooms>

        </React.Fragment>
    )
};

export default Home;
