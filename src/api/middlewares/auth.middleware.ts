import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.utils';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let jwt = req.headers.authorization;
        console.log(1)
        // verify request has token
        if (!jwt) {
            return res.status(401).json({ message: 'Invalid token ' });
        }
        console.log(2)

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        console.log(3)
        // verify token hasn't expired yet
        const decodedToken = await validateToken(jwt);
        console.log(4)
        const hasAccessToEndpoint = allowedAccessTypes.some(
            (at) => decodedToken.accessTypes.some((uat) => uat === at)
        );
        console.log(5)
        if (!hasAccessToEndpoint) {
            return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        }
        console.log(6)
        console.log('decodedToken', decodedToken);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }

        res.status(500).json({ message: 'Failed to authenticate user' });
    }
};