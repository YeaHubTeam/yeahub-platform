import { useModal } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Popover, PopoverTrigger } from '@/shared/ui/Popover';

import { Skeleton } from '../Skeleton';

import styles from './WarningPopover.module.css';

export const WarningPopoverSkeleton = () => {
	const { isOpen, onToggle } = useModal();
	return (
		<Popover
			isOpen={isOpen}
			placement="bottom-end"
			className={styles.popover}
			body={
				<Flex direction="row" gap="16">
					<Skeleton width={24} height={24} />
					<Icon icon="warning" color="yellow-900" size={24} />
					<Flex direction="column" gap="16" style={{ width: '290px' }}>
						<Skeleton width={70} height={50} />
					</Flex>
				</Flex>
			}
		>
			<PopoverTrigger className={styles.warning} onMouseEnter={onToggle} onMouseLeave={onToggle}>
				<Skeleton width={24} height={24} />
			</PopoverTrigger>
		</Popover>
	);
};
