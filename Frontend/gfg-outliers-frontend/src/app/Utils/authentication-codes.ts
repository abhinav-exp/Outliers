/**
 *  This is a Map of authentication messages mapped to respective response code.
 * 
 *  Messages from this Map are displayed while trying to Login in the portal
 */
export const LOGIN_AUTHENTICATION_CODES:Map<String,String> = new Map([
    ['601','Only IIIT BBSR students can access this portal'],
    ['602','Only 2019-2023 batch students can access this poral'],
    ['603','Only B.Tech students can access this portal'],
    ['604','Only Computer Engineering students can access this portal'],
    ['605','This email id does not exist in Computer Engineering branch'],
    ['606','This email is not registered. Please Sign up'],
    ['607','Incorrect password for this email'],
    ['700','Success']
])

/**
 *  This is a Map of authentication messages mapped to respective response code.
 * 
 *  Messages from this Map are displayed while trying to Sign Up in the portal
 */
export const SIGNUP_AUTHENTICATION_CODES:Map<String,String> = new Map([
    ['601','Only IIIT BBSR students can access this portal'],
    ['602','Only 2019-2023 batch students can access this poral'],
    ['603','Only B.Tech students can access this portal'],
    ['604','Only Computer Engineering students can access this portal'],
    ['605','This email id does not exist in Computer Engineering branch'],
    ['606','This email is already registered. Please Login'],
    ['700','Success']
])