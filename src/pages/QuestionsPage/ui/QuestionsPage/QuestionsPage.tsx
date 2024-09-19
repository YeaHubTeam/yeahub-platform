import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import { useGetLearnedQuestionsQuery, useGetQuestionsListQuery } from '@/entities/question';

import {
	QuestionFilterStatus,
	QuestionsFilterPanel,
	QuestionsSummaryList,
} from '@/widgets/Question';

import { getQuestionsPageFilter } from '../../model/selectors/questionsPageSelectors';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const params = useSelector(getQuestionsPageFilter);
	const dispatch = useAppDispatch();
	const [queryParams] = useSearchParams();
	const keywords = queryParams.get('keywords');

	const { status, ...getParams } = params;
	const { data: userProfile } = useProfileQuery();
	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetQuestionsListQuery(
		{
			...getParams,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: status !== 'all',
		},
	);
	const { data: learnedQuestions, isLoading: isLoadingLearnedQuestions } =
		useGetLearnedQuestionsQuery(
			{
				...getParams,
				profileId: userProfile?.profiles[0].profileId || '',
				isLearned: status === 'learned',
				keywords: keywords ? [keywords] : undefined,
			},
			{
				skip: status === 'all',
			},
		);

	const questions = status === 'all' ? allQuestions : learnedQuestions;

	const onChangeSearchParams = (value: string) => {
		dispatch(questionsPageActions.setTitle(value));
	};

	const onChangeSkills = (skills: number[] | undefined) => {
		dispatch(questionsPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[]) => {
		dispatch(questionsPageActions.setComplexity(complexity));
	};

	const onChangeRate = (rate: number[]) => {
		dispatch(questionsPageActions.setRate(rate));
	};

	const onChangeStatus = (status: QuestionFilterStatus) => {
		dispatch(questionsPageActions.setStatus(status));
	};

	const { data: profile } = useProfileQuery();
	const profileId = profile?.profiles[0]?.profileId || '';

	if (isLoadingAllQuestions || isLoadingLearnedQuestions) {
		return <QuestionsPageSkeleton />;
	}

	if (!questions) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<QuestionsSummaryList questions={questions.data} profileId={profileId} />
					{questions.total > questions.limit && (
						<QuestionPagePagination questionsResponse={questions} />
					)}
				</Card>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Card className={styles.search}>
					<QuestionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSkills={onChangeSkills}
						onChangeComplexity={onChangeComplexity}
						onChangeRate={onChangeRate}
						onChangeStatus={onChangeStatus}
						filter={params}
					/>
				</Card>
			</div>
		</section>
	);
};

export default QuestionsPage;
