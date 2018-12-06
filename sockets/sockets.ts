import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectClient = ( client: Socket ) => {
  
  const user: User = new User( client.id );
  connectedUsers.add(user);
}

export const disconnect = ( client: Socket ) => {
  client.on('disconnect', () => {
    console.log('Client disconected');
    connectedUsers.deleteUser( client.id );
  });
}

export const  message = ( client: Socket, io: socketIO.Server ) => {
  client.on('message', ( payload: { from: string, body: string } ) => {
    console.log('Message received', payload);

    io.emit('new-message', payload);
  })
}

export const configUser = ( client: Socket, io: socketIO.Server ) => {
  client.on('config-user', ( payload: any, callback: Function ) => {

    connectedUsers.updateName( client.id , payload.name );

    callback({
      ok: true,
      message: `User ${ payload.name }, configured`
    });
  })
}