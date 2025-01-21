import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { useGetUserByIdQuery, UserCard } from '@/entities/user';

import { userCreateSchema } from '../model/libs/validation/userCreateTypes';
import { CreateUserFormValues } from '../model/types/userCreateTypes';

/**
 * Page showing detail info about specialization
 * @constructor
 */
const UserTableDetailPage = () => {
	const { userId } = useParams<{ userId: string }>();
	const { data: user } = useGetUserByIdQuery(String(userId));

	const methods = useForm<CreateUserFormValues>({
		defaultValues: {
			userRoles: user?.userRoles.map((role) => role.id),
			status: 'public',
		},
		resolver: yupResolver(userCreateSchema),
		mode: 'onTouched',
	});

	if (!user) {
		return null;
	}

	return (
		<FormProvider {...methods}>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
			</Flex>
			<UserCard user={user} />
		</FormProvider>
	);
};

export default UserTableDetailPage;
