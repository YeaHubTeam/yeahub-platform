import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { SwitchSkeleton } from '@/shared/ui/Switch';
import { TextSkeleton } from '@/shared/ui/Text';
import { TextAreaSkeleton } from '@/shared/ui/TextArea';

import { RoleSelectSkeleton } from '@/entities/user/@x/featureFlag';

import { FeatureFlagClientTypeSelectSkeleton } from '../FeatureFlagClientTypeSelect/FeatureFlagClientTypeSelect.skeleton';

import styles from './FeatureFlagForm.module.css';

export const FeatureFlagFormSkeleton = () => {
	return (
		<>
			<TextSkeleton width={240} variant="body5-strong" className={styles['main-title']} />
			<Flex direction="column" gap="60">
				<FormFieldSkeleton>
					<FormControlSkeleton>
						<InputSkeleton size="L" />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton direction="column">
					<FormControlSkeleton>
						<TextAreaSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton>
						<RoleSelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton>
						<FeatureFlagClientTypeSelectSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>

				<FormFieldSkeleton>
					<FormControlSkeleton>
						<SwitchSkeleton />
					</FormControlSkeleton>
				</FormFieldSkeleton>
			</Flex>
		</>
	);
};
