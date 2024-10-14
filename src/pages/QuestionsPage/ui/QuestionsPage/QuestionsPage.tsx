import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';

import { useProfileQuery } from '@/entities/auth';
import { useGetLearnedQuestionsQuery, useGetQuestionsListQuery } from '@/entities/question';

import {
	QuestionFilterStatus,
	QuestionsFilterPanel,
	QuestionsSummaryList,
} from '@/widgets/Question';

import { useQueryFilter } from '../../model/hooks/useQueryFilter';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const { filter, handleFilterChange } = useQueryFilter();
	const dispatch = useAppDispatch();
	const [queryParams] = useSearchParams();
	const keywords = queryParams.get('keywords');

	const { status: tmpStatus, ...tmpGetParams } = filter;
	const { data: userProfile } = useProfileQuery();
	const profileId = userProfile?.profiles[0].id || '';
	const specializationId = userProfile?.profiles[0]?.specializationId || undefined;

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetQuestionsListQuery(
		{
			...tmpGetParams,
			specialization: specializationId,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: tmpStatus !== 'all',
		},
	);
	const { data: learnedQuestions, isLoading: isLoadingLearnedQuestions } =
		useGetLearnedQuestionsQuery(
			{
				...tmpGetParams,
				profileId,
				isLearned: tmpStatus === 'learned',
				keywords: keywords ? [keywords] : undefined,
			},
			{
				skip: tmpStatus === 'all',
			},
		);

	const questions = tmpStatus === 'all' ? allQuestions : learnedQuestions;

	const onChangeSearchParams = (value: string) => {
		handleFilterChange({ title: value });
	};

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ skills });
	};

	const onChangeComplexity = (complexity?: number[]) => {
		handleFilterChange({ complexity });
	};

	const onChangeRate = (rate: number[]) => {
		handleFilterChange({ rate });
	};

	const onChangeStatus = (status: QuestionFilterStatus) => {
		handleFilterChange({ status });
	};

	const resetFilters = () => {
		dispatch(questionsPageActions.resetFilters());
	};

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
						<QuestionPagePagination
							questionsResponse={questions}
							// currentPage={filter.page}
							// onPageChange={onPageChange}
						/>
					)}
					{questions.data.length === 0 && <EmptyStub resetFilters={resetFilters} />}
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
						filter={{
							skills: filter.skills,
							rate: filter.rate,
							complexity: filter.complexity,
							status: filter.status,
							title: filter.title,
						}}
					/>
				</Card>
			</div>
		</section>
	);
};

export default QuestionsPage;
