import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Button } from '@/shared/ui/Button';

import styles from './CookiesWarning.module.css';

const createPortalRoot = () => {
	const cookieRoot = document.createElement('div');
	cookieRoot.setAttribute('id', 'cookie-root');

	return cookieRoot;
};

export const CookiesWarning = () => {
	const { t } = useTranslation(i18Namespace.landing);

	const portalRootRef = useRef(document.getElementById('cookie-root') || createPortalRoot());
	const [isAgreed, setIsAgreed] = useState(false);

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
	};

	return createPortal(
		<div role="alert" className={styles.wrapper}>
			<div className={styles['cookie-wrapper']}>
				<p className={styles['cookie-text']}>
					{t(Landing.COOKIES_TEXT)}{' '}
					<a
						rel="noopener noreferrer"
						href="https://docs.google.com/document/d/19JvySToaMm3pkohGkHwqhJjGl3IzldIc3qnQpAoVFVc/edit?tab=t.0#heading=h.gjdgxs"
						target="_blank"
					>
						{t(Landing.COOKIES_LINK)}
					</a>
				</p>
				<Button className={styles.btn} variant="primary" onClick={handleClick}>
					{t(Landing.COOKIES_AGREE)}
				</Button>
			</div>
		</div>,
		portalRootRef.current,
	);
};
