import { AppError } from "./appError";
import httpStatus from "http-status";
import crypto from "crypto";

export const generateRandomPass = (lenght: number = 10) => {
  if (lenght < 8) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Lenght must be at least 8 characters",
    );
  }

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digit = "0123456789";
  const special = "!@#$%^&*_?+=";
  const all = lower + upper + digit + special;
  const pick = (chars: string) => chars[crypto.randomInt(chars.length)];

  const chars = [pick(lower), pick(upper), pick(digit), pick(special)];
  for (let i = chars.length; i < lenght; i++) {
    chars.push(pick(all));
  }

  for (let i = chars.length; i < lenght; i++) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
};
