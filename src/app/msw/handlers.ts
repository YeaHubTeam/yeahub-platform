import { authHandlers } from '@/entities/auth';
import { collectionHandlers } from '@/entities/collection';
import { companyHandlers } from '@/entities/company';
import { featureFlagHandlers } from '@/entities/featureFlag';
import { hhAnalyticsHandlers } from '@/entities/hh';
import { paymentHandlers } from '@/entities/payment';
import { programmingLanguageHandlers } from '@/entities/programmingLanguage';
import {
	difficultQuestionsHandler,
	learnedQuestionHandlers,
	questionHandlers,
	quizHandlers,
} from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';
import { resourcesHandlers } from '@/entities/resource';
import { skillHandlers } from '@/entities/skill';
import { specializationHandlers, specializationsProgressHandlers } from '@/entities/specialization';
import { subscriptionHandlers } from '@/entities/subscription';
import { taskHandlers } from '@/entities/task';
import { topicHandlers } from '@/entities/topic';
import { userHandlers } from '@/entities/user';
import { usersRatingHandlers } from '@/entities/user';
import { vacancyHandlers } from '@/entities/vacancy';

import { collectionDeleteHandlers } from '@/features/collections/deleteCollection';
import { setActiveProfileHandlers } from '@/features/profile/setActiveProfile';
import { questionDeleteHandlers } from '@/features/question/deleteQuestion';
import { learnQuestionHandlers } from '@/features/quiz/learnQuestion';
import { resetQuestionHandlers } from '@/features/quiz/resetQuestionStudyProgress';
import { skillDeleteHandlers } from '@/features/skill/deleteSkill';
import { specializationCreateHandlers } from '@/features/specialization/createSpecialization';
import { specializationDeleteHandlers } from '@/features/specialization/deleteSpecialization';
import { specializationEditHandlers } from '@/features/specialization/editSpecialization';
import { paymentsIdHandlers } from '@/features/subscriptions/subscribe';
import { taskCreateHandlers } from '@/features/task/createTask';
import { deleteTaskHandlers } from '@/features/task/deleteTask';
import { createTopicHandlers } from '@/features/topics/createTopics';

export const handlers = [
	...authHandlers,
	...companyHandlers,
	...paymentHandlers,
	...interviewHandlers,
	...questionHandlers,
	...collectionHandlers,
	...collectionDeleteHandlers,
	...specializationHandlers,
	...featureFlagHandlers,
	...questionDeleteHandlers,
	...skillHandlers,
	...specializationDeleteHandlers,
	...specializationCreateHandlers,
	...specializationEditHandlers,
	...skillDeleteHandlers,
	...subscriptionHandlers,
	...learnQuestionHandlers,
	...resetQuestionHandlers,
	...quizHandlers,
	...difficultQuestionsHandler,
	...learnedQuestionHandlers,
	...specializationsProgressHandlers,
	...resourcesHandlers,
	...userHandlers,
	...usersRatingHandlers,
	...topicHandlers,
	...hhAnalyticsHandlers,
	...createTopicHandlers,
	...paymentsIdHandlers,
	...programmingLanguageHandlers,
	...taskHandlers,
	...taskCreateHandlers,
	...deleteTaskHandlers,
	...setActiveProfileHandlers,
	...vacancyHandlers,
];
