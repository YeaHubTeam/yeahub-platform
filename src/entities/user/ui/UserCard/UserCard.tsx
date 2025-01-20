import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Switch } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User as Users } from '@/shared/config/i18n/i18nTranslations';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Input } from '@/shared/ui/Input';

import { User } from '../../model/types/user';
import { UserSelect } from '../UserSelect/UserSelect';

import styles from './UserCard.module.css';

interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const { control } = useFormContext();

	function formatDate(dateString: string) {
		if (dateString === null) return '';

		const date = new Date(dateString);

		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	}
	const userRoleIds = user.userRoles.map((role) => role.id);

	return (
		<Flex direction="column" maxWidth>
			<Card withOutsideShadow>
				<Flex direction="column" gap="28">
					<h1 className={classNames(styles['title'])}>{t(Users.USERNAME)}</h1>
					<Flex direction="column" gap="60">
						<Flex align="center" gap="120">
							<p className={classNames(styles['description'])}>{t(Users.FULL_NAME)}</p>
							<Input disabled type="text" placeholder={`${user.firstName} ${user.lastName}`} />
						</Flex>
						<Flex gap="120">
							<p className={classNames(styles['description'])}>{t(Users.PROFILE_PHOTO)}</p>
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
								<p className={classNames(styles['description'])}>{t(Users.SELECT_ROLE)}</p>
								<p className={classNames(styles['description-secondary'])}>
									{t(Users.SELECT_TAGS_BY_ROLE)}
								</p>
							</Flex>
							<Flex direction="column" gap="20" maxWidth>
								<FormControl name="userRoles" control={control}>
									{({ onChange, value }) => (
										<div className={styles.select}>
											<UserSelect
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
								<p className={classNames(styles['description'])}>{t(Users.CONFIRM_EMAIL)}</p>
								<p className={classNames(styles['description-secondary'])}>
									{t(Users.EMAIL_VERIFICATION)}
								</p>
							</Flex>
							<Flex align="center" gap="10">
								<Switch
									switchClassName={classNames(styles['switch'])}
									checked
									onChange={() => {}}
								/>
								<p>
									{user.isEmailVerified
										? t(Users.IS_EMAIL_VERIFIED_TRUE)
										: t(Users.IS_EMAIL_VERIFIED_TRUE)}
								</p>
							</Flex>
						</Flex>
						<Flex align="center" gap="120">
							<p className={classNames(styles['description'])}>{t(Users.USER_EMAIL)}</p>
							<Input disabled type="text" placeholder={user.email} />
						</Flex>
						<Flex gap="120">
							<p className={classNames(styles['description'])}>{t(Users.ADDRESS)}</p>
							<Flex direction="column" gap="20">
								<Input disabled type="text" placeholder={user.country} />
								<Input disabled type="text" placeholder={user.city} />
								<Input disabled type="text" placeholder={user.address} />
							</Flex>
						</Flex>
					</Flex>
					<Flex align="center" gap="120">
						<p className={classNames(styles['description'])}>{t(Users.BIRTH_DATE)}</p>
						<Input disabled type="text" placeholder={formatDate(user.birthday)} />
					</Flex>
					<Flex align="center" gap="120">
						<p className={classNames(styles['description'])}>{t(Users.REGISTRATION_DATE)}</p>
						<Input disabled type="text" placeholder={formatDate(user.createdAt)} />
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
