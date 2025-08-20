import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { FileLoaderProps } from './FileLoader';
import style from './FileLoader.module.css';

export const FileLoaderSkeleton = ({ className, isDragDropEnabled }: Partial<FileLoaderProps>) => {
	return (
		<Flex
			direction="column"
			justify="center"
			align="center"
			gap="12"
			className={classNames(style['file-upload-container'], className)}
			style={{ borderColor: 'var(--background-skeleton)' }}
		>
			{isDragDropEnabled && (
				<>
					<div>
						<Skeleton width={32} height={32} borderRadius={4} />
					</div>
					<Flex align="center" gap="4" justify="center" wrap="wrap">
						<TextSkeleton variant="body2" width="150px" />
						<TextSkeleton variant="body2" width="150px" />
					</Flex>
					<TextSkeleton variant="body1" width="100%" />
				</>
			)}
		</Flex>
	);
};
