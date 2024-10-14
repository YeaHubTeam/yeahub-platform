import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import NoActiveQuizPlaceholder from '@/shared/assets/images/NoActiveQuizPlaceholder.png';
import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Loader } from '@/shared/ui/Loader';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { useProfileQuery } from '@/entities/auth';
import {
	getActiveQuizQuestions,
	useGetActiveQuizQuery,
	useGetProfileStatsQuery,
} from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionLargePreview, QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);

	const { data: profile } = useProfileQuery();

	const { data: profileStats } = useGetProfileStatsQuery(profile?.profiles[0].id ?? '');

	const { isLoading: isActiveQuizLoading } = useGetActiveQuizQuery({
		profileId: profile?.profiles[0].id,
		params: { limit: 1, page: 1 },
	});

	const questionStats = profileStats
		? [
				{
					title: t(Interview.STATS_STATSSTUDIED_ALLQUESTIONS),
					value: String(profileStats.questionsStat.uniqueQuestionsCount),
				},
				{
					title: t(Interview.STATS_STATSSTUDIED_NOTSTUDIED),
					value: String(profileStats.questionsStat.unlearnedQuestionsCount),
				},
				{
					title: t(Interview.STATS_STATSSTUDIED_STUDIED),
					value: String(profileStats.questionsStat.learnedQuestionsCount),
				},
			]
		: [];

	const navigate = useNavigate();

	const activeQuizQuestions = useAppSelector(getActiveQuizQuestions);

	const isSpecializationEmpty = profile?.profiles[0].specializationId === 0;

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

	const handleProfileRedirect = () => {
		navigate(ROUTES.profile.edit.page);
	};

	return (
		<div className={styles.container}>
			<Card
				className={styles.interview}
				actionDisabled={isSpecializationEmpty}
				title={t(Interview.PREPARATION_TITLE)}
				actionTitle={t(
					lastActiveQuizInfo
						? Interview.PREPARATION_ACTIVELINKTEXT
						: Interview.PREPARATION_NOACTIVELINKTEXT,
				)}
				actionRoute={lastActiveQuizInfo ? ROUTES.interview.new.page : ROUTES.interview.quiz.page}
				withShadow
			>
				{!isActiveQuizLoading ? (
					<>
						{isSpecializationEmpty ? (
							<div className={styles['preparation-wrapper']}>
								<h2 className={styles['inactive-title']}>{t(Interview.PREPARATION_STUB_TITLE)}</h2>
								<p className={styles['inactive-description']}>
									{t(Interview.PREPARATION_STUB_DESCRIPTION)}
								</p>
								<Button onClick={handleProfileRedirect} className={styles.button} size="large">
									{t(Interview.FILLPROFILE_BUTTON)}
								</Button>
							</div>
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
					</>
				) : (
					<Loader />
				)}
			</Card>

			{!isSpecializationEmpty && (
				<Card
					className={styles.statistics}
					isActionPositionBottom
					title={t('stats.title')}
					actionTitle={t('stats.linkText')}
					actionRoute={ROUTES.interview.statistic.page}
					actionDisabled={!lastActiveQuizInfo}
				>
					<PassedQuestionChart
						total={profileStats ? profileStats.questionsStat.uniqueQuestionsCount : 0}
						learned={profileStats ? profileStats.questionsStat.learnedQuestionsCount : 0}
					/>
					<PassedQuestionStatInfo stats={questionStats} />
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
