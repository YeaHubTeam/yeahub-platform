import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import {
	QuestionHeader,
	QuestionBody,
	QuestionActions,
	ProgressBlock,
	AdditionalInfo,
} from '@/widgets/Question';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

interface QuestionPageProps {
	isAdmin?: boolean;
}

export const QuestionPage = ({ isAdmin }: QuestionPageProps) => {
	const { questionId } = useParams<{ questionId: string }>();
	const { isMobile } = useScreenSize();

	const profileId = useAppSelector(getProfileId);
	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId: profileId,
	});

	const authorFullName = useMemo(() => {
		if (question?.createdBy) {
			const author = JSON.parse(question.createdBy);
			return `${author.firstName} ${author.lastName}`;
		}
	}, [question]);

	if (isLoading || isFetching) {
		return <QuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<QuestionHeader
					description={question.description}
					status={question.status}
					title={question.title}
				/>
				<ProgressBlock checksCount={question.checksCount} />
				<AdditionalInfo
					rate={question.rate}
					keywords={question.keywords}
					complexity={question.complexity}
					questionSkills={question.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>
				<QuestionActions
					profileId={profileId}
					questionId={questionId ? questionId : ''}
					checksCount={question.checksCount}
				/>
				<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question.longAnswer} />
			</section>
		);
	}

	return (
		<>
			<section className={styles.wrapper}>
				<div className={styles.main}>
					<QuestionHeader
						description={question.description}
						status={question.status}
						title={question.title}
					/>
					{!isAdmin && (
						<QuestionActions
							profileId={profileId}
							questionId={questionId ? questionId : ''}
							checksCount={question.checksCount}
						/>
					)}
					<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question.longAnswer} />
				</div>
				<div className={styles.additional}>
					{!isAdmin && <ProgressBlock checksCount={question.checksCount} />}
					<AdditionalInfo
						rate={question.rate}
						keywords={question.keywords}
						complexity={question.complexity}
						questionSkills={question.questionSkills}
					/>
					<p className={styles.author}>
						Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
					</p>
				</div>
			</section>
		</>
	);
};
