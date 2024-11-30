import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { DeleteQuestionButton } from '@/features/question/deleteQuestion';

import { QuestionHeader, QuestionBody, AdditionalInfo } from '@/widgets/Question';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);

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
				<BackHeader>
					<NavLink
						style={{ marginLeft: 'auto' }}
						to={route(ROUTES.admin.questions.edit.page, question.id)}
					>
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</BackHeader>

				<QuestionHeader
					description={question.description}
					status={question.status}
					title={question.title}
				/>
				<AdditionalInfo
					rate={question.rate}
					keywords={question.keywords}
					complexity={question.complexity}
					questionSkills={question.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>

				<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question.longAnswer} />
			</section>
		);
	}

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

			<section className={styles.wrapper}>
				<div className={styles.main}>
					<QuestionHeader
						description={question.description}
						status={question.status}
						title={question.title}
					/>
					<QuestionBody shortAnswer={question.shortAnswer} longAnswer={question.longAnswer} />
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
		</>
	);
};
