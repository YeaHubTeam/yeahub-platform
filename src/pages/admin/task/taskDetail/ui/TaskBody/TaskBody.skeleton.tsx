import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextHtmlSkeleton } from '@/shared/ui/TextHtml';

import styles from './TaskBody.module.css';

export const TaskBodySkeleton = () => {
	return (
		<Flex direction="column" gap="20" maxWidth>
			<Flex wrap="nowrap" gap="20">
				<TextSkeleton variant="body2" width={110} />
				<TextHtmlSkeleton className={styles.description} />
			</Flex>
		</Flex>
	);
};
