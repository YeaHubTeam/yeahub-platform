import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackHeader } from '@/shared/ui/BackHeader';
import { Button } from '@/shared/ui/Button';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionByIdQuery } from '@/entities/question';

import { QuestionHeader, QuestionBody, AdditionalInfo } from '@/widgets/Question';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

export const QuestionPage = () => {
	const { t } = useI18nHelpers(i18Namespace.translation);

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
				<BackHeader>
					<NavLink style={{ marginLeft: 'auto' }} to="edit">
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</BackHeader>

				<QuestionHeader
					description={question?.description}
					status={question?.status}
					title={question?.title}
				/>
				<AdditionalInfo
					rate={question?.rate}
					keywords={question?.keywords}
					complexity={question?.complexity}
					questionSkills={question?.questionSkills}
				/>
				<p className={styles.author}>
					Автор: <NavLink to={`#`}>{authorFullName}</NavLink>
				</p>

				<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
			</section>
		);
	}

	return (
		<>
			<BackHeader>
				<NavLink style={{ marginLeft: 'auto' }} to="edit">
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</BackHeader>

			<section className={styles.wrapper}>
				<div className={styles.main}>
					<QuestionHeader
						description={question?.description}
						status={question?.status}
						title={question?.title}
					/>
					<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
				</div>
				<div className={styles.additional}>
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
