export const parseTimeOnDate = (timeStr: string, baseDate: Date): Date => {
	const [hours, minutes] = timeStr.split(":").map(Number);
	const parsedDate = new Date(baseDate);
	parsedDate.setUTCHours(hours, minutes, 0, 0);
	return parsedDate;
};

export const formatDateToYYYYMMDD = (
	date: Date | null | undefined,
): string | undefined => {
	if (!date) return undefined;
	return date.toISOString().substring(0, 10);
};

export const formatTimeToHHmm = (
	date: Date | null | undefined,
): string | undefined => {
	if (!date) return undefined;
	// toISOString() yields "1970-01-01T14:30:00.000Z"
	// substring(11, 16) extracts exactly "14:30"
	return date.toISOString().substring(11, 16);
};
