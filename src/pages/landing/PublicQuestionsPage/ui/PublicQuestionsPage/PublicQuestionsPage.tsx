import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { MAX_LIMIT_CATEGORIES } from '@/shared/constants/queryConstants';
import { useModal } from '@/shared/hooks/useModal';
import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { useGetSkillsListQuery } from '@/entities/skill';

import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import {
	getSkillTitles,
	getSpecializationTitleFromSkills,
	transformSpecializationToGetSkills,
} from '../../model/helpers/getTitleFromQuery';
import { PublicQuestionsFilterPanel } from '../PublicQuestionsFilterPanel/PublicQuestionsFilterPanel';
import { PublicQuestionPagePagination } from '../PublicQuestionsPagePagination/PublicQuestionPagePagination';

import styles from './PublicQuestionsPage.module.css';
import { PublicQuestionsPageSkeleton } from './PublicQuestionsPage.skeleton';

const PublicQuestionsPage = () => {
	const { isOpen, onToggle, onClose } = useModal();
	const { filter, handleFilterChange, resetFilters } = useQueryFilter();
	const [queryParams] = useSearchParams();
	const { isMobile, isTablet } = useScreenSize();
	const keywords = queryParams.get('keywords');

	const { status, ...getParams } = filter;

	const preparedSpecializationsIds = useMemo(() => {
		return transformSpecializationToGetSkills(filter.specialization);
	}, [filter.specialization]);

	const { data: skills, isLoading: isLoadingCategories } = useGetSkillsListQuery(
		{
			limit: MAX_LIMIT_CATEGORIES,
			specializations: preparedSpecializationsIds,
		},
		{ skip: !filter.specialization },
	);

	const specializationName = getSpecializationTitleFromSkills(skills?.data, filter.specialization);

	const skillNames = getSkillTitles(skills?.data, filter.skills);
	const additionalTitle = specializationName || skillNames || '';

	const { data: questions, isLoading: isLoadingQuestions } = useGetPublicQuestionsListQuery(
		{
			...getParams,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: status !== 'all' || !filter.specialization,
		},
	);

	if (isLoadingQuestions || isLoadingCategories) {
		return <PublicQuestionsPageSkeleton />;
	}

	if (!questions) {
		return null;
	}

	const onChangeSpecialization = (value: number | undefined) => {
		handleFilterChange({ specialization: value ? [value] : undefined, skills: undefined });
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

	const filterButton = (
		<div className={styles['filters-mobile']}>
			<IconButton
				className={styles['filters-mobile-button']}
				aria-label="go to filters"
				form="square"
				icon={<Icon icon="slidersHorizontal" color="black-700" />}
				size="small"
				variant={'tertiary'}
				onClick={onToggle}
			/>
			<Drawer
				rootName="body"
				isOpen={isOpen}
				onClose={onClose}
				className={styles.drawer}
				hasCloseButton
			>
				<Card className={styles['drawer-content']}>{renderFilters()}</Card>
			</Drawer>
		</div>
	);

	return (
		<Flex gap="20" align="start" className={styles.wrapper}>
			<Card className={styles.main}>
				<FullQuestionsList
					questions={questions.data}
					isPublic
					additionalTitle={additionalTitle}
					filterButton={filterButton}
				/>

				{questions.total > questions.limit && (
					<PublicQuestionPagePagination
						questionsResponse={questions}
						currentPage={filter.page || 1}
						onPageChange={onPageChange}
					/>
				)}
				{questions.data.length === 0 && (
					<EmptyStub text={getParams.title} resetFilters={resetFilters} />
				)}
			</Card>
			{(!isMobile || !isTablet) && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicQuestionsPage;
