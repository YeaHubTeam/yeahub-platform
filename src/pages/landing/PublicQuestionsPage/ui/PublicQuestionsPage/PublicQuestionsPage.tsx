import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { useModal } from '@/shared/hooks/useModal';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { useGetSkillsListQuery } from '@/entities/skill';

import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import { useTitleFromQuery } from '../../hooks/useTitleFromQuery';
import { PublicQuestionsFilterPanel } from '../PublicQuestionsFilterPanel/PublicQuestionsFilterPanel';
import { PublicQuestionPagePagination } from '../PublicQuestionsPagePagination/PublicQuestionPagePagination';

import styles from './PublicQuestionsPage.module.css';
import { PublicQuestionsPageSkeleton } from './PublicQuestionsPage.skeleton';

const MAX_LIMIT_CATEGORIES = 5;

const PublicQuestionsPage = () => {
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({ limit: MAX_LIMIT_CATEGORIES });
	const [queryParams] = useSearchParams();
	const keywords = queryParams.get('keywords');
	const { isOpen, onToggle, onClose } = useModal();

	const { status, ...getParams } = filter;
	const additionalTitle = useTitleFromQuery();

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetPublicQuestionsListQuery(
		{
			...getParams,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: status !== 'all',
		},
	);

	const onChangeSpecialization = (value: number | undefined) => {
		handleFilterChange({ specialization: value, skills: undefined });
	};

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

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
	};

	const renderFilters = () => (
		<PublicQuestionsFilterPanel
			onChangeSearch={onChangeSearchParams}
			onChangeSkills={onChangeSkills}
			onChangeComplexity={onChangeComplexity}
			onChangeRate={onChangeRate}
			onChangeSpecialization={onChangeSpecialization}
			filter={{
				skills: filter.skills,
				rate: filter.rate,
				complexity: filter.complexity,
				title: filter.title,
				specialization: filter.specialization,
			}}
			specializationLimit={MAX_LIMIT_CATEGORIES}
		/>
	);

	if (isLoadingAllQuestions || isLoadingCategories) {
		return <PublicQuestionsPageSkeleton />;
	}

	if (!allQuestions) {
		return null;
	}

	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<div className={styles['filters-mobile']}>
				<IconButton
					className={classNames({ [styles.active]: isOpen })}
					aria-label="go to filters"
					form="square"
					icon={<Icon icon="slidersHorizontal" color="black-700" />}
					size="small"
					variant={'tertiary'}
					onClick={onToggle}
				/>
				{isOpen && (
					<Drawer
						rootName="body"
						isOpen={isOpen}
						onClose={onClose}
						className={styles.drawer}
						hasCloseButton
					>
						<Card className={styles['drawer-content']}>{renderFilters()}</Card>
					</Drawer>
				)}
			</div>
			<Card className={styles.main}>
				<FullQuestionsList
					questions={allQuestions.data}
					isPublic
					additionalTitle={additionalTitle}
				/>
				{allQuestions.total > allQuestions.limit && (
					<PublicQuestionPagePagination
						questionsResponse={allQuestions}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}
				{allQuestions.data.length === 0 && (
					<EmptyStub text={getParams.title} resetFilters={resetFilters} />
				)}
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default PublicQuestionsPage;
