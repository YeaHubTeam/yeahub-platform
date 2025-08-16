import { Flex } from '@/shared/ui/Flex';
import { FormControlSkeleton } from '@/shared/ui/FormControl';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';

import { SpecializationSelectSkeleton } from '@/entities/specialization';

export const PersonalInfoFieldsSkeleton = () => {
	return (
		<FormFieldSkeleton isLimitWidth>
			<Flex gap="20" direction="column">
				<FormControlSkeleton label="label">
					<InputSkeleton size="S" />
				</FormControlSkeleton>
				<FormControlSkeleton label="label">
					<SpecializationSelectSkeleton />
				</FormControlSkeleton>
				<FormControlSkeleton label="label">
					<InputSkeleton size="S" />
				</FormControlSkeleton>
				<FormControlSkeleton label="label">
					<InputSkeleton size="S" />
				</FormControlSkeleton>
			</Flex>
		</FormFieldSkeleton>
	);
};
