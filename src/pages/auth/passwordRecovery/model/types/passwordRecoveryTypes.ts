import * as yup from 'yup';

import { User } from '@/entities/auth';

import { passwordRecoverySchema } from '../../lib/validation/passwordRecoverySchema';

export type PasswordRecoverySchema = yup.InferType<typeof passwordRecoverySchema>;

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
