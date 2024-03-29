/* eslint-disable @typescript-eslint/no-unused-vars */
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: any): Errors {
  const validationErrors: Errors = {};

  err.map((row: any, key: any) => {
    const str = row.name.replace(/\s/g, '');
    validationErrors[str] = row.error;
  });

  // err.inner.forEach((error: any) => {
  //   validationErrors[error.path] = error.message;
  // });

  return validationErrors;
}
