import http from 'http';
import { port } from './config';
//import { getHelloMessage } from './helpers';  
import { logServerMessage } from './logger';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running!');
}).listen(port, () => logServerMessage(`Server is running on port ${port}`));