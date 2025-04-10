import { useTranslation } from 'react-i18next';
import { useLocation, useMatches } from 'react-router-dom';

import { Icon } from '@/shared/ui/Icon';
import { useScreenSize } from '@/shared/hooks';

import { BreadcrumbItem } from '../../BreadcrumbItem';

import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
	const matches = useMatches();
	const { pathname } = useLocation();
	const { t } = useTranslation();
	const { isMobile } = useScreenSize();

	const crumbs = matches
		.filter((match) => Boolean(match.handle as { crumb: string }))
		.map((match) => ({
			crumb: t((match.handle as { crumb: string }).crumb),
			pathname: match.pathname,
		}));

	return (
		<>
			{crumbs.length > 1 && (
				<ul className={styles.list}>
					{crumbs.map((crumbItem, index, arr) => (
						<li className={styles.item} key={index}>
							{(index !== 0 || isMobile) && (
								<Icon
									className={styles.icon}
									icon="altArrowRight"
									color={index === arr.length - 1 ? 'purple-700' : 'black-700'}
									size={20}
								/>
							)}
							{pathname === crumbItem.pathname ? (
								<BreadcrumbItem isCurrent>{crumbItem.crumb}</BreadcrumbItem>
							) : (
								<BreadcrumbItem to={crumbItem.pathname}>{crumbItem.crumb}</BreadcrumbItem>
							)}
						</li>
					))}
				</ul>
			)}
		</>
	);
};
