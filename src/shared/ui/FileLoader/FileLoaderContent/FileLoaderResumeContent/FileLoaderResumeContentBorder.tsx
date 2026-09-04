import React from 'react';

export interface FileLoaderBorderProps {
	className?: string;
	color?: string;
}

export const FileLoaderResumeContentBorder = ({
	className,
	color = '--color-purple-400',
}: FileLoaderBorderProps) => {
	return (
		<svg className={className} width="100%" height="100%" aria-hidden="true">
			<rect
				x="1"
				y="1"
				width="calc(100% - 2px)"
				height="calc(100% - 2px)"
				rx="16"
				fill="none"
				stroke={`var(${color})`}
				strokeWidth="2"
				strokeDasharray="12 12"
			/>
		</svg>
	);
};
