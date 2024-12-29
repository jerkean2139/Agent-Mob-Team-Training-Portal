import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from './types';

export function validateFile(file: File) {
  // Check file type
  if (!Object.keys(ACCEPTED_FILE_TYPES).includes(file.type)) {
    throw new Error('Invalid file type. Supported types: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT');
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }

  return true;
}

export function getFileExtension(fileType: string): string {
  return ACCEPTED_FILE_TYPES[fileType as keyof typeof ACCEPTED_FILE_TYPES] || '';
}