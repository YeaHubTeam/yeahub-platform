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
import { referralLinksHandlers } from '@/entities/referralLink';
import { resourcesHandlers } from '@/entities/resource';
import { skillHandlers } from '@/entities/skill';
import { specializationHandlers, specializationsProgressHandlers } from '@/entities/specialization';
import { subscriptionHandlers } from '@/entities/subscription';
import { taskHandlers } from '@/entities/task';
import { topicHandlers } from '@/entities/topic';
import { userHandlers } from '@/entities/user';
import { usersRatingHandlers } from '@/entities/user';

import { createCollectionHandlers } from '@/features/collections/createCollection';
import { collectionDeleteHandlers } from '@/features/collections/deleteCollection';
import { createCompanyHandlers } from '@/features/company/createCompany';
import { deleteCompanyHandlers } from '@/features/company/deleteCompany';
import { createFeatureFlagHandlers } from '@/features/featureFlag/createFeatureFlag';
import { featureFlagDeleteHandlers } from '@/features/featureFlag/deleteFeatureFlag';
import { setActiveProfileHandlers } from '@/features/profile/setActiveProfile';
import { questionCreateHandlers } from '@/features/question/createQuestion';
import { questionDeleteHandlers } from '@/features/question/deleteQuestion';
import { questionEditHandlers } from '@/features/question/editQuestion';
import { learnQuestionHandlers } from '@/features/quiz/learnQuestion';
import { resetQuestionHandlers } from '@/features/quiz/resetQuestionStudyProgress';
import { referralLinkDeleteHandlers } from '@/features/referralLinks/deleteReferralLink';
import { referralLinkEditHandlers } from '@/features/referralLinks/editReferralLink';
import { skillCreateHandlers } from '@/features/skill/createSkill';
import { skillDeleteHandlers } from '@/features/skill/deleteSkill';
import { skillEditHandlers } from '@/features/skill/editSkill';
import { specializationCreateHandlers } from '@/features/specialization/createSpecialization';
import { specializationDeleteHandlers } from '@/features/specialization/deleteSpecialization';
import { specializationEditHandlers } from '@/features/specialization/editSpecialization';
import { paymentsIdHandlers } from '@/features/subscriptions/subscribe';
import { taskCreateHandlers } from '@/features/task/createTask';
import { createTopicHandlers } from '@/features/topics/createTopics';
import { topicDeleteHandlers } from '@/features/topics/deleteTopic';
import { topicEditHandlers } from '@/features/topics/editTopic';

export const handlers = [
	...authHandlers,
	...companyHandlers,
	...deleteCompanyHandlers,
	...paymentHandlers,
	...interviewHandlers,
	...questionHandlers,
	...collectionHandlers,
	...collectionDeleteHandlers,
	...specializationHandlers,
	...featureFlagHandlers,
	...questionCreateHandlers,
	...questionDeleteHandlers,
	...questionEditHandlers,
	...skillHandlers,
	...skillCreateHandlers,
	...skillEditHandlers,
	...questionEditHandlers,
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
	...topicDeleteHandlers,
	...hhAnalyticsHandlers,
	...createTopicHandlers,
	...createCollectionHandlers,
	...topicEditHandlers,
	...createCompanyHandlers,
	...featureFlagDeleteHandlers,
	...paymentsIdHandlers,
	...createFeatureFlagHandlers,
	...programmingLanguageHandlers,
	...referralLinksHandlers,
	...referralLinkDeleteHandlers,
	...referralLinkEditHandlers,
	...taskHandlers,
	...taskCreateHandlers,
	...setActiveProfileHandlers,
];
