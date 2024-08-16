import * as yup from 'yup';

import { profileSchema } from '../lib/validation/profileSchema';

export type ProfileSchema = yup.InferType<typeof profileSchema>;
