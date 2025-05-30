import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetUserByIdQuery, UserCard, UserFormValues } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

import styles from './UserDetailPage.module.css';

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
		},
		mode: 'onTouched',
	});

	useEffect(() => {
		if (user) {
			methods.reset({
				userRoles: user.userRoles.map((role) => role.id),
			});
		}
	}, [user, methods]);

	if (!user) {
		return null;
	}

	return (
		<Flex direction="column" gap="24">
			<FormProvider {...methods}>
				<Flex align="center" justify="between" gap="8" className={styles.actions}>
					<BackButton />
					<Flex gap="16">
						<DeleteAccountButton isAdmin user={user} />
						<NavLink
							aria-label={t(Translation.EDIT)}
							to={route(ROUTES.admin.users.edit.page, user.id)}
						>
							<Button>{t(Translation.EDIT)}</Button>
						</NavLink>
					</Flex>
				</Flex>
				<UserCard user={user} />
			</FormProvider>
		</Flex>
	);
};

export default UserDetailPage;
