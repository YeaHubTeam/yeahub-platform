import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetQuestionsForLearnQuery, useGetQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';
import { useQuestionQueryNavigate } from '@/features/question/navigateQuestion';

import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const {
		filters,
		onChangePage,
		onChangeTitle,
		onChangeSkills,
		onChangeComplexity,
		onChangeRate,
		onChangeStatus,
		onResetFilters,
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
				<TablePagination
					page={filters.page || 1}
					onChangePage={onChangePage}
					limit={questions.limit}
					total={questions.total}
				/>
				{questions.data.length === 0 && <Stub type="filter-empty" onClick={onResetFilters} />}
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default QuestionsPage;
