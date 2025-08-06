import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Guru } from '../../model/types/guru';
import { GuruSocialsList } from '../GuruSocialsList/GuruSocialsList';

import styles from './GurusItem.module.css';

interface GurusItemProps {
	guru: Guru;
	avatarSize: number;
	description?: string;
	hasBorder?: boolean;
}

export const GurusItem = ({ guru, avatarSize, description, hasBorder = false }: GurusItemProps) => {
	const { image, name, title, socials } = guru;

	return (
		<Flex
			componentType="li"
			direction="column"
			gap="12"
			className={hasBorder ? styles.border : undefined}
		>
			<Flex gap="8" align={description ? 'center' : 'start'}>
				<Avatar size={avatarSize} withBorder image={image} className={styles.avatar} />
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
