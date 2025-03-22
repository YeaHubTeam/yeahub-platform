import classNames from 'classnames';
import DOMPurify from 'dompurify';

import { Text } from '@/shared/ui/Text';

import styles from './TextHtml.module.css';

export interface TextHtmlProps {
	html: string;
	className?: string;
}

export const TextHtml = ({ className, html }: TextHtmlProps) => {
	const sanitizedHtmlContent = DOMPurify.sanitize(html);

	return (
		<pre className={classNames(styles.text, className)}>
			<Text variant="body3-accent" color="black-800">
				<div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
			</Text>
		</pre>
	);
};
