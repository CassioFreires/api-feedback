export default interface IUser {
    id:number,
    email:string,
    name:string,
    last_login:Date,
    isActive: boolean,
    two_factor_anable: boolean,
    role_id: number
}