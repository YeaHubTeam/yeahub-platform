import { BreadcrumbItem } from '@/shared/ui/BreadcrumbItem';

import { SettingsProfile } from '@/widgets/Profile';

import style from './SettingsProfilePage.module.css';

export const SettingsProfilePage = () => {
	return (
		<>
			<ul className={style.list}>
				<li className={style.route}>
					<BreadcrumbItem
						to="/profile/settings/email-verify"
						isCurrent={location.pathname === '/profile/settings/email-verify'}
					>
						Подтверждение e-mail
					</BreadcrumbItem>
				</li>
			</ul>
			<SettingsProfile />
		</>
	);
};
