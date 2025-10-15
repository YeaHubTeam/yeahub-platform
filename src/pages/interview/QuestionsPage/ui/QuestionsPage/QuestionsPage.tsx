import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { useScreenSize, useModal, useAppSelector, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { getProfileId, getSpecializationId } from '@/entities/profile';
import { useGetLearnedQuestionsQuery, useGetQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';

import {
	QuestionFilterStatus,
	QuestionsFilterPanel,
} from '@/widgets/question/QuestionsFilterPanel';
import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';
import { QuestionsPageSkeleton } from './QuestionsPage.skeleton';

const QuestionsPage = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const specializationId = useAppSelector(getSpecializationId);
	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_SHOW_LIMIT_SKILLS,
		specializations: [specializationId],
	});
	const [queryParams] = useSearchParams();
	const keywords = queryParams.get('keywords');
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();

	const { status, ...getParams } = filter;
	const profileId = useAppSelector(getProfileId);

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetQuestionsListQuery(
		{
			...getParams,
			profileId,
			specialization: specializationId,
			areFavorites: status === 'favorite' ? true : undefined,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: status ? !['all', 'favorite'].includes(status) : false,
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
				skip: status ? ['all', 'favorite'].includes(status) : true,
			},
		);

	const questions = status === 'all' || status === 'favorite' ? allQuestions : learnedQuestions;

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

	const renderFilters = () => (
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
				status: filter.status as QuestionFilterStatus,
				title: filter.title,
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
			<div className={styles['filters-mobile']}>
				<IconButton
					className={classNames({ [styles.active]: isOpen })}
					aria-label="go to filters"
					form="square"
					icon={<Icon icon="slidersHorizontal" color="black-700" />}
					size="small"
					variant="tertiary"
					onClick={onToggle}
				/>
				<Drawer
					rootName={isMobileS ? 'body' : 'mainLayout'}
					className={classNames(styles.drawer, {
						[styles['drawer-mobile']]: isMobileS,
					})}
					isOpen={isOpen}
					onClose={onClose}
					hasCloseButton
				>
					<Card>{renderFilters()}</Card>
				</Drawer>
			</div>
			<Card className={styles.main}>
				<FullQuestionsList questions={questions.data} />
				{questions.total > questions.limit && (
					// TODO Дубляжи в пагинации на других страницах
					<QuestionPagePagination
						questionsResponse={questions}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}
				{questions.data.length === 0 && (
					<EmptyFilterStub text={getParams.title} resetFilters={resetFilters} />
				)}
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default QuestionsPage;
