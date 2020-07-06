
import React from "react";
import RoomsList from "./RoomList";
import RoomsFilter from "./RoomFilter";
import {withRoomConsumer} from "../Context";
import Loading from "./Loading";

function RoomContainer({context}) {
const {loading,sortedRooms,rooms}=context;
    if(loading){
                       return <Loading />
                   }
                    return (
                        <React.Fragment>
                            <RoomsFilter rooms={rooms}  />
                            <RoomsList  rooms={sortedRooms}/>
                        </React.Fragment>
                    )
}
export default withRoomConsumer(RoomContainer)



// import React from "react";
// import RoomsList from "./RoomList";
// import RoomsFilter from "./RoomFilter";
// import {RoomConsumer} from "../Context";
// import Loading from "./Loading";
//
// const RoomsContainer = () => {
//     return (
//         <RoomConsumer>
//             {
//                 (value)=>{
//                     //console.log(value)
//                     const {loading , sortedRooms,rooms} = value;
//                    if(loading){
//                        return <Loading />
//                    }
//                     return (
//                         <React.Fragment>
//                             rooms container
//                             <RoomsFilter rooms={rooms}  />
//                             <RoomsList  rooms={sortedRooms}/>
//                         </React.Fragment>
//                     )
//                 }
//             }
//         </RoomConsumer>
//
//
//
//     )
// }
// export default RoomsContainer;