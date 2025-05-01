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
		<Flex wrap="wrap" justify="between" gap="20">
			<Card className={styles.wrapper} title="Список вопросов">
				{questions.length ? (
					<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
						{questions?.map((question) => {
							return <PreviewQuestionsItem key={question.id} question={question} />;
						})}
					</Flex>
				) : (
					<Flex justify="center">
						<Text variant="body4" color="black-700" className={styles['no-questions']}>
							{t(Questions.PREVIEW_EMPTY_COLLECTION)}
						</Text>
					</Flex>
				)}
			</Card>
		</Flex>
	);
};
