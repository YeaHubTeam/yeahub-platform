import { authHandlers } from '@/entities/auth';
import { collectionHandlers } from '@/entities/collection';
import { companyHandlers } from '@/entities/company';
import { difficultQuestionsHandler, questionHandlers } from '@/entities/question';
import { quizHandlers } from '@/entities/question';
import { learnedQuestionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';
import { resourceHandlers } from '@/entities/resource';
import { skillHandlers } from '@/entities/skill';
import { specializationHandlers } from '@/entities/specialization';
import { specializationsProgressHandlers } from '@/entities/specialization';
import { usersRatingHandlers } from '@/entities/user';

import { questionDeleteHandlers } from '@/features/question/deleteQuestion';
import { learnQuestionHandlers } from '@/features/quiz/learnQuestion';
import { resetQuestionHandlers } from '@/features/quiz/resetQuestionStudyProgress';
import { skillDeleteHandlers } from '@/features/skill/deleteSkill';
import { specializationDeleteHandlers } from '@/features/specialization/deleteSpecialization';

import { questionCreateHandlers } from '@/pages/admin/question/questionCreate';
import { questionEditHandlers } from '@/pages/admin/question/questionEdit';
import { skillCreateHandlers } from '@/pages/admin/skill/skillCreate';
import { skillEditHandlers } from '@/pages/admin/skill/skillEdit';
import { specializationCreateHandlers } from '@/pages/admin/specialization/specializationCreate';
import { specializationEditHandlers } from '@/pages/admin/specialization/specializationEdit';
import { paymentHandlers } from '@/pages/profile/settings';

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
	...skillCreateHandlers,
	...skillEditHandlers,
	...specializationDeleteHandlers,
	...specializationCreateHandlers,
	...specializationEditHandlers,
	...skillDeleteHandlers,
	...learnQuestionHandlers,
	...resetQuestionHandlers,
	...quizHandlers,
	...difficultQuestionsHandler,
	...learnedQuestionHandlers,
	...specializationsProgressHandlers,
	...usersRatingHandlers,
	...resourceHandlers,
];
