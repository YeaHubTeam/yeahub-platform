import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { Pallete } from '@/shared/libs';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Guru } from '../../model/types/guru';
import { GuruSocialsList } from '../GuruSocialsList/GuruSocialsList';

import styles from './GurusItem.module.css';

interface GurusItemProps {
	guru: Guru;
	avatarSize: number;
	layout: 'row' | 'column';
	description?: string;
	hasBorder?: boolean;
	avatarIcon?: { icon: IconName; color?: Pallete };
	showSocials?: boolean;
}

export const GurusItem = ({
	guru,
	avatarSize,
	description,
	hasBorder = false,
	avatarIcon,
	showSocials = true,
	layout,
}: GurusItemProps) => {
	const { image, name, title, socials, hasPractice } = guru;
	const { t } = useTranslation(i18Namespace.landing);

	const row = (
		<Flex gap="8" align={description ? 'center' : 'start'}>
			<div className={styles['avatar-container']}>
				<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
				{avatarIcon && (
					<Icon
						icon={avatarIcon.icon}
						color={avatarIcon.color || 'purple-700'}
						className={styles['avatar-badge']}
					/>
				)}
			</div>

			<Flex gap="4" direction="column">
				<Text variant="body3-strong">{title}</Text>
				<Text variant="body3-accent" color="black-500">
					{name}
				</Text>
				{!description && showSocials && <GuruSocialsList socials={socials} />}
			</Flex>
		</Flex>
	);

	const column = (
		<Flex gap="10" direction="column">
			<Flex gap="6" direction="column" align="center">
				<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
				{!hasPractice && <StatusChip status={{ text: t(Landing.GURU_BADGE), variant: 'green' }} />}
			</Flex>

			<Flex gap="4" direction="column">
				<Text variant="body3-accent" color="black-800">
					{title}
				</Text>
				<Text variant="body3-accent" color="black-500">
					{name}
				</Text>
				{!description && showSocials && <GuruSocialsList socials={socials} />}
			</Flex>
		</Flex>
	);

	return (
		<Flex
			componentType="li"
			direction="column"
			gap="12"
			className={hasBorder ? styles.border : undefined}
		>
			{layout === 'row' ? row : column}

			{description && (
				<>
					<Text variant="body3-accent" color="black-800">
						{description}
					</Text>
					{showSocials && <GuruSocialsList socials={socials} />}
				</>
			)}
		</Flex>
	);
};
