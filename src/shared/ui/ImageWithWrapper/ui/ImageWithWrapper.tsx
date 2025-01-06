import classNames from 'classnames';

import EmptyStub from '@/shared/assets/icons/EmptyStub.svg';

import styles from './ImageWithWrapper.module.css';

export interface ImageWithWrapperProps {
	className?: string;
	src?: string | null;
	alt?: string;
}

export const ImageWithWrapper = ({ className, src, alt = '' }: ImageWithWrapperProps) => {
	return (
		<div className={classNames(styles.wrapper, className)}>
			{src ? (
				<img className={styles.image} src={src} alt={alt} />
			) : (
				<EmptyStub className={styles.svg} />
			)}
		</div>
	);
};
