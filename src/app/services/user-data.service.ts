import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
/**
 * user service class
 */
export class UserDataService {

    users: User[] = [];

    constructor() {
        let user = {
            userId: 1, userName: "admin", password: "password", emailId: "admin@admin.com", birthDate: new Date('10/28/1992')
        };
        this.users.push(user);
    }

    /**
     * get user by user Name and password
     * @param userName 
     * @param password 
     */
    getUserByUserNameAndPassword(userName: string, password: string): User {
        let user!: User;
        this.users.forEach(element => {
            if (element.userName === userName && element.password === password) {
                user = element;
            }
        });
        return user;
    }

    /**
     * add new user
     * @param userName 
     * @param password 
     * @param emailId 
     * @param birthDate 
     */
    addUser(userName: string, password: string, emailId: string, birthDate: Date): boolean {
        let userId = this.users.length + 1;

        const user: User = {
            id: userId,
            userName: userName,
            password: password,
            email: emailId,
            birthDate: birthDate
          };

        this.users.push(user);

        return true;
    }
}