import * as yup from 'yup';

import { specializationCreateSchema } from '../lib/validation/specializationCreateSchema';

export type SpecializationCreateSchema = yup.InferType<typeof specializationCreateSchema>;
