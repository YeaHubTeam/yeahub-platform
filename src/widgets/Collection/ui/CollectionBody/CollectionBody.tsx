import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Question } from '@/entities/question';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PreviewQuestionsItem } from '@/widgets/question/QuestionsList';

import styles from './CollectionBody.module.css';

interface CollectionBodyProps {
	questions: Question[];
}

export const CollectionBody = ({ questions }: CollectionBodyProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Text variant="body6" className={styles.title}>
				{t(Questions.PREVIEW_TITLE)}
			</Text>
			{questions.length ? (
				<Flex componentType="ul" direction="column" gap="12">
					{questions?.map((question) => (
						<PreviewQuestionsItem key={question.id} question={question} />
					))}
				</Flex>
			) : (
				<Flex justify="center">
					<Text variant="body3-accent" className={styles['no-questions']}>
						{t(Questions.PREVIEW_EMPTY_COLLECTION)}
					</Text>
				</Flex>
			)}
		</Card>
	);
};
