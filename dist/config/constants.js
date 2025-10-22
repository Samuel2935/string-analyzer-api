export const MESSAGES = {
    STRING_EXISTS: "String already exists in the system.",
    STRING_NOT_FOUND: "String does not exist in the system.",
    INVALID_BODY: 'Invalid request body or missing "value" field.',
    INVALID_TYPE: 'Invalid data type for "value". It must be a string.',
    QUERY_ERROR: "Invalid query parameter values or types.",
    QUERY_PARSE_ERROR: "Unable to parse natural language query.",
    QUERY_CONFLICT: "Query parsed but resulted in conflicting filters.",
};
export const DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 10,
};
