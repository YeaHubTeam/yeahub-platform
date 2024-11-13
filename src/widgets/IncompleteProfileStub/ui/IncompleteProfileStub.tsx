import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { mainPage } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

import styles from './IncompleteProfileStub.module.css';

interface IncompleteProfileStubProps {
	percent: number;
}

export const IncompleteProfileStub = ({ percent }: IncompleteProfileStubProps) => {
	const navigate = useNavigate();

	const { t: tMainPage } = useI18nHelpers(i18Namespace.mainPage);

	const redirectToProfileEditing = () => {
		navigate(`${ROUTES.profile.edit.page}#personal-information`);
	};

	return (
		<Card className={styles.card}>
			<div className={styles['card-wrapper']}>
				<div className={styles['card-content']}>
					<h3 className={styles['card-title']}>
						{tMainPage(mainPage.PROFILE_FULLNESS)} {percent}%
					</h3>
					<p className={styles['card-text']}>{tMainPage(mainPage.COMPLETION_PROMPT)}</p>
				</div>
				<Button onClick={redirectToProfileEditing} className={styles.button} size="L">
					{tMainPage(mainPage.COMPLETE_PROFILE_BUTTON)}
				</Button>
			</div>
		</Card>
	);
};
