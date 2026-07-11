import { useTranslation } from 'react-i18next';

import { i18Namespace, Topics } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetTopicsListQuery } from '../../api/topicApi';

import { TopicSelectSkeleton } from './TopicSelect.skeleton';

export type TopicSelectProps = Pick<
	EntitySelectProps<number>,
	'value' | 'hasMultiple' | 'disabled'
> & {
	onChange: (value: number[]) => void;
	selectedSkills?: number[];
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

	if (isLoading) {
		return <TopicSelectSkeleton />;
	}

	return (
		<EntitySelect
			size="S"
			items={topics?.data || []}
			value={value}
			onChange={(v) => onChange(Array.isArray(v) ? v : [v])}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Topics.SELECT_CHOOSE)}
			emptyTranslationKey={t(Topics.SELECT_EMPTY)}
			selectedTranslationKey={t(Topics.SELECT_SELECTED)}
		/>
	);
};
