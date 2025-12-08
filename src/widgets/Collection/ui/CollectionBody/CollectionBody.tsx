import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { getFromLS, LS_ACCESS_TOKEN_KEY, SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Collection, CollectionWarningInfo } from '@/entities/collection';
import { Question, PreviewQuestionsItem } from '@/entities/question';

import { NoQuestionsCard } from '../NoQuestionsCard/NoQuestionsCard';
import { RegistrationBanner } from '../RegistrationBanner/RegistrationBanner';

import styles from './CollectionBody.module.css';

const GUEST_QUESTIONS_COUNT = 5;

interface CollectionBodyProps extends Pick<Collection, 'isFree'> {
	questions: Question[];
	isAdmin?: boolean;
	hasPremiumAccess?: boolean;
}

export const CollectionBody = ({
	questions,
	isFree,
	isAdmin = false,
	hasPremiumAccess,
}: CollectionBodyProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	// TODO: Добавить роут для сообщества
	const isAuthorized = getFromLS(LS_ACCESS_TOKEN_KEY);
	const showRegistrationBanner = !isAuthorized && questions.length > GUEST_QUESTIONS_COUNT;
	const hiddenQuestionsCount = questions.length - GUEST_QUESTIONS_COUNT;
	const displayedQuestions = isAuthorized ? questions : questions.slice(0, GUEST_QUESTIONS_COUNT);

	if (!isFree && !hasPremiumAccess && !isAdmin)
		return (
			<Card
				className={styles.wrapper}
				title={t(Questions.PREVIEW_TITLE)}
				actionRoute={SELECT_TARIFF_SETTINGS_TAB}
				actionTitle={t(Questions.COMMUNITY_JOIN)}
				withOutsideShadow
			>
				<NoQuestionsCard icon="lock" text={t(Questions.PREVIEW_LOCKED_COLLECTION)} />
			</Card>
		);

	return (
		<Card
			className={styles.wrapper}
			title={t(Questions.PREVIEW_TITLE)}
			headerAction={<CollectionWarningInfo />}
			withOutsideShadow
		>
			{displayedQuestions.length ? (
				<Flex componentType="ul" direction="column" gap="12">
					{displayedQuestions?.map((question) => (
						<PreviewQuestionsItem
							key={question.id}
							title={question.title}
							questionId={question.id}
							rate={question.rate}
							complexity={question.complexity}
							imageSrc={question.questionSkills[0].imageSrc ?? undefined}
						/>
					))}
					{showRegistrationBanner && <RegistrationBanner questionsCount={hiddenQuestionsCount} />}
				</Flex>
			) : (
				<NoQuestionsCard icon="clock" text={t(Questions.PREVIEW_EMPTY_COLLECTION)} />
			)}
		</Card>
	);
};
