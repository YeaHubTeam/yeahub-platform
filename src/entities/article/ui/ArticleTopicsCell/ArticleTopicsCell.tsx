import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { StatusChip, StatusChipItem } from '@/shared/ui/StatusChip';

import { ArticleTopic } from '../../model/types/article';

interface ArticleTopicsCellProps {
	items: ArticleTopic[];
}

export const ArticleTopicsCell = ({ items }: ArticleTopicsCellProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const topicStatuses: Record<ArticleTopic, StatusChipItem> = {
		interview: {
			variant: 'purple',
			text: t(Articles.STATUS_INTERVIEW),
		},
		system_design: {
			variant: 'green',
			text: t(Articles.STATUS_SYSTEM_DESIGN),
		},
		basics: {
			variant: 'yellow',
			text: t(Articles.STATUS_BASICS),
		},
		advanced: {
			variant: 'red',
			text: t(Articles.STATUS_ADVANCED),
		},
	};

	return (
		<Flex direction="column" gap="8" align="start">
			{items.map((item) => (
				<StatusChip key={item} status={topicStatuses[item]} />
			))}
		</Flex>
	);
};
