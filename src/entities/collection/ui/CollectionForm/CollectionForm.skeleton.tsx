import { ButtonSkeleton } from '@/shared/ui/Button';
import { DropdownSkeleton } from '@/shared/ui/Dropdown';
import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './CollectionForm.module.css';

export const CollectionFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60">
			<div>
				<TextSkeleton width={160} variant="body5" />
				<FormFieldSkeleton>
					<FormControlSkeleton className={styles['skeleton-title-control']}>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>
			</div>
			<FormFieldSkeleton>
				<FormControlSkeleton>
					<DropdownSkeleton className={styles['skeleton-dropdown']} size="L" />
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton direction="column">
				<FormControlSkeleton>
					<Skeleton
						className={styles['skeleton-upload-preview']}
						width={225}
						height={80}
						borderRadius={24}
					/>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton className={styles['skeleton-image-control']}>
					<Flex gap="32" maxWidth={true}>
						<Skeleton
							className={styles['skeleton-image-fixed']}
							width={170}
							height={114}
							borderRadius={20}
						/>
						<Skeleton className={styles['skeleton-image-fluid']} height={114} borderRadius={20} />
					</Flex>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton className={styles['skeleton-checkbox-control']}>
					<Flex gap="26" maxWidth={true} align="center">
						<Skeleton width={170} height={20} borderRadius={20} />
						<Skeleton width={150} height={20} borderRadius={20} />
					</Flex>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<DropdownSkeleton
						className={`${styles['skeleton-dropdown']} ${styles['skeleton-dropdown-mobile-offset']}`}
						size="S"
					/>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<Flex direction="column" gap="28">
						<DropdownSkeleton size="S" />
						<Flex gap="8" maxWidth={true}>
							<InputSkeleton className={styles['skeleton-keywords-input']} size="L" />
							<ButtonSkeleton width={170} height={48} />
						</Flex>
					</Flex>
				</FormControlSkeleton>
			</FormFieldSkeleton>
			<FormFieldSkeleton>
				<FormControlSkeleton className={styles['skeleton-actions-control']}>
					<Flex gap="8" justify="between">
						<TextSkeleton width={200} variant="body5" className={styles['skeleton-actions-text']} />
						<ButtonSkeleton width={170} height={40} />
					</Flex>
				</FormControlSkeleton>
			</FormFieldSkeleton>
			<FormFieldSkeleton>
				<FormControlSkeleton className={styles['skeleton-actions-control']}>
					<Flex gap="8" justify="between">
						<TextSkeleton width={200} variant="body5" className={styles['skeleton-actions-text']} />
						<ButtonSkeleton width={170} height={40} />
					</Flex>
				</FormControlSkeleton>
			</FormFieldSkeleton>
		</Flex>
	);
};
