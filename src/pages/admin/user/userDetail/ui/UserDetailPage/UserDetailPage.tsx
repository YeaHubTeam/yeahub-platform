import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, Translation, ROUTES, User } from '@/shared/config';
import { route } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useGetUserByIdQuery, UserCard, UserFormValues } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import styles from './UserDetailPage.module.css';

const UserDetailPage = () => {
	const { userId = '' } = useParams<{ userId: string }>();
	const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(String(userId));
	const { t } = useTranslation(i18Namespace.translation);
	const { t: tUser } = useTranslation(i18Namespace.user);

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

	const hasUser = user && Object.keys(user).length > 0;

	const content = user ? (
		<>
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
		</>
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: tUser(User.STUB_EMPTY_USER_TITLE),
			subtitle: tUser(User.STUB_EMPTY_USER_SUBTITLE),
			buttonText: tUser(User.STUB_EMPTY_USER_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			hasData={hasUser}
			isLoading={isLoading}
			hasError={isError}
			stubs={stubs}
			content={content}
			roles={['admin', 'author']}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default UserDetailPage;
