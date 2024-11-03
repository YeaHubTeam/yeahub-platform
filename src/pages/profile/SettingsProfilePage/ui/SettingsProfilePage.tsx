import { Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { BreadcrumbItem } from '@/shared/ui/BreadcrumbItem';

import style from './SettingsProfilePage.module.css';

const SettingsProfilePage = () => {
	const location = useLocation();
	return (
		<>
			<ul className={style.list}>
				<li className={style.route}>
					<BreadcrumbItem
						to={ROUTES.settings.page}
						isCurrent={location.pathname === ROUTES.settings.page}
					>
						Подтверждение e-mail
					</BreadcrumbItem>
				</li>
			</ul>
			<Outlet />
		</>
	);
};

export default SettingsProfilePage;
