import classNames from 'classnames';
import DOMPurify from 'dompurify';

import styles from './TextHtml.module.css';

interface TextHtmlProps {
	html: string;
	className?: string;
}

export const TextHtml = ({ className, html }: TextHtmlProps) => {
	const sanitizedHtmlContent = DOMPurify.sanitize(html);

	return (
		<pre className={classNames(styles.text, className)}>
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
		</pre>
	);
};
