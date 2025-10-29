import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';

import { getHasPremiumAccess, getProfileId, getSpecializationId } from '@/entities/profile';
import {
	useGetActiveQuizQuery,
	useLazyCreateNewMockQuizQuery,
	useLazyCreateNewQuizQuery,
	useCreateQuizFilters,
	CreateQuizFilterParams,
} from '@/entities/quiz';
import { useGetSkillsListQuery } from '@/entities/skill';

import { CreateQuizFilters } from '@/widgets/interview/CreateQuizFilters';

import styles from './CreateQuizPage.module.css';
import { CreateQuizPageSkeleton } from './CreateQuizPage.skeleton';

const MAX_LIMIT_CATEGORIES = 20;

const CreateQuizPage = () => {
	const navigate = useNavigate();

	const { t } = useTranslation(i18Namespace.interviewQuizCreate);

	const profileId = useAppSelector(getProfileId);
	const profileSpecialization = useAppSelector(getSpecializationId);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const initialParams: CreateQuizFilterParams = hasPremium
		? { mode: 'RANDOM', count: 10 }
		: { count: 10 };

	const { filters, onChangeMode, onChangeSkills, onChangeComplexity, onChangeCount } =
		useCreateQuizFilters(initialParams);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_LIMIT_CATEGORIES,
		specializations: [profileSpecialization],
	});

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

	const onCreateNewQuiz = () => {
		createNewQuiz({
			profileId,
			skills: filters.skills,
			complexity: filters.complexity,
			limit: filters.count,
			mode: filters.mode,
		});
	};

	const onCreateNewMockQuiz = () => {
		createNewMockQuiz({
			skills: filters.skills,
			limit: filters.count || 1,
			specialization: profileSpecialization,
		});
	};

	if (isActiveQuizLoading || isLoadingCategories) return <CreateQuizPageSkeleton />;

	return (
		<section>
			<Card className={styles.container}>
				<h2 className={styles.title}>{t(InterviewQuizCreate.TITLE)}</h2>
				<CreateQuizFilters
					filters={filters}
					onChangeMode={onChangeMode}
					onChangeSkills={onChangeSkills}
					onChangeComplexity={onChangeComplexity}
					onChangeCount={onChangeCount}
				/>
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
