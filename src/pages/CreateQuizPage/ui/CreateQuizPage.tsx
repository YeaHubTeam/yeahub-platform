import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import {
	ChooseQuestionComplexity,
	ChooseQuestionCount,
	ChooseQuestionsCategories,
} from '@/entities/question';
import { useGetActiveQuizQuery, useLazyCreateNewQuizQuery } from '@/entities/quiz';
import { QuestionModeType } from '@/entities/quiz';
import { QuizQuestionMode } from '@/entities/quiz';

import { getCreateQuizPageState } from '../model/selectors/createQuizPageSelectors';
import { createQuizPageActions } from '../model/slices/CreateQuizPageSlice';

import styles from './CreateQuizPage.module.css';
import { CreateQuizPageSkeleton } from './CreateQuizPage.skeleton';

const MAX_LIMIT_CATEGORIES = 20;

const CreateQuizPage = () => {
	const dispatch = useAppDispatch();
	const { data: userProfile, isLoading } = useProfileQuery();

	const navigate = useNavigate();

	const { data: activeQuizData, isLoading: isActiveQuizLoading } = useGetActiveQuizQuery(
		{
			profileId: userProfile?.profiles[0].profileId,
			params: { limit: 1, page: 1 },
		},
		{
			skip: !userProfile?.id,
		},
	);

	if (activeQuizData?.data[0]?.questions) {
		navigate(ROUTES.interview.new.page);
	}

	const createQuizData = useSelector(getCreateQuizPageState);

	const { skills, complexity, mode, limit } = createQuizData;

	const [trigger] = useLazyCreateNewQuizQuery();

	const onChangeSkills = (skills: number[] | undefined) => {
		dispatch(createQuizPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[] | undefined) => {
		dispatch(createQuizPageActions.setComplexity(complexity));
	};

	const onChangeMode = (mode: QuestionModeType) => {
		dispatch(createQuizPageActions.setMode(mode));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(createQuizPageActions.setLimit(limit));
	};

	const handleCreateNewQuiz = () => {
		trigger({
			profileId: userProfile?.profiles[0].profileId || '',
			params: {
				skills,
				minComplexity: complexity?.[0],
				maxComplexity: complexity?.[complexity.length - 1],
				limit,
				mode,
			},
		});
	};

	if (isLoading || isActiveQuizLoading) return <CreateQuizPageSkeleton />;

	return (
		<section>
			<Card className={styles.container}>
				<h2 className={styles.title}>Собеседование</h2>
				<Flex justify="between" gap="40" className={styles.wrapper}>
					<ChooseQuestionsCategories
						selectedSkills={skills}
						onChangeSkills={onChangeSkills}
						skillsLimit={MAX_LIMIT_CATEGORIES}
					/>
					<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
						<ChooseQuestionComplexity
							selectedComplexity={complexity}
							onChangeComplexity={onChangeComplexity}
						/>
						<QuizQuestionMode onChangeMode={onChangeMode} />
						<ChooseQuestionCount onChangeLimit={onChangeLimit} />
					</Flex>
				</Flex>
				<Button
					className={styles.button}
					onClick={handleCreateNewQuiz}
					suffix={<Icon icon="arrowRight" size={24} />}
				>
					Начать
				</Button>
			</Card>
		</section>
	);
};

export default CreateQuizPage;
