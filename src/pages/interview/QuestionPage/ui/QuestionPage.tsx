import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

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
	const { questionId } = useParams();
	const { isMobile, isTablet } = useScreenSize();

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

	const renderPopover = (
		<Popover
			body={
				<div className={styles['render-component']}>
					{!isAdmin && <ProgressBlock checksCount={question.checksCount} />}
					<AdditionalInfo
						rate={question.rate}
						keywords={question.keywords}
						complexity={question.complexity}
						questionSkills={question.questionSkills}
					>
						<p className={styles.author} style={{ justifyContent: 'start' }}>
							Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
						</p>
					</AdditionalInfo>
				</div>
			}
		>
			{({ onToggle }) => (
				<div>
					<IconButton
						className={classNames(styles['popover-additional'])}
						onClick={() => {
							console.log('Popover button clicked');
							onToggle();
						}}
						aria-label="Popover"
						variant="tertiary"
						icon={<Icon icon="certificate" size={32} color="--palette-ui-black-700" />}
					/>
				</div>
			)}
		</Popover>
	);

	const renderMobileOrTablet = (isMobile || isTablet) && (
		<>
			{renderPopover}
			<section
				className={classNames(styles.wrapper, {
					[styles.mobile]: isMobile,
					[styles.tablet]: isTablet,
				})}
			>
				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
					isMobile={isMobile}
					isTablet={isTablet}
				/>
				<QuestionActions
					profileId={profile ? profile.profiles[0].id : ''}
					questionId={questionId ? questionId : ''}
					checksCount={question?.checksCount}
				/>
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		</>
	);

	if (isLoading || isFetching) {
		return <QuestionPageSkeleton />;
	}

	return (
		<>
			{renderMobileOrTablet || (
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
						<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question?.longAnswer} />
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
			)}
		</>
	);
};
