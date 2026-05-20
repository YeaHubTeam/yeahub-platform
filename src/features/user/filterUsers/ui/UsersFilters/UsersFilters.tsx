import { t } from 'i18next';

import { User } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { UserRolesListField } from '@/entities/user';

import { UsersFilterParams } from '../../model/types/filters';
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
			<UserRolesListField
				title={t(User.FILTER_ROLE)}
				selectedRoles={roles}
				onChangeRoles={onChangeRoles}
			/>
			<VerifiedSwitch selectedVerified={isVerified} onChangeVerified={onChangeIsVerified} />
		</Flex>
	);
};
