import { useState, KeyboardEvent } from 'react';
import { Icon, Popover } from 'yeahub-ui-kit';

import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
	menuItems: Array<{ id: string; label: string; onClick: () => void }>;
	className?: string;
}

export const BurgerMenu = ({ menuItems, className = '' }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, onClick: () => void) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClick();
		}
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Popover
				body={
					<div className={styles.menu}>
						{menuItems.map((item) => (
							<div
								key={item.id}
								className={styles.item}
								onClick={() => {
									item.onClick();
									closeMenu();
								}}
								onKeyDown={(event) => handleKeyPress(event, item.onClick)}
								role="button"
								tabIndex={0}
							>
								{item.label}
							</div>
						))}
					</div>
				}
				isOpen={isOpen}
				onClickOutside={closeMenu}
				placement="bottom"
			>
				<button
					className={styles.btn}
					onClick={toggleMenu}
					aria-expanded={isOpen}
					aria-label="Toggle menu"
				>
					<Icon icon="list" />
				</button>
			</Popover>
		</div>
	);
};
