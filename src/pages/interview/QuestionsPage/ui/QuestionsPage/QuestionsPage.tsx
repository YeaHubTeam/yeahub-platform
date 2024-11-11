import { useSearchParams } from 'react-router-dom';

import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';

import { useProfileQuery } from '@/entities/auth';
import { useGetLearnedQuestionsQuery, useGetQuestionsListQuery } from '@/entities/question';
import { useGetSkillsListQuery } from '@/entities/skill';

import {
	QuestionFilterStatus,
	QuestionsFilterPanel,
	QuestionsSummaryList,
} from '@/widgets/Question';

import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const MAX_LIMIT_CATEGORIES = 5;
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({ limit: MAX_LIMIT_CATEGORIES });
	const [queryParams] = useSearchParams();
	const keywords = queryParams.get('keywords');

	const { status, ...getParams } = filter;
	const { data: userProfile } = useProfileQuery();
	const profileId = userProfile?.profiles[0].id || '';
	const specializationId = userProfile?.profiles[0]?.specializationId || undefined;

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetQuestionsListQuery(
		{
			...getParams,
			specialization: specializationId,
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
				profileId,
				isLearned: status === 'learned',
				keywords: keywords ? [keywords] : undefined,
			},
			{
				skip: status === 'all',
			},
		);

	const questions = status === 'all' ? allQuestions : learnedQuestions;

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

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	if (isLoadingAllQuestions || isLoadingLearnedQuestions || isLoadingCategories) {
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
							currentPage={filter.page || 1}
							onPageChange={onPageChange}
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
						skillsLimit={MAX_LIMIT_CATEGORIES}
					/>
				</Card>
			</div>
		</section>
	);
};

export default QuestionsPage;
