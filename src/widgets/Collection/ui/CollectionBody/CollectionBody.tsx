import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { Collection } from '@/entities/collection';
import { Question } from '@/entities/question';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { PreviewQuestionsItem } from '@/widgets/question/QuestionsList';

import styles from './CollectionBody.module.css';

interface CollectionBodyProps {
	collection?: Collection;
	questions?: Question[];
}

export const CollectionBody = ({ collection, questions }: CollectionBodyProps) => {
	return (
		<Flex wrap="wrap" justify="between" gap="20">
			<Card className={styles.wrapper} title="Список вопросов">
				<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
					{collection?.questions?.map((question) => {
						return <PreviewQuestionsItem key={question.id} question={question} />;
					})}
					{questions?.map((question) => {
						return <PreviewQuestionsItem key={question.id} question={question} />;
					})}
				</Flex>
			</Card>
		</Flex>
	);
};
