import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { MAX_LIMIT_RESOURCES } from '@/shared/constants/queryConstants';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import { useGetResourceTypesQuery } from '@/entities/resource/api/resourceApi';

import styles from './ResourcesFilterSection.module.css';

interface ResourcesFilterSectionProps {
	resourceLimit?: number;
	selectedResources?: number[];
	onChooseResources: (resources: number[] | undefined) => void;
}

export const ResourcesFilterSection = ({
	resourceLimit,
	selectedResources,
	onChooseResources,
}: ResourcesFilterSectionProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const [showAll, setShowAll] = useState(false);
	const [limit] = useState(resourceLimit || MAX_LIMIT_RESOURCES);

	const { data } = useGetResourceTypesQuery();
	const resourceTypes = data?.map((item, index) => ({
		id: index,
		title: item.code,
	}));

	const hasHiddenResources = (resourceTypes?.length ?? 0) > (resourceLimit ?? MAX_LIMIT_RESOURCES);

	const toggleShowAll = () => {
		setShowAll((prev) => !prev);
	};

	const preparedData = (showAll ? resourceTypes : resourceTypes?.slice(0, limit))?.map(
		(resource, index) => ({
			...resource,
			active: selectedResources?.includes(index) ?? false,
		}),
	);

	const onChooseResource = (id: number) => {
		if (selectedResources?.includes(id)) {
			const filteredResources = selectedResources.filter((resource) => resource !== id);
			onChooseResources(filteredResources.length > 0 ? filteredResources : undefined);
		} else {
			onChooseResources([...(selectedResources || []), id]);
		}
	};

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={preparedData ?? []}
				title={t(Marketplace.RESOURCES_TITLE)}
				onClick={onChooseResource}
			/>
			{hasHiddenResources && (
				<Button className={styles.button} variant="link" onClick={toggleShowAll}>
					{!showAll ? t(Marketplace.SHOW_ALL) : t(Marketplace.HIDE)}
				</Button>
			)}
		</div>
	);
};
