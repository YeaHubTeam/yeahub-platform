import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Collections } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popover';
import { PopoverTrigger } from '@/shared/ui/Popover/PopoverFabric/PopoverFabric';
import { Text } from '@/shared/ui/Text';

import styles from './CollectionWarningInfo.module.css';

export const CollectionWarningInfo = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation(i18Namespace.collection);
	return (
		<Popover
			isOpen={open}
			placement="bottom-end"
			className={styles.popover}
			body={
				<Flex direction="row" gap="16">
					<Icon icon="warning" color="yellow-900" size={24} />
					<Flex direction="column" gap="16" style={{ width: '290px' }}>
						<Text variant="body3">{t(Collections.POPOVER_WARNING_INTRO)}</Text>
						<Text variant="body3">{t(Collections.POPOVER_WARNING_DISCLAIMER)}</Text>
					</Flex>
				</Flex>
			}
		>
			<PopoverTrigger
				className={styles.warning}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
			>
				<Icon icon="warning" color="yellow-900" size={24} />
			</PopoverTrigger>
		</Popover>
	);
};
