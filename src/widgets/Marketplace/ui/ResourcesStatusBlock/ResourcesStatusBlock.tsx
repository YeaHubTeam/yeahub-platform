import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { FilterFromUser } from '@/shared/hooks';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './ResourcesStatusBlock.module.css';

type Status = NonNullable<FilterFromUser['status']>;

interface StatusData {
	id: Status;
	title: string;
	icon?: IconName;
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
		{ id: 'approved', title: t('status.approved'), icon: 'check' },
		{ id: 'rejected', title: t('status.rejected'), icon: 'cross' },
		{ id: 'pending', title: t('status.pending'), icon: 'burgerAndCross' },
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
			<Flex direction="column" gap="8" style={{ maxWidth: 'max-content' }}>
				<Text variant="body2" color="black-700">
					{t(Marketplace.STATUS_TITLE)}
				</Text>
				<Flex direction="column" wrap="wrap" gap="8">
					{preparedData.map((item) => (
						<Chip
							key={item.id}
							className={styles.chip}
							label={item.title}
							theme="primary"
							prefix={item.icon ? <Icon icon={item.icon} size={20} color="black-700" /> : null}
							active={item.active}
							onClick={() => chooseStatusHandler(item.id)}
						/>
					))}
				</Flex>
			</Flex>
		</div>
	);
};
