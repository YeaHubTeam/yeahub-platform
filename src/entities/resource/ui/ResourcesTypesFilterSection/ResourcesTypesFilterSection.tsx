import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import { useGetResourceTypesQuery } from '../../api/resourceApi';
import { ResourceTypeCode } from '../../model/types/resource';

import styles from './ResourcesTypesFilterSection.module.css';

interface ResourcesTypesFilterSectionProps {
	resourceLimit?: number;
	selectedTypes?: ResourceTypeCode[];
	onChooseTypes: (types?: ResourceTypeCode[]) => void;
}

const MAX_LIMIT_RESOURCES = 4;

export const ResourcesTypesFilterSection = ({
	resourceLimit,
	selectedTypes,
	onChooseTypes,
}: ResourcesTypesFilterSectionProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const [showAll, setShowAll] = useState(false);
	const limit = resourceLimit || MAX_LIMIT_RESOURCES;

	const { data } = useGetResourceTypesQuery();
	const resourceTypes = data?.map((item) => ({
		id: item.code,
		title: t(`resourceTypes.${item.code}`, item.code),
	}));

	const hasHiddenResources = (resourceTypes?.length ?? 0) > (resourceLimit ?? MAX_LIMIT_RESOURCES);

	const toggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	const preparedData = (showAll ? resourceTypes : resourceTypes?.slice(0, limit))?.map(
		(resource) => ({
			...resource,
			active: selectedTypes?.includes(resource.id) ?? false,
		}),
	);

	const onChooseType = (id: ResourceTypeCode) => {
		const typesArray = Array.isArray(selectedTypes)
			? selectedTypes
			: selectedTypes
				? [selectedTypes]
				: [];

		if (typesArray.includes(id)) {
			const filteredTypes = typesArray.filter((type) => type !== id);
			onChooseTypes(filteredTypes.length > 0 ? filteredTypes : undefined);
		} else {
			onChooseTypes([...typesArray, id]);
		}
	};

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={preparedData ?? []}
				title={t(Marketplace.RESOURCES_TITLE)}
				onClick={onChooseType}
			/>
			{hasHiddenResources && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Marketplace.SHOW_ALL) : t(Marketplace.HIDE)}
				</Button>
			)}
		</div>
	);
};
