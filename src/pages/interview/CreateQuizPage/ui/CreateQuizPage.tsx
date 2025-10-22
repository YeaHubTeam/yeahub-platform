import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { MAX_CHOOSE_QUESTION_COUNT } from '@/shared/constants/queryConstants';
import { useScreenSize, useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';

import { getHasPremiumAccess, getProfileId, getSpecializationId } from '@/entities/profile';
import { ChooseQuestionComplexity, ChooseQuestionCount } from '@/entities/question';
import {
	QuestionModeType,
	QuizQuestionMode,
	useGetActiveQuizQuery,
	useLazyCreateNewMockQuizQuery,
	useLazyCreateNewQuizQuery,
} from '@/entities/quiz';
import { SkillsListField, useGetSkillsListQuery } from '@/entities/skill';

import { useQueryFilter } from '../model/hooks/useQueryFilter';

import styles from './CreateQuizPage.module.css';
import { CreateQuizPageSkeleton } from './CreateQuizPage.skeleton';

const MAX_LIMIT_CATEGORIES = 20;

const CreateQuizPage = () => {
	const profileId = useAppSelector(getProfileId);
	const profileSpecialization = useAppSelector(getSpecializationId);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const { filter, handleFilterChange } = useQueryFilter();

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_LIMIT_CATEGORIES,
		specializations: [profileSpecialization],
	});
	const { t } = useTranslation(i18Namespace.interviewQuizCreate);

	const { isMobile, isTablet } = useScreenSize();

	const navigate = useNavigate();

	const { data: activeQuiz, isLoading: isActiveQuizLoading } = useGetActiveQuizQuery(
		{
			profileId,
			limit: 1,
			page: 1,
		},
		{ skip: !hasPremium },
	);

	if (activeQuiz?.questions) {
		navigate(ROUTES.interview.new.page);
	}

	const [createNewQuiz, { isLoading: isCreateNewQuizLoading }] = useLazyCreateNewQuizQuery();
	const [createNewMockQuiz, { isLoading: isCreateNewMockQuizLoading }] =
		useLazyCreateNewMockQuizQuery();

	const onChangeSkills = (skills?: number[]) => {
		handleFilterChange({ category: skills });
	};

	const onChangeComplexity = (complexity?: number[]) => {
		handleFilterChange({ complexity });
	};

	const onChangeMode = (mode: QuestionModeType) => {
		handleFilterChange({ mode });
	};

	const onChangeLimit = (limit: number) => {
		handleFilterChange({ count: limit });
	};

	const onCreateNewQuiz = () => {
		createNewQuiz({
			profileId,
			skills: filter.category,
			complexity: filter.complexity,
			limit: filter.count,
			mode: filter.mode,
		});
	};

	const onCreateNewMockQuiz = () => {
		createNewMockQuiz({
			skills: filter.category,
			limit: filter.count || 1,
			specialization: profileSpecialization,
		});
	};

	if (isActiveQuizLoading || isLoadingCategories) return <CreateQuizPageSkeleton />;

	return (
		<section>
			<Card className={styles.container}>
				<h2 className={styles.title}>{t(InterviewQuizCreate.TITLE)}</h2>
				<Flex
					justify="between"
					gap={isMobile ? '16' : '40'}
					direction={isTablet ? 'column' : 'row'}
					className={styles.wrapper}
				>
					<SkillsListField
						selectedSpecialization={profileSpecialization}
						selectedSkills={filter.category}
						onChangeSkills={onChangeSkills}
						showAllLabel
					/>
					<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
						<ChooseQuestionComplexity
							selectedComplexity={filter.complexity}
							onChangeComplexity={onChangeComplexity}
							disabled={!hasPremium}
							hasPremium={hasPremium}
						/>
						<QuizQuestionMode
							onChangeMode={onChangeMode}
							modeFromURL={filter.mode}
							disabled={!hasPremium}
							active={!hasPremium}
							hasPremium={hasPremium}
						/>
						<ChooseQuestionCount
							onChangeLimit={onChangeLimit}
							count={filter.count || 1}
							maxCount={hasPremium ? undefined : MAX_CHOOSE_QUESTION_COUNT}
							disabled={!hasPremium}
							hasPremium={hasPremium}
						/>
					</Flex>
				</Flex>
				<Button
					className={styles.button}
					onClick={hasPremium ? onCreateNewQuiz : onCreateNewMockQuiz}
					suffix={<Icon icon="arrowRight" size={24} />}
					disabled={hasPremium ? isCreateNewQuizLoading : isCreateNewMockQuizLoading}
				>
					{t(InterviewQuizCreate.CREATE_BUTTON)}
				</Button>
			</Card>
		</section>
	);
};

export default CreateQuizPage;
