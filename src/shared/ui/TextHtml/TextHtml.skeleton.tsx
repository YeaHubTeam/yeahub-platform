import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { TextSkeleton } from '@/shared/ui/Text';

import { TextHtmlProps } from './TextHtml';
import styles from './TextHtml.module.css';

export const TextHtmlSkeleton = ({ className }: Partial<TextHtmlProps>) => {
	const { isMobile } = useScreenSize();

	return (
		<pre className={classNames(styles.text, className)}>
			<TextSkeleton variant={isMobile ? 'body2' : 'body3-accent'} width="100%" />
		</pre>
	);
};
