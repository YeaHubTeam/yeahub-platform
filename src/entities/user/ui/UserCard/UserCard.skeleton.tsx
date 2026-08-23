import { AvatarSkeleton } from '@/shared/ui/Avatar';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormFieldSkeleton } from '@/shared/ui/FormField';
import { InputSkeleton } from '@/shared/ui/Input';
import { SwitchSkeleton } from '@/shared/ui/Switch';
import { TextSkeleton } from '@/shared/ui/Text';

import { RoleSelectSkeleton } from '../RoleSelect/RoleSelect.skeleton';

const UserMainFieldsSkeleton = () => {
	return (
		<Flex direction="column" gap="60">
			<FormFieldSkeleton countTextFields={0}>
				<InputSkeleton disabled type="text" size="L" />
			</FormFieldSkeleton>
			<UserAvatarFieldSkeleton />
			<UserRolesFieldSkeleton />
			<UserEmailConfirmationFieldSkeleton />
			<FormFieldSkeleton countTextFields={0}>
				<InputSkeleton size="L" />
			</FormFieldSkeleton>
			<UserAddressFieldSkeleton />
		</Flex>
	);
};

const UserAvatarFieldSkeleton = () => (
	<FormFieldSkeleton countTextFields={0}>
		<AvatarSkeleton size={160} borderRadius={20} />
	</FormFieldSkeleton>
);

const UserRolesFieldSkeleton = () => (
	<FormFieldSkeleton>
		<RoleSelectSkeleton />
	</FormFieldSkeleton>
);

const UserEmailConfirmationFieldSkeleton = () => (
	<FormFieldSkeleton>
		<Flex align="center" gap="10">
			<SwitchSkeleton />
			<TextSkeleton variant="body2" width={230} />
		</Flex>
	</FormFieldSkeleton>
);

const UserAddressFieldSkeleton = () => (
	<FormFieldSkeleton countTextFields={0} isLimitWidth>
		<Flex direction="column" gap="20" maxWidth>
			{Array.from({ length: 3 }).map((_, index) => (
				<InputSkeleton key={index} size="L" />
			))}
		</Flex>
	</FormFieldSkeleton>
);

export const UserCardSkeleton = () => {
	return (
		<Flex direction="column" maxWidth>
			<Card withOutsideShadow>
				<Flex direction="column" gap="28">
					<TextSkeleton variant="body5-strong" width={140} />
					<UserMainFieldsSkeleton />
					<FormFieldSkeleton countTextFields={0}>
						<InputSkeleton size="L" />
					</FormFieldSkeleton>
					<FormFieldSkeleton countTextFields={0}>
						<InputSkeleton size="L" />
					</FormFieldSkeleton>
				</Flex>
			</Card>
		</Flex>
	);
};
