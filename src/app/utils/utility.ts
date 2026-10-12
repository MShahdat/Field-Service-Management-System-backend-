
export const parseTimeOnDate = (
	timeValue: string | Date,
	baseDate: Date,
): Date => {
	const timeStr =
		typeof timeValue === "string"
			? timeValue
			: timeValue.toISOString().substring(11, 16);
	const [hours, minutes] = timeStr.split(":").map(Number);
	const parsedDate = new Date(baseDate);
	parsedDate.setUTCHours(hours, minutes, 0, 0);
	return parsedDate;
};

// Alias for clarity — same UTC implementation
export const parseTimeOnDateUTC = parseTimeOnDate;

export const toDateKeyUTC = (date: Date | string): string => {
	const d = new Date(date);
	if (Number.isNaN(d.getTime())) return "";
	return d.toISOString().slice(0, 10); // YYYY-MM-DD in UTC, matches @db.Date
};

export const getUTCDayOfWeek = (date: Date): number =>
	new Date(date).getUTCDay(); // 0=Sunday … 6=Saturday, matches schema comment

export const utcDayRange = (date: Date): { start: Date; end: Date } => {
	const start = new Date(date);
	start.setUTCHours(0, 0, 0, 0);
	const end = new Date(date);
	end.setUTCHours(23, 59, 59, 999);
	return { start, end };
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

export const TZ = "Asia/Dhaka";

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
	timeZone: TZ,
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit",
});


export function formatDateTime(iso?: string | null) {
	if (!iso) return "-";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return dateTimeFmt.format(d);
}
