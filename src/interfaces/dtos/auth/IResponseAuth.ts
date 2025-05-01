
export interface IAuthData {
    id: string;
    name: string;
    token: string;
}

export interface IResponseAuth {
    message?: string,
    status?:number,
    data?: IAuthData;
}