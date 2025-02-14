import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import {
	useAddUserRolesMutation,
	useGetUserByIdQuery,
	UserCard,
	useRemoveUserRolesMutation,
	UserFormValues,
} from '@/entities/user';

const UserEditPage = () => {
	const { userId } = useParams<{ userId: string }>();
	const { data: user } = useGetUserByIdQuery(String(userId));
	const { t } = useTranslation(i18Namespace.translation);
	const navigate = useNavigate();

	const methods = useForm<UserFormValues>({
		defaultValues: {
			userRoles: user?.userRoles.map((role) => role.id),
		},
		mode: 'onTouched',
	});

	const [addUserRole] = useAddUserRolesMutation();
	const [removeUserRole] = useRemoveUserRolesMutation();

	const handleSave = async (values: UserFormValues) => {
		const initialRoles = user?.userRoles.map((role) => role.id) || [];
		const addedRoles = values.userRoles.filter((role) => !initialRoles.includes(role));
		const removedRoles = initialRoles.filter((role) => !values.userRoles.includes(role));
		if (!user?.id) return;

		try {
			await Promise.all([
				...addedRoles.map((roleId) => addUserRole({ userId: user.id, roles: [roleId] })),
				...removedRoles.map((roleId) => removeUserRole({ userId: user.id, roles: [roleId] })),
			]);

			toast.success(t(User.EDIT_SUCCESS, { ns: i18Namespace.user }));
			methods.reset();
			navigate(route(ROUTES.admin.users.detail.page, user.id));
		} catch (_) {
			toast.error(t(User.EDIT_ERROR, { ns: i18Namespace.user }));
		}
	};

	const handleCancel = () => {
		methods.reset();
	};

	if (!user) {
		return null;
	}
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSave)}>
				<Flex align="center" gap="8" style={{ marginBottom: 24 }}>
					<BackButton />
					<Flex style={{ marginLeft: 'auto', gap: '16px' }}>
						<Button variant="secondary" type="button" onClick={handleCancel}>
							{t(Translation.CANCEL)}
						</Button>
						<Button type="submit">{t(Translation.SAVE)}</Button>
					</Flex>
				</Flex>
				<UserCard user={user} disabledEditRole={false} />
			</form>
		</FormProvider>
	);
};

export default UserEditPage;
