import { Flex } from '@/shared/ui/Flex';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';
import styles from '@/shared/ui/Pagination/ui/Pagination.module.css';
import { TextSkeleton } from '@/shared/ui/Text';

export const PaginationSkeleton = () => {
	return (
		<Flex gap="10" align="center">
			<IconButtonSkeleton
				size="small"
				aria-label="back button"
				form="round"
				variant="outline"
				className={styles['arrow-button']}
			/>
			{[...Array(6)].map((_, i) => (
				<TextSkeleton key={i} variant="body2-accent" width={12} />
			))}
			<IconButtonSkeleton
				size="small"
				aria-label="back button"
				form="round"
				variant="outline"
				className={styles['arrow-button']}
			/>
		</Flex>
	);
};
