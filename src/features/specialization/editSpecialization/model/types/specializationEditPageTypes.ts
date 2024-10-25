import * as yup from 'yup';

import { specializationEditSchema } from '../lib/validation/specializationEditSchema';

export type SpecializationEditSchema = yup.InferType<typeof specializationEditSchema>;
