import { useTranslation } from 'react-i18next';

import { Articles, i18Namespace } from '@/shared/config';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { ARTICLE_TOPIC_OPTIONS } from '../../model/constants/articleOptions';
import { ArticleTopics } from '../../model/types/article';

export interface ArticleTopicSelectProps {
	value: ArticleTopics[];
	onChange: (value: ArticleTopics[]) => void;
	className?: string;
}

export const ArticleTopicSelect = ({
	value,
	onChange,
	className = '',
}: ArticleTopicSelectProps) => {
	const { t } = useTranslation(i18Namespace.article);

	const translatedTopics = ARTICLE_TOPIC_OPTIONS.map(({ value: topic, labelKey }) => ({
		id: topic,
		title: t(labelKey),
	}));

	const topicsDictionary = Object.fromEntries(
		translatedTopics.map((topic) => [topic.id, topic]),
	) as Record<ArticleTopics, (typeof translatedTopics)[number]>;

	const options = translatedTopics
		.filter((topic) => !value.includes(topic.id))
		.map(({ id, title }) => ({ value: id, label: title }));

	const handleAddTopic = (newValue?: string) => {
		const topic = ARTICLE_TOPIC_OPTIONS.find((option) => option.value === newValue)?.value;

		if (!topic || value.includes(topic)) return;

		onChange([...value, topic]);
	};

	const handleDeleteTopic = (topic: ArticleTopics) => () => {
		onChange(value.filter((selectedTopic) => selectedTopic !== topic));
	};

	return (
		<SelectWithChips
			className={className}
			title={t(Articles.TOPICS_TITLE)}
			placeholder={options.length ? t(Articles.TOPICS_PLACEHOLDER) : t(Articles.TOPICS_EMPTY)}
			options={options}
			selectedItems={value}
			itemsDictionary={topicsDictionary}
			onChange={handleAddTopic}
			handleDeleteItem={handleDeleteTopic}
		/>
	);
};
