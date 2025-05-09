import { authHandlers } from '@/entities/auth';
import { questionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';
import { skillHandlers } from '@/entities/skill';
import { specializationHandlers } from '@/entities/specialization';

import { questionCreateHandlers } from '@/features/question/createQuestion';
import { questionDeleteHandlers } from '@/features/question/deleteQuestion';
import { questionEditHandlers } from '@/features/question/editQuestion';
import { learnQuestionHandlers } from '@/features/quiz/learnQuestion';
import { resetQuestionHandlers } from '@/features/quiz/resetQuestionStudyProgress';
import { skillDeleteHandlers } from '@/features/skill/deleteSkill';
import { specializationCreateHandlers } from '@/features/specialization/createSpecialization';
import { specializationDeleteHandlers } from '@/features/specialization/deleteSpecialization';
import { specializationEditHandlers } from '@/features/specialization/editSpecialization';

export const handlers = [
	...authHandlers,
	...interviewHandlers,
	...questionHandlers,
	...specializationHandlers,
	...questionCreateHandlers,
	...questionDeleteHandlers,
	...questionEditHandlers,
	...skillHandlers,
	...questionEditHandlers,
	...specializationDeleteHandlers,
	...specializationCreateHandlers,
	...specializationEditHandlers,
	...skillDeleteHandlers,
	...learnQuestionHandlers,
	...resetQuestionHandlers,
];
