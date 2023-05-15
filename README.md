The project requires nodejs v18.12.1 to work.
To work, you must have a zoho.com account and generate an application key to send mail.
To work, you must have the postgresql database server installed.
To install, you need to:
    1) Clone the repository.
    2) Open file appSettings.json (puth ./shared/config/)
    3) Enter values
        a) "install": For the first run, leave the default value "true", For subsequent "false",
        b) "jwt_secret": The string for generating the authorization token. It is recommended to use uppercase and lowercase characters, numbers, special characters. Example: "PG/(gpB|yv87 (/V okoo",
        c) "password_soul": A string to store the password in the database in encrypted form. It is recommended to use uppercase and lowercase characters, numbers, special characters. Example: "vno*VuyvUYvn76v",
        d) "mailUser": Username zoho.com. Example: "appetanamail",
        e) "mailPassword": Password application key zoho.com. Example: "(PG97g(7g&(G7808&",
        f) "adminKey": Code to register an administrator account. Example: "M(G79G*&gn0*",
        g) "media":{
            "path": Full path to store batch data files. "/home/stas/HSBN/files",
            "maxSize": Maximum file size for batch upload in bytes. Example: 200000000
            }
    4) Create user account and database on postgresql server.
    5) Open file dataBase.setting.json (puth ./shared/config/)
    6) Enter values
        a) "dialect": "postgres",
        b) "host": Database server address. Example: "localhost",
        c) "port": Database server port . Example: "5432",
        d) "login": Database server account. Example: "postgres",
        e) "password": Database server password. Example "HM(*mp9M9",
        f) "database": The name of the created database. Example "HSB"
    7) Open file dataBase.setting.json proxy.conf.json
    8) Enter values
    "/api/*":{
        "target": Specify backend server address and port. Default: "http://localhost:5000",
    },
    "/uploadMedia/*":{
        "target": Specify backend server address and port. Default: "http://localhost:5000",
    }
    9) While in the project run the command "npm run i-all-dep"
    10) While in the frontend folder run the command "npm run ng build"
    11) While in the backend folder run the command "npm run compile"


    To install, you need to:
    1) While in the backend folder run the command  "npm run start-server"
    2) After the first run, you need to set the install:false value in the ./shared/config/ file and while in the frontend folder run the command "npm run ng build"


    To update, you need to:
    1) Save settings files.
    2) Sync with git repository.
    3) Restore settings files.
    4) While in the project run the command "npm run i-all-dep"
    5) While in the frontend folder run the command "npm run ng build"
    6) While in the backend folder run the command "npm run compile"
    When upgrading, other steps are possible, so you need to check the installation order in change.log



