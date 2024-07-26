import React, { FC, useState, KeyboardEvent } from 'react';

import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
	menuItems: Array<{ id: string; label: string; onClick: () => void }>;
	className?: string;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ menuItems, className = '' }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>, onClick: () => void) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onClick();
		}
	};

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<button
				className={styles.btn}
				onClick={toggleMenu}
				aria-expanded={isOpen}
				aria-label="Toggle menu"
			>
				☰
			</button>
			{isOpen && (
				<div className={styles.menu}>
					{menuItems.map((item) => (
						<div
							key={item.id}
							className={styles.item}
							onClick={item.onClick}
							onKeyDown={(event) => handleKeyPress(event, item.onClick)}
							role="button"
							tabIndex={0}
						>
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
