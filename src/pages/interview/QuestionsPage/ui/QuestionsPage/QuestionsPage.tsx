import { useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId, getSpecializationId } from '@/entities/profile';
import {
	useGetQuestionsForLearnQuery,
	useGetQuestionsListQuery,
	useQuestionsFilters,
} from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import { useQuestionQueryNavigate } from '@/features/question/navigateQuestion';

import { QuestionsFilters } from '@/widgets/question/QuestionsFilters';
import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const {
		filters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
		onChangeStatus,
	} = useQuestionsFilters({
		page: 1,
		status: 'all',
	});
	const specializationId = useAppSelector(getSpecializationId);
	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_SHOW_LIMIT_SKILLS,
		specializations: [specializationId],
	});
	const { handleNavigation } = useQuestionQueryNavigate();

	const { status, ...getParams } = filters;
	const profileId = useAppSelector(getProfileId);

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetQuestionsListQuery(
		{
			...getParams,
			profileId,
			specialization: specializationId,
			areFavorites: status === 'favorite' ? true : undefined,
		},
		{
			skip: status ? !['all', 'favorite'].includes(status) : false,
		},
	);

	const { data: learnedQuestions, isLoading: isLoadingLearnedQuestions } =
		useGetQuestionsForLearnQuery(
			{
				...getParams,
				profileId,
				isLearned: status === 'learned',
			},
			{
				skip: status ? ['all', 'favorite'].includes(status) : true,
			},
		);

	const questions = status === 'all' || status === 'favorite' ? allQuestions : learnedQuestions;

	const onMoveQuestionDetail = (id: number) => {
		handleNavigation(id);
	};

	const renderFilters = () => (
		<QuestionsFilters
			onChangeTitle={onChangeTitle}
			onChangeSkills={onChangeSkills}
			onChangeComplexity={onChangeComplexity}
			onChangeRate={onChangeRate}
			onChangeStatus={onChangeStatus}
			filters={{
				skills: filters.skills,
				rate: filters.rate,
				complexity: filters.complexity,
				status: filters.status,
				title: filters.title,
			}}
		/>
	);

	if (isLoadingAllQuestions || isLoadingLearnedQuestions || isLoadingCategories) {
		return <QuestionsPageSkeleton />;
	}

	if (!questions) {
		return null;
	}

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<FullQuestionsList
					questions={questions.data}
					filterButton={<FiltersDrawer>{renderFilters()}</FiltersDrawer>}
					onMoveQuestionDetail={onMoveQuestionDetail}
				/>
				{questions.total > questions.limit && (
					// TODO Дубляжи в пагинации на других страницах
					<QuestionPagePagination
						questionsResponse={questions}
						currentPage={filters.page || 1}
						onPageChange={onChangePage}
					/>
				)}
				{questions.data.length === 0 && (
					<EmptyFilterStub text={getParams.title} resetFilters={onResetFilters} />
				)}
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default QuestionsPage;
