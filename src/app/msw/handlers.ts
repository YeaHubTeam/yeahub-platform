import { authHandlers } from '@/entities/auth';
import { collectionHandlers } from '@/entities/collection';
import { companyHandlers } from '@/entities/company';
import { paymentHandlers } from '@/entities/payment';
import { questionHandlers } from '@/entities/question';
import { quizHandlers } from '@/entities/question';
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

// eslint-disable-next-line @conarti/feature-sliced/public-api
import { difficultQuestionsHandler } from '@/widgets/question/MostDifficultQuestions/api/__mocks__/index';

export const handlers = [
	...authHandlers,
	...companyHandlers,
	...paymentHandlers,
	...interviewHandlers,
	...questionHandlers,
	...collectionHandlers,
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
	...quizHandlers,
	...difficultQuestionsHandler,
];
