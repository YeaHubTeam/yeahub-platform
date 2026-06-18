import { ButtonSkeleton } from '../Button';
import { Flex } from '../Flex';
import { InputSkeleton } from '../Input';

import styles from './KeywordInput.module.css';

export const KeywordInputSkeleton = () => {
	return (
		<Flex gap="24" direction="column" align="start">
			<Flex gap="8">
				<InputSkeleton size="L" />
				<ButtonSkeleton className={styles.button} />
			</Flex>
		</Flex>
	);
};
