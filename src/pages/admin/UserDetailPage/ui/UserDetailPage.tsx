import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
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
	const { t } = useTranslation(i18Namespace.translation);

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
				<NavLink style={{ marginLeft: 'auto' }} to={route(ROUTES.admin.users.edit.page, user.id)}>
					<Button>{t(Translation.EDIT)}</Button>
				</NavLink>
			</Flex>
			<UserCard user={user} />
		</FormProvider>
	);
};

export default UserDetailPage;
