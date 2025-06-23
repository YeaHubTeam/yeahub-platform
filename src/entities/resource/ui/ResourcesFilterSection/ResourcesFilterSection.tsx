import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { Button } from '@/shared/ui/Button';

import styles from './ResourcesFilterSection.module.css';

interface ResourcesFilterSectionProps {
	resourceLimit?: number;
	selectedResources?: number[];
	onChooseResources: (resources: number[] | undefined) => void;
}

const MAX_LIMIT_RESOURCES = 3;

export const ResourcesFilterSection = ({
	resourceLimit,
	selectedResources,
	onChooseResources,
}: ResourcesFilterSectionProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const [showAll, setShowAll] = useState(false);
	// const [limit, setLimit] = useState(resourceLimit || MAX_LIMIT_RESOURCES);

	const resources = {
		total: 4,
		data: [
			{ id: 1, title: t(Marketplace.RESOURCES_REPOSITORY) },
			{ id: 2, title: t(Marketplace.RESOURCES_VIDEO) },
			{ id: 3, title: t(Marketplace.RESOURCES_ARTICLE) },
			{ id: 4, title: t(Marketplace.RESOURCES_COURSE) },
		],
	};

	const hasHiddenResources = resources.total > (resourceLimit || MAX_LIMIT_RESOURCES);

	// TODO: Implement useGetResourcesListQuery
	// const { data: resources } = useGetResourcesListQuery({
	// 	limit,
	// 	resources: [selectedResources],
	// });

	// useEffect(() => {
	// 	if (showAll) {
	// 		setLimit(resources?.total ?? (resourceLimit || MAX_LIMIT_RESOURCES));
	// 	} else {
	// 		setLimit(resourceLimit || MAX_LIMIT_RESOURCES);
	// 	}
	// }, [resources?.total, showAll, resourceLimit]);

	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

	const preparedData = resources?.data.map((resource) => ({
		...resource,
		active: selectedResources?.includes(resource.id),
	}));

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
				data={preparedData}
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
