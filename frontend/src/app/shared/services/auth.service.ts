import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { IMessage } from "../../../../../shared/interfaces/IMessage";

interface IUser {
    login: string,
    password: string
}
interface IUserVerified {
    login: string,
    verifiedСonfirmation: string
}
interface IUserPasswordRecovery {
    login: string,
    verifiedСonfirmation: string,
    password:string
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string | null = null
    private cookieNotification: string | null = null

    constructor(private http: HttpClient) {
    }
    register(user: IUser): Observable<IMessage> {
        return this.http.post<IMessage>('/api/auth/registration', user)
    }
    confirmation(userVerified: IUserVerified): Observable<IMessage> {
        return this.http.post<IMessage>('/api/auth/confirmationRegistration', userVerified)
    }
    login(user: IUser): Observable<IMessage> {
        return this.http.post<IMessage>("/api/auth/login", user)
            .pipe(
                tap(
                    (data: IMessage) => {
                        if (data.status === "Success") {
                            console.log("test login function")
                            localStorage.setItem('auth-token', data.message)
                            this.setToken(data.message)                            
                        }
                    }))                    
    }
    passwordRecoveryRequest(email: string): Observable<IMessage> {
        return this.http.post<IMessage>("/api/auth/passwordRecoveryRequest", email)
            .pipe(
                tap(
                    (data: IMessage) => {
                        if (data.status === "Success") {
                            console.log("test login function")
                            localStorage.setItem('auth-token', data.message)
                            console.log(data.message)
                            this.setToken(data.message)
                        }
                    }))                    
    }
    passwordRecovery(user: IUserPasswordRecovery): Observable<IMessage> {
        return this.http.post<IMessage>("/api/auth/passwordRecovery", user)
            .pipe(
                tap(
                    (data: IMessage) => {
                        if (data.status === "Success") {
                            console.log("test login function")
                            localStorage.setItem('auth-token', data.message)
                            this.setToken(data.message)
                        }
                    }))                    
    }

    setToken(token: string | null) {
        this.token = token        
    }
    getToken(): string {
        if (this.token) {
            return this.token
        } else { return '' }
    }

    isAuthenticated(): boolean {
        if((this.token)&&(JSON.parse(atob(this.token.split('.')[1]).toString())))
            return true
        return false
    }

    isCookieNotification():boolean{
        if (this.cookieNotification){
            return true}
        this.cookieNotification=localStorage.getItem("cookiesAgreement")
        if (this.cookieNotification){
            return true}
        
        return false
    }

    cookiesAgreement(){
        this.cookieNotification="true"
        localStorage.setItem("cookiesAgreement", this.cookieNotification)
    }

    logout() {
        this.setToken(null)
        localStorage.setItem('auth-token', '')
    }

}