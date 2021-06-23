import passport from 'passport';
import boom, { isBoom } from '@hapi/boom';
import { AuthService } from '../service/auth';
import { validationHandler } from '../../utils/middleware/handlerValidation';
import { userSchema } from '../schemas/user';
import { signToken } from '../../utils/middleware/jwtSign';

require('../../auth/strategies/basic');

export class AuthRoutes {
  constructor() {
    this.path = '/auth';
    this.service = new AuthService();
  }

  routes(app ,router) {
    app.use(this.path, router);

    router.post(
      '/sign-in',
      async (req, res, next) => {
        
        const { apiKeyToken } = req.body;
        
        if (!apiKeyToken) {
          return next(boom.unauthorized('api key token is required'));
        }

        // Validate using basic strategic
        passport.authenticate('basic', (err, user) => {
          try {
            if (err || !user) {
              return next(boom.unauthorized())
            }

            req.logIn(user, { session: false }, async (error) => {

              if (error) {
                return next(error);
              }

              const token = await signToken(user, apiKeyToken);

              if(isBoom(token)){
                return next(token)
              }


              return res.status(200).json(token)
            })
          } catch (error) {
            next(error)
          }
        })(req, res, next);
      });

    router.post(
      '/sign-up',
      validationHandler(userSchema), // validate Data sended by user
      async (req, res) => {
        const { body: data } = req;
        try {
          const userId = await this.service.create(data);
          res.status(201).json({
            userId,
            message: 'User created succesfully',
          })
        } catch (error) {
          res.status(500).json({
            message: 'Error to create user',
          })
        }
      });
  }

}