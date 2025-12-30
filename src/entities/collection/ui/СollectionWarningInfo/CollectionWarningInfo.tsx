import { useTranslation } from 'react-i18next';

import { i18Namespace, Collections } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover, PopoverTrigger } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import styles from './CollectionWarningInfo.module.css';

export const CollectionWarningInfo = () => {
	const { isOpen, onToggle } = useModal();
	const { t } = useTranslation(i18Namespace.collection);
	return (
		<Popover
			isOpen={isOpen}
			placement="bottom-end"
			className={styles.popover}
			body={
				<Flex direction="row" gap="16">
					<Icon icon="warning" color="yellow-900" size={24} />
					<Flex direction="column" gap="16" style={{ width: '290px' }}>
						<Text variant="body3">{t(Collections.WARNING_INTRO)}</Text>
						<Text variant="body3">{t(Collections.WARNING_DISCLAIMER)}</Text>
					</Flex>
				</Flex>
			}
		>
			<PopoverTrigger className={styles.warning} onMouseEnter={onToggle} onMouseLeave={onToggle}>
				<Icon icon="warning" color="yellow-900" size={24} />
			</PopoverTrigger>
		</Popover>
	);
};
