import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '../package.json');

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const versionParts = packageJson.version.split('.');
    versionParts[2] = parseInt(versionParts[2], 10) + 1;
    packageJson.version = versionParts.join('.');

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated version to ${packageJson.version}`);
} catch (error) {
    console.error('Error updating version:', error);
    process.exit(1);
}
