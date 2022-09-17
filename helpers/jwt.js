import jwt from 'jsonwebtoken';

export function verifyJwt(token) {
    return jwt.verify(token, process.env.MASTER_KEY);
}