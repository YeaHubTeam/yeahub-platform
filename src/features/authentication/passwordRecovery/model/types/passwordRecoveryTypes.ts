import { User } from '@/entities/auth';

export interface PasswordRecoveryFormValues {
	password: string;
	confirmPassword: string;
}

export interface ResetPasswordParams {
	password: string;
	passwordConfirm: string;
	token: string;
}

export interface ResetPasswordResponse {
	access_token: string;
	user: User;
}
