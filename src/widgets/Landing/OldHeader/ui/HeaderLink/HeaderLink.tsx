import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink, To } from 'react-router-dom';

import { Text } from '@/shared/ui/Text';

import styles from './HeaderLink.module.css';

interface HeaderLinkProps {
	link: To;
	children: ReactNode;
	path?: string;
	className?: string;
}
export const HeaderLink = ({ link, children, path }: HeaderLinkProps) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				classNames(styles['questions-link'], styles.link, {
					[styles.active]: isActive || location.pathname.includes(path ?? ''),
				})
			}
		>
			<Text variant="body3-accent">{children}</Text>
		</NavLink>
	);
};
