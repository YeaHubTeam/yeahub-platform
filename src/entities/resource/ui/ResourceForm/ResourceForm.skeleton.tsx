import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropperSkeleton } from '@/shared/ui/ImageLoaderWithoutCropper';
import { InputSkeleton } from '@/shared/ui/Input';
import { KeywordInputSkeleton } from '@/shared/ui/KeywordInput';
import { KeywordSelectSkeleton } from '@/shared/ui/KeywordSelect';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import { SkillSelectSkeleton } from '@/entities/skill/@x/resource';
import { SpecializationSelectSkeleton } from '@/entities/specialization/@x/resource';

import { ResourceSelectSkeleton } from '../ResourceSelect/ResourceSelect.skeleton';

import styles from './ResourceForm.module.css';

export const ResourceFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton width={150} variant="body4" color="black-800" />
				<div className={styles.form}>
					<FormControlSkeleton label="name">
						<Skeleton className={styles.name} width="100%" height={180} borderRadius={16} />
					</FormControlSkeleton>
				</div>
			</Flex>

			<Flex direction="column" gap="8" className={styles['form-field']}>
				<TextSkeleton width={150} variant="body4" color="black-800" />
				<div className={styles.form}>
					<FormControlSkeleton label="description">
						<Skeleton width="100%" height={200} borderRadius={16} />
					</FormControlSkeleton>
				</div>
			</Flex>

			<FormFieldSkeleton>
				<ImageLoaderWithoutCropperSkeleton />
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<div>
						<SpecializationSelectSkeleton />
					</div>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<div>
						<SkillSelectSkeleton />
					</div>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<div>
						<ResourceSelectSkeleton />
					</div>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<div className={styles.select}>
						<KeywordSelectSkeleton />
						<KeywordInputSkeleton />
					</div>
				</FormControlSkeleton>
			</FormFieldSkeleton>

			<FormFieldSkeleton>
				<FormControlSkeleton>
					<InputSkeleton size="L" />
				</FormControlSkeleton>
			</FormFieldSkeleton>
		</Flex>
	);
};
