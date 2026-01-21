import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetPublicQuestionsListQuery } from '@/entities/question';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';
import { getChannelsForSpecialization, MediaLinksBanner } from '@/entities/socialMedia';
import { DEFAULT_SPECIALIZATION_ID } from '@/entities/specialization';

import { QuestionsFilters, useQuestionsFilters } from '@/features/question/filterQuestions';
import { useQuestionQueryNavigate } from '@/features/question/navigateQuestion';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { FullQuestionsList } from '@/widgets/question/QuestionsList';

import {
	getSkillTitles,
	getSpecializationTitleFromSkills,
} from '../../model/helpers/getTitleFromQuery';

import styles from './PublicQuestionsPage.module.css';
import { PublicQuestionsPageSkeleton } from './PublicQuestionsPage.skeleton';

const PublicQuestionsPage = () => {
	const { t } = useTranslation(i18Namespace.questions);

	const {
		filters,
		hasFilters,
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
	const { isMobile, isMobileS, isTablet } = useScreenSize();

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

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Questions.STUB_EMPTY_QUESTIONS_TITLE),
			subtitle: t(Questions.STUB_EMPTY_QUESTIONS_SUBTITLE),
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoadingQuestions || isLoadingCategories}
			skeleton={<PublicQuestionsPageSkeleton />}
			hasFilters={hasFilters}
			hasData={(questions?.data || []).length > 0}
			stubs={stubs}
			content={
				<FullQuestionsList
					questions={questions?.data || []}
					isPublic
					onMoveQuestionDetail={onMoveQuestionDetail}
				/>
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
								{`${t(Questions.TITLE_SHORT)} ${additionalTitle}`}
							</Text>
							{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						</div>
						<hr className={styles.divider} />
						<>
							{content}
							{pagination}
						</>
					</Card>
					{(!isMobile || !isTablet) && <Card className={styles.filters}>{renderFilters()}</Card>}
				</Flex>
			)}
		</PageWrapper>
	);
};

export default PublicQuestionsPage;
