import * as yup from 'yup';

import { changePasswordSchema } from '../lib/validation/changePasswordSchema';

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>;
