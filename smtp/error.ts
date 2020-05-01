/**
 * @readonly
 * @enum
 */
export const SMTPErrorStates = {
	COULDNOTCONNECT: 1,
	BADRESPONSE: 2,
	AUTHFAILED: 3,
	TIMEDOUT: 4,
	ERROR: 5,
	NOCONNECTION: 6,
	AUTHNOTSUPPORTED: 7,
	CONNECTIONCLOSED: 8,
	CONNECTIONENDED: 9,
	CONNECTIONAUTH: 10,
} as const;

class SMTPError extends Error {
	public code: number | null = null;
	public smtp: any = null;
	public previous: Error | null = null;

	constructor(message: string) {
		super(message);
	}
}

export function makeSMTPError(
	message: string,
	code: number,
	error?: Error | null,
	smtp?: any
) {
	const msg = error?.message ? `${message} (${error.message})` : message;
	const err = new SMTPError(msg);

	err.code = code;
	err.smtp = smtp;

	if (error) {
		err.previous = error;
	}

	return err;
}
