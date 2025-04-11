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
			{menuItems.map(({ icon, onClick, title, renderComponent }, index) => (
				// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
				<div key={index} onClick={onToggleOpenPopover}>
					{title && onClick ? (
						<Button onClick={onClick} className={styles.button} variant="tertiary" preffix={icon}>
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
