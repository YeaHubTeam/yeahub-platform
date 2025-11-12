import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { Button } from '../../Button';
import { TextVariant } from '../../Text/types';

import styles from './Banner.module.css';

interface BannerProps {
	img: string;
	title?: string;
	titleVariant?: TextVariant;
	description?: string;
	color?: 'white' | 'violet';
	alt?: string;
	className?: string;
	innerWrapClassName?: string;
	buttonLabel?: string;
	buttonClassName?: string;
	onButtonClick?: () => void;
}

export const Banner = ({
	img,
	title,
	titleVariant,
	description,
	color = 'white',
	alt = '',
	className,
	innerWrapClassName,
	buttonLabel,
	buttonClassName,
	onButtonClick,
}: BannerProps) => {
	const { isLargeScreen, isLaptop } = useScreenSize();
	const textColor = color === 'white' ? 'black-900' : 'white-900';
	const wrapperClassName = classNames(
		styles.wrapper,
		color === 'white' ? styles.white : styles.violet,
		className,
	);

	const imgClassName = classNames(className === 'alarm' && styles['alarm-img']);

	const textVariant = titleVariant || (isLargeScreen || isLaptop ? 'body6' : 'body5-accent');

	return (
		<Flex className={wrapperClassName} align="center" gap="10">
			<Flex gap="20" align="center" className={innerWrapClassName}>
				<img src={img} className={imgClassName} alt={alt} />
				{title && (
					<Text variant={textVariant} color={textColor}>
						{title}
					</Text>
				)}
				{description && (
					<Text variant="body3-accent" className={styles.text} color={textColor}>
						{description}
					</Text>
				)}
			</Flex>
			{buttonLabel && (
				<Button size="large" className={buttonClassName} onClick={onButtonClick}>
					{buttonLabel}
				</Button>
			)}
		</Flex>
	);
};
