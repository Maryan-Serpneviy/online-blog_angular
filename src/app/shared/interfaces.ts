export interface IFirebase {
   apiKey: string
}

export interface IFirebaseAuth {
   idToken: string
   expiresIn: string
}

export interface IEnvironment extends IFirebase {
   production: boolean
}

export interface User {
   email: string
   password: string
   returnSecureToken?: boolean
}

