import { useState } from 'react';

export const useCopy = (delay: number = 1000) => {
	const [value, setValue] = useState<string | undefined>();
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setValue(text);
			setCopied(true);
			setTimeout(() => setCopied(false), delay);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Clipboard copy failed:', error);
		}
	};

	return { value, copied, copy: copyToClipboard };
};
