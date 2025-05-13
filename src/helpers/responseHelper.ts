import { Response } from 'express';
export const sendSuccessResponse = ( res: Response, message: string, data : any = null) => {
    res.status(200).json(data);
}
export const sendInvalidParameters = ( res: Response, message: string, data : any = null) => {
    res.status(400).json({ message, data });
}
export const sendUnauthorisedError = ( res: Response, message: string, data : any = null) => {
    res.status(401).json({ message});
}
export const sendInternalServerError = ( res: Response, message: string, data : any = null) => {
    res.status(500).json({ message, data });
}