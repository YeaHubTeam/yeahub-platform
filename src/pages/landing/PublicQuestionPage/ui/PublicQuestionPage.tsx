import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { useModal } from '@/shared/hooks/useModal';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackButton } from '@/shared/ui/BackButton';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Flex } from '@/shared/ui/Flex';
import { IconButton } from '@/shared/ui/IconButton';

import { useGetPublicQuestionByIdQuery } from '@/entities/question';

import { AdditionalInfo } from '@/widgets/question/AdditionalInfo/AdditionalInfo';
import { QuestionBody } from '@/widgets/question/QuestionBody/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader/QuestionHeader';

import styles from './PublicQuestionPage.module.css';
import { PublicQuestionPageSkeleton } from './PublicQuestionPage.skeleton';

const PublicQuestionPage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const { questionId } = useParams<{ questionId: string }>();
	const { isOpen, onToggle, onClose } = useModal();

	const {
		data: question,
		isFetching,
		isLoading,
	} = useGetPublicQuestionByIdQuery({
		questionId,
	});

	const authorFullName = useMemo(() => {
		if (question?.createdBy) {
			const author = JSON.parse(question.createdBy);
			return `${author.firstName} ${author.lastName}`;
		}
	}, [question]);

	if (isLoading || isFetching) {
		return <PublicQuestionPageSkeleton />;
	}

	if (!question) {
		return null;
	}

	const renderAdditionalInfo = (
		<Flex gap="20" justify="between" align="center" className={styles['back-header']}>
			<BackButton />
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
					rootName={isMobile ? 'body' : 'mainLayout'}
					className={classNames(styles.drawer, {
						[styles['drawer-mobile']]: isMobile,
					})}
					hasCloseButton
				>
					<Card>
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
		</Flex>
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
				<QuestionHeader description={question.description} title={question.title} />
				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		</>
	);

	return (
		<>
			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles['back-button-wrapper']}>
						<BackButton />
					</div>
					<div className={styles.content}>
						<div className={styles.main}>
							<QuestionHeader description={question.description} title={question.title} />
							<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question?.longAnswer} />
						</div>
						<div className={styles.additional}>
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
					</div>
				</section>
			)}
		</>
	);
};

export default PublicQuestionPage;
