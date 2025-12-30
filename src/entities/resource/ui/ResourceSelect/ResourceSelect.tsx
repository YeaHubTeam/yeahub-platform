import { ComponentProps, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { Dropdown, Option } from '@/shared/ui/Dropdown';
import { SelectWithChips } from '@/shared/ui/SelectWithChips';

import { useGetResourceTypesQuery } from '../../api/resourceApi';
import { EMPTY_RESOURCE_ID } from '../../model/constants/resource';

type ResourcesSelectProps = Omit<
	ComponentProps<typeof Dropdown>,
	'options' | 'type' | 'value' | 'onChange' | 'children'
> & {
	value: string | string[];
	onChange: (value: string[] | string) => void;
	hasMultiple?: boolean;
	disabled?: boolean;
};

type ResourceType = {
	id: string;
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

	const resourceTypes = data?.map((item) => ({
		id: item.code,
		title: t(`resourceTypes.${item.code}`, item.code),
	}));

	const [selectedResources, setSelectedResources] = useState<string[]>(
		Array.isArray(value) ? value : value !== undefined ? [value] : [],
	);

	const handleChange = (newValue: string | undefined) => {
		if (disabled || !newValue) return;
		const strValue = newValue;

		if (hasMultiple) {
			const updates = [...selectedResources, strValue];
			setSelectedResources(updates);
			onChange(updates);
		} else {
			setSelectedResources([strValue]);
			onChange(strValue);
		}
	};

	const handleDeleteResource = (id: string) => () => {
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
					value: resource.id,
					limit: 100,
				}))
				.filter((resource) => !selectedResources?.includes(resource.value));
		} else {
			return (resourceTypes || []).map((resource) => ({
				label: resource.title,
				value: resource.id,
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
			{ [EMPTY_RESOURCE_ID]: emptyResource } as Record<string, ResourceType>,
		);
	}, [resourceTypes]);

	if (!hasMultiple) {
		return (
			<>
				<Dropdown
					label={options.length ? t(Marketplace.SELECT_CHOOSE) : t(Marketplace.SELECT_EMPTY)}
					disabled={disabled}
					value={resourcesDictionary[selectedResources[0] || EMPTY_RESOURCE_ID]?.title ?? ''}
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
