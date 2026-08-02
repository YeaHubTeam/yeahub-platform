import { CheckboxSkeleton } from '@/shared/ui/Checkbox';
import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';

import { UserSelectSkeleton } from '@/entities/user/@x/referralLink';

import styles from './ReferralLinkForm.module.css';

export const ReferralLinkFormSkeleton = () => {
	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<FormFieldSkeleton>
				<FormControlSkeleton>
					<InputSkeleton size="L" />
				</FormControlSkeleton>
			</FormFieldSkeleton>
			<FormFieldSkeleton>
				<FormControlSkeleton>
					<InputSkeleton size="L" />
				</FormControlSkeleton>
			</FormFieldSkeleton>
			<FormFieldSkeleton>
				<Flex direction="row" align="center" gap="16" className={styles['owner-field']}>
					<FormControlSkeleton>
						<UserSelectSkeleton />
					</FormControlSkeleton>
					<CheckboxSkeleton className={styles['owner-checkbox']} label />
				</Flex>
			</FormFieldSkeleton>
		</Flex>
	);
};
