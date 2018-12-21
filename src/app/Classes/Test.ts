import {User} from './User';

export class Test {
    private users: User[];
    private nbUser: number;

    constructor() {
        this.users = new Array(32);
        let user1;
        let user2;
        let user3;
        user1 = new User('toto', 'toto');
        user2 = new User('tata', 'tata');
        user3 = new User('tutu', 'tutu');
        this.users[0] = user1;
        this.users[1] = user2;
        this.users[2] = user3;
        this.nbUser = 3;
    }

    public loginCheck(userC: User) {
        let _i;
        for (_i = 0; _i < this.nbUser; _i++) {
            if (this.users[_i].login === userC.login && this.users[_i].password === userC.password) {
                return true;
            }
        }
        return false;
    }

    public addUser(userA: User) {
        this.users[this.nbUser] = userA;
        this.nbUser++;
    }
}
