import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Collection } from '@/entities/collection';
import { Question } from '@/entities/question';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PreviewQuestionsItem } from '@/widgets/question/QuestionsList';

import { NoQuestionsCard } from '../NoQuestionsCard/NoQuestionsCard';

import styles from './CollectionBody.module.css';

interface CollectionBodyProps extends Pick<Collection, 'isFree'> {
	questions: Question[];
	hasPremiumAccess?: boolean;
}

export const CollectionBody = ({ questions, isFree, hasPremiumAccess }: CollectionBodyProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	// TODO: Добавить роут для сообщества

	if (!isFree && !hasPremiumAccess)
		return (
			<Card
				className={styles.wrapper}
				title={t(Questions.PREVIEW_TITLE)}
				actionRoute={ROUTES.platformRoute}
				actionTitle={t(Questions.COMMUNITY_JOIN)}
				withOutsideShadow
			>
				<NoQuestionsCard icon="lock" text={t(Questions.PREVIEW_LOCKED_COLLECTION)} />
			</Card>
		);

	return (
		<Card className={styles.wrapper} title={t(Questions.PREVIEW_TITLE)} withOutsideShadow>
			{questions.length ? (
				<Flex componentType="ul" direction="column" gap="12">
					{questions?.map((question) => (
						<PreviewQuestionsItem key={question.id} question={question} />
					))}
				</Flex>
			) : (
				<NoQuestionsCard icon="clock" text={t(Questions.PREVIEW_EMPTY_COLLECTION)} />
			)}
		</Card>
	);
};
