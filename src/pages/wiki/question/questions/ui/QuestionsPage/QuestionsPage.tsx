import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetQuestionsForLearnQuery, useGetQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';
import { useQuestionQueryNavigate } from '@/features/question/navigateQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.questions);
	const { isMobile, isMobileS, isTablet } = useScreenSize();

	const {
		filters,
		hasFilters,
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

	const {
		data: allQuestions,
		isLoading: isLoadingAllQuestions,
		isError: isErrorAllQuestions,
		refetch: refetchAllQuestions,
	} = useGetQuestionsListQuery(
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
	const questionsList = questions?.data || [];

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

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Questions.STUB_EMPTY_QUESTIONS_TITLE),
			subtitle: t(Questions.STUB_EMPTY_QUESTIONS_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		error: {
			onClick: refetchAllQuestions,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingAllQuestions || isLoadingLearnedQuestions || isLoadingCategories}
			hasError={isErrorAllQuestions}
			skeleton={<QuestionsPageSkeleton />}
			hasFilters={hasFilters}
			hasData={questionsList.length > 0}
			stubs={stubs}
			content={
				<FullQuestionsList questions={questionsList} onMoveQuestionDetail={onMoveQuestionDetail} />
			}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: questions?.limit || 0,
				total: questions?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex gap="20" align="start">
					<Card className={styles.main}>
						<div className={styles['questions-list-header']}>
							<Text variant={isMobileS ? 'body5-accent' : 'body6'} isMainTitle maxRows={1}>
								{t(Questions.TITLE_SHORT)}
							</Text>
							{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						</div>
						<hr className={styles.divider} />
						<>
							{content}
							{pagination}
						</>
					</Card>
					<Card className={styles.filters}>{renderFilters()}</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default QuestionsPage;
