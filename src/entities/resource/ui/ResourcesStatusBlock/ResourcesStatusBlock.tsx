import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';
import { IconName } from '@/shared/ui/Icon';

import { ResourceRequestStatus } from '../../model/types/resourceRequest';

import styles from './ResourcesStatusBlock.module.css';

interface StatusData {
	id: ResourceRequestStatus | 'all';
	title: string;
	iconName?: IconName;
}

interface ResourcesStatusBlockProps {
	resourceLimit?: number;
	selectedStatus?: string[] | string;
	onChooseStatus: (value: StatusData['id']) => void;
}

export const ResourcesStatusBlock = ({
	selectedStatus,
	onChooseStatus,
}: ResourcesStatusBlockProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);

	const statusData: StatusData[] = [
		{ id: 'all', title: t('status.all') },
		{ id: 'approved', title: t(Marketplace.STATUS_APPROVED), iconName: 'check' },
		{ id: 'rejected', title: t(Marketplace.STATUS_REJECTED), iconName: 'cross' },
		{ id: 'pending', title: t(Marketplace.STATUS_PENDING), iconName: 'burgerAndCross' },
	];

	const preparedData = statusData?.map((status) => ({
		...status,
		active: selectedStatus?.includes(status.id) ?? false,
	}));

	const chooseStatusHandler = (id: StatusData['id']) => {
		onChooseStatus(id);
	};

	return (
		<div className={styles.wrapper}>
			<BaseFilterSection
				data={preparedData}
				title={t(Marketplace.STATUS_TITLE)}
				onClick={chooseStatusHandler}
			/>
		</div>
	);
};
