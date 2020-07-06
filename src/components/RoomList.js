import React from "react";
import Room from "../Room";


const RoomsList = ({rooms})=>{
    // console.log(props.rooms)
    if(rooms.length===0){
        return (
           <div className="empty-search">
               <h3>
                   Unfortunately no rooms matched your search parameters  ...
               </h3>
           </div>
        )
    }
    return (
        <React.Fragment>
            <section className="roomslist">
              <div className="roomslist-center">
                  {
                      rooms.map((room)=>{
                          return (<Room key={room.id} room={room}></Room>)
                      })
                  }
              </div>
            </section>
        </React.Fragment>
    )
}

export default RoomsList