import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './AdvantagesBlock.module.css';

interface AdvantagesBlockProps {
	label?: string;
	items: string[];
	withIcon?: boolean;
	className?: string;
}

export const AdvantagesBlock = ({ label, items, withIcon, className }: AdvantagesBlockProps) => {
	return (
		<Flex direction={'column'} gap={'16'} className={className}>
			{label && <Text variant={'body3-accent'}>{label}</Text>}

			<Flex componentType="ul" direction={'column'} gap={'12'}>
				{items.map((item, index) => (
					<Flex componentType="li" key={index}>
						<Text
							variant="body3-accent"
							className={withIcon ? styles['check-icon'] : styles['list-item']}
						>
							{withIcon && <Icon icon="check" size={20} />}
							{item}
						</Text>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};
