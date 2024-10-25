/**
 * Combine different document into the main document
 */
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDoc = YAML.load(join(__dirname, './swagger.yaml'));
const phoneDoc = YAML.load(join(__dirname, './phone.yaml'));

swaggerDoc.paths = {
  ...swaggerDoc.paths,
  ...phoneDoc.paths,
};

export default swaggerDoc;
