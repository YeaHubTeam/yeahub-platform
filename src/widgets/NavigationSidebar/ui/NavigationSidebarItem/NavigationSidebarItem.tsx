import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import Main from '@/shared/assets/icons/main.svg';
import Menu from '@/shared/assets/icons/menu.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Badge } from '@/shared/ui/Badge';

import { categoryCounts, categoryTitles } from '../../model/category';

import styles from './NavigationSidebarItem.module.css';

interface NavigationItemProps {
	title?: string;
	name?: string;
}

interface CategoryImages {
	[key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
}

const categoryImages: CategoryImages = {
	'': Main,
	profile: ProfileIcon,
	default: Menu,
};

const NavigationItem: FC<NavigationItemProps> = ({ title, name = '' }) => {
	const ImageComponent = categoryImages[name] || categoryImages.default;
	const count = categoryCounts[name] || 0;

	return (
		<NavLink
			to={`/${name}`}
			className={({ isActive }) => `${styles.item} ${isActive ? styles['item-active'] : ''}`}
		>
			<div className={styles.wrap}>
				<ImageComponent className={styles.image} />
				<span className={styles.span}>{title}</span>
			</div>
			{count > 0 && <Badge count={count} />}
		</NavLink>
	);
};

export const NavigationSidebarItem: FC = () => {
	return (
		<nav className={styles.nav}>
			{Object.entries(categoryTitles).map(([name, title]) => {
				return <NavigationItem key={name} name={name} title={title} />;
			})}
		</nav>
	);
};
