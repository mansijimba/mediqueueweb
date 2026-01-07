/**
 * Validate password complexity
 * Rules:
 * - Minimum length
 * - Lowercase
 * - Uppercase
 * - Digit
 * - Symbol
 * - Requires N out of M categories
 */
export const validatePasswordComplexity = (
  password = "",
  options = { minLength: 8, requireCategories: 3 }
) => {
  const lengthOk = password.length >= options.minLength;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const categoriesMet = [
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
  ].filter(Boolean).length;

  const isValid = lengthOk && categoriesMet >= options.requireCategories;

  return {
    isValid,
    lengthOk,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
    categoriesMet,
    requiredCategories: options.requireCategories,
  };
};

/**
 * Score password strength (0–4)
 * Used for progress bar & label
 */
export const scorePassword = (password = "") => {
  if (!password) {
    return { score: 0, label: "Very weak" };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label = "Very weak";
  if (score === 1) label = "Weak";
  else if (score === 2) label = "Fair";
  else if (score === 3) label = "Strong";
  else if (score === 4) label = "Very strong";

  return { score, label };
};
