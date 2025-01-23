import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { useGetUserByIdQuery, UserCard } from '@/entities/user';
import { UserFormValues } from '../model/types/userCreateTypes';

/**
 * Page showing detail info about specialization
 * @constructor
 */
const UserDetailPage = () => {
	const { userId } = useParams<{ userId: string }>();
	const { data: user } = useGetUserByIdQuery(String(userId));

	const methods = useForm<UserFormValues>({
		defaultValues: {
			userRoles: user?.userRoles.map((role) => role.id),
			status: 'public',
		},
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

export default UserDetailPage;
