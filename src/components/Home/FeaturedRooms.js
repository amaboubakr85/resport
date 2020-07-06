import React, {Component} from "react";
import {RoomContext} from "../../Context";
import Loading from "../Loading";
import Room from "../../Room";
import Title from "../Title";

class FeaturedRooms extends Component {
    static contextType = RoomContext;

    render() {
        //const value = this.context;
        //  featuredRooms : rooms it is rename featuredRooms => rooms
        // console.log(this.context)
        let {loading, featuredRooms: rooms} = this.context;
        rooms = rooms.map((room) => {
            return (<Room key={room.id} room={room}></Room>)
        })
        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms"/>
                <div className="featured-rooms-center">
                    {loading ? <Loading/> : rooms}
                </div>
            </section>
        );
    }
}

export default FeaturedRooms;
