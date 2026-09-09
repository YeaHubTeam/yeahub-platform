import { useState } from 'react';

import { ResumeFileLoader } from '../../ui/ResumeFileLoader/ResumeFileLoader';
import { UploadedResume } from '../UploadedResume/UploadedResume';

export const UploadResumeForm = () => {
	const [file, setFile] = useState<FormData | null>(null);

	return (
		<>
			{!file ? (
				<ResumeFileLoader setFile={setFile} />
			) : (
				<UploadedResume file={file} setFile={setFile} />
			)}
		</>
	);
};
