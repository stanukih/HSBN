interface IAppSettings {
    install: boolean,
    jwt_secret: string,
    password_soul: string,
    mailUser: string,
    mailPassword: string,
    media: {
        path: string,
        maxSize: number
    }
}
export { IAppSettings }