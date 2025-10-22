import styles from './SkillBar.module.css';

interface SkillBarProps {
	maxHeight: number;
	barHeight: number;
	barOffset: number;
}

export const SkillBar = ({ maxHeight, barOffset, barHeight }: SkillBarProps) => {
	return (
		<div className={styles['bar-container']}>
			<svg height={maxHeight} width={24}>
				<defs>
					<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#6A0BFF" />
						<stop offset="100%" stopColor="#FFFFFF" />
					</linearGradient>
				</defs>
				<rect width={24} height={barHeight} y={barOffset} rx={6} fill="url(#barGradient)"></rect>
			</svg>
		</div>
	);
};
