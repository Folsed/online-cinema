export enum EAuthFormType {
    Login = 'log-in',
    Register = 'create-account',
    ResetPassword = 'reset-password',
    CreateNewPassword = 'create-new-password',
}

export type TAuthFormType = EAuthFormType

export interface IRegisterPayload {
    username: string
    email: string
    password: string
    acceptTerms: boolean
}

export interface ILoginPayload extends Omit<IRegisterPayload, 'username' | 'acceptTerms'> {}

export interface IResetPasswordRequest {
    email: string
}

export interface IResetPasswordRequestResponse {
    message: string
}

export interface IResetPasswordConfirm {
    token: string
    newPassword: string
    confirmPassword: string
}

export interface IResetPasswordConfirmResponse {
    message: string
}
