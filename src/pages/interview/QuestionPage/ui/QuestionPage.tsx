import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useModal } from '@/shared/hooks/useModal';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { getProfileId } from '@/entities/profile';
import { Question, useGetQuestionByIdQuery } from '@/entities/question';

import { AdditionalInfo } from '@/widgets/question/AdditionalInfo/AdditionalInfo';
import { ProgressBlock } from '@/widgets/question/ProgressBlock/ProgressBlock';
import { QuestionActions } from '@/widgets/question/QuestionActions/QuestionActions';
import { QuestionBody } from '@/widgets/question/QuestionBody/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader/QuestionHeader';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

interface QuestionPageProps {
	isAdmin?: boolean;
}

export const QuestionPage = ({ isAdmin }: QuestionPageProps) => {
	const { isMobile, isTablet, isMobileS } = useScreenSize();
	const { questionId } = useParams<{ questionId: string }>();
	const { isOpen, onToggle, onClose } = useModal();

	const profileId = useAppSelector(getProfileId);
	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetQuestionByIdQuery({
		questionId,
		profileId: profileId,
	});

	const { ref } = useScrollToTop<HTMLDivElement, Question | undefined>(question);

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

	const renderAdditionalInfo = (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label="go to additional info"
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card>
					{!isAdmin && <ProgressBlock checksCount={question.checksCount} />}
					<AdditionalInfo
						className={styles['additional-info-wrapper']}
						rate={question.rate}
						keywords={question.keywords}
						complexity={question.complexity}
						questionSkills={question.questionSkills}
						authorFullName={authorFullName}
					/>
				</Card>
			</Drawer>
		</div>
	);

	const renderHeaderAndActions = () => (
		<>
			<QuestionHeader
				description={question.description}
				status={question.status}
				title={question.title}
			/>
			{!isAdmin && (
				<QuestionActions
					profileId={profileId}
					questionId={questionId || ''}
					checksCount={question.checksCount}
				/>
			)}
		</>
	);

	const renderMobileOrTablet = (isMobile || isTablet) && (
		<>
			{renderAdditionalInfo}
			<section
				className={classNames(styles.wrapper, {
					[styles.mobile]: isMobile,
					[styles.tablet]: isTablet,
				})}
			>
				{renderHeaderAndActions()}
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		</>
	);

	return (
		<div ref={ref}>
			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles.main}>
						{renderHeaderAndActions()}
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
		</div>
	);
};

export default QuestionPage;
