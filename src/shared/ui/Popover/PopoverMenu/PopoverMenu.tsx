import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PopoverMenuItem } from '../types';

import styles from './PopoverMenu.module.css';

interface PopoverMenuProps {
	menuItems: PopoverMenuItem[];
	onToggleOpenPopover: () => void;
}

export const PopoverMenu = ({ menuItems, onToggleOpenPopover }: PopoverMenuProps) => {
	return (
		<Flex direction="column" gap="4">
			{menuItems.map(({ icon, onClick, title, renderComponent }) => (
				<div key={title}>
					{title && onClick ? (
						<Button
							onClick={onToggleOpenPopover}
							className={styles.button}
							variant="tertiary"
							preffix={icon}
						>
							{title}
						</Button>
					) : (
						renderComponent?.(onToggleOpenPopover)
					)}
				</div>
			))}
		</Flex>
	);
};
