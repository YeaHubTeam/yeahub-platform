import { ChooseUsersRole, VerifiedEmail } from '@/entities/user';

import { useUserFilter } from '../hooks/useUserFilter';

export const UsersFilterSet = () => {
	const {
		filter: { roles, isEmailVerified },
		handleFilterChange,
	} = useUserFilter();

	const onChangeRoles = (roles: number[] | undefined) => {
		handleFilterChange({ roles });
	};

	const onChangeVerifyEmail = (isEmailVerified: boolean | undefined) => {
		handleFilterChange({ isEmailVerified });
	};

	return (
		<>
			<ChooseUsersRole selectedRoles={roles} onChangeRoles={onChangeRoles} />
			<VerifiedEmail
				selectedVerifiedEmail={isEmailVerified}
				onChangeVerifiedEmail={onChangeVerifyEmail}
			/>
		</>
	);
};
