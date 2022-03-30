import {AuthenticationError} from 'apollo-server'
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer [token]
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, SECRET);
                return user;
            } catch (err){
                throw new AuthenticationError('Invalid Token')
            }
        }
        throw new Error('Auth token incorrect')
    }
    throw new Error('Auth header must be provided')
}