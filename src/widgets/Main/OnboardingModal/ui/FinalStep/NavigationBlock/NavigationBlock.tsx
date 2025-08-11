import { To } from 'react-router-dom';

import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import type { NavItem } from '../../../model/types/types';

import styles from './NavigationBlock.module.css';

interface NavigationBlockProps {
	navItems: NavItem[];
	onMoveService: (serviceLink: To) => void;
}

export const NavigationBlock = ({ navItems, onMoveService }: NavigationBlockProps) => {
	return (
		<Flex
			componentType={'ul'}
			justify={'center'}
			gap={'20'}
			wrap={'wrap'}
			className={styles['list-container']}
		>
			{navItems.map(({ icon, label, route }) => (
				<Button
					key={label}
					variant="link-purple"
					size={'small'}
					onClick={() => onMoveService(route)}
					preffix={<Icon icon={icon} size={20} />}
				>
					<Text variant={'body2'} color={'purple-700'}>
						{label}
					</Text>
				</Button>
			))}
		</Flex>
	);
};
