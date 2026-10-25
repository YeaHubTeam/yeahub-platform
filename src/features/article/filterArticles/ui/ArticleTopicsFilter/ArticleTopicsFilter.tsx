import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { ARTICLE_TOPIC_OPTIONS, ArticleTopics } from '@/entities/article';

interface ArticleTopicsFilterProps {
	selectedTopics?: ArticleTopics[];
	onChangeTopics: (topics?: ArticleTopics[]) => void;
}

export const ArticleTopicsFilter = ({
	selectedTopics,
	onChangeTopics,
}: ArticleTopicsFilterProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const onClick = (topic: ArticleTopics) => {
		const currentTopics = selectedTopics ?? [];
		const updates = currentTopics.includes(topic)
			? currentTopics.filter((item) => item !== topic)
			: [...currentTopics, topic];

		onChangeTopics(updates.length > 0 ? updates : undefined);
	};

	const preparedData: BaseFilterItem<ArticleTopics>[] = ARTICLE_TOPIC_OPTIONS.map(
		({ value, labelKey }) => ({
			id: value,
			title: t(labelKey),
			active: selectedTopics?.includes(value),
		}),
	);

	return (
		<BaseFilterSection data={preparedData} title={t(Articles.TOPICS_TITLE)} onClick={onClick} />
	);
};
