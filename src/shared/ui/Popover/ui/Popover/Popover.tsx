import { ReactNode, useMemo, useState } from 'react';
import { Popover as PopoverKit } from 'yeahub-ui-kit';

import { PopoverMenuItem } from '../../model/types/types';
import { PopoverMenu } from '../PopoverMenu/PopoverMenu';

import styles from './Popover.module.css';

interface PopoverChildrenProps {
	onToggle: () => void;
	isOpen: boolean;
}

interface PopoverProps {
	children: ({ onToggle, isOpen }: PopoverChildrenProps) => ReactNode;
	menuItems?: PopoverMenuItem[];
	body?: JSX.Element;
}

export const Popover = ({ children, menuItems, body }: PopoverProps) => {
	const [isOpenPopover, setIsOpenPopover] = useState<boolean>(false);

	const onToggleOpenPopover = () => setIsOpenPopover((prev) => !prev);

	const renderBody = useMemo(() => {
		if (menuItems) {
			return <PopoverMenu menuItems={menuItems} onToggleOpenPopover={onToggleOpenPopover} />;
		}

		if (body) {
			return body;
		}
	}, [menuItems, body]);

	if (!renderBody) {
		return null;
	}

	return (
		<PopoverKit
			className={styles.popover}
			isOpen={isOpenPopover}
			body={renderBody}
			onClickOutside={onToggleOpenPopover}
			placement="bottom-end"
		>
			{children({ onToggle: onToggleOpenPopover, isOpen: isOpenPopover })}
		</PopoverKit>
	);
};
