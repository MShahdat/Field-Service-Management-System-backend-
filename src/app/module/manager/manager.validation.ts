import z from "zod";

export const managerApplyValidation = z.object({
  user: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
  }),
  manager: z.object({
    phone: z.string().min(1, "Phone is required"),
    address: z.object({}).passthrough().optional(),
    nid: z.string().min(1, "NID is required"),
    region: z.array(z.uuid("Invalid region ID format")).min(1, "At least one region is required"),
  }),
});

export const emailVerifyValidation = z.object({
  email: z.email("Invalid email format"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const approveManagerValidation = z.object({
  email: z.email("Invalid email format"),
  verificationStatus: z.enum(["APPROVED", "REJECTED", "PENDING"]),
  rejectionReason: z.string().optional(),
}).refine(
  (data) => data.verificationStatus !== "REJECTED" || (data.rejectionReason && data.rejectionReason.length > 0),
  {
    message: "Rejection reason is required when status is REJECTED",
    path: ["rejectionReason"],
  }
);