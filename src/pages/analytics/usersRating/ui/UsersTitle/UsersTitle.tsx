import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { route, useScreenSize } from '@/shared/libs';
import { Avatar } from '@/shared/ui/Avatar';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import type { UserRating } from '@/entities/user';

import {
	PLACE_ICONS,
	PRIZE_PLACES_COUNT,
	type PrizePlace,
} from '@/widgets/analytics/UsersRatingWidget';

interface UsersTitleProps {
	rankedUser: UserRating;
}

export const UsersTitle = ({ rankedUser }: UsersTitleProps) => {
	const isPrizePlace = rankedUser.place > 0 && rankedUser.place <= PRIZE_PLACES_COUNT;
	const { isMobile } = useScreenSize();
	return (
		<Link to={route(ROUTES.users.page, rankedUser.userId)}>
			<Flex direction="row" gap="8" align="center">
				{isMobile &&
					(isPrizePlace ? (
						<img
							src={PLACE_ICONS[rankedUser.place as PrizePlace]}
							alt="medal"
							width="13px"
							height="20px"
						/>
					) : (
						<Text variant="body3-accent">{rankedUser.place}</Text>
					))}
				<Avatar image={rankedUser.avatarUrl} size={24} />
				<Flex justify="start">
					<Text variant="body3-accent">{rankedUser.username}</Text>
				</Flex>
			</Flex>
		</Link>
	);
};
