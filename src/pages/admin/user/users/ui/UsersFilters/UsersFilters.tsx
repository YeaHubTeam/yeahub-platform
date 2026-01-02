import { Flex } from '@/shared/ui/Flex';

import { UsersFilterParams } from '../../model/types/filters';
import { UserRolesListField } from '../UserRolesListField/UserRolesListField';
import { VerifiedSwitch } from '../VerifiedSwitch/VerifiedSwitch';

interface UsersFiltersProps {
	filters: UsersFilterParams;
	onChangeRoles: (roles?: UsersFilterParams['roles']) => void;
	onChangeIsVerified: (isVerified?: UsersFilterParams['isVerified']) => void;
}

export const UsersFilters = ({ filters, onChangeIsVerified, onChangeRoles }: UsersFiltersProps) => {
	const { roles, isVerified } = filters;

	return (
		<Flex direction="column" gap="24">
			<UserRolesListField selectedRoles={roles} onChangeRoles={onChangeRoles} />
			<VerifiedSwitch selectedVerified={isVerified} onChangeVerified={onChangeIsVerified} />
		</Flex>
	);
};
