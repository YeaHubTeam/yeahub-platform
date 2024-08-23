import DOMPurify from 'dompurify';

interface TextHtmlProps {
	html: string;
}

export const TextHtml = ({ html }: TextHtmlProps) => {
	const sanitizedHtmlContent = DOMPurify.sanitize(html);

	return <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />;
};
