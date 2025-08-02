import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import {
	MAX_LIMIT_CATEGORIES,
	MAX_LIMIT_SPECIALIZATIONS,
	DEFAULT_SPECIALIZATION_NUMBER,
	MAX_CHOOSE_QUESTION_COUNT,
} from '@/shared/constants/queryConstants';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import {
	ChooseQuestionComplexity,
	ChooseQuestionCount,
	ChooseQuestionsCategories,
	ChooseSpecialization,
} from '@/entities/question';
import { QuestionModeType, QuizQuestionMode, useLazyCreateNewMockQuizQuery } from '@/entities/quiz';
import { useGetSkillsListQuery } from '@/entities/skill';

import { PublicQuizPageSkeleton } from '../../PublicQuizPage';
import { useQueryFilter } from '../model/hooks/useQueryFilter';

import styles from './CreatePublicQuizPage.module.css';
import { CreatePublicQuizPageSkeleton } from './CreatePublicQuizPage.skeleton';

const CreatePublicQuizPage = () => {
	const [selectedSpecialization, setSelectedSpecialization] = useState<number | undefined>(
		DEFAULT_SPECIALIZATION_NUMBER,
	);

	const { filter, handleFilterChange } = useQueryFilter();
	const [createNewMockQuiz, { isLoading: isCreateNewMockQuizLoading }] =
		useLazyCreateNewMockQuizQuery();

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_LIMIT_CATEGORIES,
		specializations: selectedSpecialization ? [selectedSpecialization] : [],
	});

	const { t } = useTranslation(i18Namespace.interviewQuizCreate);
	const { isMobile, isTablet } = useScreenSize();

	useEffect(() => {
		if (filter.specialization?.length && filter.specialization[0] !== selectedSpecialization) {
			setSelectedSpecialization(filter.specialization[0]);
		}
	}, [filter.specialization, selectedSpecialization]);

	const onChangeSpecialization = (value: number | undefined) => {
		setSelectedSpecialization(value);
		handleFilterChange({
			specialization: value ? [value] : undefined,
			category: undefined,
		});
	};

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

	const onCreateNewMockQuiz = () => {
		const newQuiz = {
			skills: filter.category,
			complexity: filter.complexity,
			limit: filter.count,
			specialization: filter.specialization,
		};
		createNewMockQuiz(newQuiz);
	};

	if (isLoadingCategories) return <CreatePublicQuizPageSkeleton />;
	if (isCreateNewMockQuizLoading) return <PublicQuizPageSkeleton />;

	return (
		<section>
			<Card>
				<Text className={styles.title} variant="body6">
					{t(InterviewQuizCreate.TITLE)}
				</Text>

				<Flex
					className={styles.content}
					direction={isMobile || isTablet ? 'column' : 'row'}
					gap={isMobile ? '16' : '40'}
					justify="between"
				>
					<Flex
						className={styles['skills-selection']}
						gap={isMobile ? '16' : '24'}
						direction={'column'}
					>
						<ChooseSpecialization
							selectedSpecialization={selectedSpecialization}
							onChangeSpecialization={onChangeSpecialization}
							specializationLimit={MAX_LIMIT_SPECIALIZATIONS}
						/>
						{selectedSpecialization !== undefined && (
							<ChooseQuestionsCategories
								selectedSpecialization={selectedSpecialization}
								selectedSkills={filter.category}
								onChangeSkills={onChangeSkills}
								skillsLimit={MAX_LIMIT_CATEGORIES}
							/>
						)}
					</Flex>
					<Flex className={styles['quiz-settings']} direction="column" gap={isMobile ? '16' : '24'}>
						<ChooseQuestionComplexity
							selectedComplexity={filter.complexity}
							onChangeComplexity={onChangeComplexity}
							disabled={true}
						/>
						<QuizQuestionMode
							onChangeMode={onChangeMode}
							modeFromURL={filter.mode}
							disabled={true}
							active={true}
						/>
						<ChooseQuestionCount
							onChangeLimit={onChangeLimit}
							count={filter.count || 1}
							maxCount={MAX_CHOOSE_QUESTION_COUNT}
							disabled={true}
						/>
					</Flex>
				</Flex>

				<Button
					className={styles.button}
					onClick={onCreateNewMockQuiz}
					suffix={<Icon icon="arrowRight" size={24} />}
					disabled={isCreateNewMockQuizLoading}
				>
					{t(InterviewQuizCreate.CREATE_BUTTON)}
				</Button>
			</Card>
		</section>
	);
};

export default CreatePublicQuizPage;
