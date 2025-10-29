import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';

import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';

import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import {
	getSkillTitles,
	getSpecializationTitleFromSkills,
} from '../../model/helpers/getTitleFromQuery';
import { PublicQuestionPagePagination } from '../PublicQuestionsPagePagination/PublicQuestionPagePagination';

import styles from './PublicQuestionsPage.module.css';
import { PublicQuestionsPageSkeleton } from './PublicQuestionsPage.skeleton';

const PublicQuestionsPage = () => {
	const {
		filters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeSkills,
		onChangeComplexity,
		onChangeSpecialization,
		onChangeRate,
	} = useQuestionsFilters({
		page: 1,
		specialization: DEFAULT_SPECIALIZATION_ID,
	});

	const { isMobile, isTablet } = useScreenSize();

	const { data: skills, isLoading: isLoadingCategories } = useGetSkillsListQuery(
		{
			limit: MAX_SHOW_LIMIT_SKILLS,
			specializations: filters.specialization || DEFAULT_SPECIALIZATION_ID,
		},
		{ skip: !filters.specialization },
	);

	const specializationName = getSpecializationTitleFromSkills(skills?.data, filters.specialization);

	const skillNames = getSkillTitles(skills?.data, filters.skills);
	const additionalTitle = specializationName || skillNames || '';

	const { data: questions, isLoading: isLoadingQuestions } = useGetPublicQuestionsListQuery(
		{
			...filters,
		},
		{
			skip: !filters.specialization,
		},
	);

	if (isLoadingQuestions || isLoadingCategories) {
		return <PublicQuestionsPageSkeleton />;
	}

	if (!questions) {
		return null;
	}

	const media = getChannelsForSpecialization(filters.specialization);

	const renderFilters = () => (
		<Flex direction="column" gap="24">
			<QuestionsFilters
				onChangeTitle={onChangeTitle}
				onChangeSkills={onChangeSkills}
				onChangeComplexity={onChangeComplexity}
				onChangeRate={onChangeRate}
				onChangeSpecialization={onChangeSpecialization}
				filters={{
					skills: filters.skills,
					rate: filters.rate,
					complexity: filters.complexity,
					title: filters.title,
					specialization: filters.specialization,
				}}
			/>
			{media && <MediaLinksBanner mediaLink={media} />}
		</Flex>
	);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<FullQuestionsList
					questions={questions.data}
					isPublic
					additionalTitle={additionalTitle}
					filterButton={<FiltersDrawer>{renderFilters()}</FiltersDrawer>}
				/>

				{questions.total > questions.limit && (
					<PublicQuestionPagePagination
						questionsResponse={questions}
						currentPage={filters.page || 1}
						onPageChange={onChangePage}
					/>
				)}
				{questions.data.length === 0 && (
					<EmptyFilterStub text={filters.title} resetFilters={onResetFilters} />
				)}
			</Card>
			{(!isMobile || !isTablet) && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicQuestionsPage;
