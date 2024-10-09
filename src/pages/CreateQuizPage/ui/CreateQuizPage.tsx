import { Button, Icon } from 'yeahub-ui-kit';

import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useProfileQuery } from '@/entities/auth';
import {
	ChooseQuestionComplexity,
	ChooseQuestionCount,
	ChooseQuestionsCategories,
} from '@/entities/question';
import { useLazyCreateNewQuizQuery } from '@/entities/quiz';
import { QuestionModeType } from '@/entities/quiz';
import { QuizQuestionMode } from '@/entities/quiz';

import { useQueryFilter } from '../model/hooks/useQueryFilter';

import styles from './CreateQuizPage.module.css';
import { CreateQuizPageSkeleton } from './CreateQuizPage.skeleton';

const MAX_LIMIT_CATEGORIES = 20;

const CreateQuizPage = () => {
	const { data: userProfile, isLoading } = useProfileQuery();
	const { filter, handleFilterChange } = useQueryFilter();

	const [trigger] = useLazyCreateNewQuizQuery();

	const onChangeSkills = (skills: number[] | undefined) => {
		handleFilterChange({ category: skills });
	};

	const onChangeComplexity = (complexity: number[] | undefined) => {
		handleFilterChange({ complexity });
	};

	const onChangeMode = (mode: QuestionModeType) => {
		handleFilterChange({ mode });
	};

	const onChangeLimit = (limit: number) => {
		handleFilterChange({ count: limit });
	};

	const handleCreateNewQuiz = () => {
		trigger({
			profileId: userProfile?.profiles[0].profileId || '',
			params: {
				skills: filter.category,
				minComplexity: filter.complexity ? Math.min(...filter.complexity) : undefined,
				maxComplexity: filter.complexity ? Math.max(...filter.complexity) : undefined,
				limit: filter.count,
				mode: filter.mode,
			},
		});
	};

	if (isLoading) return <CreateQuizPageSkeleton />;

	return (
		<section>
			<Card className={styles.container}>
				<h2 className={styles.title}>Собеседование</h2>
				<Flex justify="between" gap="40" className={styles.wrapper}>
					<ChooseQuestionsCategories
						selectedSkills={filter.category}
						onChangeSkills={onChangeSkills}
						skillsLimit={MAX_LIMIT_CATEGORIES}
					/>
					<Flex direction="column" gap="24" className={styles['additional-wrapper']}>
						<ChooseQuestionComplexity
							selectedComplexity={filter.complexity}
							onChangeComplexity={onChangeComplexity}
						/>
						<QuizQuestionMode onChangeMode={onChangeMode} modeFromURL={filter.mode} />
						<ChooseQuestionCount onChangeLimit={onChangeLimit} count={filter.count || 1} />
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
