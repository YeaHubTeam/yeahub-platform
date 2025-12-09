import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { SimpleStub } from '@/shared/ui/SimpleStub';

import { Collection, CollectionWarningInfo } from '@/entities/collection';
import { Question, PreviewQuestionsItem } from '@/entities/question';

import styles from './CollectionBody.module.css';

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

	if (!isFree && !hasPremiumAccess && !isAdmin)
		return (
			<Card
				className={styles.wrapper}
				title={t(Questions.PREVIEW_TITLE)}
				actionRoute={SELECT_TARIFF_SETTINGS_TAB}
				actionTitle={t(Questions.COMMUNITY_JOIN)}
				withOutsideShadow
			>
				<SimpleStub variant="no-access" text={t(Questions.PREVIEW_LOCKED_COLLECTION)} />
			</Card>
		);

	return (
		<Card
			className={styles.wrapper}
			title={t(Questions.PREVIEW_TITLE)}
			headerAction={<CollectionWarningInfo />}
			withOutsideShadow
		>
			{questions.length ? (
				<Flex componentType="ul" direction="column" gap="12">
					{questions?.map((question) => (
						<PreviewQuestionsItem
							key={question.id}
							title={question.title}
							questionId={question.id}
							rate={question.rate}
							complexity={question.complexity}
							imageSrc={question.questionSkills[0].imageSrc ?? undefined}
						/>
					))}
				</Flex>
			) : (
				<SimpleStub variant="empty" text={t(Questions.PREVIEW_EMPTY_COLLECTION)} />
			)}
		</Card>
	);
};
