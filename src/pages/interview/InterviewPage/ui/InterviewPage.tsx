import { useMemo } from 'react';

import NoActiveQuizPlaceholder from '@/shared/assets/images/NoActiveQuizPlaceholder.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { getFullProfile, getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';
import {
	getActiveQuizQuestions,
	useGetActiveQuizQuery,
	useGetHistoryQuizQuery,
	useGetProfileQuizStatsQuery,
} from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionLargePreview, QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewQuestionsList } from '@/widgets/InterviewQuestions';
import { SpecializationEmptyStub } from '@/widgets/SpecializationEmptyStub';

import styles from './InterviewPage.module.css';
import { InterviewPageSkeleton } from './InterviewPage.skeleton';

const InterviewPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);

	const profileId = useAppSelector(getProfileId);
	const specializationId = useAppSelector(getSpecializationId);
	const profile = useAppSelector(getFullProfile);

	const { data: profileStats, isLoading: isProfileStatsLoading } =
		useGetProfileQuizStatsQuery(profileId);

	const { isLoading: isHistoryLoading } = useGetHistoryQuizQuery({
		profileId,
		limit: 3,
		uniqueKey: 'interviewPreviewHistory',
	});

	const params = {
		random: true,
		limit: 3,
		specialization: specializationId,
	};

	const { isLoading: isQuestionsListLoading } = useGetQuestionsListQuery(params);

	const { isLoading: isActiveQuizLoading } = useGetActiveQuizQuery({
		profileId,
		limit: 1,
		page: 1,
	});

	const questionStats = profileStats
		? [
				{
					title: t(Interview.STATS_STATSSTUDIED_ALLQUESTIONS),
					value: String(profileStats.questionsStat.uniqueQuestionsCount),
					route: `${ROUTES.interview.questions.page}?page=1&status=all`,
				},
				{
					title: t(Interview.STATS_STATSSTUDIED_NEWQUESTIONS),
					value: String(profileStats.questionsStat.unlearnedQuestionsCount),
					route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
				},
				{
					title: t(Interview.STATS_STATSSTUDIED_INPROCESS),
					value: String(profileStats.questionsStat.inProgressQuestionsCount),
					route: `${ROUTES.interview.questions.page}?page=1&status=not-learned`,
				},
				{
					title: t(Interview.STATS_STATSSTUDIED_STUDIED),
					value: String(profileStats.questionsStat.learnedQuestionsCount),
					route: `${ROUTES.interview.questions.page}?page=1&status=learned`,
				},
			]
		: [];

	const allQuestion = profileStats?.questionsStat.uniqueQuestionsCount;
	const newQuestion = profileStats?.questionsStat.unlearnedQuestionsCount;
	const newUser = allQuestion === newQuestion;

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);

	const isSpecializationEmpty = specializationId === 0;

	const lastActiveQuizInfo = useMemo(() => {
		if (!activeQuizQuestions || !activeQuizQuestions.length) return null;

		const questionWithoutAnswer =
			activeQuizQuestions.find((question) => !question.answer) ?? activeQuizQuestions[0];
		const questionIndexWithoutAnswer = activeQuizQuestions.findIndex(
			(question) => !question.answer,
		);
		return {
			question: questionWithoutAnswer,
			fromQuestionNumber: questionIndexWithoutAnswer >= 0 ? questionIndexWithoutAnswer + 1 : 1,
			toQuestionNumber: activeQuizQuestions.length,
		};
	}, [activeQuizQuestions]);

	if (isProfileStatsLoading || isActiveQuizLoading || isHistoryLoading || isQuestionsListLoading) {
		return <InterviewPageSkeleton />;
	}

	const interviewPreparationActionTitleKey =
		!profile?.isEmailVerified && !isSpecializationEmpty
			? Interview.VERIFY_EMAIL_LINK
			: lastActiveQuizInfo
				? Interview.PREPARATION_ACTIVELINKTEXT
				: Interview.PREPARATION_NOACTIVELINKTEXT;

	const interviewPreparationActionRoute =
		!profile?.isEmailVerified && !isSpecializationEmpty
			? EMAIL_VERIFY_SETTINGS_TAB
			: lastActiveQuizInfo
				? ROUTES.interview.new.page
				: ROUTES.interview.quiz.page;

	const statsActionTitleKey = !profile?.isEmailVerified
		? Interview.VERIFY_EMAIL_LINK
		: Interview.STATS_LINKTEXT;

	const statsActionRoute = !profile?.isEmailVerified
		? EMAIL_VERIFY_SETTINGS_TAB
		: ROUTES.interview.statistic.page;

	return (
		<div className={styles.container}>
			<Card
				className={styles.interview}
				actionDisabled={isSpecializationEmpty}
				title={t(Interview.PREPARATION_TITLE)}
				actionTitle={t(interviewPreparationActionTitleKey)}
				actionRoute={interviewPreparationActionRoute}
				withShadow
			>
				{isSpecializationEmpty ? (
					<SpecializationEmptyStub />
				) : (
					<>
						{lastActiveQuizInfo ? (
							<div className={styles.preparation}>
								<QuestionProgressBarBlock
									fromQuestionNumber={lastActiveQuizInfo.fromQuestionNumber}
									toQuestionNumber={lastActiveQuizInfo.toQuestionNumber}
								/>
								<QuestionLargePreview question={lastActiveQuizInfo.question} />
							</div>
						) : (
							<div className={styles['preparation-empty']}>
								<h2 className={styles['inactive-title']}>
									{t(Interview.PREPARATION_NOACTIVETITLE)}
								</h2>
								<p className={styles['inactive-description']}>
									{t(Interview.PREPARATION_NOACTIVEDESCRIPTION)}
								</p>
								<img
									className={styles['preparation-noactiveimage']}
									src={NoActiveQuizPlaceholder}
									alt="no active quiz"
								/>
							</div>
						)}
					</>
				)}
			</Card>

			{!isSpecializationEmpty && (
				<Card
					className={styles.statistics}
					isActionPositionBottom
					title={t('stats.title')}
					actionTitle={t(statsActionTitleKey)}
					actionRoute={statsActionRoute}
					actionDisabled={profile?.isEmailVerified && newUser}
				>
					<div className={styles['statistics-wrapper']}>
						<PassedQuestionChart
							total={profileStats ? profileStats.questionsStat.uniqueQuestionsCount : 0}
							learned={profileStats ? profileStats.questionsStat.learnedQuestionsCount : 0}
						/>
						<PassedQuestionStatInfo stats={questionStats} />
					</div>
				</Card>
			)}

			{!isSpecializationEmpty && (
				<>
					<InterviewQuestionsList />
					<InterviewHistoryList />
				</>
			)}
		</div>
	);
};

export default InterviewPage;
