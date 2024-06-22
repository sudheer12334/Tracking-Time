import path from 'path';

export function logError(message: string, error: Error) {
    const timestamp = new Date().toISOString();
    const fileName = path.basename(__filename);
    const lineNumber = (error.stack?.split('\n')[1].split(':')[1]) || 'unknown';
    console.error(`[${timestamp}] [${fileName}:${lineNumber}] ${message} - ${error.message}`);
}

export function logInfo(message: string) {
    const timestamp = new Date().toISOString();
    console.info(`[${timestamp}] ${message}`);
}

