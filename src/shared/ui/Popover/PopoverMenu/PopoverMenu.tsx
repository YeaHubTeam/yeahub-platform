import { Fragment } from 'react/jsx-runtime';

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
			{menuItems.map(({ icon, onClick, title, renderComponent, shouldBeClickable }) => (
				<Fragment key={title}>
					{title && onClick ? (
						<Button
							onClick={() => {
								onClick();
								onToggleOpenPopover();
							}}
							className={styles.button}
							variant="tertiary"
							preffix={icon}
						>
							{title}
						</Button>
					) : shouldBeClickable ? (
						renderComponent?.(onToggleOpenPopover, styles.button)
					) : (
						renderComponent?.(onToggleOpenPopover)
					)}
				</Fragment>
			))}
		</Flex>
	);
};
