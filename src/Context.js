import React, { Component } from "react";
// import items from "./data";
import Client from "./contentfull";

Client.getEntries({
  content_type: "beachResortRoom",
  order: "sys.createdAt",
}).then((response) => console.log(response.items));

const RoomContext = React.createContext();

//<RoomContext.provider value={'hello'}

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
      });
      let rooms = this.formatData(response.items);
      //  console.log(rooms)
      let maxPrice = Math.max(
        ...rooms.map((room) => {
          return room.price;
        })
      );
      let maxSize = Math.max(...rooms.map((room) => room.size));

      // console.log(maxSiz)
      let featuredRooms = rooms.filter((room) => room.featured === true);
      this.setState({
        rooms: rooms,
        featuredRooms: featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxSize: maxSize,
        maxPrice: maxPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
    // let rooms = this.formatData(items);
    // //  console.log(rooms)
    // let maxPrice = Math.max(
    //   ...rooms.map((room) => {
    //     return room.price;
    //   })
    // );
    // let maxSize = Math.max(...rooms.map((room) => room.size));

    // // console.log(maxSiz)
    // let featuredRooms = rooms.filter((room) => room.featured === true);
    // this.setState({
    //   rooms: rooms,
    //   featuredRooms: featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxSize: maxSize,
    //   maxPrice: maxPrice,
    // });
  }

  formatData(itemss) {
    let tempItems = itemss.map((itemm) => {
      let id = itemm.sys.id;
      let images = itemm.fields.images.map((image) => image.fields.file.url);
      //hint : the Fields object has already the images for that we had overrided the imaged with flat array of images
      // without that structure of fields->file->url , the id is not in the fields object so we added it not overided it
      let room = { ...itemm.fields, images: images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    let room = tempRooms.find((neededRoom) => neededRoom.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const name = event.target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log(type, name, value);
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      breakfast,
      capacity,
      price,
      pets,
      maxSize,
      minSize,
    } = this.state;

    // all the rooms
    let tempRooms = [...rooms];
    // transform values
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    // filter size

    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //   filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    // change state
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    // console.log(this.state.items)
    return (
      <div>
        <RoomContext.Provider
          value={{
            ...this.state,
            getRoom: this.getRoom,
            handleChange: this.handleChange,
          }}
        >
          {this.props.children}
        </RoomContext.Provider>
      </div>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function consumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomContext, RoomConsumer, RoomProvider };
