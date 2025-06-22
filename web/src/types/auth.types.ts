export enum EAuthFormType {
    Login = 'log-in',
    Register = 'create-account',
    ResetPassword = 'reset-password',
}

export type TAuthFormType = EAuthFormType

export interface IRegisterPayload {
    username: string
    email: string
    password: string
    acceptTerms: boolean
}

export interface ILoginPayload extends Omit<IRegisterPayload, 'username' | 'acceptTerms'> {}
