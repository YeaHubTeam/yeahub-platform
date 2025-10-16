import { useEffect, useRef } from 'react';

import { TelegramUser } from '@/entities/auth';
import { BOT_NAME, DEFAULT_SETTINGS } from '@/entities/auth/model/constants/telegramConstants';

interface TelegramWidgetProps {
	onTelegramAuth: (user: TelegramUser) => void;
}

declare global {
	interface Window {
		TelegramLoginWidget: {
			dataOnauth: (user: TelegramUser) => void;
		};
	}
}

export const TelegramWidget = ({ onTelegramAuth }: TelegramWidgetProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.TelegramLoginWidget = {
			dataOnauth: onTelegramAuth,
		};

		const script = document.createElement('script');
		script.src = 'https://telegram.org/js/telegram-widget.js?9';
		script.setAttribute('data-telegram-login', BOT_NAME);
		script.setAttribute('data-size', DEFAULT_SETTINGS.buttonSize);
		script.setAttribute('data-radius', DEFAULT_SETTINGS.cornerRadius.toString());
		script.setAttribute('data-request-access', DEFAULT_SETTINGS.requestAccess);
		script.setAttribute('data-userpic', DEFAULT_SETTINGS.usePic ? 'true' : 'false');
		script.setAttribute('data-lang', DEFAULT_SETTINGS.lang);
		script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
		script.async = true;

		const container = containerRef.current;
		if (container) {
			container.appendChild(script);
		}

		return () => {
			if (container?.contains(script)) {
				container.removeChild(script);
			}
		};
	}, [onTelegramAuth]);

	return <div ref={containerRef} />;
};
