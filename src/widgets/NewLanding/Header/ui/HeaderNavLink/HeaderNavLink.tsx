import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Text } from '@/shared/ui/Text';

import { HeaderNavLinkProps } from '../../model/types/headerTypes';

import styles from './HeaderNavLink.module.css';

export const HeaderNavLink = ({ link, path, children }: HeaderNavLinkProps) => {
	const location = useLocation();

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				classNames(styles['nav-link'], styles.link, {
					[styles.active]: isActive || (path ? location.pathname.includes(path) : false),
				})
			}
		>
			<Text variant="body3-accent">{children}</Text>
		</NavLink>
	);
};
