import { useSearchParams } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { useQueryFilter } from '@/shared/hooks/useQueryFilter';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { useGetSkillsListQuery } from '@/entities/skill';

import { QuestionsSummaryList } from '@/widgets/Question';

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

	const { status, ...getParams } = filter;

	const { data: allQuestions, isLoading: isLoadingAllQuestions } = useGetPublicQuestionsListQuery(
		{
			...getParams,
			keywords: keywords ? [keywords] : undefined,
		},
		{
			skip: status !== 'all',
		},
	);

	const onChangeSpecialization = (value: number[] | undefined) => {
		handleFilterChange({ specialization: value });
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

	if (isLoadingAllQuestions || isLoadingCategories) {
		return <PublicQuestionsPageSkeleton />;
	}

	if (!allQuestions) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles['popover-additional']}>
				<Popover
					body={
						<div className={styles['popover-additional-info-wrapper']}>
							<Card className={styles['popover-additional-search']}>
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
									skillsLimit={MAX_LIMIT_CATEGORIES}
								/>
							</Card>
						</div>
					}
				>
					{({ isOpen, onToggle }) => (
						<IconButton
							className={isOpen ? styles.active : ''}
							aria-label="go to filters"
							form="square"
							icon={<Icon icon="slidersHorizontal" />}
							size="S"
							variant={'tertiary'}
							onClick={onToggle}
						/>
					)}
				</Popover>
			</div>
			<div className={styles['main-info-wrapper']}>
				<Card className={styles.content}>
					<QuestionsSummaryList questions={allQuestions.data} displayMode="link" />
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
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Card className={styles.search}>
					<PublicQuestionsFilterPanel
						onChangeSpecialization={onChangeSpecialization}
						onChangeSearch={onChangeSearchParams}
						onChangeSkills={onChangeSkills}
						onChangeComplexity={onChangeComplexity}
						onChangeRate={onChangeRate}
						filter={{
							skills: filter.skills,
							rate: filter.rate,
							complexity: filter.complexity,
							title: filter.title,
							specialization: filter.specialization,
						}}
						skillsLimit={MAX_LIMIT_CATEGORIES}
					/>
				</Card>
			</div>
		</section>
	);
};

export default PublicQuestionsPage;
