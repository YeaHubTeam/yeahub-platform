import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

import { AdditionalInfo } from '@/widgets/question/AdditionalInfo/AdditionalInfo';
import { QuestionActions } from '@/widgets/question/QuestionActions/QuestionActions';
import { QuestionBody } from '@/widgets/question/QuestionBody/QuestionBody';
import { QuestionHeader } from '@/widgets/question/QuestionHeader/QuestionHeader';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const { t } = useTranslation(i18Namespace.translation);

	const { isMobile, isTablet } = useScreenSize();
	const { questionId } = useParams<{ questionId: string }>();

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

	const renderAdditionalInfo = (
		<div className={styles['popover-additional']}>
			<Popover
				body={
					<div className={styles['popover-additional-wrapper']}>
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
					</div>
				}
			>
				{({ onToggle, isOpen }) => (
					<IconButton
						className={isOpen ? styles.active : ''}
						aria-label="go to additional info"
						form="square"
						icon={<PopoverIcon />}
						size="small"
						variant="tertiary"
						onClick={onToggle}
					/>
				)}
			</Popover>
		</div>
	);

	const renderHeaderAndActions = () => (
		<>
			<QuestionHeader
				description={question.description}
				status={question.status}
				title={question.title}
			/>
			<QuestionActions
				profileId={profileId}
				questionId={questionId || ''}
				checksCount={question.checksCount}
			/>
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
		<>
			<BackHeader>
				<DeleteQuestionButton questionId={question.id} isDetailPage />
				<NavLink
					style={{ marginLeft: 'auto' }}
					to={route(ROUTES.admin.questions.edit.page, question.id)}
				>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</BackHeader>

			{renderMobileOrTablet || (
				<section className={styles.wrapper}>
					<div className={styles.main}>
						{renderHeaderAndActions()}
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
				</section>
			)}
		</>
	);
};
