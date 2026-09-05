export const parseTimeOnDate = (timeStr: string, baseDate: Date): Date => {
	const [hours, minutes] = timeStr.split(":").map(Number);
	const parsedDate = new Date(baseDate);
	parsedDate.setHours(hours, minutes, 0, 0);
	return parsedDate;
};
