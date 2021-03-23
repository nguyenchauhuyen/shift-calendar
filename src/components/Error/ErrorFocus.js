import React, { useEffect } from 'react';

const ErrorFocus = props => {
  const { isSubmitting, isValidating, errors } = props;
  useEffect(() => {
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[name="${keys[0]}"]`;
      const errorElement = document.querySelector(selector);
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      errorElement.focus();
    }
  }, [isSubmitting, isValidating, errors]);
  return null;
};

export default ErrorFocus;
