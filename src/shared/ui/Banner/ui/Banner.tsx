import classNames from 'classnames';

import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './Banner.module.css';

interface BannerProps {
	img: string;
	title?: string;
	description?: string;
	color?: 'white' | 'violet';
	alt?: string;
	className?: string;
}

export const Banner = ({
	img,
	title,
	description,
	color = 'white',
	alt = '',
	className,
}: BannerProps) => {
	const { isLargeScreen, isLaptop } = useScreenSize();
	const textColor = color === 'white' ? 'black-900' : 'white-900';
	const wrapperClassName = classNames(
		styles.wrapper,
		color === 'white' ? styles.white : styles.violet,
		className,
	);

	const imgClassName = classNames(className === 'alarm' && styles['alarm-img']);

	const textVariant = isLargeScreen || isLaptop ? 'body6' : 'body5-accent';

	return (
		<Flex className={wrapperClassName} gap="20" align="center">
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
	);
};
