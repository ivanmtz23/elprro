import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import boom from '@hapi/boom';
import { AuthService } from '../../api/service/auth';
import { comparePassword } from '../../lib/bycript';

passport.use( new BasicStrategy( async (email, password, cb) => {
    const authService = new AuthService();
    try {
        const [account] = await authService.getByQuery({ email });
        if(!account){
            return cb(boom.unauthorized(), false);
        }
        if(!comparePassword(password, account.password)){
            return cb(boom.unauthorized(), false);
        }
        delete account.password;
        return cb(null, account);
    } catch (error) {
        
    }
}))