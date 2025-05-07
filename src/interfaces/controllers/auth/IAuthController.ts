import { Request, Response } from "express"

export interface IAuthController {
    signup(req:Request, res:Response):Promise<Response>;
    signin(req:Request, res:Response):Promise<Response>;
    refresh(req:Request, res:Response):Promise<Response>;
    logout(req:Request, res:Response):Promise<Response>;
    verify2fa(req:Request, res:Response):Promise<Response>;
    enable2fa (req:Request, res:Response):Promise<Response>;
    disable2fa(req:Request, res:Response):Promise<Response>;
}