import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetTopicsListQuery } from '../../api/topicApi';
import { Topic } from '../../model/types/topic';

import { TopicSelectSkeleton } from './TopicSelect.skeleton';

export type TopicSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: number[] | number;
	onChange: (value: number[]) => void;
	selectedSkills?: number[];
	hasMultiple?: boolean;
};

export const TopicSelect = ({
	onChange,
	value,
	selectedSkills,
	hasMultiple = true,
	disabled,
}: TopicSelectProps) => {
	const { t } = useTranslation(i18Namespace.topic);

	const hasSkills =
		(Array.isArray(selectedSkills) && selectedSkills.length > 0) ||
		typeof selectedSkills === 'number';

	const { data: topics, isLoading } = useGetTopicsListQuery(
		{
			skillIds: selectedSkills || [],
			limit: 100,
		},
		{ skip: !hasSkills },
	);

	const [selectedTopics, setSelectedTopics] = useState<number[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChange = (newValue: string | undefined) => {
		if (!newValue) return;
		if (hasMultiple) {
			const updates = [...(selectedTopics || []), +newValue];
			setSelectedTopics(updates);
			onChange(updates);
		} else {
			setSelectedTopics([+newValue]);
			onChange([+newValue]);
		}
	};

	const handleDeleteTopic = (id: number) => () => {
		const updates = selectedTopics.filter((topicId) => topicId !== id);
		setSelectedTopics(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (topics?.data || [])
				.map((topic) => ({
					label: topic.title,
					value: topic.id.toString(),
				}))
				.filter((topic) => !selectedTopics?.includes(+topic.value));
		} else {
			return (topics?.data || []).map((topic) => ({
				label: topic.title,
				value: topic.id.toString(),
			}));
		}
	}, [topics?.data, selectedTopics]);

	const topicsDictionary = useMemo(() => {
		return topics?.data?.reduce(
			(acc, topic) => {
				acc[topic.id] = topic;
				return acc;
			},
			{} as Record<string, Topic>,
		);
	}, [topics]);

	if (isLoading) {
		return <TopicSelectSkeleton />;
	}

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					label={options.length ? t(Topics.SELECT_CHOOSE) : t(Topics.SELECT_EMPTY)}
					disabled={disabled}
					value={topicsDictionary?.[Array.isArray(value) ? value[0] : value]?.title}
					onSelect={(val) => handleChange(String(val))}
					size="S"
				>
					{options.map((option) => (
						<Option value={option.value} label={option.label} key={option.label} />
					))}
				</Dropdown>
			</>
		);
	}

	return (
		<SelectWithChips
			disabled={disabled}
			title={t(Topics.SELECT_SELECTED)}
			options={options}
			onChange={handleChange}
			placeholder={options.length ? t(Topics.SELECT_CHOOSE) : t(Topics.SELECT_EMPTY)}
			selectedItems={selectedTopics}
			handleDeleteItem={handleDeleteTopic}
			itemsDictionary={topicsDictionary}
		/>
	);
};
