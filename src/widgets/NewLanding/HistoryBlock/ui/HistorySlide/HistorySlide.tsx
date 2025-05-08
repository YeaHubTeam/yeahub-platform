import styles from './HistorySlide.module.css';

type HistorySlideProps = {
	src: string;
	alt: string;
	text: string;
	mobileSrc?: string;
};

export const HistorySlide = ({ src, alt, text, mobileSrc }: HistorySlideProps) => {
	return (
		<div className={styles['slide-item']}>
			<div className={styles['slide-card']}>
				{mobileSrc ? (
					<picture>
						<source srcSet={mobileSrc} media="(max-width: 767px)" />
						<img className={styles['slide-image']} src={src} alt={alt} />
					</picture>
				) : (
					<img className={styles['slide-image']} src={src} alt={alt} />
				)}
				<p className={styles['slide-text']}>{text}</p>
			</div>
		</div>
	);
};
