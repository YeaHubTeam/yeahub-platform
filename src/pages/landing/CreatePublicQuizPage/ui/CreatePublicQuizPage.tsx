import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizCreate } from '@/shared/config/i18n/i18nTranslations';
import { setToLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { useCreateQuizFilters, useLazyCreateNewMockPublicQuizQuery } from '@/entities/quiz';
import { MAX_SHOW_LIMIT_SKILLS, useGetSkillsListQuery } from '@/entities/skill';
import { DEFAULT_SPECIALIZATION_ID, LS_ACTIVE_SPECIALIZATION_ID } from '@/entities/specialization';

import { CreateQuizFilters } from '@/widgets/interview/CreateQuizFilters';

import { PublicQuizPageSkeleton } from '../../PublicQuizPage';

import styles from './CreatePublicQuizPage.module.css';
import { CreatePublicQuizPageSkeleton } from './CreatePublicQuizPage.skeleton';

const CreatePublicQuizPage = () => {
	const [selectedSpecialization, setSelectedSpecialization] = useState<number | undefined>(
		DEFAULT_SPECIALIZATION_ID,
	);

	const { filters, onChangeSpecialization, onChangeSkills, onChangeCount } = useCreateQuizFilters({
		count: 1,
		specialization: DEFAULT_SPECIALIZATION_ID,
	});

	const [createNewMockQuiz, { isLoading: isCreateNewMockQuizLoading }] =
		useLazyCreateNewMockPublicQuizQuery();

	const { isLoading: isLoadingCategories } = useGetSkillsListQuery({
		limit: MAX_SHOW_LIMIT_SKILLS,
		specializations: selectedSpecialization,
	});

	const { t } = useTranslation(i18Namespace.interviewQuizCreate);

	useEffect(() => {
		setToLS(LS_ACTIVE_SPECIALIZATION_ID, String(DEFAULT_SPECIALIZATION_ID));
	}, []);

	const onChangeSpecializationValue = (value?: number) => {
		setSelectedSpecialization(value);
		setToLS(LS_ACTIVE_SPECIALIZATION_ID, String(value));
		onChangeSpecialization(value);
	};

	const onCreateNewMockQuiz = () => {
		const newQuiz = {
			skills: filters.skills,
			limit: filters.count,
			specialization: filters.specialization,
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
				<CreateQuizFilters
					filters={filters}
					onChangeMode={() => {}}
					onChangeSkills={onChangeSkills}
					onChangeSpecialization={onChangeSpecializationValue}
					onChangeComplexity={() => {}}
					onChangeCount={onChangeCount}
				/>
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
