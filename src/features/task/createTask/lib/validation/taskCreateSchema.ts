import * as yup from 'yup';

import { i18n, Translation } from '@/shared/config';

import { TaskCategoryCode, TaskDifficulty, TaskStructure } from '@/entities/task';

import { CreateTaskFormValues } from '../../model/types/taskCreateTypes';

export const taskCreateSchema: yup.ObjectSchema<CreateTaskFormValues> = yup.object().shape({
	name: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	description: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	difficulty: yup
		.number<TaskDifficulty>()
		.transform((value) => (Number.isNaN(value) ? null : value))
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	categoryCode: yup.string<TaskCategoryCode>().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	memoryLimit: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	timeLimit: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	constraints: yup
		.array()
		.of(yup.string().required())
		.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	// testCases: yup
	// 	.array()
	// 	.of(
	// 		yup.object<TestCase>().shape({
	// 			input: yup.object().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	// 			expected_output: yup.mixed().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	// 			is_hidden: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
	// 		}),
	// 	)
	// 	.required(i18n.t(Translation.VALIDATION_REQUIRED)),
	taskStructures: yup
		.array()
		.of(
			yup.object<TaskStructure>().shape({
				languageId: yup.number().required(i18n.t(Translation.VALIDATION_REQUIRED)),
				solutionStub: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
				testFixture: yup.string().required(i18n.t(Translation.VALIDATION_REQUIRED)),
				isActive: yup.boolean().required(i18n.t(Translation.VALIDATION_REQUIRED)),
			}),
		)
		.required(),
});
