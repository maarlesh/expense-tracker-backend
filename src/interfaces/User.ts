export interface User{
    oid : Float32Array,
    name : string,
    password : string,
    email? : string,
    phoneNumber? : string
}