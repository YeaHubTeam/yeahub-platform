import DOMPurify from 'dompurify';

import styles from './TextHtml.module.css';

interface TextHtmlProps {
	html: string;
}

export const TextHtml = ({ html }: TextHtmlProps) => {
	const sanitizedHtmlContent = DOMPurify.sanitize(html);

	return (
		<pre className={styles.text}>
			<div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
		</pre>
	);
};
