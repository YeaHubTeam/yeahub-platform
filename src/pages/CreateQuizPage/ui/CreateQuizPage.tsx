import { useSelector } from 'react-redux';
import { Button, Icon } from 'yeahub-ui-kit';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Block } from '@/shared/ui/Block';

import { useGetProfileQuery } from '@/entities/auth';
import { useLazyCreateNewQuizQuery } from '@/entities/quiz';

import {
	QuizQuestionComplexity,
	QuizQuestionCount,
	QuizQuestionMode,
	QuizQuestionsCategories,
} from '@/widgets/Question';

import { getCreateQuizPageState } from '../model/selectors/createQuizPageSelectors';
import { createQuizPageActions } from '../model/slices/CreateQuizPageSlice';
import { QuestionModeType } from '../model/types/CreateQuizPageTypes';

import styles from './CreateQuizPage.module.css';

const CreateQuizPage = () => {
	const dispatch = useAppDispatch();
	const { data: userProfile } = useGetProfileQuery();

	const createQuizData = useSelector(getCreateQuizPageState);

	const { skills, complexity, mode, limit } = createQuizData;

	const [trigger] = useLazyCreateNewQuizQuery();

	const onChangeSkills = (skills: number[]) => {
		dispatch(createQuizPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[]) => {
		dispatch(createQuizPageActions.setComplexity(complexity));
	};

	const onChangeMode = (mode: QuestionModeType) => {
		dispatch(createQuizPageActions.setMode(mode));
	};

	const onChangeLimit = (limit: number) => {
		dispatch(createQuizPageActions.setLimit(limit));
	};

	const shouldCreateNewQuiz =
		!!userProfile?.profiles[0].profileId && !!skills.length && !!complexity?.length;

	const handleCreateNewQuiz = () => {
		if (shouldCreateNewQuiz) {
			trigger({
				profileId: userProfile?.profiles[0].profileId,
				skills,
				params: {
					minComplexity: complexity[0],
					maxComplexity: complexity[complexity.length - 1],
					limit,
					mode,
				},
			});
		}
	};

	return (
		<section>
			<Block className={styles.container}>
				<h2 className={styles.title}>Собеседование</h2>
				<div className={styles.wrapper}>
					<QuizQuestionsCategories selectedSkills={skills} onChangeSkills={onChangeSkills} />
					<div className={styles['additional-wrapper']}>
						<QuizQuestionComplexity
							selectedComplexity={complexity}
							onChangeComplexity={onChangeComplexity}
						/>
						<QuizQuestionMode onChangeMode={onChangeMode} />
						<QuizQuestionCount onChangeLimit={onChangeLimit} />
						<Button
							className={styles.button}
							disabled={!shouldCreateNewQuiz}
							onClick={handleCreateNewQuiz}
							suffix={<Icon icon="arrowRight" size={24} />}
						>
							Начать
						</Button>
					</div>
				</div>
			</Block>
		</section>
	);
};

export default CreateQuizPage;
