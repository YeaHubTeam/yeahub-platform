import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetTopicsListQuery } from '../../api/topicApi';
import { MAX_SHOWN_LIMIT_TOPICS } from '../../model/constants/topicConstants';

interface TopicFilterFieldProps {
	onChangeTopics: (topics: number[]) => void;
	selectedTopics?: number[];
	selectedSkills?: number[];
}

export const TopicFilterField = ({
	onChangeTopics,
	selectedTopics = [],
	selectedSkills = [],
}: TopicFilterFieldProps) => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.translation]);

	const { isMobile } = useScreenSize();

	const [showAll, setShowAll] = useState(false);
	const [limit, setLimit] = useState(MAX_SHOWN_LIMIT_TOPICS);

	const { data: topicsData, isLoading } = useGetTopicsListQuery({
		...(selectedSkills.length > 0 && { skillIds: selectedSkills }),
		limit,
	});

	useEffect(() => {
		if (isMobile || showAll) {
			setLimit((limit) => topicsData?.total ?? limit);
		} else {
			setLimit(MAX_SHOWN_LIMIT_TOPICS);
		}
	}, [isMobile, showAll, topicsData?.total]);

	const onToggleShowAll = () => setShowAll((prev) => !prev);

	const handleTopicClick = (id: number) => {
		const isSelected = selectedTopics.includes(id);
		const newTopics = isSelected
			? selectedTopics.filter((topicId) => topicId !== id)
			: [...selectedTopics, id];
		onChangeTopics(newTopics.length ? newTopics : []);
	};

	const topicItems: BaseFilterItem<number>[] | undefined = useMemo(
		() =>
			topicsData?.data?.map(({ id, title }) => ({
				id,
				title,
				active: selectedTopics.includes(id),
			})),
		[topicsData?.data, selectedTopics],
	);
	if (isLoading || !topicItems) return null;

	return (
		<Flex direction="column" align="start" gap="8">
			<BaseFilterSection
				title={t(Questions.TOPIC_TITLE)}
				data={topicItems}
				onClick={handleTopicClick}
			/>
			{!isMobile && topicsData && topicsData.total > MAX_SHOWN_LIMIT_TOPICS && (
				<Button variant="link" onClick={onToggleShowAll}>
					{!showAll
						? t(Translation.SHOW_ALL, { ns: i18Namespace.translation })
						: t(Translation.HIDE, { ns: i18Namespace.translation })}
				</Button>
			)}
		</Flex>
	);
};
