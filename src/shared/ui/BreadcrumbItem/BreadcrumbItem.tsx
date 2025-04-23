import { Link } from 'react-router-dom';

import styles from './BreadcrumbItem.module.css';

interface BreadcrumbItemProps {
	children: React.ReactNode;
	isCurrent?: boolean;
	to?: string;
}

export const BreadcrumbItem = ({ to = '', isCurrent = false, children }: BreadcrumbItemProps) => {
	return isCurrent ? (
		<span className={styles.current}>{children}</span>
	) : (
		<Link className={styles.item} to={to}>
			{children}
		</Link>
	);
};
