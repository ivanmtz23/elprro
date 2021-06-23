import passport from 'passport';
import { validationHandler } from '../../utils/middleware/handlerValidation';
import {  scopesValidationHandler } from '../../utils/middleware/handleScopes';
import { userSchema } from '../schemas/user';

import '../../auth/strategies/jwt';

export class UserRoutes{
    constructor(){
        this.path = '/user';
    }

    routes(app, router){
        app.use(this.path, router);
        
        router.get(
            '/',
            passport.authenticate('jwt', {session: false}),
            scopesValidationHandler(['create:user']),
            async (req, res) => {
                res.send('Ruta protejida!');
            }
        )
    }
    
}