import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './TaskBody.module.css';

type TaskBodyProps = {
	description: string;
};

export const TaskBody = ({ description }: TaskBodyProps) => {
	const { t } = useTranslation(i18Namespace.task);

	return (
		<Flex direction="column" gap="20" maxWidth>
			<Flex wrap="nowrap" gap="20">
				<Text variant="body2" width={110} color="black-700">
					{t(Tasks.DESCRIPTION_TITLE)}
				</Text>
				<TextHtml html={description} className={styles.description} />
			</Flex>
		</Flex>
	);
};
