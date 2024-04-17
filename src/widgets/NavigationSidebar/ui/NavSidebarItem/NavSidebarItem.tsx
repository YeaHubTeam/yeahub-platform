/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Main from '@/shared/assets/icons/main.svg';
import Menu from '@/shared/assets/icons/menu.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Badge } from '@/shared/ui/Badge';

import { categoryCounts, categoryTitles } from '../../model/category';

import styles from './NavSidebarItem.module.css';

interface NavItemProps {
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

const NavItem: FC<NavItemProps> = ({ title, name = '' }) => {
	const ImageComponent = categoryImages[name] || categoryImages.default;
	const count = categoryCounts[name] || 0;
	const isOpenSidebar = useSelector((state: any) => state.navigationSidebar.isOpenSidebar);

	return (
		<NavLink
			to={`/${name}`}
			className={({ isActive }) => `${styles.item} ${isActive ? styles['item-active'] : ''}`}
		>
			<div className={styles.wrap}>
				<ImageComponent className={styles.image} />
				<span className={`${styles.span} ${isOpenSidebar && styles.closing}`}>{title}</span>
			</div>
			{count > 0 && <Badge count={count} />}
		</NavLink>
	);
};

export const NavSidebarItem: FC = () => {
	return (
		<nav className={styles.nav}>
			{Object.entries(categoryTitles).map(([name, title]) => {
				return <NavItem key={name} name={name} title={title} />;
			})}
		</nav>
	);
};
