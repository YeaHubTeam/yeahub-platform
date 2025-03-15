import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Question } from '@/entities/question';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PreviewQuestionsItem } from '@/widgets/question/QuestionsList';

import styles from './CollectionBody.module.css';

interface CollectionBodyProps {
	questions: Question[];
}

export const CollectionBody = ({ questions }: CollectionBodyProps) => {
	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<Card className={styles.wrapper} title="Список вопросов">
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{questions?.map((question) => {
						return <PreviewQuestionsItem key={question.id} question={question} />;
					})}
				</Flex>
			</Card>
		</Flex>
	);
};
