import { Pallete } from '@/shared/types/types';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { Icon, IconName } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { Guru } from '../../model/types/guru';
import { GuruSocialsList } from '../GuruSocialsList/GuruSocialsList';

import styles from './GurusItem.module.css';

interface GurusItemProps {
	guru: Guru;
	avatarSize: number;
	description?: string;
	hasBorder?: boolean;
	avatarIcon?: { icon: IconName; color?: Pallete };
}

export const GurusItem = ({
	guru,
	avatarSize,
	description,
	hasBorder = false,
	avatarIcon,
}: GurusItemProps) => {
	const { image, name, title, socials } = guru;

	return (
		<Flex
			componentType="li"
			direction="column"
			gap="12"
			className={hasBorder ? styles.border : undefined}
		>
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
					<Text variant="body3-accent" color="black-800">
						{title}
					</Text>
					<Text variant="body3-accent" color="black-500">
						{name}
					</Text>
					{!description && <GuruSocialsList socials={socials} />}
				</Flex>
			</Flex>
			{description && (
				<>
					<Text variant="body3-accent" color="black-800">
						{description}
					</Text>
					<GuruSocialsList socials={socials} />
				</>
			)}
		</Flex>
	);
};
