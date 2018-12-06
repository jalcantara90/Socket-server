import { User } from './user';
export class UserList {
  private list: User[] = [];

  constructor() {}

  public add( user: User ): User {
    this.list.push(user);
    console.log(this.list);

    return user;
  }

  public updateName( id: string, name: string ) {
    for( let users of this.list ) {
      if( users.id === id ) {
        users.name = name;
        break;
      } 
    }

    console.log( this.list );
  }

  public getList() {
    return this.list;
  }

  public getUser( id: string ): User | undefined {
    return this.list.find( (user: User ) => user.id === id);
  }

  public getUserInRoom( room: string ): User[] {
    return this.list.filter( user => user.room === room);
  }
  
  public deleteUser( id: string ): User | void {
    const tempUser: User | undefined = this.getUser( id );
    
    if( tempUser ) {
      this.list = this.list.filter( (user: User) => user.id !== id );
      
      return tempUser;
    }
  }

}