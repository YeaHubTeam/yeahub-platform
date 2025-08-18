import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetResourceTypesQuery } from '../../api/resourceApi';
import { EMPTY_RESOURCE_ID } from '../../model/constants/resource';

type ResourcesSelectProps = Omit<
	React.ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: number | number[];
	onChange: (value: number[] | number) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

type ResourceType = {
	id: number;
	title: string;
};

export const ResourcesSelect = ({
	onChange,
	value,
	hasMultiple,
	disabled,
}: ResourcesSelectProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	const { data } = useGetResourceTypesQuery();
	const resourceTypes = data?.map((item, index) => ({
		id: index,
		title: item.code,
	}));

	const [selectedResources, setSelectedResources] = useState<number[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChange = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		const numValue = +newValue;

		if (hasMultiple) {
			const updates = [...selectedResources, numValue];
			setSelectedResources(updates);
			onChange(updates);
		} else {
			setSelectedResources([numValue]);
			onChange(numValue);
		}
	};

	const handleDeleteResource = (id: number) => () => {
		if (disabled) return;
		const updates = selectedResources.filter((resourceId) => resourceId !== id);
		setSelectedResources(updates);
		onChange(updates);
	};

	const options = useMemo(() => {
		if (hasMultiple) {
			return (resourceTypes || [])
				.map((resource) => ({
					label: resource.title,
					value: resource.id.toString(),
					limit: 100,
				}))
				.filter((resource) => !selectedResources?.includes(+resource.value));
		} else {
			return (resourceTypes || []).map((resource) => ({
				label: resource.title,
				value: resource.id.toString(),
				limit: 100,
			}));
		}
	}, [selectedResources, resourceTypes]);

	const resourcesDictionary = useMemo(() => {
		const emptyResource: ResourceType = {
			id: EMPTY_RESOURCE_ID,
			title: t(Marketplace.SELECT_CHOOSE),
		};
		return (resourceTypes || []).reduce(
			(acc, resource) => {
				acc[resource.id] = resource;
				return acc;
			},
			{ [EMPTY_RESOURCE_ID]: emptyResource } as Record<number, ResourceType>,
		);
	}, [resourceTypes]);

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					label={options.length ? t(Marketplace.SELECT_CHOOSE) : t(Marketplace.SELECT_EMPTY)}
					disabled={disabled}
					value={resourcesDictionary[selectedResources[0] || 0]?.title ?? ''}
					onSelect={(val) => handleChange(String(val))}
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
			title={t(Marketplace.SELECT_SELECTED)}
			options={options}
			onChange={handleChange}
			selectedItems={selectedResources}
			handleDeleteItem={handleDeleteResource}
			itemsDictionary={resourcesDictionary}
			placeholder={options.length ? t(Marketplace.SELECT_CHOOSE) : t(Marketplace.SELECT_EMPTY)}
			disabled={disabled}
		/>
	);
};
