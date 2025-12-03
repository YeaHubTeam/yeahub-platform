import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';

import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/media';
import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';
import { useQuestionQueryNavigate } from '@/features/question/navigateQuestion';

import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import {
	getSkillTitles,
	getSpecializationTitleFromSkills,
} from '../../model/helpers/getTitleFromQuery';

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

	const { handleNavigation } = useQuestionQueryNavigate();

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

	const onMoveQuestionDetail = (id: number) => {
		handleNavigation(id);
	};

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
					onMoveQuestionDetail={onMoveQuestionDetail}
				/>
				<TablePagination
					page={filters.page || 1}
					onChangePage={onChangePage}
					limit={questions.limit}
					total={questions.total}
				/>
				{questions.data.length === 0 && <Stub type={'filter-empty'} onClick={onResetFilters} />}
			</Card>
			{(!isMobile || !isTablet) && <Card className={styles.filters}>{renderFilters()}</Card>}
		</Flex>
	);
};

export default PublicQuestionsPage;
