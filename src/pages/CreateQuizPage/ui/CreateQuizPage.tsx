import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Block } from '@/shared/ui/Block';

import { getAutProfile } from '@/entities/auth';

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
	const profileId = useSelector(getAutProfile);

	const createQuizData = useSelector(getCreateQuizPageState);

	const { skills, complexity } = createQuizData;

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

	useEffect(() => {
		if (profileId) dispatch(createQuizPageActions.setProfileId(profileId));
	}, [dispatch, profileId]);

	return (
		<section className={styles.wrapper}>
			<Block expandable={false}>
				<h2>Собеседование</h2>
				<QuizQuestionsCategories selectedSkills={skills} onChangeSkills={onChangeSkills} />
				<div>
					<QuizQuestionComplexity
						selectedComplexity={complexity}
						onChangeComplexity={onChangeComplexity}
					/>
					<QuizQuestionMode onChangeMode={onChangeMode} />
					<QuizQuestionCount onChangeLimit={onChangeLimit} />
				</div>
			</Block>
		</section>
	);
};

export default CreateQuizPage;
