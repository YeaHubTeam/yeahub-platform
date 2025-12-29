import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import kotlin from 'highlight.js/lib/languages/kotlin';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';

const lowlight = createLowlight();

lowlight.register('css', css);
lowlight.register('javascript', javascript);
lowlight.register('python', python);
lowlight.register('html', xml);
lowlight.register('xml', xml);
lowlight.register('java', java);
lowlight.register('go', go);
lowlight.register('php', php);
lowlight.register('ruby', ruby);
lowlight.register('swift', swift);
lowlight.register('kotlin', kotlin);
lowlight.register('rust', rust);
lowlight.register('cpp', cpp);
lowlight.register('csharp', csharp);
lowlight.register('typescript', typescript);

export { lowlight };
