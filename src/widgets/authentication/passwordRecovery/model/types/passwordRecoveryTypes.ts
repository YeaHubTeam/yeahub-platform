import * as yup from 'yup';

import { passwordRecoverySchema } from '../lib/validation/passwordRecoverySchema';

export type PasswordRecoverySchema = yup.InferType<typeof passwordRecoverySchema>;
