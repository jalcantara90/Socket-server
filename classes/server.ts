import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO, { Socket } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server; // propiedad creada para definir la instancia del servidor, así implementamos el patrón singleton

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;
  
  // definiendo pivado el constructor nos evita que podamos instanciarlo multiples veces
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    
    this.httpServer = new http.Server( this.app );
    this.io = socketIO( this.httpServer );

    this.listenSockets();
  }
  
  // Con este método devolveremos la instancia del servidor una única vez por muchas veces que lo querramos crear
  public static get instance() {
    return this._instance || ( this._instance = new this() );
  }

  private listenSockets() {
    console.log(`Listening Socket - sockets`);

    this.io.on('connection', ( client: Socket ) => {
      console.log('Client connected');

      socket.message( client, this.io );
      // Disconnect
      socket.disconnect( client );
    });

  }

  start( callback: Function ) {
    this.httpServer.listen( this.port, callback );
  }
}