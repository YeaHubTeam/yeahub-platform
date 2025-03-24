import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Button } from '@/shared/ui/Button';

import styles from './UserEditButton.module.css';

interface UserEditButtonProps {
	tab: string;
}

export const UserEditButton = ({ tab }: UserEditButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isMobile, isTablet } = useScreenSize();
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`${ROUTES.profile.edit.page}#${tab}`);
	};

	return (
		<div className={styles['card-edit-block']}>
			<Button
				variant="link"
				fullWidth={true}
				className={styles['card-edit']}
				onClick={handleNavigate}
				preffix={
					isMobile || isTablet ? (
						<Icon icon="pencilSimpleLine" size={20} color="--palette-ui-purple-700" />
					) : undefined
				}
			>
				{!(isMobile || isTablet) ? t(Translation.EDIT) : ''}
			</Button>
		</div>
	);
};
