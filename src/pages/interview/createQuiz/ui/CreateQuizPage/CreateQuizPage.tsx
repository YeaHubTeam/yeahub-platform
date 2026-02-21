import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, InterviewQuizCreate, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';

import {
	getHasPremiumAccess,
	getIsVerified,
	getProfileId,
	getSpecializationId,
} from '@/entities/profile';
import {
	useGetActiveQuizQuery,
	useLazyCreateNewMockQuizQuery,
	useLazyCreateNewQuizQuery,
	useCreateQuizFilters,
	CreateQuizFilterParams,
} from '@/entities/quiz';
import { useGetSkillsListQuery } from '@/entities/skill';

import { CreateQuizFilters } from '@/widgets/interview/CreateQuizFilters';
import { PageWrapper } from '@/widgets/PageWrapper';

import styles from './CreateQuizPage.module.css';
import { CreateQuizPageSkeleton } from './CreateQuizPage.skeleton';

const MAX_LIMIT_CATEGORIES = 20;

const CreateQuizPage = () => {
	const navigate = useNavigate();

	const { t } = useTranslation(i18Namespace.interviewQuizCreate);

	const profileId = useAppSelector(getProfileId);
	const profileSpecialization = useAppSelector(getSpecializationId);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = useAppSelector(getIsVerified);

	const initialParams: CreateQuizFilterParams = hasPremium
		? { mode: 'RANDOM', count: 10 }
		: { count: 10 };

	const { filters, onChangeMode, onChangeSkills, onChangeComplexity, onChangeCount } =
		useCreateQuizFilters(initialParams);

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery(
		{
			limit: MAX_LIMIT_CATEGORIES,
			specializations: [profileSpecialization],
		},
		{ skip: !isVerified },
	);

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

	return (
		<PageWrapper
			shouldVerify
			hasData
			stubs={{}}
			isLoading={isActiveQuizLoading || isLoadingCategories}
			skeleton={<CreateQuizPageSkeleton />}
			content={
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
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CreateQuizPage;
