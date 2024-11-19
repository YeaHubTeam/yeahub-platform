import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { useScreenSize } from '@/shared/hooks/useScreenSize';

import { useProfileQuery } from '@/entities/auth';
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
	const { questionId } = useParams();
	const { isMobile } = useScreenSize();

	const { data: profile } = useProfileQuery();
	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId: profile?.profiles[0].id,
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

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
				/>
				<ProgressBlock checksCount={question?.checksCount} />
				<AdditionalInfo
					rate={question?.rate}
					keywords={question?.keywords}
					complexity={question?.complexity}
					questionSkills={question?.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>
				<QuestionActions
					profileId={profile ? profile.profiles[0].id : ''}
					questionId={questionId ? questionId : ''}
					checksCount={question?.checksCount}
				/>
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		);
	}

	return (
		<>
			<section className={styles.wrapper}>
				<div className={styles.main}>
					<QuestionHeader
						description={question?.description}
						status={question?.status}
						title={question?.title}
					/>
					{!isAdmin && (
						<QuestionActions
							profileId={profile ? profile.profiles[0].id : ''}
							questionId={questionId ? questionId : ''}
							checksCount={question?.checksCount}
						/>
					)}
					<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
				</div>
				<div className={styles.additional}>
					{!isAdmin && <ProgressBlock checksCount={question?.checksCount} />}
					<AdditionalInfo
						rate={question?.rate}
						keywords={question?.keywords}
						complexity={question?.complexity}
						questionSkills={question?.questionSkills}
					/>
					<p className={styles.author}>
						Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
					</p>
				</div>
			</section>
		</>
	);
};
