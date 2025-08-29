import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

import styles from './CookiesWarning.module.css';

const createPortalRoot = () => {
	const cookieRoot = document.createElement('div');
	cookieRoot.setAttribute('id', 'cookie-root');

	return cookieRoot;
};

export const CookiesWarning = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const portalRootRef = useRef(document.getElementById('cookie-root') || createPortalRoot());
	const [isAgreed, setIsAgreed] = useState(getJSONFromLS('YH-cookie-modal'));

	useEffect(() => {
		if (!isAgreed) {
			document.querySelector('body')!.appendChild(portalRootRef.current);
			const portal = portalRootRef.current;

			return () => {
				portal.remove();
			};
		}
	}, [isAgreed]);

	const handleClick = () => {
		setIsAgreed(true);
		setToLS('YH-cookie-modal', 'true');
	};

	return createPortal(
		<div data-testid="CookiesWarning" role="alert" className={styles.wrapper}>
			<div className={styles['cookie-wrapper']}>
				<Text className={styles.text} variant="body3" color="black-700">
					{t(Landing.COOKIES_TEXT)}{' '}
					<a
						rel="noopener noreferrer"
						href="https://docs.google.com/document/d/19JvySToaMm3pkohGkHwqhJjGl3IzldIc3qnQpAoVFVc/edit?tab=t.0#heading=h.gjdgxs"
						target="_blank"
					>
						<Text className={styles.link} variant="body3" color="purple-700">
							{t(Landing.COOKIES_LINK)}
						</Text>
					</a>
				</Text>
				<Button
					dataTestId="CookiesWarning_AgreeButton"
					className={styles.btn}
					variant="primary"
					onClick={handleClick}
				>
					{t(Landing.COOKIES_AGREE)}
				</Button>
			</div>
		</div>,
		portalRootRef.current,
	);
};
