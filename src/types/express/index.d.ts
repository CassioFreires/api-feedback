import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        data: {
          id:number,
          email:string,
          name:string,
          role_name:string,
          description:string
        } 
      }
    }
  }