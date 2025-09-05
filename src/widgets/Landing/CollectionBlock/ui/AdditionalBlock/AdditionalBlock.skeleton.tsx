import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AdditionalBlock.module.css';

export const AdditionalBlockSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Flex className={styles['additional-block']} maxWidth>
			{isMobileS && <ButtonSkeleton className={styles['expand-button']} />}
			<CardSkeleton size="medium" withOutsideShadow className={styles['additional-second']}>
				<TextSkeleton variant="body3" width={'100%'} />
			</CardSkeleton>
			<CardSkeleton size="medium" withOutsideShadow className={styles['additional-second']}>
				<TextSkeleton variant="body3" width={'100%'} />
			</CardSkeleton>
			<CardSkeleton size="small" withOutsideShadow className={styles['additional-third']}>
				<TextSkeleton variant="body3" width={'100%'} />
			</CardSkeleton>
			<ButtonSkeleton className={styles.button} />
		</Flex>
	);
};
