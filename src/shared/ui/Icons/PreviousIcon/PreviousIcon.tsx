import styles from './PreviousIcon.module.css';

export const PreviousIcon = () => {
	return (
		<div className={styles.container}>
			<svg
				width="28"
				height="28"
				viewBox="0 0 28 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="0.5" y="0.5" width="27" height="27" rx="13.5" fill="white" />
				<rect x="0.5" y="0.5" width="27" height="27" rx="13.5" stroke="#6A0BFF" />
				<path
					d="M16.5 19L11.5 14L16.5 9"
					stroke="#6A0BFF"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};
