export const DEFAULT_SETTINGS = {
	buttonSize: 'large' as const,
	requestAccess: 'write' as const,
	usePic: true,
	lang: 'en' as const,
	cornerRadius: 15,
};

export const BOT_NAME = process.env.TELEGRAM_BOT_NAME as string;
