import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Switch } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User as Users } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate/formatDate';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { User } from '../../model/types/user';
import { RoleSelect } from '../RoleSelect/RoleSelect';

import styles from './UserCard.module.css';
import { Text } from '@/shared/ui/Text';

interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const { control } = useFormContext();

	const userRoleIds = user.userRoles.map((role) => role.id);

	return (
		<Flex direction="column" maxWidth>
			<Card withOutsideShadow>
				<Flex direction="column" gap="28">
					<Text variant='body5-strong'>{t(Users.USER_NAME)}</Text>
					<Flex direction="column" gap="60">
						<Flex align="center" gap="120">
							<Text variant='body4' color="black-800" width={246}>{t(Users.FULL_NAME)}</Text>
							<Input disabled type="text" placeholder={`${user.firstName} ${user.lastName}`} />
						</Flex>
						<Flex gap="120">
							<Text variant='body4' color="black-800" width={246}>{t(Users.AVATAR)}</Text>
							{user.avatarUrl ? (
								<img className={styles['image']} src={user.avatarUrl} alt={t(Translation.AVATAR)} />
							) : (
								<div className={styles['image']}>
									<AvatarWithoutPhoto />
								</div>
							)}
						</Flex>
						<Flex gap="120">
							<Flex direction="column" gap="8">
								<Text variant='body4' color="black-800" width={246}>{t(Users.SELECT_ROLE_TITLE)}</Text>
								<Text variant='body2' color="black-800" width={246}>
									{t(Users.SELECT_ROLE_LABEL)}
								</Text>
							</Flex>
							<Flex direction="column" gap="20" maxWidth>
								<FormControl name="userRoles" control={control}>
									{({ onChange, value }) => (
										<div className={styles.select}>
											<RoleSelect
												availableRoles={user.userRoles}
												value={value || userRoleIds}
												onChange={onChange}
												disabled={true}
												hasMultiple
											/>
										</div>
									)}
								</FormControl>
							</Flex>
						</Flex>
						<Flex align="center" gap="120">
							<Flex direction="column" gap="8">
								<Text variant='body4' color="black-800" width={246}>{t(Users.CONFIRM_EMAIL_TITLE)}</Text>
								<Text variant='body2' color="black-800" width={246}>{t(Users.CONFIRM_EMAIL_LABEL)}</Text>
							</Flex>
							<Flex align="center" gap="10">
								<Switch
									switchClassName={classNames(styles['switch'])}
									checked={user.isEmailVerified ?? false}
									onChange={() => {}}
								/>
								<Text variant='body2' color="black-800" width={246}>
									{user.isEmailVerified
										? t(Users.CONFIRM_EMAIL_CONFIRM)
										: t(Users.CONFIRM_EMAIL_UNCONFIRM)}
								</Text>
							</Flex>
						</Flex>
						<Flex align="center" gap="120">
							<Text variant='body4' color="black-800" width={246}>{t(Users.EMAIL)}</Text>
							<Input disabled type="text" placeholder={user.email} />
						</Flex>
						<Flex gap="120">
							<Text variant='body4' color="black-800" width={246}>{t(Users.ADDRESS)}</Text>
							<Flex direction="column" gap="20">
								<Input disabled type="text" placeholder={user.country} />
								<Input disabled type="text" placeholder={user.city} />
								<Input disabled type="text" placeholder={user.address} />
							</Flex>
						</Flex>
					</Flex>
					<Flex align="center" gap="120">
						<Text variant='body4' color="black-800" width={246}>{t(Users.BIRTH_DATE)}</Text>
						<Input
							disabled
							type="text"
							placeholder={user.birthday ? formatDate(new Date(user.birthday), 'dd.MM.yyyy') : ''}
						/>
					</Flex>
					<Flex align="center" gap="120">
						<Text variant='body4' color="black-800" width={246}>{t(Users.REGISTRATION_DATE)}</Text>
						<Input
							disabled
							type="text"
							placeholder={user.createdAt ? formatDate(new Date(user.createdAt), 'dd.MM.yyyy') : ''}
						/>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
