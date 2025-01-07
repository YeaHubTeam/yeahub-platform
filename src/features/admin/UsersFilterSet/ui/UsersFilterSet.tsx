import { useUserFilter } from '@/shared/hooks/useUserFilter';

import { ChooseUsersRole, VerifiedEmail } from '@/entities/user';

export const UsersFilterSet = () => {
	const {
		filter: { roles, isEmailVerified },
		handleFilterChange,
	} = useUserFilter();

	const onChangeRoles = (roles: number[] | undefined) => {
		handleFilterChange({ roles });
	};

	const onChangeVerifiEmail = (isEmailVerified: boolean | undefined) => {
		handleFilterChange({ isEmailVerified });
	};

	return (
		<>
			<ChooseUsersRole selectedRoles={roles} onChangeRoles={onChangeRoles} />
			<VerifiedEmail
				selectedVerifiedEmail={isEmailVerified}
				onChangeVerifiedEmail={onChangeVerifiEmail}
			/>
		</>
	);
};
