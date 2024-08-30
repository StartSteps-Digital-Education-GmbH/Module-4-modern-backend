export const EVENTS = {
    connection: "connection",
    CLIENT:{
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM"
    },//events that client can emit, and the server can listen to(on)
    SERVER:{
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    }//events that server can emit, and the client can listen to(on)
}
