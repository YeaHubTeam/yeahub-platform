import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import {
	useAddUserRolesMutation,
	useGetUserByIdQuery,
	UserCard,
	useRemoveUserRolesMutation,
} from '@/entities/user';

import { UserFormValues } from '../../UserDetailPage/model/types/userCreateTypes';

const UserEditPage = () => {
	const { userId } = useParams<{ userId: string }>();
	const { data: user } = useGetUserByIdQuery(String(userId));
	const { t } = useTranslation(i18Namespace.translation);
	const methods = useForm<UserFormValues>({
		defaultValues: {
			userRoles: user?.userRoles.map((role) => role.id),
			status: 'public',
		},
		mode: 'onTouched',
	});

	const userRoles = useWatch({ control: methods.control, name: 'userRoles' });

	const [addUserRole] = useAddUserRolesMutation();
	const [removeUserRole] = useRemoveUserRolesMutation();

	const handleSave = async () => {
		const initialRoles = user?.userRoles.map((role) => role.id) || [];
		const addedRoles = userRoles.filter((role) => !initialRoles.includes(role));
		const removedRoles = initialRoles.filter((role) => !userRoles.includes(role));
		if (!user?.id) return;

		await Promise.all([
			...addedRoles.map((roleId) => addUserRole({ userId: user.id, roles: [roleId] })),
			...removedRoles.map((roleId) => removeUserRole({ userId: user.id, roles: [roleId] })),
		]);
	};

	const handleCancel = () => {
		methods.setValue('userRoles', user?.userRoles.map((role) => role.id) || []);
	};

	if (!user) {
		return null;
	}
	return (
		<FormProvider {...methods}>
			<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
					<Button variant="secondary" onClick={handleCancel}>
						{t(Translation.CANCEL)}
					</Button>
					<Button onClick={handleSave}>{t(Translation.SAVE)}</Button>
				</Flex>
			</Flex>
			<UserCard user={user} disabledEditRole={false} />
		</FormProvider>
	);
};

export default UserEditPage;
