import * as yup from 'yup';

import { registerSchema } from '../lib/validation/registerSchema';

export type UserSchema = yup.InferType<typeof registerSchema>;
