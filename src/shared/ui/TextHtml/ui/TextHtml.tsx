import classNames from 'classnames';
import DOMPurify from 'dompurify';

import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Text } from '@/shared/ui/Text';

import styles from './TextHtml.module.css';

interface TextHtmlProps {
	html: string;
	className?: string;
}

export const TextHtml = ({ className, html }: TextHtmlProps) => {
	const sanitizedHtmlContent = DOMPurify.sanitize(html);
	const { isMobileS } = useScreenSize();

	return (
		<pre className={classNames(styles.text, className)}>
			<Text variant={isMobileS ? 'body2' : 'body3-accent'} color="black-800">
				<div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
			</Text>
		</pre>
	);
};
