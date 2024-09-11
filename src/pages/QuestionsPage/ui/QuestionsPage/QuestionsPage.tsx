import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Block } from '@/shared/ui/Block';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionsListQuery } from '@/entities/question';

import { QuestionsFilterPanel, QuestionsSummaryList } from '@/widgets/Question';

import { getQuestionsPageFilter } from '../../model/selectors/questionsPageSelectors';
import { questionsPageActions } from '../../model/slices/questionsPageSlice';
import { QuestionPagePagination } from '../QuestionsPagePagination/QuestionPagePagination';

import styles from './QuestionsPage.module.css';

const QuestionsPage = () => {
	const params = useSelector(getQuestionsPageFilter);

	// exclude params is not supported by BE
	// TODO: add all params when BE is ready
	const { progressStatus, rate, ...getParams } = params;
	const dispatch = useAppDispatch();
	const { data: questions } = useGetQuestionsListQuery(getParams);

	const onChangeSearchParams = (value: string) => {
		dispatch(questionsPageActions.setTitle(value));
	};

	const onChangeSkills = (skills: number[]) => {
		dispatch(questionsPageActions.setSkills(skills));
	};

	const onChangeComplexity = (complexity: number[]) => {
		dispatch(questionsPageActions.setComplexity(complexity));
	};

	const onChangeRate = (rate: number[]) => {
		dispatch(questionsPageActions.setRate(rate));
	};

	const onChangeStatus = (status: number[]) => {
		dispatch(questionsPageActions.setStatus(status));
	};

	const { data: profile } = useProfileQuery();
	const profileId = profile?.profiles[0]?.profileId || '';

	return (
		<section className={styles.wrapper}>
			<div className={styles['main-info-wrapper']}>
				<Block className={styles.content}>
					<QuestionsSummaryList questions={questions?.data} profileId={profileId} />
					<QuestionPagePagination questionsResponse={questions} />
				</Block>
			</div>
			<div className={styles['additional-info-wrapper']}>
				<Block className={styles.search}>
					<QuestionsFilterPanel
						onChangeSearch={onChangeSearchParams}
						onChangeSkills={onChangeSkills}
						onChangeComplexity={onChangeComplexity}
						onChangeRate={onChangeRate}
						onChangeStatus={onChangeStatus}
						filter={params}
					/>
				</Block>
			</div>
		</section>
	);
};

export default QuestionsPage;
