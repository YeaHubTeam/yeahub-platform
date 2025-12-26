import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { CollectionTariff } from '@/entities/collection';

import styles from './ChooseCollectionAccess.module.css';

interface ChooseCollectionAccessProps {
	isFree?: boolean;
	onChangeIsFree: (isFree: boolean | undefined) => void;
}

interface AccessItem {
	id: CollectionTariff;
	title: string;
	active?: boolean;
}

export const ChooseCollectionAccess = ({ isFree, onChangeIsFree }: ChooseCollectionAccessProps) => {
	const { t } = useTranslation(i18Namespace.collection);

	const accessItems: AccessItem[] = [
		{ id: 'premium', title: t(Collections.TARIFF_PAID) },
		{ id: 'free', title: t(Collections.TARIFF_FREE) },
	];

	const onChooseAccess = (id: CollectionTariff) => {
		const values: Record<CollectionTariff, string> = {
			premium: 'false',
			free: 'true',
		};

		onChangeIsFree(isFree === JSON.parse(values[id]) ? undefined : JSON.parse(values[id]));
	};

	const prepareData = accessItems.map((item) => ({
		...item,
		active: (item.id === 'free') === isFree,
	}));

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={prepareData}
				title={t(Collections.ADDITIONAL_INFO_ACCESS)}
				onClick={onChooseAccess}
			/>
		</div>
	);
};
