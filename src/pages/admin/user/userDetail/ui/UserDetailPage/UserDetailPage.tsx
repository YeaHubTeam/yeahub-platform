import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, User } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { useGetUserByIdQuery, UserCard, UserFormValues } from '@/entities/user';

import { DeleteAccountButton } from '@/features/profile/deleteAccount';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { UserDetailPageSkeleton } from './UserDetailPage.skeleton';

const UserDetailPage = () => {
	const { userId = '' } = useParams<{ userId: string }>();
	const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(String(userId));
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
					<HeaderAdminPageDetailCard
						entity="users"
						canDelete={false}
						renderActions={() => <DeleteAccountButton isAdmin user={user} />}
					/>
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
			skeleton={<UserDetailPageSkeleton />}
			hasError={isError}
			stubs={stubs}
			content={content}
			roles={['admin']}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default UserDetailPage;
