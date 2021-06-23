import passport from 'passport';
const JWTStrategy = require('passport-jwt').Strategy;
import { ExtractJwt } from 'passport-jwt';
import { unauthorized } from '@hapi/boom';
import { _config } from '../../config';
import { AuthService } from '../../api/service/auth';

passport.use(new JWTStrategy({
    secretOrKey: _config.jwtAuthSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
},
async (jwt_payload, cb) => {
    const authService = new AuthService();
    try {
      const [account] = await authService.getByQuery({
        email: jwt_payload.email,
      });

      if(!account) {
          return cb(unauthorized(), false);
      }

      delete account.password;
      return cb(null, {
          ...account,
          scopes: jwt_payload.scopes,
      })
    } catch (error) {
        return cb(error);
    }
}))