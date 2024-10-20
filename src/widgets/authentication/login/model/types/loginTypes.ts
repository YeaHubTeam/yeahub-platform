import * as yup from 'yup';

import { loginSchema } from '../lib/validation/loginSchema';

export type LoginSchema = yup.InferType<typeof loginSchema>;
