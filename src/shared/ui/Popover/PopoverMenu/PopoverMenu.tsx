import { Fragment } from 'react/jsx-runtime';

import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { PopoverMenuItem } from '../types';

interface PopoverMenuProps {
	menuItems: PopoverMenuItem[];
	onToggleOpenPopover: () => void;
}

export const PopoverMenu = ({ menuItems, onToggleOpenPopover }: PopoverMenuProps) => {
	return (
		<Flex direction="column" gap="4">
			{menuItems.map(({ icon, onClick, title, renderComponent, disabled }) => (
				<Fragment key={title}>
					{title && onClick ? (
						<Button
							onClick={() => {
								onClick();
								onToggleOpenPopover();
							}}
							variant="tertiary-link"
							preffix={icon}
							disabled={disabled}
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
