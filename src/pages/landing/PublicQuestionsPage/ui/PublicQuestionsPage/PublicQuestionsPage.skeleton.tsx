import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

import { PublicQuestionsFilterPanelSkeleton } from '../PublicQuestionsFilterPanel/PublicQuestionsFilterPanel.skeleton';
import { PublicQuestionPagePaginationSkeleton } from '../PublicQuestionsPagePagination/PublicQuestionPagePagination.skeleton';

import styles from './PublicQuestionsPage.module.css';

export const PublicQuestionsPageSkeleton = ({ dataTestId }: { dataTestId?: string }) => {
	return (
		<Flex dataTestId={dataTestId} gap="20" align="start" className={styles.wrapper}>
			<Card className={styles.main}>
				<FullQuestionsListSkeleton />
				<PublicQuestionPagePaginationSkeleton />
			</Card>
			<Card className={styles.filters}>
				<PublicQuestionsFilterPanelSkeleton />
			</Card>
		</Flex>
	);
};
