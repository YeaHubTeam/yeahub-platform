import * as yup from 'yup';

import { skillEditSchema } from '../lib/validation/skillEditSchema';

export type SkillEditSchema = yup.InferType<typeof skillEditSchema>;
