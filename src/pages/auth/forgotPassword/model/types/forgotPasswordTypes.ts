import * as yup from 'yup';

import { forgotPasswordSchema } from '../../lib/validation/forgotPasswordSchema';

export type ForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>;

export interface ForgotPasswordFormValues {
	username: string;
}

export interface SendEmailRecoveryPasswordParams {
	email: string;
}
