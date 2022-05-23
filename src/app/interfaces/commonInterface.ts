export interface Login {
   username:string,
   password:string,
   role:string
}

export interface Token {
   token:string,
   expiry:string,
   user:string,
   role:string
}

export interface Register {
   username:string,
   password:string,
   passwordCnfm:string
}