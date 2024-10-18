import * as yup from 'yup';

import { skillCreateSchema } from '../lib/validation/skillCreateSchema';

export type SkillCreateSchema = yup.InferType<typeof skillCreateSchema>;
