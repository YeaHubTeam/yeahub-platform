import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation, User as Users } from '@/shared/config';
import { formatDate } from '@/shared/libs';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { Switch } from '@/shared/ui/Switch';
import { Text } from '@/shared/ui/Text';

import { useGetUserRolesListQuery } from '../../api/userApi';
import { User } from '../../model/types/user';
import { RoleSelect } from '../RoleSelect/RoleSelect';

import styles from './UserCard.module.css';

interface UserCardProps {
	user: User;
	disabledEditRole?: boolean;
}

export const UserCard = ({ user, disabledEditRole = true }: UserCardProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const { control } = useFormContext();

	const { data: availableRoles = [] } = useGetUserRolesListQuery();

	const userRoleIds = user.userRoles.map((role) => role.id);

	return (
		<Flex direction="column" maxWidth>
			<Card withOutsideShadow>
				<Flex direction="column" gap="28">
					<Text variant="body5-strong">{t(Users.USER_NAME)}</Text>
					<Flex direction="column" gap="60">
						<FormField label={t(Users.USERNAME)}>
							<Input disabled type="text" placeholder={`${user.username}`} />
						</FormField>
						<FormField label={t(Users.AVATAR)}>
							{user.avatarUrl ? (
								<img className={styles['image']} src={user.avatarUrl} alt={t(Translation.AVATAR)} />
							) : (
								<div className={styles['image']}>
									<AvatarWithoutPhoto />
								</div>
							)}
						</FormField>
						<FormField label={t(Users.SELECT_ROLE_TITLE)} description={t(Users.SELECT_ROLE_LABEL)}>
							<FormControl name="userRoles" control={control}>
								{({ onChange, value }) => (
									<div className={styles.select}>
										<RoleSelect
											availableRoles={availableRoles}
											value={value || userRoleIds}
											onChange={onChange}
											disabled={disabledEditRole}
											hasMultiple
										/>
									</div>
								)}
							</FormControl>
						</FormField>
						<FormField
							label={t(Users.CONFIRM_EMAIL_TITLE)}
							description={t(Users.CONFIRM_EMAIL_LABEL)}
						>
							<Flex align="center" gap="10">
								<Switch
									switchClassName={classNames(styles['switch'])}
									checked={user.isVerified ?? false}
									onChange={() => {}}
								/>
								<Text variant="body2" color="black-800" width={246}>
									{user.isVerified
										? t(Users.CONFIRM_EMAIL_CONFIRM)
										: t(Users.CONFIRM_EMAIL_UNCONFIRM)}
								</Text>
							</Flex>
						</FormField>
						<FormField label={t(Users.EMAIL)} description={t(Users.ADDRESS)}>
							<Input disabled type="text" placeholder={user.email} />
						</FormField>
						<FormField label={t(Users.ADDRESS)}>
							<Flex direction="column" gap="20">
								<Input disabled type="text" placeholder={user.country} />
								<Input disabled type="text" placeholder={user.city} />
								<Input disabled type="text" placeholder={user.address} />
							</Flex>
						</FormField>
					</Flex>
					<FormField label={t(Users.BIRTH_DATE)}>
						<Input
							disabled
							type="text"
							placeholder={user.birthday ? formatDate(new Date(user.birthday), 'dd.MM.yyyy') : ''}
						/>
					</FormField>
					<FormField label={t(Users.REGISTRATION_DATE)}>
						<Input
							disabled
							type="text"
							placeholder={user.createdAt ? formatDate(new Date(user.createdAt), 'dd.MM.yyyy') : ''}
						/>
					</FormField>
				</Flex>
			</Card>
		</Flex>
	);
};
