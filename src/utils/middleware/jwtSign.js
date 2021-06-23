import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import { ApiKeysService } from '../../api/service/apiKey';
import { _config } from '../../config';

export const signToken = async (user, token) => {
    const apiKeyService = new ApiKeysService();

    try {
        const [existanceToken] = await apiKeyService.get({ token });

        if (!existanceToken) {
            return boom.unauthorized();
        }

        const { _id: id, email } = user;

        const payload = {
            sub: id,
            email,
            scopes: existanceToken.scopes,
        }

        const signedToken = jwt.sign(payload, _config.jwtAuthSecret, {algorithm:"HS256"})

        return {
            ...user,
            token: signedToken
        };
    } catch (error) {
        return error;
    }
}