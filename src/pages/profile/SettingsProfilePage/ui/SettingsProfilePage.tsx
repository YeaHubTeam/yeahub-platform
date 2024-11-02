import { Outlet, useLocation } from 'react-router-dom';

import { BreadcrumbItem } from '@/shared/ui/BreadcrumbItem';

import style from './SettingsProfilePage.module.css';

export const SettingsProfilePage = () => {
	const location = useLocation();
	return (
		<>
			<ul className={style.list}>
				<li className={style.route}>
					<BreadcrumbItem
						to="/settings/email-verify"
						isCurrent={location.pathname === '/settings/email-verify'}
					>
						Подтверждение e-mail
					</BreadcrumbItem>
				</li>
			</ul>
			<Outlet />
		</>
	);
};
