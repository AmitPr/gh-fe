export abstract class Messages {
    static readonly TOKEN_FORMAT_ERROR: string = 'Tokens are 40 characters long, can only contain alphanumeric characters, and begin with "ghp_"';
    static readonly TOKEN_UNAUTHORIZED: string = 'Unauthorized user (Token holder not authorized)';
    static readonly TOKEN_INVALID: string = 'Token verification failed (Server returned 401 - Unauthorized)';
    static readonly TOKEN_VERIFIED: string = 'Token verification successful!';
}