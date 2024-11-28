import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
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
import { Popover } from '@/shared/ui/Popover';
import { IconButton } from '@/shared/ui/IconButton';
import { Icon } from 'yeahub-ui-kit';

interface QuestionPageProps {
	isAdmin?: boolean;
}

export const QuestionPage = ({ isAdmin }: QuestionPageProps) => {
	const { questionId } = useParams();
	const { isMobile, isTablet } = useScreenSize();

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

	const renderPopover = (
		<Popover
			body={
				<div className={styles['render-component']}>
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
			}
		>
			{({ onToggle }) => {
				const [isOpen, setIsOpen] = useState(false);

				useEffect(() => {
					const main = document.querySelector('main');
					const onClose = () => {
						setIsOpen(false);
					};

					main?.addEventListener('scroll', onClose);

					return () => {
						main?.removeEventListener('scroll', onClose);
					};
				}, []);

				return (
					<div>
						<IconButton
							className={classNames(styles['popover-additional'])}
							onClick={() => {
								console.log('Popover button clicked');
								setIsOpen(!isOpen);
								onToggle();
							}}
							aria-label="Popover"
							variant="tertiary"
							icon={<Icon icon="certificate" size={32} color="--palette-ui-black-700" />}
						/>
					</div>
				);
			}}
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
			)}
		</>
	);
};
