import classNames from 'classnames';
import { useMemo } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useCheckSpecialization } from '@/shared/hooks/useCheckSpecialization';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';
import { RedirectToProfile } from '@/shared/ui/RedirectToProfile';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionByIdQuery } from '@/entities/question';

import {
	AdditionalInfo,
	ProgressBlock,
	QuestionActions,
	QuestionBody,
	QuestionHeader,
} from '@/widgets/Question';

import styles from './QuestionPage.module.css';
import { QuestionPageSkeleton } from './QuestionPage.skeleton';

interface QuestionPageProps {
	isAdmin?: boolean;
}

export const QuestionPage = ({ isAdmin }: QuestionPageProps) => {
	const { t } = useI18nHelpers(i18Namespace.translation);

	const { questionId } = useParams();
	const { isMobile } = useScreenSize();
	const navigate = useNavigate();

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
	const isSpecializationEmpty = useCheckSpecialization(profile);

	if (isLoading || isFetching) {
		return <QuestionPageSkeleton />;
	}

	if (isSpecializationEmpty) navigate(ROUTES.interview.page);

	if (isMobile) {
		return (
			<section className={classNames(styles.wrapper, styles.mobile)}>
				{isAdmin && (
					<Flex justify="between" className={styles['admin-nav']}>
						<BackButton />
						<NavLink style={{ marginLeft: 'auto' }} to="edit">
							<Button>{t(Translation.EDIT)}</Button>
						</NavLink>
					</Flex>
				)}
				{isSpecializationEmpty ? (
					<RedirectToProfile />
				) : (
					<>
						<QuestionHeader
							description={question?.description}
							status={question?.status}
							title={question?.title}
						/>
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
						{!isAdmin && (
							<QuestionActions
								profileId={profile ? profile.profiles[0].id : ''}
								questionId={questionId ? questionId : ''}
							/>
						)}
						<QuestionBody shortAnswer={question?.shortAnswer} longAnswer={question?.longAnswer} />
					</>
				)}
			</section>
		);
	}

	return (
		<>
			{isAdmin && (
				<Flex justify="between" className={styles['admin-nav']}>
					<BackButton />

					<NavLink style={{ marginLeft: 'auto' }} to="edit">
						<Button>{t(Translation.EDIT)}</Button>
					</NavLink>
				</Flex>
			)}
			<section className={styles.wrapper}>
				{isSpecializationEmpty ? (
					<RedirectToProfile />
				) : (
					<>
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
					</>
				)}
			</section>
		</>
	);
};
