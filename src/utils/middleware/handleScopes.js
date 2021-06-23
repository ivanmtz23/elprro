const boom = require('@hapi/boom');

export const scopesValidationHandler = (allowedScopes) => {

  return function (req, res, next) {

    if (!req.user || (req.user && !req.user.scopes)) {
      return boom.unauthorized('Missing scopes');
    }

    const hassAccess = allowedScopes
      .map(allowedScope => req.user.scopes.includes(allowedScope))
      .find(allowed => Boolean(allowed));

    if (hassAccess) {
      next();
    } else {
      return boom.unauthorized('Insuficient scopes');
    }
  }

};