import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import styles from './HeaderAuthMobile.module.css';

export const HeaderAuthMobile = ({ items }: { items: PopoverMenuItem[] }) => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<Popover menuItems={items} className={styles['auth-popover']}>
			{({ onToggle }) => (
				<IconButton
					form="square"
					variant="tertiary"
					onClick={onToggle}
					className={styles['burger-button']}
					icon={<Icon icon="burger" size={32} />}
					aria-label={t(Landing.HEADER_AUTH_ICONBUTTON_ARIA_LABEL)}
				/>
			)}
		</Popover>
	);
};
