import { Server, Socket } from 'socket.io';
import logger from './utils/logger';


// Define events to handle WebSocket connections
const EVENTS = {
    connection: 'connection',
  };
  
// function to handle Websocket connections
function socket({ io }: { io: Server }) {
    logger.info('Sockets enabled');
  
    io.on(EVENTS.connection, (socket: Socket) => {
      logger.info(`User connected ${socket.id}`);
    });
  }
  
  export default socket;
  