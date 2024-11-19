import { Fragment } from 'react';

import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PopoverMenuItem } from '../../model/types/types';

import styles from './PopoverMenu.module.css';

interface PopoverMenuProps {
	menuItems: PopoverMenuItem[];
	onToggleOpenPopover: () => void;
}

export const PopoverMenu = ({ menuItems, onToggleOpenPopover }: PopoverMenuProps) => {
	return (
		<Flex direction="column" gap="4">
			{menuItems.map(({ icon, onClick, title, renderComponent }, index) => (
				<Fragment key={index}>
					{icon && title && onClick ? (
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
					) : (
						renderComponent?.(onToggleOpenPopover)
					)}
				</Fragment>
			))}
		</Flex>
	);
};
