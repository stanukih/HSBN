import {Strategy, ExtractJwt} from 'passport-jwt'
import {jwt_secret} from '../../shared/config/appSettings.json'
import { User } from '../model/user'
const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_secret
}

async function passport(passport:any){
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findByPk(payload.userId.toLowerCase())
                if (user) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        }))
}

export {passport}