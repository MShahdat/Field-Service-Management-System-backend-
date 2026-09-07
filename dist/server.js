

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";

// src/app/config/env.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  app_name: process.env.APP_NAME,
  database_url: process.env.DATABASE_URL,
  bakend_url: process.env.BACKEND_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  tester_admin_name: process.env.TESTER_ADMIN_NAME,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD,
  tester_manager_name: process.env.TESTER_MANAGER_NAME,
  tester_manager_email: process.env.TESTER_MANAGER_EMAIL,
  tester_manager_password: process.env.TESTER_MANAGER_PASSWORD,
  radis_name: process.env.RADIS_NAME,
  radis_password: process.env.RADIS_PASSWORD,
  radis_host: process.env.RADIS_HOST,
  radis_port: process.env.RADIS_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_sender: process.env.SMTP_SENDER,
  smtp_password: process.env.SMTP_PASSWORD,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_uri: process.env.GOOGLE_CALLBACK_URI,
  facebook_app_key: process.env.FACEBOOK_APP_KEY,
  facebook_app_secret: process.env.FACEBOOK_APP_SECRET,
  facebook_callback_url: process.env.FACEBOOK_CALLBACK_URL,
  bkash_base_url: process.env.BKASH_BASE_URL,
  bkash_username: process.env.BKASH_USERNAME,
  bkash_password: process.env.BKASH_PASSWORD,
  bkash_app_key: process.env.BKASH_APP_KEY,
  bkash_app_secret: process.env.BKASH_APP_SECRET,
  bkash_callback_url: process.env.BKASH_CALLBACK_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
};
var env_default = config;

// src/app.ts
import cors from "cors";
import cookieParser from "cookie-parser";

// src/app/middleware/globalErrorHandler.ts
import httpStatus from "http-status";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Attachment {\n  id String @id @default(uuid())\n\n  files       Json\n  description String?\n\n  type AttachmentType\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("attachments")\n}\n\nmodel Availability {\n  id String @id @default(uuid())\n\n  type      AvailabilityType\n  dayOfWeek Int? // 0 = Sunday, 1 = Monday, ..., 6 = Saturday\n  date      DateTime?        @db.Date\n\n  startTime DateTime? @db.Time()\n  endTime   DateTime? @db.Time()\n  isActive  Boolean   @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@unique([technicianId, type, dayOfWeek])\n  @@unique([technicianId, type, date])\n  @@map("availability")\n}\n\nmodel Category {\n  id String @id @default(uuid())\n\n  name        String  @unique\n  icon        String?\n  description String?\n  isActive    Boolean @default(true)\n  duration    Int\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  services Service[]\n  skill    Skill[]\n\n  @@map("categories")\n}\n\nmodel CustomerProfile {\n  id String @id @default(uuid())\n\n  phone     String?\n  address   Json?\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  service  Service[]\n  workOder WorkOrder[]\n\n  @@map("customers")\n}\n\nenum UserRole {\n  SUPER_ADMIN\n  ADMIN\n  CUSTOMER\n  TECHNICIAN\n  MANAGER\n}\n\nenum AuthProvider {\n  CREDENTIAL\n  GOOGLE\n  FACEBOOK\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum AvailabilityType {\n  RECURRING\n  ONE_OFF\n  BLOCKED\n}\n\nenum TechStatus {\n  AVAILABLE\n  BUSY\n  OFF_DUTY\n}\n\nenum Priority {\n  LOW\n  MEDIUM\n  HIGH\n  URGENT\n}\n\nenum ServiceStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  ASSIGNED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum WorkOrderStatus {\n  SCHEDULED\n  EN_ROUTE\n  STARTED\n  COMPLETED\n  CANCELLED\n}\n\nenum ScheduleStatus {\n  SCHEDULED\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nenum AttachmentType {\n  BEFORE_PHOTO\n  AFTER_PHOTO\n  SIGNATURE\n  DOCUMENT\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  FAILED\n  CANCELLED\n  REFUNDED\n}\n\nenum ManagerVerificationStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nmodel Feedback {\n  id String @id @default(uuid())\n\n  rating    Float\n  comment   String?\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("feedbacks")\n}\n\nmodel ManagerProfile {\n  id String @id @default(uuid())\n\n  phone   String\n  address Json?\n  nid     String\n\n  verificationStatus ManagerVerificationStatus @default(PENDING)\n  rejectionReason    String?\n  reviewdBy          String?\n  reviewdAt          DateTime?\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  region    Region[]\n  workOrder WorkOrder[]\n\n  @@map("managerProfiles")\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  paymentId             String        @unique\n  amount                Decimal       @db.Decimal(10, 2)\n  method                String        @default("bKash")\n  transectionId         String?       @unique\n  status                PaymentStatus @default(UNPAID)\n  paidAt                DateTime?\n  payerReference        String?\n  currency              String        @default("BDT")\n  merchantInvoiceNumber String        @unique\n\n  getwayResponse Json?\n\n  refundTrxId  String?\n  refundAmount Decimal? @db.Decimal(10, 2)\n  refundedAt   String?\n  reason       String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("payments")\n}\n\nmodel Region {\n  id String @id @default(uuid())\n\n  area        String  @unique\n  description String?\n  isActive    Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  manager     ManagerProfile[]\n  services    Service[]\n  technicians TechnicianProfile[] @relation("TechnicianRegions")\n  workOrders  WorkOrder[]\n\n  @@map("regions")\n}\n\nmodel Schedule {\n  id String @id @default(uuid())\n\n  servicingDate DateTime\n  startTime     DateTime\n  endTime       DateTime\n  actualStart   DateTime?\n  actualEnd     DateTime?\n\n  status    ScheduleStatus @default(SCHEDULED)\n  isdeleted Boolean        @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("schedules")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id String @id @default(uuid())\n\n  description String?\n  priority    Priority      @default(MEDIUM)\n  status      ServiceStatus @default(PENDING)\n  address     Json\n\n  servicingDate      DateTime  @db.Date\n  preferredStartTime DateTime? @db.Time()\n  preferredEndTime   DateTime? @db.Time()\n  duration           Int?\n\n  isDeleted   Boolean   @default(false)\n  isDeletedAt DateTime?\n\n  assignedAt      DateTime?\n  reviewedBy      String?\n  reviewedAt      DateTime?\n  rejectionReason String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customerId String\n  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  regionId String\n  region   Region @relation(fields: [regionId], references: [id])\n\n  workOrders WorkOrder?\n\n  @@map("services")\n}\n\nmodel ServiceReport {\n  id String @id @default(uuid())\n\n  reportUrl      String\n  reportPublicId String\n  description    String?\n  isDelete       Boolean   @default(false)\n  deletedAt      DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("serviceReports")\n}\n\nmodel Skill {\n  id String @id @default(uuid())\n\n  name        String    @unique\n  icon        String?\n  description String?\n  isActive    Boolean   @default(true)\n  isDelete    Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  technician TechnicianProfile[]\n\n  @@map("skills")\n}\n\nmodel TechnicianProfile {\n  id String @id @default(uuid())\n\n  phone              String?\n  address            Json?\n  bio                String?\n  nid                String?\n  isProfileCompleted Boolean   @default(false)\n  isDeleted          Boolean   @default(false)\n  deletedAt          DateTime?\n\n  skills       Skill[]\n  availability Availability[]\n  regions      Region[]       @relation("TechnicianRegions")\n\n  status        TechStatus @default(AVAILABLE)\n  rating        Float?     @default(0)\n  jobsCompleted Int        @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  workOrder WorkOrder[]\n  schedule  Schedule[]\n\n  @@map("technicians")\n}\n\nmodel User {\n  id String @id @default(uuid())\n\n  name               String\n  email              String  @unique\n  password           String?\n  profileImg         String?\n  profileImgPublicId String?\n\n  googleId           String?      @unique\n  facebookId         String?      @unique\n  authProvider       AuthProvider @default(CREDENTIAL)\n  emailVerified      Boolean      @default(false)\n  role               UserRole     @default(CUSTOMER)\n  status             UserStatus   @default(ACTIVE)\n  needPasswordChange Boolean      @default(false)\n  isDeleted          Boolean      @default(false)\n  deletedAt          DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customer   CustomerProfile?\n  technician TechnicianProfile?\n  manager    ManagerProfile?\n\n  @@map("users")\n}\n\nmodel WorkOrder {\n  id String @id @default(uuid())\n\n  servicingDate DateTime\n\n  status WorkOrderStatus @default(SCHEDULED)\n  note   String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  regionId String\n  region   Region @relation(fields: [regionId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  customerId String\n  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  technicianId String?\n  technician   TechnicianProfile? @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  serviceId String  @unique\n  service   Service @relation(fields: [serviceId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  managerId String\n  manager   ManagerProfile @relation(fields: [managerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  attachment    Attachment[]\n  serviceReport ServiceReport?\n  feedback      Feedback?\n  payment       Payment?\n  schedule      Schedule?\n\n  @@map("workOrders")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Attachment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"files","kind":"scalar","type":"Json"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"AttachmentType"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"AttachmentToWorkOrder"}],"dbName":"attachments"},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"AvailabilityType"},{"name":"dayOfWeek","kind":"scalar","type":"Int"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"}],"dbName":"availability"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"services","kind":"object","type":"Service","relationName":"CategoryToService"},{"name":"skill","kind":"object","type":"Skill","relationName":"CategoryToSkill"}],"dbName":"categories"},"CustomerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CustomerProfileToUser"},{"name":"service","kind":"object","type":"Service","relationName":"CustomerProfileToService"},{"name":"workOder","kind":"object","type":"WorkOrder","relationName":"CustomerProfileToWorkOrder"}],"dbName":"customers"},"Feedback":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"FeedbackToWorkOrder"}],"dbName":"feedbacks"},"ManagerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"nid","kind":"scalar","type":"String"},{"name":"verificationStatus","kind":"enum","type":"ManagerVerificationStatus"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"reviewdBy","kind":"scalar","type":"String"},{"name":"reviewdAt","kind":"scalar","type":"DateTime"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ManagerProfileToUser"},{"name":"region","kind":"object","type":"Region","relationName":"ManagerProfileToRegion"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ManagerProfileToWorkOrder"}],"dbName":"managerProfiles"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"paymentId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"method","kind":"scalar","type":"String"},{"name":"transectionId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"payerReference","kind":"scalar","type":"String"},{"name":"currency","kind":"scalar","type":"String"},{"name":"merchantInvoiceNumber","kind":"scalar","type":"String"},{"name":"getwayResponse","kind":"scalar","type":"Json"},{"name":"refundTrxId","kind":"scalar","type":"String"},{"name":"refundAmount","kind":"scalar","type":"Decimal"},{"name":"refundedAt","kind":"scalar","type":"String"},{"name":"reason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"PaymentToWorkOrder"}],"dbName":"payments"},"Region":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToRegion"},{"name":"services","kind":"object","type":"Service","relationName":"RegionToService"},{"name":"technicians","kind":"object","type":"TechnicianProfile","relationName":"TechnicianRegions"},{"name":"workOrders","kind":"object","type":"WorkOrder","relationName":"RegionToWorkOrder"}],"dbName":"regions"},"Schedule":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"actualStart","kind":"scalar","type":"DateTime"},{"name":"actualEnd","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"ScheduleStatus"},{"name":"isdeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ScheduleToTechnicianProfile"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ScheduleToWorkOrder"}],"dbName":"schedules"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"priority","kind":"enum","type":"Priority"},{"name":"status","kind":"enum","type":"ServiceStatus"},{"name":"address","kind":"scalar","type":"Json"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"preferredStartTime","kind":"scalar","type":"DateTime"},{"name":"preferredEndTime","kind":"scalar","type":"DateTime"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"isDeletedAt","kind":"scalar","type":"DateTime"},{"name":"assignedAt","kind":"scalar","type":"DateTime"},{"name":"reviewedBy","kind":"scalar","type":"String"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToService"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"regionId","kind":"scalar","type":"String"},{"name":"region","kind":"object","type":"Region","relationName":"RegionToService"},{"name":"workOrders","kind":"object","type":"WorkOrder","relationName":"ServiceToWorkOrder"}],"dbName":"services"},"ServiceReport":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reportUrl","kind":"scalar","type":"String"},{"name":"reportPublicId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ServiceReportToWorkOrder"}],"dbName":"serviceReports"},"Skill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToSkill"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"SkillToTechnicianProfile"}],"dbName":"skills"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"bio","kind":"scalar","type":"String"},{"name":"nid","kind":"scalar","type":"String"},{"name":"isProfileCompleted","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"skills","kind":"object","type":"Skill","relationName":"SkillToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"regions","kind":"object","type":"Region","relationName":"TechnicianRegions"},{"name":"status","kind":"enum","type":"TechStatus"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"jobsCompleted","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"TechnicianProfileToWorkOrder"},{"name":"schedule","kind":"object","type":"Schedule","relationName":"ScheduleToTechnicianProfile"}],"dbName":"technicians"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"profileImg","kind":"scalar","type":"String"},{"name":"profileImgPublicId","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"facebookId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToUser"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToUser"}],"dbName":"users"},"WorkOrder":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"WorkOrderStatus"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"regionId","kind":"scalar","type":"String"},{"name":"region","kind":"object","type":"Region","relationName":"RegionToWorkOrder"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToWorkOrder"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToWorkOrder"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToWorkOrder"},{"name":"managerId","kind":"scalar","type":"String"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToWorkOrder"},{"name":"attachment","kind":"object","type":"Attachment","relationName":"AttachmentToWorkOrder"},{"name":"serviceReport","kind":"object","type":"ServiceReport","relationName":"ServiceReportToWorkOrder"},{"name":"feedback","kind":"object","type":"Feedback","relationName":"FeedbackToWorkOrder"},{"name":"payment","kind":"object","type":"Payment","relationName":"PaymentToWorkOrder"},{"name":"schedule","kind":"object","type":"Schedule","relationName":"ScheduleToWorkOrder"}],"dbName":"workOrders"}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","customer","services","category","skills","technician","availability","regions","workOrder","schedule","_count","skill","region","workOrders","service","workOder","manager","technicians","attachment","serviceReport","feedback","payment","Attachment.findUnique","Attachment.findUniqueOrThrow","Attachment.findFirst","Attachment.findFirstOrThrow","Attachment.findMany","data","Attachment.createOne","Attachment.createMany","Attachment.createManyAndReturn","Attachment.updateOne","Attachment.updateMany","Attachment.updateManyAndReturn","create","update","Attachment.upsertOne","Attachment.deleteOne","Attachment.deleteMany","having","_min","_max","Attachment.groupBy","Attachment.aggregate","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","_avg","_sum","Availability.groupBy","Availability.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","CustomerProfile.findUnique","CustomerProfile.findUniqueOrThrow","CustomerProfile.findFirst","CustomerProfile.findFirstOrThrow","CustomerProfile.findMany","CustomerProfile.createOne","CustomerProfile.createMany","CustomerProfile.createManyAndReturn","CustomerProfile.updateOne","CustomerProfile.updateMany","CustomerProfile.updateManyAndReturn","CustomerProfile.upsertOne","CustomerProfile.deleteOne","CustomerProfile.deleteMany","CustomerProfile.groupBy","CustomerProfile.aggregate","Feedback.findUnique","Feedback.findUniqueOrThrow","Feedback.findFirst","Feedback.findFirstOrThrow","Feedback.findMany","Feedback.createOne","Feedback.createMany","Feedback.createManyAndReturn","Feedback.updateOne","Feedback.updateMany","Feedback.updateManyAndReturn","Feedback.upsertOne","Feedback.deleteOne","Feedback.deleteMany","Feedback.groupBy","Feedback.aggregate","ManagerProfile.findUnique","ManagerProfile.findUniqueOrThrow","ManagerProfile.findFirst","ManagerProfile.findFirstOrThrow","ManagerProfile.findMany","ManagerProfile.createOne","ManagerProfile.createMany","ManagerProfile.createManyAndReturn","ManagerProfile.updateOne","ManagerProfile.updateMany","ManagerProfile.updateManyAndReturn","ManagerProfile.upsertOne","ManagerProfile.deleteOne","ManagerProfile.deleteMany","ManagerProfile.groupBy","ManagerProfile.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Region.findUnique","Region.findUniqueOrThrow","Region.findFirst","Region.findFirstOrThrow","Region.findMany","Region.createOne","Region.createMany","Region.createManyAndReturn","Region.updateOne","Region.updateMany","Region.updateManyAndReturn","Region.upsertOne","Region.deleteOne","Region.deleteMany","Region.groupBy","Region.aggregate","Schedule.findUnique","Schedule.findUniqueOrThrow","Schedule.findFirst","Schedule.findFirstOrThrow","Schedule.findMany","Schedule.createOne","Schedule.createMany","Schedule.createManyAndReturn","Schedule.updateOne","Schedule.updateMany","Schedule.updateManyAndReturn","Schedule.upsertOne","Schedule.deleteOne","Schedule.deleteMany","Schedule.groupBy","Schedule.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","ServiceReport.findUnique","ServiceReport.findUniqueOrThrow","ServiceReport.findFirst","ServiceReport.findFirstOrThrow","ServiceReport.findMany","ServiceReport.createOne","ServiceReport.createMany","ServiceReport.createManyAndReturn","ServiceReport.updateOne","ServiceReport.updateMany","ServiceReport.updateManyAndReturn","ServiceReport.upsertOne","ServiceReport.deleteOne","ServiceReport.deleteMany","ServiceReport.groupBy","ServiceReport.aggregate","Skill.findUnique","Skill.findUniqueOrThrow","Skill.findFirst","Skill.findFirstOrThrow","Skill.findMany","Skill.createOne","Skill.createMany","Skill.createManyAndReturn","Skill.updateOne","Skill.updateMany","Skill.updateManyAndReturn","Skill.upsertOne","Skill.deleteOne","Skill.deleteMany","Skill.groupBy","Skill.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","WorkOrder.findUnique","WorkOrder.findUniqueOrThrow","WorkOrder.findFirst","WorkOrder.findFirstOrThrow","WorkOrder.findMany","WorkOrder.createOne","WorkOrder.createMany","WorkOrder.createManyAndReturn","WorkOrder.updateOne","WorkOrder.updateMany","WorkOrder.updateManyAndReturn","WorkOrder.upsertOne","WorkOrder.deleteOne","WorkOrder.deleteMany","WorkOrder.groupBy","WorkOrder.aggregate","AND","OR","NOT","id","servicingDate","WorkOrderStatus","status","note","createdAt","updatedAt","regionId","customerId","technicianId","serviceId","managerId","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","name","email","password","profileImg","profileImgPublicId","googleId","facebookId","AuthProvider","authProvider","emailVerified","UserRole","role","UserStatus","needPasswordChange","isDeleted","deletedAt","phone","address","bio","nid","isProfileCompleted","TechStatus","rating","jobsCompleted","userId","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","icon","description","isActive","isDelete","categoryId","reportUrl","reportPublicId","workOrderId","Priority","priority","ServiceStatus","preferredStartTime","preferredEndTime","duration","isDeletedAt","assignedAt","reviewedBy","reviewedAt","rejectionReason","startTime","endTime","actualStart","actualEnd","ScheduleStatus","isdeleted","area","paymentId","amount","method","transectionId","PaymentStatus","paidAt","payerReference","currency","merchantInvoiceNumber","getwayResponse","refundTrxId","refundAmount","refundedAt","reason","ManagerVerificationStatus","verificationStatus","reviewdBy","reviewdAt","comment","every","some","none","AvailabilityType","type","dayOfWeek","date","files","AttachmentType","technicianId_type_dayOfWeek","technicianId_type_date","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "vQiMAfABDQsAAN8DACCRAgAAmQQAMJICAABBABCTAgAAmQQAMJQCAQAAAAGZAkAAzAMAIZoCQADMAwAhugJAAMsDACHLAgEAxgMAIc0CIADIAwAh0QIBAMUDACH7AgAAmwSAAyL-AgAAmgQAIAEAAAABACATAwAAigQAIAsAAIwEACAPAAC2BAAgkQIAAL4EADCSAgAAAwAQkwIAAL4EADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACG5AiAAyAMAIboCQADLAwAhuwIBAMUDACG8AgAA_QMAIL4CAQDFAwAhwwIBAMUDACHcAgEAxgMAIfMCAAC_BPMCIvQCAQDGAwAh9QJAAMsDACEIAwAAnAcAIAsAAJ4HACAPAADRBwAgugIAAMAEACC8AgAAwAQAINwCAADABAAg9AIAAMAEACD1AgAAwAQAIBMDAACKBAAgCwAAjAQAIA8AALYEACCRAgAAvgQAMJICAAADABCTAgAAvgQAMJQCAQAAAAGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDFAwAhvAIAAP0DACC-AgEAxQMAIcMCAQAAAAHcAgEAxgMAIfMCAAC_BPMCIvQCAQDGAwAh9QJAAMsDACEDAAAAAwAgAQAABAAwAgAABQAgDgMAAIoEACARAACLBAAgEgAAjAQAIJECAACJBAAwkgIAAAcAEJMCAACJBAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACDDAgEAxQMAIQEAAAAHACAbBAAAogQAIAYAALkEACAPAAChBAAgEAAAvQQAIJECAAC6BAAwkgIAAAkAEJMCAAC6BAAwlAIBAMUDACGVAkAAzAMAIZcCAAC8BNUCIpkCQADMAwAhmgJAAMwDACGbAgEAxQMAIZwCAQDFAwAhuQIgAMgDACG8AgAAmgQAIMsCAQDGAwAhzgIBAMUDACHTAgAAuwTTAiLVAkAAywMAIdYCQADLAwAh1wICALEEACHYAkAAywMAIdkCQADLAwAh2gIBAMYDACHbAkAAywMAIdwCAQDGAwAhDQQAAOAGACAGAADTBwAgDwAAxwcAIBAAAPoGACDLAgAAwAQAINUCAADABAAg1gIAAMAEACDXAgAAwAQAINgCAADABAAg2QIAAMAEACDaAgAAwAQAINsCAADABAAg3AIAAMAEACAbBAAAogQAIAYAALkEACAPAAChBAAgEAAAvQQAIJECAAC6BAAwkgIAAAkAEJMCAAC6BAAwlAIBAAAAAZUCQADMAwAhlwIAALwE1QIimQJAAMwDACGaAkAAzAMAIZsCAQDFAwAhnAIBAMUDACG5AiAAyAMAIbwCAACaBAAgywIBAMYDACHOAgEAxQMAIdMCAAC7BNMCItUCQADLAwAh1gJAAMsDACHXAgIAsQQAIdgCQADLAwAh2QJAAMsDACHaAgEAxgMAIdsCQADLAwAh3AIBAMYDACEDAAAACQAgAQAACgAwAgAACwAgAwAAAAkAIAEAAAoAMAIAAAsAIA8GAAC5BAAgCAAArAQAIJECAAC4BAAwkgIAAA4AEJMCAAC4BAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhqwIBAMUDACG6AkAAywMAIcoCAQDGAwAhywIBAMYDACHMAiAAyAMAIc0CIADIAwAhzgIBAMUDACEFBgAA0wcAIAgAAM8HACC6AgAAwAQAIMoCAADABAAgywIAAMAEACAPBgAAuQQAIAgAAKwEACCRAgAAuAQAMJICAAAOABCTAgAAuAQAMJQCAQAAAAGZAkAAzAMAIZoCQADMAwAhqwIBAAAAAboCQADLAwAhygIBAMYDACHLAgEAxgMAIcwCIADIAwAhzQIgAMgDACHOAgEAxQMAIQMAAAAOACABAAAPADACAAAQACAXAwAAigQAIAcAAJAEACAJAAC1BAAgCgAAtgQAIAsAAIwEACAMAAC3BAAgkQIAALIEADCSAgAAEgAQkwIAALIEADCUAgEAxQMAIZcCAACzBMECIpkCQADMAwAhmgJAAMwDACG5AiAAyAMAIboCQADLAwAhuwIBAMYDACG8AgAA_QMAIL0CAQDGAwAhvgIBAMYDACG_AiAAyAMAIcECCAC0BAAhwgICAI8EACHDAgEAxQMAIQwDAACcBwAgBwAAugcAIAkAANAHACAKAADRBwAgCwAAngcAIAwAANIHACC6AgAAwAQAILsCAADABAAgvAIAAMAEACC9AgAAwAQAIL4CAADABAAgwQIAAMAEACAXAwAAigQAIAcAAJAEACAJAAC1BAAgCgAAtgQAIAsAAIwEACAMAAC3BAAgkQIAALIEADCSAgAAEgAQkwIAALIEADCUAgEAAAABlwIAALMEwQIimQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACG7AgEAxgMAIbwCAAD9AwAgvQIBAMYDACG-AgEAxgMAIb8CIADIAwAhwQIIALQEACHCAgIAjwQAIcMCAQAAAAEDAAAAEgAgAQAAEwAwAgAAFAAgAwAAAA4AIAEAAA8AMAIAABAAIA4IAACeBAAgkQIAAK8EADCSAgAAFwAQkwIAAK8EADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACGdAgEAxQMAIcwCIADIAwAh3QJAAMsDACHeAkAAywMAIfsCAACwBPsCIvwCAgCxBAAh_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_QMAIO4CAQDGAwAh7wIQAP4DACHwAgEAxgMAIfECAQDGAwAhAQAAAEgAIAEAAAAjACABAAAAQQAgAQAAAAEAIAMAAABBACABAABCADACAAABACADAAAAQQAgAQAAQgAwAgAAAQAgAwAAAEEAIAEAAEIAMAIAAAEAIAoLAADGBwAglAIBAAAAAZkCQAAAAAGaAkAAAAABugJAAAAAAcsCAQAAAAHNAiAAAAAB0QIBAAAAAfsCAAAAgAMC_gKAAAAAAQEeAABQACAJlAIBAAAAAZkCQAAAAAGaAkAAAAABugJAAAAAAcsCAQAAAAHNAiAAAAAB0QIBAAAAAfsCAAAAgAMC_gKAAAAAAQEeAABSADABHgAAUgAwCgsAAMUHACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACG6AkAA1wQAIcsCAQDHBAAhzQIgANkEACHRAgEAxAQAIfsCAAD5BIADIv4CgAAAAAECAAAAAQAgHgAAVQAgCZQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIboCQADXBAAhywIBAMcEACHNAiAA2QQAIdECAQDEBAAh-wIAAPkEgAMi_gKAAAAAAQIAAABBACAeAABXACACAAAAQQAgHgAAVwAgAwAAAAEAICUAAFAAICYAAFUAIAEAAAABACABAAAAQQAgBQ0AAMIHACArAADEBwAgLAAAwwcAILoCAADABAAgywIAAMAEACAMkQIAAJUEADCSAgAAXgAQkwIAAJUEADCUAgEApgMAIZkCQACnAwAhmgJAAKcDACG6AkAAuQMAIcsCAQCpAwAhzQIgALYDACHRAgEApgMAIfsCAACWBIADIv4CAADjAwAgAwAAAEEAIAEAAF0AMCoAAF4AIAMAAABBACABAABCADACAAABACABAAAAGQAgAQAAABkAIAMAAAAXACABAAAYADACAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgAwAAABcAIAEAABgAMAIAABkAIAsIAADBBwAglAIBAAAAAZkCQAAAAAGaAkAAAAABnQIBAAAAAcwCIAAAAAHdAkAAAAAB3gJAAAAAAfsCAAAA-wIC_AICAAAAAf0CQAAAAAEBHgAAZgAgCpQCAQAAAAGZAkAAAAABmgJAAAAAAZ0CAQAAAAHMAiAAAAAB3QJAAAAAAd4CQAAAAAH7AgAAAPsCAvwCAgAAAAH9AkAAAAABAR4AAGgAMAEeAABoADALCAAAwAcAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIZ0CAQDEBAAhzAIgANkEACHdAkAA1wQAId4CQADXBAAh-wIAAOwF-wIi_AICAO0FACH9AkAA1wQAIQIAAAAZACAeAABrACAKlAIBAMQEACGZAkAAxQQAIZoCQADFBAAhnQIBAMQEACHMAiAA2QQAId0CQADXBAAh3gJAANcEACH7AgAA7AX7AiL8AgIA7QUAIf0CQADXBAAhAgAAABcAIB4AAG0AIAIAAAAXACAeAABtACADAAAAGQAgJQAAZgAgJgAAawAgAQAAABkAIAEAAAAXACAJDQAAuwcAICsAAL4HACAsAAC9BwAgPQAAvAcAID4AAL8HACDdAgAAwAQAIN4CAADABAAg_AIAAMAEACD9AgAAwAQAIA2RAgAAkQQAMJICAAB0ABCTAgAAkQQAMJQCAQCmAwAhmQJAAKcDACGaAkAApwMAIZ0CAQCmAwAhzAIgALYDACHdAkAAuQMAId4CQAC5AwAh-wIAAJIE-wIi_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_AwAwkgIAANMBABCTAgAA_wMAMJQCAQCmAwAhmQJAAKcDACGaAkAApwMAIbkCIAC2AwAhugJAALkDACG7AgEApgMAIbwCAADRAwAgvgIBAKYDACHDAgEApgMAIdwCAQCpAwAh8wIAAIAE8wIi9AIBAKkDACH1AkAAuQMAIQMAAAADACABAADSAQAwKgAA0wEAIAMAAAADACABAAAEADACAAAFACAWCwAA3wMAIJECAAD6AwAwkgIAAEgAEJMCAAD6AwAwlAIBAAAAAZcCAAD8A-kCIpkCQADMAwAhmgJAAMwDACHRAgEAAAAB5AIBAAAAAeUCEAD7AwAh5gIBAMUDACHnAgEAAAAB6QJAAMsDACHqAgEAxgMAIesCAQDFAwAh7AIBAAAAAe0CAAD9AwAg7gIBAMYDACHvAhAA_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-BgAgLAAA_QYAID0AAPwGACA-AAD_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_BQAgCgAAvwYAIAsAAIEGACAMAACCBgAglAIBAAAAAZcCAAAAwQICmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvQIBAAAAAb4CAQAAAAG_AiAAAAABwQIIAAAAAcICAgAAAAHDAgEAAAABAR4AAOMCACAOlAIBAAAAAZcCAAAAwQICmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvQIBAAAAAb4CAQAAAAG_AiAAAAABwQIIAAAAAcICAgAAAAHDAgEAAAABAR4AAOUCADABHgAA5QIAMBQDAADIBQAgBwAAxgUAIAkAAMcFACAKAACnBgAgCwAAyQUAIAwAAMoFACCUAgEAxAQAIZcCAADCBcECIpkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABvQIBAMcEACG-AgEAxwQAIb8CIADZBAAhwQIIAMMFACHCAgIAxAUAIcMCAQDEBAAhAgAAABQAIB4AAOgCACAOlAIBAMQEACGXAgAAwgXBAiKZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDHBAAhvAKAAAAAAb0CAQDHBAAhvgIBAMcEACG_AiAA2QQAIcECCADDBQAhwgICAMQFACHDAgEAxAQAIQIAAAASACAeAADqAgAgAgAAABIAIB4AAOoCACADAAAAFAAgJQAA4wIAICYAAOgCACABAAAAFAAgAQAAABIAIAsNAADjBgAgKwAA5gYAICwAAOUGACA9AADkBgAgPgAA5wYAILoCAADABAAguwIAAMAEACC8AgAAwAQAIL0CAADABAAgvgIAAMAEACDBAgAAwAQAIBGRAgAA0AMAMJICAADxAgAQkwIAANADADCUAgEApgMAIZcCAADSA8ECIpkCQACnAwAhmgJAAKcDACG5AiAAtgMAIboCQAC5AwAhuwIBAKkDACG8AgAA0QMAIL0CAQCpAwAhvgIBAKkDACG_AiAAtgMAIcECCADTAwAhwgICANQDACHDAgEApgMAIQMAAAASACABAADwAgAwKgAA8QIAIAMAAAASACABAAATADACAAAUACAXBAAAzQMAIAgAAM4DACATAADPAwAgkQIAAMQDADCSAgAA9wIAEJMCAADEAwAwlAIBAAAAAZcCAADKA7gCIpkCQADMAwAhmgJAAMwDACGrAgEAxQMAIawCAQAAAAGtAgEAxgMAIa4CAQDGAwAhrwIBAMYDACGwAgEAAAABsQIBAAAAAbMCAADHA7MCIrQCIADIAwAhtgIAAMkDtgIiuAIgAMgDACG5AiAAyAMAIboCQADLAwAhAQAAAPQCACABAAAA9AIAIBcEAADNAwAgCAAAzgMAIBMAAM8DACCRAgAAxAMAMJICAAD3AgAQkwIAAMQDADCUAgEAxQMAIZcCAADKA7gCIpkCQADMAwAhmgJAAMwDACGrAgEAxQMAIawCAQDFAwAhrQIBAMYDACGuAgEAxgMAIa8CAQDGAwAhsAIBAMYDACGxAgEAxgMAIbMCAADHA7MCIrQCIADIAwAhtgIAAMkDtgIiuAIgAMgDACG5AiAAyAMAIboCQADLAwAhCQQAAOAGACAIAADhBgAgEwAA4gYAIK0CAADABAAgrgIAAMAEACCvAgAAwAQAILACAADABAAgsQIAAMAEACC6AgAAwAQAIAMAAAD3AgAgAQAA-AIAMAIAAPQCACADAAAA9wIAIAEAAPgCADACAAD0AgAgAwAAAPcCACABAAD4AgAwAgAA9AIAIBQEAADdBgAgCAAA3gYAIBMAAN8GACCUAgEAAAABlwIAAAC4AgKZAkAAAAABmgJAAAAAAasCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAAAABsAIBAAAAAbECAQAAAAGzAgAAALMCArQCIAAAAAG2AgAAALYCArgCIAAAAAG5AiAAAAABugJAAAAAAQEeAAD8AgAgEZQCAQAAAAGXAgAAALgCApkCQAAAAAGaAkAAAAABqwIBAAAAAawCAQAAAAGtAgEAAAABrgIBAAAAAa8CAQAAAAGwAgEAAAABsQIBAAAAAbMCAAAAswICtAIgAAAAAbYCAAAAtgICuAIgAAAAAbkCIAAAAAG6AkAAAAABAR4AAP4CADABHgAA_gIAMBQEAACMBQAgCAAAjQUAIBMAAI4FACCUAgEAxAQAIZcCAACLBbgCIpkCQADFBAAhmgJAAMUEACGrAgEAxAQAIawCAQDEBAAhrQIBAMcEACGuAgEAxwQAIa8CAQDHBAAhsAIBAMcEACGxAgEAxwQAIbMCAACJBbMCIrQCIADZBAAhtgIAAIoFtgIiuAIgANkEACG5AiAA2QQAIboCQADXBAAhAgAAAPQCACAeAACBAwAgEZQCAQDEBAAhlwIAAIsFuAIimQJAAMUEACGaAkAAxQQAIasCAQDEBAAhrAIBAMQEACGtAgEAxwQAIa4CAQDHBAAhrwIBAMcEACGwAgEAxwQAIbECAQDHBAAhswIAAIkFswIitAIgANkEACG2AgAAigW2AiK4AiAA2QQAIbkCIADZBAAhugJAANcEACECAAAA9wIAIB4AAIMDACACAAAA9wIAIB4AAIMDACADAAAA9AIAICUAAPwCACAmAACBAwAgAQAAAPQCACABAAAA9wIAIAkNAACGBQAgKwAAiAUAICwAAIcFACCtAgAAwAQAIK4CAADABAAgrwIAAMAEACCwAgAAwAQAILECAADABAAgugIAAMAEACAUkQIAALQDADCSAgAAigMAEJMCAAC0AwAwlAIBAKYDACGXAgAAuAO4AiKZAkAApwMAIZoCQACnAwAhqwIBAKYDACGsAgEApgMAIa0CAQCpAwAhrgIBAKkDACGvAgEAqQMAIbACAQCpAwAhsQIBAKkDACGzAgAAtQOzAiK0AiAAtgMAIbYCAAC3A7YCIrgCIAC2AwAhuQIgALYDACG6AkAAuQMAIQMAAAD3AgAgAQAAiQMAMCoAAIoDACADAAAA9wIAIAEAAPgCADACAAD0AgAgAQAAACEAIAEAAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIAMAAAAfACABAAAgADACAAAhACAVBAAA_QQAIAgAAP4EACAMAACFBQAgDwAA_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_AwAgoAIAAAC2AgKhAgAAALYCCKICAAAAtgIIqgIAAL4DtgIiBKACAAAAtgICoQIAAAC2AgiiAgAAALYCCKoCAAC_A7YCIgUNAACuAwAgKwAAwQMAICwAAMEDACCgAiAAAAABqgIgAMADACECoAIgAAAAAaoCIADBAwAhBw0AAK4DACArAADDAwAgLAAAwwMAIKACAAAAswICoQIAAACzAgiiAgAAALMCCKoCAADCA7MCIgSgAgAAALMCAqECAAAAswIIogIAAACzAgiqAgAAwwOzAiIXBAAAzQMAIAgAAM4DACATAADPAwAgkQIAAMQDADCSAgAA9wIAEJMCAADEAwAwlAIBAMUDACGXAgAAygO4AiKZAkAAzAMAIZoCQADMAwAhqwIBAMUDACGsAgEAxQMAIa0CAQDGAwAhrgIBAMYDACGvAgEAxgMAIbACAQDGAwAhsQIBAMYDACGzAgAAxwOzAiK0AiAAyAMAIbYCAADJA7YCIrgCIADIAwAhuQIgAMgDACG6AkAAywMAIQugAgEAAAABoQIBAAAABKICAQAAAASjAgEAAAABpAIBAAAAAaUCAQAAAAGmAgEAAAABpwIBAAAAAagCAQAAAAGpAgEAAAABqgIBALMDACELoAIBAAAAAaECAQAAAAWiAgEAAAAFowIBAAAAAaQCAQAAAAGlAgEAAAABpgIBAAAAAacCAQAAAAGoAgEAAAABqQIBAAAAAaoCAQCsAwAhBKACAAAAswICoQIAAACzAgiiAgAAALMCCKoCAADDA7MCIgKgAiAAAAABqgIgAMEDACEEoAIAAAC2AgKhAgAAALYCCKICAAAAtgIIqgIAAL8DtgIiBKACAAAAuAICoQIAAAC4AgiiAgAAALgCCKoCAAC9A7gCIgigAkAAAAABoQJAAAAABaICQAAAAAWjAkAAAAABpAJAAAAAAaUCQAAAAAGmAkAAAAABqgJAALsDACEIoAJAAAAAAaECQAAAAASiAkAAAAAEowJAAAAAAaQCQAAAAAGlAkAAAAABpgJAAAAAAaoCQACxAwAhEAMAAIoEACARAACLBAAgEgAAjAQAIJECAACJBAAwkgIAAAcAEJMCAACJBAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACDDAgEAxQMAIYIDAAAHACCDAwAABwAgGQMAAIoEACAHAACQBAAgCQAAtQQAIAoAALYEACALAACMBAAgDAAAtwQAIJECAACyBAAwkgIAABIAEJMCAACyBAAwlAIBAMUDACGXAgAAswTBAiKZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACC9AgEAxgMAIb4CAQDGAwAhvwIgAMgDACHBAggAtAQAIcICAgCPBAAhwwIBAMUDACGCAwAAEgAggwMAABIAIBUDAACKBAAgCwAAjAQAIA8AALYEACCRAgAAvgQAMJICAAADABCTAgAAvgQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACG7AgEAxQMAIbwCAAD9AwAgvgIBAMUDACHDAgEAxQMAIdwCAQDGAwAh8wIAAL8E8wIi9AIBAMYDACH1AkAAywMAIYIDAAADACCDAwAAAwAgEZECAADQAwAwkgIAAPECABCTAgAA0AMAMJQCAQCmAwAhlwIAANIDwQIimQJAAKcDACGaAkAApwMAIbkCIAC2AwAhugJAALkDACG7AgEAqQMAIbwCAADRAwAgvQIBAKkDACG-AgEAqQMAIb8CIAC2AwAhwQIIANMDACHCAgIA1AMAIcMCAQCmAwAhDw0AAKsDACArAADbAwAgLAAA2wMAIKACgAAAAAGjAoAAAAABpAKAAAAAAaUCgAAAAAGmAoAAAAABqgKAAAAAAcQCAQAAAAHFAgEAAAABxgIBAAAAAccCgAAAAAHIAoAAAAAByQKAAAAAAQcNAACuAwAgKwAA2gMAICwAANoDACCgAgAAAMECAqECAAAAwQIIogIAAADBAgiqAgAA2QPBAiINDQAAqwMAICsAANgDACAsAADYAwAgPQAA2AMAID4AANgDACCgAggAAAABoQIIAAAABaICCAAAAAWjAggAAAABpAIIAAAAAaUCCAAAAAGmAggAAAABqgIIANcDACENDQAArgMAICsAAK4DACAsAACuAwAgPQAA1gMAID4AAK4DACCgAgIAAAABoQICAAAABKICAgAAAASjAgIAAAABpAICAAAAAaUCAgAAAAGmAgIAAAABqgICANUDACENDQAArgMAICsAAK4DACAsAACuAwAgPQAA1gMAID4AAK4DACCgAgIAAAABoQICAAAABKICAgAAAASjAgIAAAABpAICAAAAAaUCAgAAAAGmAgIAAAABqgICANUDACEIoAIIAAAAAaECCAAAAASiAggAAAAEowIIAAAAAaQCCAAAAAGlAggAAAABpgIIAAAAAaoCCADWAwAhDQ0AAKsDACArAADYAwAgLAAA2AMAID0AANgDACA-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-QMAID0AAPkDACA-AAD5AwAgoAIQAAAAAaECEAAAAASiAhAAAAAEowIQAAAAAaQCEAAAAAGlAhAAAAABpgIQAAAAAaoCEAD4AwAhBw0AAK4DACArAAD3AwAgLAAA9wMAIKACAAAA6QICoQIAAADpAgiiAgAAAOkCCKoCAAD2A-kCIg0NAACrAwAgKwAA9QMAICwAAPUDACA9AAD1AwAgPgAA9QMAIKACEAAAAAGhAhAAAAAFogIQAAAABaMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA9AMAIQ0NAACrAwAgKwAA9QMAICwAAPUDACA9AAD1AwAgPgAA9QMAIKACEAAAAAGhAhAAAAAFogIQAAAABaMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA9AMAIQigAhAAAAABoQIQAAAABaICEAAAAAWjAhAAAAABpAIQAAAAAaUCEAAAAAGmAhAAAAABqgIQAPUDACEHDQAArgMAICsAAPcDACAsAAD3AwAgoAIAAADpAgKhAgAAAOkCCKICAAAA6QIIqgIAAPYD6QIiBKACAAAA6QICoQIAAADpAgiiAgAAAOkCCKoCAAD3A-kCIg0NAACuAwAgKwAA-QMAICwAAPkDACA9AAD5AwAgPgAA-QMAIKACEAAAAAGhAhAAAAAEogIQAAAABKMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA-AMAIQigAhAAAAABoQIQAAAABKICEAAAAASjAhAAAAABpAIQAAAAAaUCEAAAAAGmAhAAAAABqgIQAPkDACEWCwAA3wMAIJECAAD6AwAwkgIAAEgAEJMCAAD6AwAwlAIBAMUDACGXAgAA_APpAiKZAkAAzAMAIZoCQADMAwAh0QIBAMUDACHkAgEAxQMAIeUCEAD7AwAh5gIBAMUDACHnAgEAxgMAIekCQADLAwAh6gIBAMYDACHrAgEAxQMAIewCAQDFAwAh7QIAAP0DACDuAgEAxgMAIe8CEAD-AwAh8AIBAMYDACHxAgEAxgMAIQigAhAAAAABoQIQAAAABKICEAAAAASjAhAAAAABpAIQAAAAAaUCEAAAAAGmAhAAAAABqgIQAPkDACEEoAIAAADpAgKhAgAAAOkCCKICAAAA6QIIqgIAAPcD6QIiDKACgAAAAAGjAoAAAAABpAKAAAAAAaUCgAAAAAGmAoAAAAABqgKAAAAAAcQCAQAAAAHFAgEAAAABxgIBAAAAAccCgAAAAAHIAoAAAAAByQKAAAAAAQigAhAAAAABoQIQAAAABaICEAAAAAWjAhAAAAABpAIQAAAAAaUCEAAAAAGmAhAAAAABqgIQAPUDACEQkQIAAP8DADCSAgAA0wEAEJMCAAD_AwAwlAIBAKYDACGZAkAApwMAIZoCQACnAwAhuQIgALYDACG6AkAAuQMAIbsCAQCmAwAhvAIAANEDACC-AgEApgMAIcMCAQCmAwAh3AIBAKkDACHzAgAAgATzAiL0AgEAqQMAIfUCQAC5AwAhBw0AAK4DACArAACCBAAgLAAAggQAIKACAAAA8wICoQIAAADzAgiiAgAAAPMCCKoCAACBBPMCIgcNAACuAwAgKwAAggQAICwAAIIEACCgAgAAAPMCAqECAAAA8wIIogIAAADzAgiqAgAAgQTzAiIEoAIAAADzAgKhAgAAAPMCCKICAAAA8wIIqgIAAIIE8wIiC5ECAACDBAAwkgIAAL0BABCTAgAAgwQAMJQCAQCmAwAhmQJAAKcDACGaAkAApwMAIbkCIAC2AwAhugJAALkDACHBAggAhAQAIdECAQCmAwAh9gIBAKkDACENDQAArgMAICsAANYDACAsAADWAwAgPQAA1gMAID4AANYDACCgAggAAAABoQIIAAAABKICCAAAAASjAggAAAABpAIIAAAAAaUCCAAAAAGmAggAAAABqgIIAIUEACENDQAArgMAICsAANYDACAsAADWAwAgPQAA1gMAID4AANYDACCgAggAAAABoQIIAAAABKICCAAAAASjAggAAAABpAIIAAAAAaUCCAAAAAGmAggAAAABqgIIAIUEACEMCwAA3wMAIJECAACGBAAwkgIAAEYAEJMCAACGBAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIcECCACHBAAh0QIBAMUDACH2AgEAxgMAIQigAggAAAABoQIIAAAABKICCAAAAASjAggAAAABpAIIAAAAAaUCCAAAAAGmAggAAAABqgIIANYDACELkQIAAIgEADCSAgAApQEAEJMCAACIBAAwlAIBAKYDACGZAkAApwMAIZoCQACnAwAhuQIgALYDACG6AkAAuQMAIbsCAQCpAwAhvAIAANEDACDDAgEApgMAIQ4DAACKBAAgEQAAiwQAIBIAAIwEACCRAgAAiQQAMJICAAAHABCTAgAAiQQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACG7AgEAxgMAIbwCAAD9AwAgwwIBAMUDACEZBAAAzQMAIAgAAM4DACATAADPAwAgkQIAAMQDADCSAgAA9wIAEJMCAADEAwAwlAIBAMUDACGXAgAAygO4AiKZAkAAzAMAIZoCQADMAwAhqwIBAMUDACGsAgEAxQMAIa0CAQDGAwAhrgIBAMYDACGvAgEAxgMAIbACAQDGAwAhsQIBAMYDACGzAgAAxwOzAiK0AiAAyAMAIbYCAADJA7YCIrgCIADIAwAhuQIgAMgDACG6AkAAywMAIYIDAAD3AgAggwMAAPcCACAD9wIAAAkAIPgCAAAJACD5AgAACQAgA_cCAAAfACD4AgAAHwAg-QIAAB8AIAuRAgAAjQQAMJICAACNAQAQkwIAAI0EADCUAgEApgMAIZkCQACnAwAhmgJAAKcDACGrAgEApgMAIcoCAQCpAwAhywIBAKkDACHMAiAAtgMAIdcCAgDUAwAhDQUAAIsEACAOAACQBAAgkQIAAI4EADCSAgAAegAQkwIAAI4EADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACGrAgEAxQMAIcoCAQDGAwAhywIBAMYDACHMAiAAyAMAIdcCAgCPBAAhCKACAgAAAAGhAgIAAAAEogICAAAABKMCAgAAAAGkAgIAAAABpQICAAAAAaYCAgAAAAGqAgIArgMAIQP3AgAADgAg-AIAAA4AIPkCAAAOACANkQIAAJEEADCSAgAAdAAQkwIAAJEEADCUAgEApgMAIZkCQACnAwAhmgJAAKcDACGdAgEApgMAIcwCIAC2AwAh3QJAALkDACHeAkAAuQMAIfsCAACSBPsCIvwCAgDkAwAh_QJAALkDACEHDQAArgMAICsAAJQEACAsAACUBAAgoAIAAAD7AgKhAgAAAPsCCKICAAAA-wIIqgIAAJME-wIiBw0AAK4DACArAACUBAAgLAAAlAQAIKACAAAA-wICoQIAAAD7AgiiAgAAAPsCCKoCAACTBPsCIgSgAgAAAPsCAqECAAAA-wIIogIAAAD7AgiqAgAAlAT7AiIMkQIAAJUEADCSAgAAXgAQkwIAAJUEADCUAgEApgMAIZkCQACnAwAhmgJAAKcDACG6AkAAuQMAIcsCAQCpAwAhzQIgALYDACHRAgEApgMAIfsCAACWBIADIv4CAADjAwAgBw0AAK4DACArAACYBAAgLAAAmAQAIKACAAAAgAMCoQIAAACAAwiiAgAAAIADCKoCAACXBIADIgcNAACuAwAgKwAAmAQAICwAAJgEACCgAgAAAIADAqECAAAAgAMIogIAAACAAwiqAgAAlwSAAyIEoAIAAACAAwKhAgAAAIADCKICAAAAgAMIqgIAAJgEgAMiDQsAAN8DACCRAgAAmQQAMJICAABBABCTAgAAmQQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIboCQADLAwAhywIBAMYDACHNAiAAyAMAIdECAQDFAwAh-wIAAJsEgAMi_gIAAJoEACAMoAKAAAAAAaMCgAAAAAGkAoAAAAABpQKAAAAAAaYCgAAAAAGqAoAAAAABxAIBAAAAAcUCAQAAAAHGAgEAAAABxwKAAAAAAcgCgAAAAAHJAoAAAAABBKACAAAAgAMCoQIAAACAAwiiAgAAAIADCKoCAACYBIADIhIIAACeBAAgCwAA3wMAIJECAACcBAAwkgIAACMAEJMCAACcBAAwlAIBAMUDACGVAkAAzAMAIZcCAACdBOICIpkCQADMAwAhmgJAAMwDACGdAgEAxQMAIboCQADLAwAh0QIBAMUDACHdAkAAzAMAId4CQADMAwAh3wJAAMsDACHgAkAAywMAIeICIADIAwAhBKACAAAA4gICoQIAAADiAgiiAgAAAOICCKoCAADuA-ICIhkDAACKBAAgBwAAkAQAIAkAALUEACAKAAC2BAAgCwAAjAQAIAwAALcEACCRAgAAsgQAMJICAAASABCTAgAAsgQAMJQCAQDFAwAhlwIAALMEwQIimQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACG7AgEAxgMAIbwCAAD9AwAgvQIBAMYDACG-AgEAxgMAIb8CIADIAwAhwQIIALQEACHCAgIAjwQAIcMCAQDFAwAhggMAABIAIIMDAAASACAYBAAAogQAIAgAAM4DACAMAACpBAAgDwAAoQQAIBEAAKMEACATAACkBAAgFQAApQQAIBYAAKYEACAXAACnBAAgGAAAqAQAIJECAACfBAAwkgIAAB8AEJMCAACfBAAwlAIBAMUDACGVAkAAzAMAIZcCAACgBJcCIpgCAQDGAwAhmQJAAMwDACGaAkAAzAMAIZsCAQDFAwAhnAIBAMUDACGdAgEAxgMAIZ4CAQDFAwAhnwIBAMUDACEEoAIAAACXAgKhAgAAAJcCCKICAAAAlwIIqgIAAK8DlwIiDwUAAIsEACAQAACMBAAgEwAAqwQAIBQAAKwEACCRAgAAqgQAMJICAAAbABCTAgAAqgQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIcsCAQDGAwAhzAIgAMgDACHjAgEAxQMAIYIDAAAbACCDAwAAGwAgEAMAAIoEACARAACLBAAgEgAAjAQAIJECAACJBAAwkgIAAAcAEJMCAACJBAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACDDAgEAxQMAIYIDAAAHACCDAwAABwAgHQQAAKIEACAGAAC5BAAgDwAAoQQAIBAAAL0EACCRAgAAugQAMJICAAAJABCTAgAAugQAMJQCAQDFAwAhlQJAAMwDACGXAgAAvATVAiKZAkAAzAMAIZoCQADMAwAhmwIBAMUDACGcAgEAxQMAIbkCIADIAwAhvAIAAJoEACDLAgEAxgMAIc4CAQDFAwAh0wIAALsE0wIi1QJAAMsDACHWAkAAywMAIdcCAgCxBAAh2AJAAMsDACHZAkAAywMAIdoCAQDGAwAh2wJAAMsDACHcAgEAxgMAIYIDAAAJACCDAwAACQAgFQMAAIoEACALAACMBAAgDwAAtgQAIJECAAC-BAAwkgIAAAMAEJMCAAC-BAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDFAwAhvAIAAP0DACC-AgEAxQMAIcMCAQDFAwAh3AIBAMYDACHzAgAAvwTzAiL0AgEAxgMAIfUCQADLAwAhggMAAAMAIIMDAAADACAD9wIAAEEAIPgCAABBACD5AgAAQQAgDwsAAN8DACCRAgAA3gMAMJICAABEABCTAgAA3gMAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIboCQADLAwAhywIBAMYDACHNAiAAyAMAIc8CAQDFAwAh0AIBAMUDACHRAgEAxQMAIYIDAABEACCDAwAARAAgDgsAAN8DACCRAgAAhgQAMJICAABGABCTAgAAhgQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACHBAggAhwQAIdECAQDFAwAh9gIBAMYDACGCAwAARgAggwMAAEYAIBgLAADfAwAgkQIAAPoDADCSAgAASAAQkwIAAPoDADCUAgEAxQMAIZcCAAD8A-kCIpkCQADMAwAhmgJAAMwDACHRAgEAxQMAIeQCAQDFAwAh5QIQAPsDACHmAgEAxQMAIecCAQDGAwAh6QJAAMsDACHqAgEAxgMAIesCAQDFAwAh7AIBAMUDACHtAgAA_QMAIO4CAQDGAwAh7wIQAP4DACHwAgEAxgMAIfECAQDGAwAhggMAAEgAIIMDAABIACAUCAAAngQAIAsAAN8DACCRAgAAnAQAMJICAAAjABCTAgAAnAQAMJQCAQDFAwAhlQJAAMwDACGXAgAAnQTiAiKZAkAAzAMAIZoCQADMAwAhnQIBAMUDACG6AkAAywMAIdECAQDFAwAh3QJAAMwDACHeAkAAzAMAId8CQADLAwAh4AJAAMsDACHiAiAAyAMAIYIDAAAjACCDAwAAIwAgDQUAAIsEACAQAACMBAAgEwAAqwQAIBQAAKwEACCRAgAAqgQAMJICAAAbABCTAgAAqgQAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIcsCAQDGAwAhzAIgAMgDACHjAgEAxQMAIQP3AgAAAwAg-AIAAAMAIPkCAAADACAD9wIAABIAIPgCAAASACD5AgAAEgAgA50CAQAAAAH7AgAAAPsCAvwCAgAAAAEDnQIBAAAAAfsCAAAA-wIC_QJAAAAAAQ4IAACeBAAgkQIAAK8EADCSAgAAFwAQkwIAAK8EADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACGdAgEAxQMAIcwCIADIAwAh3QJAAMsDACHeAkAAywMAIfsCAACwBPsCIvwCAgCxBAAh_QJAAMsDACEEoAIAAAD7AgKhAgAAAPsCCKICAAAA-wIIqgIAAJQE-wIiCKACAgAAAAGhAgIAAAAFogICAAAABaMCAgAAAAGkAgIAAAABpQICAAAAAaYCAgAAAAGqAgIAqwMAIRcDAACKBAAgBwAAkAQAIAkAALUEACAKAAC2BAAgCwAAjAQAIAwAALcEACCRAgAAsgQAMJICAAASABCTAgAAsgQAMJQCAQDFAwAhlwIAALMEwQIimQJAAMwDACGaAkAAzAMAIbkCIADIAwAhugJAAMsDACG7AgEAxgMAIbwCAAD9AwAgvQIBAMYDACG-AgEAxgMAIb8CIADIAwAhwQIIALQEACHCAgIAjwQAIcMCAQDFAwAhBKACAAAAwQICoQIAAADBAgiiAgAAAMECCKoCAADaA8ECIgigAggAAAABoQIIAAAABaICCAAAAAWjAggAAAABpAIIAAAAAaUCCAAAAAGmAggAAAABqgIIANgDACED9wIAABcAIPgCAAAXACD5AgAAFwAgA_cCAAAbACD4AgAAGwAg-QIAABsAIAP3AgAAIwAg-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_gKAAAAAAQIAAAABACAlAAD7BAAgAwAAAAEAICUAAPsEACAmAAD6BAAgAR4AAKkIADANCwAA3wMAIJECAACZBAAwkgIAAEEAEJMCAACZBAAwlAIBAAAAAZkCQADMAwAhmgJAAMwDACG6AkAAywMAIcsCAQDGAwAhzQIgAMgDACHRAgEAxQMAIfsCAACbBIADIv4CAACaBAAgAgAAAAEAIB4AAPoEACACAAAA9wQAIB4AAPgEACAMkQIAAPYEADCSAgAA9wQAEJMCAAD2BAAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhugJAAMsDACHLAgEAxgMAIc0CIADIAwAh0QIBAMUDACH7AgAAmwSAAyL-AgAAmgQAIAyRAgAA9gQAMJICAAD3BAAQkwIAAPYEADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACG6AkAAywMAIcsCAQDGAwAhzQIgAMgDACHRAgEAxQMAIfsCAACbBIADIv4CAACaBAAgCJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIboCQADXBAAhywIBAMcEACHNAiAA2QQAIfsCAAD5BIADIv4CgAAAAAEBigMAAACAAwIIlAIBAMQEACGZAkAAxQQAIZoCQADFBAAhugJAANcEACHLAgEAxwQAIc0CIADZBAAh-wIAAPkEgAMi_gKAAAAAAQiUAgEAAAABmQJAAAAAAZoCQAAAAAG6AkAAAAABywIBAAAAAc0CIAAAAAH7AgAAAIADAv4CgAAAAAEDJQAApwgAIIQDAACoCAAgiAMAAB0AIAMlAAClCAAghAMAAKYIACCIAwAAkAEAIAMlAACjCAAghAMAAKQIACCIAwAAFAAgAyUAAKEIACCEAwAAoggAIIgDAAALACADJQAAnwgAIIQDAACgCAAgiAMAAAUAIAQlAADvBAAwhAMAAPAEADCIAwAA8wQAMIkDAADyBAAgAyUAAOoEACCEAwAA6wQAIIgDAACwAgAgAyUAAOQEACCEAwAA5QQAIIgDAACoAQAgAyUAANwEACCEAwAA3QQAIIgDAADWAQAgAyUAANIEACCEAwAA0wQAIIgDAAAlACAAAAABigMAAACzAgIBigMAAAC2AgIBigMAAAC4AgIHJQAAwAYAICYAAMMGACCEAwAAwQYAIIUDAADCBgAghgMAAAcAIIcDAAAHACCIAwAAkAEAIAclAACiBgAgJgAApQYAIIQDAACjBgAghQMAAKQGACCGAwAAEgAghwMAABIAIIgDAAAUACAHJQAAjwUAICYAAJIFACCEAwAAkAUAIIUDAACRBQAghgMAAAMAIIcDAAADACCIAwAABQAgDgsAAKEGACAPAACgBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb4CAQAAAAHcAgEAAAAB8wIAAADzAgL0AgEAAAAB9QJAAAAAAQIAAAAFACAlAACPBQAgAwAAAAMAICUAAI8FACAmAACTBQAgEAAAAAMAIAsAAJYFACAPAACVBQAgHgAAkwUAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxAQAIbwCgAAAAAG-AgEAxAQAIdwCAQDHBAAh8wIAAJQF8wIi9AIBAMcEACH1AkAA1wQAIQ4LAACWBQAgDwAAlQUAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxAQAIbwCgAAAAAG-AgEAxAQAIdwCAQDHBAAh8wIAAJQF8wIi9AIBAMcEACH1AkAA1wQAIQGKAwAAAPMCAgolAACjBQAwJgAApwUAMIQDAACkBQAwhQMAAKUFADCGAwAApgUAMIcDAACmBQAwiAMAAKYFADCKAwAApgUAMIsDAACoBQAwjAMAAKkFADALJQAAlwUAMCYAAJwFADCEAwAAmAUAMIUDAACZBQAwhgMAAJsFADCHAwAAmwUAMIgDAACbBQAwiQMAAJoFACCKAwAAmwUAMIsDAACdBQAwjAMAAJ4FADATBAAA_QQAIAgAAP4EACAMAACFBQAgDwAA_AQAIBEAAP8EACAVAACBBQAgFgAAggUAIBcAAIMFACAYAACEBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAECAAAAIQAgJQAAogUAIAMAAAAhACAlAACiBQAgJgAAoQUAIAEeAACeCAAwGAQAAKIEACAIAADOAwAgDAAAqQQAIA8AAKEEACARAACjBAAgEwAApAQAIBUAAKUEACAWAACmBAAgFwAApwQAIBgAAKgEACCRAgAAnwQAMJICAAAfABCTAgAAnwQAMJQCAQAAAAGVAkAAzAMAIZcCAACgBJcCIpgCAQDGAwAhmQJAAMwDACGaAkAAzAMAIZsCAQDFAwAhnAIBAMUDACGdAgEAxgMAIZ4CAQAAAAGfAgEAxQMAIQIAAAAhACAeAAChBQAgAgAAAJ8FACAeAACgBQAgDpECAACeBQAwkgIAAJ8FABCTAgAAngUAMJQCAQDFAwAhlQJAAMwDACGXAgAAoASXAiKYAgEAxgMAIZkCQADMAwAhmgJAAMwDACGbAgEAxQMAIZwCAQDFAwAhnQIBAMYDACGeAgEAxQMAIZ8CAQDFAwAhDpECAACeBQAwkgIAAJ8FABCTAgAAngUAMJQCAQDFAwAhlQJAAMwDACGXAgAAoASXAiKYAgEAxgMAIZkCQADMAwAhmgJAAMwDACGbAgEAxQMAIZwCAQDFAwAhnQIBAMYDACGeAgEAxQMAIZ8CAQDFAwAhCpQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGbAgEAxAQAIZwCAQDEBAAhnQIBAMcEACGeAgEAxAQAIRMEAADJBAAgCAAAygQAIAwAANEEACAPAADIBAAgEQAAywQAIBUAAM0EACAWAADOBAAgFwAAzwQAIBgAANAEACCUAgEAxAQAIZUCQADFBAAhlwIAAMYElwIimAIBAMcEACGZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIZ0CAQDHBAAhngIBAMQEACETBAAA_QQAIAgAAP4EACAMAACFBQAgDwAA_AQAIBEAAP8EACAVAACBBQAgFgAAggUAIBcAAIMFACAYAACEBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAEJBQAAnQYAIBAAAJ8GACAUAACeBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABywIBAAAAAcwCIAAAAAHjAgEAAAABAgAAAB0AICUAAJwGACADAAAAHQAgJQAAnAYAICYAAKwFACANBQAAiwQAIBAAAIwEACATAACrBAAgFAAArAQAIJECAACqBAAwkgIAABsAEJMCAACqBAAwlAIBAAAAAZkCQADMAwAhmgJAAMwDACHLAgEAxgMAIcwCIADIAwAh4wIBAAAAAQIAAAAdACAeAACsBQAgAgAAAKoFACAeAACrBQAgCZECAACpBQAwkgIAAKoFABCTAgAAqQUAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIcsCAQDGAwAhzAIgAMgDACHjAgEAxQMAIQmRAgAAqQUAMJICAACqBQAQkwIAAKkFADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACHLAgEAxgMAIcwCIADIAwAh4wIBAMUDACEGlAIBAMQEACGZAkAAxQQAIZoCQADFBAAhywIBAMcEACHMAiAA2QQAIeMCAQDEBAAhCQUAAK0FACAQAACvBQAgFAAArgUAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIcsCAQDHBAAhzAIgANkEACHjAgEAxAQAIQslAACDBgAwJgAAiAYAMIQDAACEBgAwhQMAAIUGADCGAwAAhwYAMIcDAACHBgAwiAMAAIcGADCJAwAAhgYAIIoDAACHBgAwiwMAAIkGADCMAwAAigYAMAolAAC5BQAwJgAAvQUAMIQDAAC6BQAwhQMAALsFADCGAwAAvAUAMIcDAAC8BQAwiAMAALwFADCKAwAAvAUAMIsDAAC-BQAwjAMAAL8FADALJQAAsAUAMCYAALQFADCEAwAAsQUAMIUDAACyBQAwhgMAAJsFADCHAwAAmwUAMIgDAACbBQAwiQMAALMFACCKAwAAmwUAMIsDAAC1BQAwjAMAAJ4FADATBAAA_QQAIAgAAP4EACAMAACFBQAgEQAA_wQAIBMAAIAFACAVAACBBQAgFgAAggUAIBcAAIMFACAYAACEBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAAuAUAIAMAAAAhACAlAAC4BQAgJgAAtwUAIAEeAACdCAAwAgAAACEAIB4AALcFACACAAAAnwUAIB4AALYFACAKlAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZwCAQDEBAAhnQIBAMcEACGeAgEAxAQAIZ8CAQDEBAAhEwQAAMkEACAIAADKBAAgDAAA0QQAIBEAAMsEACATAADMBAAgFQAAzQQAIBYAAM4EACAXAADPBAAgGAAA0AQAIJQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGcAgEAxAQAIZ0CAQDHBAAhngIBAMQEACGfAgEAxAQAIRMEAAD9BAAgCAAA_gQAIAwAAIUFACARAAD_BAAgEwAAgAUAIBUAAIEFACAWAACCBQAgFwAAgwUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABnAIBAAAAAZ0CAQAAAAGeAgEAAAABnwIBAAAAARMDAACABgAgBwAA_gUAIAkAAP8FACALAACBBgAgDAAAggYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAAD9BQAgAwAAABQAICUAAP0FACAmAADFBQAgFwMAAIoEACAHAACQBAAgCQAAtQQAIAoAALYEACALAACMBAAgDAAAtwQAIJECAACyBAAwkgIAABIAEJMCAACyBAAwlAIBAAAAAZcCAACzBMECIpkCQADMAwAhmgJAAMwDACG5AiAAyAMAIboCQADLAwAhuwIBAMYDACG8AgAA_QMAIL0CAQDGAwAhvgIBAMYDACG_AiAAyAMAIcECCAC0BAAhwgICAI8EACHDAgEAAAABAgAAABQAIB4AAMUFACACAAAAwAUAIB4AAMEFACARkQIAAL8FADCSAgAAwAUAEJMCAAC_BQAwlAIBAMUDACGXAgAAswTBAiKZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACC9AgEAxgMAIb4CAQDGAwAhvwIgAMgDACHBAggAtAQAIcICAgCPBAAhwwIBAMUDACERkQIAAL8FADCSAgAAwAUAEJMCAAC_BQAwlAIBAMUDACGXAgAAswTBAiKZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDGAwAhvAIAAP0DACC9AgEAxgMAIb4CAQDGAwAhvwIgAMgDACHBAggAtAQAIcICAgCPBAAhwwIBAMUDACEOlAIBAMQEACGXAgAAwgXBAiKZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDHBAAhvAKAAAAAAb0CAQDHBAAhvgIBAMcEACG_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_QQAIAwAAIUFACAPAAD8BAAgEQAA_wQAIBMAAIAFACAVAACBBQAgFgAAggUAIBcAAIMFACAYAACEBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAA4QUAIAMAAAAhACAlAADhBQAgJgAA4AUAIAEeAACTCAAwAgAAACEAIB4AAOAFACACAAAAnwUAIB4AAN8FACAKlAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGeAgEAxAQAIZ8CAQDEBAAhEwQAAMkEACAMAADRBAAgDwAAyAQAIBEAAMsEACATAADMBAAgFQAAzQQAIBYAAM4EACAXAADPBAAgGAAA0AQAIJQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGbAgEAxAQAIZwCAQDEBAAhngIBAMQEACGfAgEAxAQAIRMEAAD9BAAgDAAAhQUAIA8AAPwEACARAAD_BAAgEwAAgAUAIBUAAIEFACAWAACCBQAgFwAAgwUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGeAgEAAAABnwIBAAAAAQmUAgEAAAABmQJAAAAAAZoCQAAAAAHMAiAAAAAB3QJAAAAAAd4CQAAAAAH7AgAAAPsCAvwCAgAAAAH9AkAAAAABAgAAABkAICUAAO8FACADAAAAGQAgJQAA7wUAICYAAO4FACABHgAAkggAMBAIAACeBAAgkQIAAK8EADCSAgAAFwAQkwIAAK8EADCUAgEAAAABmQJAAMwDACGaAkAAzAMAIZ0CAQDFAwAhzAIgAMgDACHdAkAAywMAId4CQADLAwAh-wIAALAE-wIi_AICALEEACH9AkAAywMAIYADAACtBAAggQMAAK4EACACAAAAGQAgHgAA7gUAIAIAAADqBQAgHgAA6wUAIA2RAgAA6QUAMJICAADqBQAQkwIAAOkFADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACGdAgEAxQMAIcwCIADIAwAh3QJAAMsDACHeAkAAywMAIfsCAACwBPsCIvwCAgCxBAAh_QJAAMsDACENkQIAAOkFADCSAgAA6gUAEJMCAADpBQAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhnQIBAMUDACHMAiAAyAMAId0CQADLAwAh3gJAAMsDACH7AgAAsAT7AiL8AgIAsQQAIf0CQADLAwAhCZQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIcwCIADZBAAh3QJAANcEACHeAkAA1wQAIfsCAADsBfsCIvwCAgDtBQAh_QJAANcEACEBigMAAAD7AgIFigMCAAAAAY0DAgAAAAGOAwIAAAABjwMCAAAAAZADAgAAAAEJlAIBAMQEACGZAkAAxQQAIZoCQADFBAAhzAIgANkEACHdAkAA1wQAId4CQADXBAAh-wIAAOwF-wIi_AICAO0FACH9AkAA1wQAIQmUAgEAAAABmQJAAAAAAZoCQAAAAAHMAiAAAAAB3QJAAAAAAd4CQAAAAAH7AgAAAPsCAvwCAgAAAAH9AkAAAAABCwYAAPwFACCUAgEAAAABmQJAAAAAAZoCQAAAAAGrAgEAAAABugJAAAAAAcoCAQAAAAHLAgEAAAABzAIgAAAAAc0CIAAAAAHOAgEAAAABAgAAABAAICUAAPsFACADAAAAEAAgJQAA-wUAICYAAPkFACAPBgAAuQQAIAgAAKwEACCRAgAAuAQAMJICAAAOABCTAgAAuAQAMJQCAQAAAAGZAkAAzAMAIZoCQADMAwAhqwIBAAAAAboCQADLAwAhygIBAMYDACHLAgEAxgMAIcwCIADIAwAhzQIgAMgDACHOAgEAxQMAIQIAAAAQACAeAAD5BQAgAgAAAPcFACAeAAD4BQAgDZECAAD2BQAwkgIAAPcFABCTAgAA9gUAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIasCAQDFAwAhugJAAMsDACHKAgEAxgMAIcsCAQDGAwAhzAIgAMgDACHNAiAAyAMAIc4CAQDFAwAhDZECAAD2BQAwkgIAAPcFABCTAgAA9gUAMJQCAQDFAwAhmQJAAMwDACGaAkAAzAMAIasCAQDFAwAhugJAAMsDACHKAgEAxgMAIcsCAQDGAwAhzAIgAMgDACHNAiAAyAMAIc4CAQDFAwAhCpQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIasCAQDEBAAhugJAANcEACHKAgEAxwQAIcsCAQDHBAAhzAIgANkEACHNAiAA2QQAIc4CAQDEBAAhCwYAAPoFACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACGrAgEAxAQAIboCQADXBAAhygIBAMcEACHLAgEAxwQAIcwCIADZBAAhzQIgANkEACHOAgEAxAQAIQUlAACNCAAgJgAAkAgAIIQDAACOCAAghQMAAI8IACCIAwAAdwAgCwYAAPwFACCUAgEAAAABmQJAAAAAAZoCQAAAAAGrAgEAAAABugJAAAAAAcoCAQAAAAHLAgEAAAABzAIgAAAAAc0CIAAAAAHOAgEAAAABAyUAAI0IACCEAwAAjggAIIgDAAB3ACATAwAAgAYAIAcAAP4FACAJAAD_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_gQAIAwAAIUFACAPAAD8BAAgEwAAgAUAIBUAAIEFACAWAACCBQAgFwAAgwUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGdAgEAAAABnwIBAAAAAQIAAAAhACAlAACTBgAgAwAAAB8AICUAAJMGACAmAACXBgAgFQAAAB8AIAQAAMkEACAIAADKBAAgDAAA0QQAIA8AAMgEACATAADMBAAgFQAAzQQAIBYAAM4EACAXAADPBAAgGAAA0AQAIB4AAJcGACCUAgEAxAQAIZUCQADFBAAhlwIAAMYElwIimAIBAMcEACGZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIZ0CAQDHBAAhnwIBAMQEACETBAAAyQQAIAgAAMoEACAMAADRBAAgDwAAyAQAIBMAAMwEACAVAADNBAAgFgAAzgQAIBcAAM8EACAYAADQBAAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ8CAQDEBAAhFgQAAJkGACAGAACaBgAgEAAAmwYAIJQCAQAAAAGVAkAAAAABlwIAAADVAgKZAkAAAAABmgJAAAAAAZwCAQAAAAG5AiAAAAABvAKAAAAAAcsCAQAAAAHOAgEAAAAB0wIAAADTAgLVAkAAAAAB1gJAAAAAAdcCAgAAAAHYAkAAAAAB2QJAAAAAAdoCAQAAAAHbAkAAAAAB3AIBAAAAAQMlAACCCAAghAMAAIMIACCIAwAAkAEAIAMlAACACAAghAMAAIEIACCIAwAAdwAgAyUAAJMGACCEAwAAlAYAIIgDAAAhACAJBQAAnQYAIBAAAJ8GACAUAACeBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABywIBAAAAAcwCIAAAAAHjAgEAAAABBCUAAIMGADCEAwAAhAYAMIgDAACHBgAwiQMAAIYGACADJQAAuQUAMIQDAAC6BQAwiAMAALwFADAEJQAAsAUAMIQDAACxBQAwiAMAAJsFADCJAwAAswUAIAMlAACjBQAwhAMAAKQFADCIAwAApgUAMAQlAACXBQAwhAMAAJgFADCIAwAAmwUAMIkDAACaBQAgEgcAAP4FACAJAAD_BQAgCgAAvwYAIAsAAIEGACAMAACCBgAglAIBAAAAAZcCAAAAwQICmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvQIBAAAAAb4CAQAAAAG_AiAAAAABwQIIAAAAAcICAgAAAAECAAAAFAAgJQAAogYAIAMAAAASACAlAACiBgAgJgAApgYAIBQAAAASACAHAADGBQAgCQAAxwUAIAoAAKcGACALAADJBQAgDAAAygUAIB4AAKYGACCUAgEAxAQAIZcCAADCBcECIpkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABvQIBAMcEACG-AgEAxwQAIb8CIADZBAAhwQIIAMMFACHCAgIAxAUAIRIHAADGBQAgCQAAxwUAIAoAAKcGACALAADJBQAgDAAAygUAIJQCAQDEBAAhlwIAAMIFwQIimQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAG9AgEAxwQAIb4CAQDHBAAhvwIgANkEACHBAggAwwUAIcICAgDEBQAhCiUAAKgGADAmAACrBgAwhAMAAKkGADCFAwAAqgYAMIYDAACmBQAwhwMAAKYFADCIAwAApgUAMIoDAACmBQAwiwMAAKwGADCMAwAAqQUAMAkFAACdBgAgEAAAnwYAIBMAAL4GACCUAgEAAAABmQJAAAAAAZoCQAAAAAHLAgEAAAABzAIgAAAAAeMCAQAAAAECAAAAHQAgJQAAvQYAIAMAAAAdACAlAAC9BgAgJgAArgYAIAIAAAAdACAeAACuBgAgAgAAAKoFACAeAACtBgAgBpQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIcsCAQDHBAAhzAIgANkEACHjAgEAxAQAIQkFAACtBQAgEAAArwUAIBMAAK8GACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACHLAgEAxwQAIcwCIADZBAAh4wIBAMQEACEKJQAAsAYAMCYAALQGADCEAwAAsQYAMIUDAACyBgAwhgMAALMGADCHAwAAswYAMIgDAACzBgAwigMAALMGADCLAwAAtQYAMIwDAAC2BgAwDwMAALwGACALAAChBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb4CAQAAAAHDAgEAAAAB3AIBAAAAAfMCAAAA8wIC9AIBAAAAAfUCQAAAAAECAAAABQAgJQAAuwYAIAMAAAAFACAlAAC7BgAgJgAAuQYAIBMDAACKBAAgCwAAjAQAIA8AALYEACCRAgAAvgQAMJICAAADABCTAgAAvgQAMJQCAQAAAAGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDFAwAhvAIAAP0DACC-AgEAxQMAIcMCAQAAAAHcAgEAxgMAIfMCAAC_BPMCIvQCAQDGAwAh9QJAAMsDACECAAAABQAgHgAAuQYAIAIAAAC3BgAgHgAAuAYAIBCRAgAAtgYAMJICAAC3BgAQkwIAALYGADCUAgEAxQMAIZkCQADMAwAhmgJAAMwDACG5AiAAyAMAIboCQADLAwAhuwIBAMUDACG8AgAA_QMAIL4CAQDFAwAhwwIBAMUDACHcAgEAxgMAIfMCAAC_BPMCIvQCAQDGAwAh9QJAAMsDACEQkQIAALYGADCSAgAAtwYAEJMCAAC2BgAwlAIBAMUDACGZAkAAzAMAIZoCQADMAwAhuQIgAMgDACG6AkAAywMAIbsCAQDFAwAhvAIAAP0DACC-AgEAxQMAIcMCAQDFAwAh3AIBAMYDACHzAgAAvwTzAiL0AgEAxgMAIfUCQADLAwAhDZQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxAQAIbwCgAAAAAG-AgEAxAQAIcMCAQDEBAAh3AIBAMcEACHzAgAAlAXzAiL0AgEAxwQAIfUCQADXBAAhDwMAALoGACALAACWBQAglAIBAMQEACGZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDEBAAhvAKAAAAAAb4CAQDEBAAhwwIBAMQEACHcAgEAxwQAIfMCAACUBfMCIvQCAQDHBAAh9QJAANcEACEFJQAA-wcAICYAAP4HACCEAwAA_AcAIIUDAAD9BwAgiAMAAPQCACAPAwAAvAYAIAsAAKEGACCUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvgIBAAAAAcMCAQAAAAHcAgEAAAAB8wIAAADzAgL0AgEAAAAB9QJAAAAAAQMlAAD7BwAghAMAAPwHACCIAwAA9AIAIAkFAACdBgAgEAAAnwYAIBMAAL4GACCUAgEAAAABmQJAAAAAAZoCQAAAAAHLAgEAAAABzAIgAAAAAeMCAQAAAAEDJQAAsAYAMIQDAACxBgAwiAMAALMGADADJQAAqAYAMIQDAACpBgAwiAMAAKYFADAJEQAA2wYAIBIAANwGACCUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABAgAAAJABACAlAADABgAgAwAAAAcAICUAAMAGACAmAADEBgAgCwAAAAcAIBEAAMUGACASAADGBgAgHgAAxAYAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAEJEQAAxQYAIBIAAMYGACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABCyUAANAGADAmAADUBgAwhAMAANEGADCFAwAA0gYAMIYDAACHBgAwhwMAAIcGADCIAwAAhwYAMIkDAADTBgAgigMAAIcGADCLAwAA1QYAMIwDAACKBgAwCyUAAMcGADAmAADLBgAwhAMAAMgGADCFAwAAyQYAMIYDAACbBQAwhwMAAJsFADCIAwAAmwUAMIkDAADKBgAgigMAAJsFADCLAwAAzAYAMIwDAACeBQAwEwgAAP4EACAMAACFBQAgDwAA_AQAIBEAAP8EACATAACABQAgFQAAgQUAIBYAAIIFACAXAACDBQAgGAAAhAUAIJQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGbAgEAAAABnQIBAAAAAZ4CAQAAAAGfAgEAAAABAgAAACEAICUAAM8GACADAAAAIQAgJQAAzwYAICYAAM4GACABHgAA-gcAMAIAAAAhACAeAADOBgAgAgAAAJ8FACAeAADNBgAgCpQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGbAgEAxAQAIZ0CAQDHBAAhngIBAMQEACGfAgEAxAQAIRMIAADKBAAgDAAA0QQAIA8AAMgEACARAADLBAAgEwAAzAQAIBUAAM0EACAWAADOBAAgFwAAzwQAIBgAANAEACCUAgEAxAQAIZUCQADFBAAhlwIAAMYElwIimAIBAMcEACGZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACETCAAA_gQAIAwAAIUFACAPAAD8BAAgEQAA_wQAIBMAAIAFACAVAACBBQAgFgAAggUAIBcAAIMFACAYAACEBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAEWBgAAmgYAIA8AANoGACAQAACbBgAglAIBAAAAAZUCQAAAAAGXAgAAANUCApkCQAAAAAGaAkAAAAABmwIBAAAAAbkCIAAAAAG8AoAAAAABywIBAAAAAc4CAQAAAAHTAgAAANMCAtUCQAAAAAHWAkAAAAAB1wICAAAAAdgCQAAAAAHZAkAAAAAB2gIBAAAAAdsCQAAAAAHcAgEAAAABAgAAAAsAICUAANkGACADAAAACwAgJQAA2QYAICYAANcGACABHgAA-QcAMAIAAAALACAeAADXBgAgAgAAAIsGACAeAADWBgAgE5QCAQDEBAAhlQJAAMUEACGXAgAAjgbVAiKZAkAAxQQAIZoCQADFBAAhmwIBAMQEACG5AiAA2QQAIbwCgAAAAAHLAgEAxwQAIc4CAQDEBAAh0wIAAI0G0wIi1QJAANcEACHWAkAA1wQAIdcCAgDtBQAh2AJAANcEACHZAkAA1wQAIdoCAQDHBAAh2wJAANcEACHcAgEAxwQAIRYGAACRBgAgDwAA2AYAIBAAAJIGACCUAgEAxAQAIZUCQADFBAAhlwIAAI4G1QIimQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhuQIgANkEACG8AoAAAAABywIBAMcEACHOAgEAxAQAIdMCAACNBtMCItUCQADXBAAh1gJAANcEACHXAgIA7QUAIdgCQADXBAAh2QJAANcEACHaAgEAxwQAIdsCQADXBAAh3AIBAMcEACEFJQAA9AcAICYAAPcHACCEAwAA9QcAIIUDAAD2BwAgiAMAAB0AIBYGAACaBgAgDwAA2gYAIBAAAJsGACCUAgEAAAABlQJAAAAAAZcCAAAA1QICmQJAAAAAAZoCQAAAAAGbAgEAAAABuQIgAAAAAbwCgAAAAAHLAgEAAAABzgIBAAAAAdMCAAAA0wIC1QJAAAAAAdYCQAAAAAHXAgIAAAAB2AJAAAAAAdkCQAAAAAHaAgEAAAAB2wJAAAAAAdwCAQAAAAEDJQAA9AcAIIQDAAD1BwAgiAMAAB0AIAQlAADQBgAwhAMAANEGADCIAwAAhwYAMIkDAADTBgAgBCUAAMcGADCEAwAAyAYAMIgDAACbBQAwiQMAAMoGACADJQAAwAYAIIQDAADBBgAgiAMAAJABACADJQAAogYAIIQDAACjBgAgiAMAABQAIAMlAACPBQAghAMAAJAFACCIAwAABQAgBgMAAJwHACARAACdBwAgEgAAngcAILoCAADABAAguwIAAMAEACC8AgAAwAQAIAwDAACcBwAgBwAAugcAIAkAANAHACAKAADRBwAgCwAAngcAIAwAANIHACC6AgAAwAQAILsCAADABAAgvAIAAMAEACC9AgAAwAQAIL4CAADABAAgwQIAAMAEACAIAwAAnAcAIAsAAJ4HACAPAADRBwAgugIAAMAEACC8AgAAwAQAINwCAADABAAg9AIAAMAEACD1AgAAwAQAIAAAAAAAAAAACiUAAOwGADAmAADvBgAwhAMAAO0GADCFAwAA7gYAMIYDAAC8BQAwhwMAALwFADCIAwAAvAUAMIoDAAC8BQAwiwMAAPAGADCMAwAAvwUAMBMDAACABgAgCQAA_wUAIAoAAL8GACALAACBBgAgDAAAggYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAADzBgAgAwAAABQAICUAAPMGACAmAADyBgAgAgAAABQAIB4AAPIGACACAAAAwAUAIB4AAPEGACAOlAIBAMQEACGXAgAAwgXBAiKZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDHBAAhvAKAAAAAAb0CAQDHBAAhvgIBAMcEACG_AiAA2QQAIcECCADDBQAhwgICAMQFACHDAgEAxAQAIRMDAADIBQAgCQAAxwUAIAoAAKcGACALAADJBQAgDAAAygUAIJQCAQDEBAAhlwIAAMIFwQIimQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAG9AgEAxwQAIb4CAQDHBAAhvwIgANkEACHBAggAwwUAIcICAgDEBQAhwwIBAMQEACETAwAAgAYAIAkAAP8FACAKAAC_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_gQAIAwAAIUFACAPAAD8BAAgEQAA_wQAIBMAAIAFACAWAACCBQAgFwAAgwUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAA1AcAIAMAAAAfACAlAADUBwAgJgAA2AcAIBYAAAAfACAEAADJBAAgCAAAygQAIAwAANEEACAPAADIBAAgEQAAywQAIBMAAMwEACAWAADOBAAgFwAAzwQAIBgAANAEACAeAADYBwAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACEUBAAAyQQAIAgAAMoEACAMAADRBAAgDwAAyAQAIBEAAMsEACATAADMBAAgFgAAzgQAIBcAAM8EACAYAADQBAAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACETAwAAgAYAIAcAAP4FACAKAAC_BgAgCwAAgQYAIAwAAIIGACCUAgEAAAABlwIAAADBAgKZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAG9AgEAAAABvgIBAAAAAb8CIAAAAAHBAggAAAABwgICAAAAAcMCAQAAAAECAAAAFAAgJQAA2QcAIAMAAAASACAlAADZBwAgJgAA3QcAIBUAAAASACADAADIBQAgBwAAxgUAIAoAAKcGACALAADJBQAgDAAAygUAIB4AAN0HACCUAgEAxAQAIZcCAADCBcECIpkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABvQIBAMcEACG-AgEAxwQAIb8CIADZBAAhwQIIAMMFACHCAgIAxAUAIcMCAQDEBAAhEwMAAMgFACAHAADGBQAgCgAApwYAIAsAAMkFACAMAADKBQAglAIBAMQEACGXAgAAwgXBAiKZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDHBAAhvAKAAAAAAb0CAQDHBAAhvgIBAMcEACG_AiAA2QQAIcECCADDBQAhwgICAMQFACHDAgEAxAQAIROUAgEAAAABlQJAAAAAAZcCAAAA1QICmQJAAAAAAZoCQAAAAAGbAgEAAAABnAIBAAAAAbkCIAAAAAG8AoAAAAABywIBAAAAAdMCAAAA0wIC1QJAAAAAAdYCQAAAAAHXAgIAAAAB2AJAAAAAAdkCQAAAAAHaAgEAAAAB2wJAAAAAAdwCAQAAAAEJlAIBAAAAAZkCQAAAAAGaAkAAAAABqwIBAAAAAboCQAAAAAHKAgEAAAABywIBAAAAAcwCIAAAAAHNAiAAAAABEwgAAN4GACATAADfBgAglAIBAAAAAZcCAAAAuAICmQJAAAAAAZoCQAAAAAGrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBAAAAAbACAQAAAAGxAgEAAAABswIAAACzAgK0AiAAAAABtgIAAAC2AgK4AiAAAAABuQIgAAAAAboCQAAAAAECAAAA9AIAICUAAOAHACADAAAA9wIAICUAAOAHACAmAADkBwAgFQAAAPcCACAIAACNBQAgEwAAjgUAIB4AAOQHACCUAgEAxAQAIZcCAACLBbgCIpkCQADFBAAhmgJAAMUEACGrAgEAxAQAIawCAQDEBAAhrQIBAMcEACGuAgEAxwQAIa8CAQDHBAAhsAIBAMcEACGxAgEAxwQAIbMCAACJBbMCIrQCIADZBAAhtgIAAIoFtgIiuAIgANkEACG5AiAA2QQAIboCQADXBAAhEwgAAI0FACATAACOBQAglAIBAMQEACGXAgAAiwW4AiKZAkAAxQQAIZoCQADFBAAhqwIBAMQEACGsAgEAxAQAIa0CAQDHBAAhrgIBAMcEACGvAgEAxwQAIbACAQDHBAAhsQIBAMcEACGzAgAAiQWzAiK0AiAA2QQAIbYCAACKBbYCIrgCIADZBAAhuQIgANkEACG6AkAA1wQAIRQEAAD9BAAgCAAA_gQAIAwAAIUFACAPAAD8BAAgEQAA_wQAIBMAAIAFACAVAACBBQAgFgAAggUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAA5QcAIAMAAAAfACAlAADlBwAgJgAA6QcAIBYAAAAfACAEAADJBAAgCAAAygQAIAwAANEEACAPAADIBAAgEQAAywQAIBMAAMwEACAVAADNBAAgFgAAzgQAIBgAANAEACAeAADpBwAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACEUBAAAyQQAIAgAAMoEACAMAADRBAAgDwAAyAQAIBEAAMsEACATAADMBAAgFQAAzQQAIBYAAM4EACAYAADQBAAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACEUBAAA_QQAIAgAAP4EACAMAACFBQAgDwAA_AQAIBEAAP8EACATAACABQAgFQAAgQUAIBYAAIIFACAXAACDBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAGfAgEAAAABAgAAACEAICUAAOoHACADAAAAHwAgJQAA6gcAICYAAO4HACAWAAAAHwAgBAAAyQQAIAgAAMoEACAMAADRBAAgDwAAyAQAIBEAAMsEACATAADMBAAgFQAAzQQAIBYAAM4EACAXAADPBAAgHgAA7gcAIJQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGbAgEAxAQAIZwCAQDEBAAhnQIBAMcEACGeAgEAxAQAIZ8CAQDEBAAhFAQAAMkEACAIAADKBAAgDAAA0QQAIA8AAMgEACARAADLBAAgEwAAzAQAIBUAAM0EACAWAADOBAAgFwAAzwQAIJQCAQDEBAAhlQJAAMUEACGXAgAAxgSXAiKYAgEAxwQAIZkCQADFBAAhmgJAAMUEACGbAgEAxAQAIZwCAQDEBAAhnQIBAMcEACGeAgEAxAQAIZ8CAQDEBAAhFAQAAP0EACAIAAD-BAAgDAAAhQUAIA8AAPwEACARAAD_BAAgEwAAgAUAIBUAAIEFACAXAACDBQAgGAAAhAUAIJQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGbAgEAAAABnAIBAAAAAZ0CAQAAAAGeAgEAAAABnwIBAAAAAQIAAAAhACAlAADvBwAgAwAAAB8AICUAAO8HACAmAADzBwAgFgAAAB8AIAQAAMkEACAIAADKBAAgDAAA0QQAIA8AAMgEACARAADLBAAgEwAAzAQAIBUAAM0EACAXAADPBAAgGAAA0AQAIB4AAPMHACCUAgEAxAQAIZUCQADFBAAhlwIAAMYElwIimAIBAMcEACGZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIZ0CAQDHBAAhngIBAMQEACGfAgEAxAQAIRQEAADJBAAgCAAAygQAIAwAANEEACAPAADIBAAgEQAAywQAIBMAAMwEACAVAADNBAAgFwAAzwQAIBgAANAEACCUAgEAxAQAIZUCQADFBAAhlwIAAMYElwIimAIBAMcEACGZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIZ0CAQDHBAAhngIBAMQEACGfAgEAxAQAIQkQAACfBgAgEwAAvgYAIBQAAJ4GACCUAgEAAAABmQJAAAAAAZoCQAAAAAHLAgEAAAABzAIgAAAAAeMCAQAAAAECAAAAHQAgJQAA9AcAIAMAAAAbACAlAAD0BwAgJgAA-AcAIAsAAAAbACAQAACvBQAgEwAArwYAIBQAAK4FACAeAAD4BwAglAIBAMQEACGZAkAAxQQAIZoCQADFBAAhywIBAMcEACHMAiAA2QQAIeMCAQDEBAAhCRAAAK8FACATAACvBgAgFAAArgUAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIcsCAQDHBAAhzAIgANkEACHjAgEAxAQAIROUAgEAAAABlQJAAAAAAZcCAAAA1QICmQJAAAAAAZoCQAAAAAGbAgEAAAABuQIgAAAAAbwCgAAAAAHLAgEAAAABzgIBAAAAAdMCAAAA0wIC1QJAAAAAAdYCQAAAAAHXAgIAAAAB2AJAAAAAAdkCQAAAAAHaAgEAAAAB2wJAAAAAAdwCAQAAAAEKlAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAETBAAA3QYAIAgAAN4GACCUAgEAAAABlwIAAAC4AgKZAkAAAAABmgJAAAAAAasCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAAAABsAIBAAAAAbECAQAAAAGzAgAAALMCArQCIAAAAAG2AgAAALYCArgCIAAAAAG5AiAAAAABugJAAAAAAQIAAAD0AgAgJQAA-wcAIAMAAAD3AgAgJQAA-wcAICYAAP8HACAVAAAA9wIAIAQAAIwFACAIAACNBQAgHgAA_wcAIJQCAQDEBAAhlwIAAIsFuAIimQJAAMUEACGaAkAAxQQAIasCAQDEBAAhrAIBAMQEACGtAgEAxwQAIa4CAQDHBAAhrwIBAMcEACGwAgEAxwQAIbECAQDHBAAhswIAAIkFswIitAIgANkEACG2AgAAigW2AiK4AiAA2QQAIbkCIADZBAAhugJAANcEACETBAAAjAUAIAgAAI0FACCUAgEAxAQAIZcCAACLBbgCIpkCQADFBAAhmgJAAMUEACGrAgEAxAQAIawCAQDEBAAhrQIBAMcEACGuAgEAxwQAIa8CAQDHBAAhsAIBAMcEACGxAgEAxwQAIbMCAACJBbMCIrQCIADZBAAhtgIAAIoFtgIiuAIgANkEACG5AiAA2QQAIboCQADXBAAhCQ4AALkHACCUAgEAAAABmQJAAAAAAZoCQAAAAAGrAgEAAAABygIBAAAAAcsCAQAAAAHMAiAAAAAB1wICAAAAAQIAAAB3ACAlAACACAAgCgMAAJsHACASAADcBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAcMCAQAAAAECAAAAkAEAICUAAIIIACADAAAAegAgJQAAgAgAICYAAIYIACALAAAAegAgDgAApQcAIB4AAIYIACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACGrAgEAxAQAIcoCAQDHBAAhywIBAMcEACHMAiAA2QQAIdcCAgDEBQAhCQ4AAKUHACCUAgEAxAQAIZkCQADFBAAhmgJAAMUEACGrAgEAxAQAIcoCAQDHBAAhywIBAMcEACHMAiAA2QQAIdcCAgDEBQAhAwAAAAcAICUAAIIIACAmAACJCAAgDAAAAAcAIAMAAJoHACASAADGBgAgHgAAiQgAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAHDAgEAxAQAIQoDAACaBwAgEgAAxgYAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAHDAgEAxAQAIROUAgEAAAABlQJAAAAAAZcCAAAA1QICmQJAAAAAAZoCQAAAAAGcAgEAAAABuQIgAAAAAbwCgAAAAAHLAgEAAAABzgIBAAAAAdMCAAAA0wIC1QJAAAAAAdYCQAAAAAHXAgIAAAAB2AJAAAAAAdkCQAAAAAHaAgEAAAAB2wJAAAAAAdwCAQAAAAETBAAA3QYAIBMAAN8GACCUAgEAAAABlwIAAAC4AgKZAkAAAAABmgJAAAAAAasCAQAAAAGsAgEAAAABrQIBAAAAAa4CAQAAAAGvAgEAAAABsAIBAAAAAbECAQAAAAGzAgAAALMCArQCIAAAAAG2AgAAALYCArgCIAAAAAG5AiAAAAABugJAAAAAAQIAAAD0AgAgJQAAiwgAIAkFAAC4BwAglAIBAAAAAZkCQAAAAAGaAkAAAAABqwIBAAAAAcoCAQAAAAHLAgEAAAABzAIgAAAAAdcCAgAAAAECAAAAdwAgJQAAjQgAIAMAAAB6ACAlAACNCAAgJgAAkQgAIAsAAAB6ACAFAACkBwAgHgAAkQgAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIasCAQDEBAAhygIBAMcEACHLAgEAxwQAIcwCIADZBAAh1wICAMQFACEJBQAApAcAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIasCAQDEBAAhygIBAMcEACHLAgEAxwQAIcwCIADZBAAh1wICAMQFACEJlAIBAAAAAZkCQAAAAAGaAkAAAAABzAIgAAAAAd0CQAAAAAHeAkAAAAAB-wIAAAD7AgL8AgIAAAAB_QJAAAAAAQqUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGeAgEAAAABnwIBAAAAARQEAAD9BAAgCAAA_gQAIA8AAPwEACARAAD_BAAgEwAAgAUAIBUAAIEFACAWAACCBQAgFwAAgwUAIBgAAIQFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAAlAgAIAMAAAAfACAlAACUCAAgJgAAmAgAIBYAAAAfACAEAADJBAAgCAAAygQAIA8AAMgEACARAADLBAAgEwAAzAQAIBUAAM0EACAWAADOBAAgFwAAzwQAIBgAANAEACAeAACYCAAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACEUBAAAyQQAIAgAAMoEACAPAADIBAAgEQAAywQAIBMAAMwEACAVAADNBAAgFgAAzgQAIBcAAM8EACAYAADQBAAglAIBAMQEACGVAkAAxQQAIZcCAADGBJcCIpgCAQDHBAAhmQJAAMUEACGaAkAAxQQAIZsCAQDEBAAhnAIBAMQEACGdAgEAxwQAIZ4CAQDEBAAhnwIBAMQEACEMlAIBAAAAAZUCQAAAAAGXAgAAAOICApkCQAAAAAGaAkAAAAABugJAAAAAAdECAQAAAAHdAkAAAAAB3gJAAAAAAd8CQAAAAAHgAkAAAAAB4gIgAAAAAQMAAAD3AgAgJQAAiwgAICYAAJwIACAVAAAA9wIAIAQAAIwFACATAACOBQAgHgAAnAgAIJQCAQDEBAAhlwIAAIsFuAIimQJAAMUEACGaAkAAxQQAIasCAQDEBAAhrAIBAMQEACGtAgEAxwQAIa4CAQDHBAAhrwIBAMcEACGwAgEAxwQAIbECAQDHBAAhswIAAIkFswIitAIgANkEACG2AgAAigW2AiK4AiAA2QQAIbkCIADZBAAhugJAANcEACETBAAAjAUAIBMAAI4FACCUAgEAxAQAIZcCAACLBbgCIpkCQADFBAAhmgJAAMUEACGrAgEAxAQAIawCAQDEBAAhrQIBAMcEACGuAgEAxwQAIa8CAQDHBAAhsAIBAMcEACGxAgEAxwQAIbMCAACJBbMCIrQCIADZBAAhtgIAAIoFtgIiuAIgANkEACG5AiAA2QQAIboCQADXBAAhCpQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAGfAgEAAAABCpQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGbAgEAAAABnAIBAAAAAZ0CAQAAAAGeAgEAAAABDwMAALwGACAPAACgBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb4CAQAAAAHDAgEAAAAB3AIBAAAAAfMCAAAA8wIC9AIBAAAAAfUCQAAAAAECAAAABQAgJQAAnwgAIBcEAACZBgAgBgAAmgYAIA8AANoGACCUAgEAAAABlQJAAAAAAZcCAAAA1QICmQJAAAAAAZoCQAAAAAGbAgEAAAABnAIBAAAAAbkCIAAAAAG8AoAAAAABywIBAAAAAc4CAQAAAAHTAgAAANMCAtUCQAAAAAHWAkAAAAAB1wICAAAAAdgCQAAAAAHZAkAAAAAB2gIBAAAAAdsCQAAAAAHcAgEAAAABAgAAAAsAICUAAKEIACATAwAAgAYAIAcAAP4FACAJAAD_BQAgCgAAvwYAIAwAAIIGACCUAgEAAAABlwIAAADBAgKZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAG9AgEAAAABvgIBAAAAAb8CIAAAAAHBAggAAAABwgICAAAAAcMCAQAAAAECAAAAFAAgJQAAowgAIAoDAACbBwAgEQAA2wYAIJQCAQAAAAGZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAHDAgEAAAABAgAAAJABACAlAAClCAAgCQUAAJ0GACATAAC-BgAgFAAAngYAIJQCAQAAAAGZAkAAAAABmgJAAAAAAcsCAQAAAAHMAiAAAAAB4wIBAAAAAQIAAAAdACAlAACnCAAgCJQCAQAAAAGZAkAAAAABmgJAAAAAAboCQAAAAAHLAgEAAAABzQIgAAAAAfsCAAAAgAMC_gKAAAAAARMDAACABgAgBwAA_gUAIAkAAP8FACAKAAC_BgAgCwAAgQYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAACqCAAgAwAAABIAICUAAKoIACAmAACuCAAgFQAAABIAIAMAAMgFACAHAADGBQAgCQAAxwUAIAoAAKcGACALAADJBQAgHgAArggAIJQCAQDEBAAhlwIAAMIFwQIimQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAG9AgEAxwQAIb4CAQDHBAAhvwIgANkEACHBAggAwwUAIcICAgDEBQAhwwIBAMQEACETAwAAyAUAIAcAAMYFACAJAADHBQAgCgAApwYAIAsAAMkFACCUAgEAxAQAIZcCAADCBcECIpkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABvQIBAMcEACG-AgEAxwQAIb8CIADZBAAhwQIIAMMFACHCAgIAxAUAIcMCAQDEBAAhAwAAAAMAICUAAJ8IACAmAACxCAAgEQAAAAMAIAMAALoGACAPAACVBQAgHgAAsQgAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxAQAIbwCgAAAAAG-AgEAxAQAIcMCAQDEBAAh3AIBAMcEACHzAgAAlAXzAiL0AgEAxwQAIfUCQADXBAAhDwMAALoGACAPAACVBQAglAIBAMQEACGZAkAAxQQAIZoCQADFBAAhuQIgANkEACG6AkAA1wQAIbsCAQDEBAAhvAKAAAAAAb4CAQDEBAAhwwIBAMQEACHcAgEAxwQAIfMCAACUBfMCIvQCAQDHBAAh9QJAANcEACEDAAAACQAgJQAAoQgAICYAALQIACAZAAAACQAgBAAAkAYAIAYAAJEGACAPAADYBgAgHgAAtAgAIJQCAQDEBAAhlQJAAMUEACGXAgAAjgbVAiKZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIbkCIADZBAAhvAKAAAAAAcsCAQDHBAAhzgIBAMQEACHTAgAAjQbTAiLVAkAA1wQAIdYCQADXBAAh1wICAO0FACHYAkAA1wQAIdkCQADXBAAh2gIBAMcEACHbAkAA1wQAIdwCAQDHBAAhFwQAAJAGACAGAACRBgAgDwAA2AYAIJQCAQDEBAAhlQJAAMUEACGXAgAAjgbVAiKZAkAAxQQAIZoCQADFBAAhmwIBAMQEACGcAgEAxAQAIbkCIADZBAAhvAKAAAAAAcsCAQDHBAAhzgIBAMQEACHTAgAAjQbTAiLVAkAA1wQAIdYCQADXBAAh1wICAO0FACHYAkAA1wQAIdkCQADXBAAh2gIBAMcEACHbAkAA1wQAIdwCAQDHBAAhAwAAABIAICUAAKMIACAmAAC3CAAgFQAAABIAIAMAAMgFACAHAADGBQAgCQAAxwUAIAoAAKcGACAMAADKBQAgHgAAtwgAIJQCAQDEBAAhlwIAAMIFwQIimQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAG9AgEAxwQAIb4CAQDHBAAhvwIgANkEACHBAggAwwUAIcICAgDEBQAhwwIBAMQEACETAwAAyAUAIAcAAMYFACAJAADHBQAgCgAApwYAIAwAAMoFACCUAgEAxAQAIZcCAADCBcECIpkCQADFBAAhmgJAAMUEACG5AiAA2QQAIboCQADXBAAhuwIBAMcEACG8AoAAAAABvQIBAMcEACG-AgEAxwQAIb8CIADZBAAhwQIIAMMFACHCAgIAxAUAIcMCAQDEBAAhAwAAAAcAICUAAKUIACAmAAC6CAAgDAAAAAcAIAMAAJoHACARAADFBgAgHgAAuggAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAHDAgEAxAQAIQoDAACaBwAgEQAAxQYAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIbkCIADZBAAhugJAANcEACG7AgEAxwQAIbwCgAAAAAHDAgEAxAQAIQMAAAAbACAlAACnCAAgJgAAvQgAIAsAAAAbACAFAACtBQAgEwAArwYAIBQAAK4FACAeAAC9CAAglAIBAMQEACGZAkAAxQQAIZoCQADFBAAhywIBAMcEACHMAiAA2QQAIeMCAQDEBAAhCQUAAK0FACATAACvBgAgFAAArgUAIJQCAQDEBAAhmQJAAMUEACGaAkAAxQQAIcsCAQDHBAAhzAIgANkEACHjAgEAxAQAIQELAAILBAAGCEAKDEoMDQAWDwADEQAHEwAEFUMBFkUTF0cUGEkVBQU5Bw0AEhA7AhMGBBQ6CgQDAAULNgINABEPNQMDBAgGCDMKEzQEBAMABQ0AEBEMBxIwAgQEAAYGAAgPAAMQLwIDBQ0HDQAPDhEJAwYACAgVCg0ADgcDAAUHFgkJGgsKHgMLIgIMJgwNAA0BCAAKAggACgsAAgUHJwAJKAAKKQALKgAMKwABCCwAAgUtAA4uAAIRMQASMgACCzgADzcABAU9ABA_ABM8ABQ-AAELAAIBCwACAQsAAgEVSwAAAQsAAgELAAIDDQAbKwAcLAAdAAAAAw0AGysAHCwAHQEIAAoBCAAKBQ0AIisAJSwAJj0AIz4AJAAAAAAABQ0AIisAJSwAJj0AIz4AJAAABQ0AKysALiwALz0ALD4ALQAAAAAABQ0AKysALiwALz0ALD4ALQEDAAUBAwAFAw0ANCsANSwANgAAAAMNADQrADUsADYBCwACAQsAAgUNADsrAD4sAD89ADw-AD0AAAAAAAUNADsrAD4sAD89ADw-AD0BAwAFAQMABQMNAEQrAEUsAEYAAAADDQBEKwBFLABGAQsAAgELAAIFDQBLKwBOLABPPQBMPgBNAAAAAAAFDQBLKwBOLABPPQBMPgBNAAADDQBUKwBVLABWAAAAAw0AVCsAVSwAVgIIAAoLAAICCAAKCwACAw0AWysAXCwAXQAAAAMNAFsrAFwsAF0DBAAGBgAIDwADAwQABgYACA8AAwUNAGIrAGUsAGY9AGM-AGQAAAAAAAUNAGIrAGUsAGY9AGM-AGQBCwACAQsAAgMNAGsrAGwsAG0AAAADDQBrKwBsLABtAQYACAEGAAgDDQByKwBzLAB0AAAAAw0AcisAcywAdAEDAAUBAwAFBQ0AeSsAfCwAfT0Aej4AewAAAAAABQ0AeSsAfCwAfT0Aej4AewAAAw0AggErAIMBLACEAQAAAAMNAIIBKwCDASwAhAEFBAAGCJcDCg8AAxEABxMABAUEAAYInQMKDwADEQAHEwAEAw0AiQErAIoBLACLAQAAAAMNAIkBKwCKASwAiwEZAgEaTAEbTQEcTgEdTwEfUQEgUxchVBgiVgEjWBckWRknWgEoWwEpXBctXxouYB4vYQswYgsxYwsyZAszZQs0Zws1aRc2ah83bAs4bhc5byA6cAs7cQs8chc_dSFAdidBeAhCeQhDfAhEfQhFfghGgAEIR4IBF0iDAShJhQEISocBF0uIASlMiQEITYoBCE6LARdPjgEqUI8BMFGRAQZSkgEGU5QBBlSVAQZVlgEGVpgBBleaARdYmwExWZ0BBlqfARdboAEyXKEBBl2iAQZeowEXX6YBM2CnATdhqQEUYqoBFGOsARRkrQEUZa4BFGawARRnsgEXaLMBOGm1ARRqtwEXa7gBOWy5ARRtugEUbrsBF2--ATpwvwFAccABBHLBAQRzwgEEdMMBBHXEAQR2xgEEd8gBF3jJAUF5ywEEes0BF3vOAUJ8zwEEfdABBH7RARd_1AFDgAHVAUeBAdcBFYIB2AEVgwHaARWEAdsBFYUB3AEVhgHeARWHAeABF4gB4QFIiQHjARWKAeUBF4sB5gFJjAHnARWNAegBFY4B6QEXjwHsAUqQAe0BUJEB7gEDkgHvAQOTAfABA5QB8QEDlQHyAQOWAfQBA5cB9gEXmAH3AVGZAfkBA5oB-wEXmwH8AVKcAf0BA50B_gEDngH_ARefAYICU6ABgwJXoQGEAgyiAYUCDKMBhgIMpAGHAgylAYgCDKYBigIMpwGMAheoAY0CWKkBjwIMqgGRAherAZICWawBkwIMrQGUAgyuAZUCF68BmAJasAGZAl6xAZoCB7IBmwIHswGcAge0AZ0CB7UBngIHtgGgAge3AaICF7gBowJfuQGlAge6AacCF7sBqAJgvAGpAge9AaoCB74BqwIXvwGuAmHAAa8CZ8EBsQITwgGyAhPDAbQCE8QBtQITxQG2AhPGAbgCE8cBugIXyAG7AmjJAb0CE8oBvwIXywHAAmnMAcECE80BwgITzgHDAhfPAcYCatABxwJu0QHIAgnSAckCCdMBygIJ1AHLAgnVAcwCCdYBzgIJ1wHQAhfYAdECb9kB0wIJ2gHVAhfbAdYCcNwB1wIJ3QHYAgneAdkCF98B3AJx4AHdAnXhAd4CCuIB3wIK4wHgAgrkAeECCuUB4gIK5gHkAgrnAeYCF-gB5wJ26QHpAgrqAesCF-sB7AJ37AHtAgrtAe4CCu4B7wIX7wHyAnjwAfMCfvEB9QIF8gH2AgXzAfkCBfQB-gIF9QH7AgX2Af0CBfcB_wIX-AGAA3_5AYIDBfoBhAMX-wGFA4AB_AGGAwX9AYcDBf4BiAMX_wGLA4EBgAKMA4UBgQKNAwKCAo4DAoMCjwMChAKQAwKFApEDAoYCkwMChwKVAxeIApYDhgGJApkDAooCmwMXiwKcA4cBjAKeAwKNAp8DAo4CoAMXjwKjA4gBkAKkA4wB"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  AttachmentScalarFieldEnum: () => AttachmentScalarFieldEnum,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  CustomerProfileScalarFieldEnum: () => CustomerProfileScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  FeedbackScalarFieldEnum: () => FeedbackScalarFieldEnum,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  JsonNullValueInput: () => JsonNullValueInput,
  ManagerProfileScalarFieldEnum: () => ManagerProfileScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  RegionScalarFieldEnum: () => RegionScalarFieldEnum,
  ScheduleScalarFieldEnum: () => ScheduleScalarFieldEnum,
  ServiceReportScalarFieldEnum: () => ServiceReportScalarFieldEnum,
  ServiceScalarFieldEnum: () => ServiceScalarFieldEnum,
  SkillScalarFieldEnum: () => SkillScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TechnicianProfileScalarFieldEnum: () => TechnicianProfileScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  WorkOrderScalarFieldEnum: () => WorkOrderScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.9.1",
  engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Attachment: "Attachment",
  Availability: "Availability",
  Category: "Category",
  CustomerProfile: "CustomerProfile",
  Feedback: "Feedback",
  ManagerProfile: "ManagerProfile",
  Payment: "Payment",
  Region: "Region",
  Schedule: "Schedule",
  Service: "Service",
  ServiceReport: "ServiceReport",
  Skill: "Skill",
  TechnicianProfile: "TechnicianProfile",
  User: "User",
  WorkOrder: "WorkOrder"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var AttachmentScalarFieldEnum = {
  id: "id",
  files: "files",
  description: "description",
  type: "type",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  workOrderId: "workOrderId"
};
var AvailabilityScalarFieldEnum = {
  id: "id",
  type: "type",
  dayOfWeek: "dayOfWeek",
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  technicianId: "technicianId"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  icon: "icon",
  description: "description",
  isActive: "isActive",
  duration: "duration",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CustomerProfileScalarFieldEnum = {
  id: "id",
  phone: "phone",
  address: "address",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId"
};
var FeedbackScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  workOrderId: "workOrderId"
};
var ManagerProfileScalarFieldEnum = {
  id: "id",
  phone: "phone",
  address: "address",
  nid: "nid",
  verificationStatus: "verificationStatus",
  rejectionReason: "rejectionReason",
  reviewdBy: "reviewdBy",
  reviewdAt: "reviewdAt",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId"
};
var PaymentScalarFieldEnum = {
  id: "id",
  paymentId: "paymentId",
  amount: "amount",
  method: "method",
  transectionId: "transectionId",
  status: "status",
  paidAt: "paidAt",
  payerReference: "payerReference",
  currency: "currency",
  merchantInvoiceNumber: "merchantInvoiceNumber",
  getwayResponse: "getwayResponse",
  refundTrxId: "refundTrxId",
  refundAmount: "refundAmount",
  refundedAt: "refundedAt",
  reason: "reason",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  workOrderId: "workOrderId"
};
var RegionScalarFieldEnum = {
  id: "id",
  area: "area",
  description: "description",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ScheduleScalarFieldEnum = {
  id: "id",
  servicingDate: "servicingDate",
  startTime: "startTime",
  endTime: "endTime",
  actualStart: "actualStart",
  actualEnd: "actualEnd",
  status: "status",
  isdeleted: "isdeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  technicianId: "technicianId",
  workOrderId: "workOrderId"
};
var ServiceScalarFieldEnum = {
  id: "id",
  description: "description",
  priority: "priority",
  status: "status",
  address: "address",
  servicingDate: "servicingDate",
  preferredStartTime: "preferredStartTime",
  preferredEndTime: "preferredEndTime",
  duration: "duration",
  isDeleted: "isDeleted",
  isDeletedAt: "isDeletedAt",
  assignedAt: "assignedAt",
  reviewedBy: "reviewedBy",
  reviewedAt: "reviewedAt",
  rejectionReason: "rejectionReason",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  customerId: "customerId",
  categoryId: "categoryId",
  regionId: "regionId"
};
var ServiceReportScalarFieldEnum = {
  id: "id",
  reportUrl: "reportUrl",
  reportPublicId: "reportPublicId",
  description: "description",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  workOrderId: "workOrderId"
};
var SkillScalarFieldEnum = {
  id: "id",
  name: "name",
  icon: "icon",
  description: "description",
  isActive: "isActive",
  isDelete: "isDelete",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  categoryId: "categoryId"
};
var TechnicianProfileScalarFieldEnum = {
  id: "id",
  phone: "phone",
  address: "address",
  bio: "bio",
  nid: "nid",
  isProfileCompleted: "isProfileCompleted",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  status: "status",
  rating: "rating",
  jobsCompleted: "jobsCompleted",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  profileImg: "profileImg",
  profileImgPublicId: "profileImgPublicId",
  googleId: "googleId",
  facebookId: "facebookId",
  authProvider: "authProvider",
  emailVerified: "emailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var WorkOrderScalarFieldEnum = {
  id: "id",
  servicingDate: "servicingDate",
  status: "status",
  note: "note",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  regionId: "regionId",
  customerId: "customerId",
  technicianId: "technicianId",
  serviceId: "serviceId",
  managerId: "managerId"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var JsonNullValueInput = {
  JsonNull: JsonNull2
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  TECHNICIAN: "TECHNICIAN",
  MANAGER: "MANAGER"
};
var AuthProvider = {
  CREDENTIAL: "CREDENTIAL",
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};
var ServiceStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  ASSIGNED: "ASSIGNED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
var WorkOrderStatus = {
  SCHEDULED: "SCHEDULED",
  EN_ROUTE: "EN_ROUTE",
  STARTED: "STARTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};
var PaymentStatus = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED"
};
var ManagerVerificationStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/utils/appError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, _req, res, _next) => {
  console.log("Error from Global Error Handler", err);
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message, statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: env_default.node_env === "development" ? err : void 0,
    stack: env_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/middleware/notFound.ts
import httpStatus2 from "http-status";
var notFound = (req, res) => {
  res.status(httpStatus2.NOT_FOUND).json({
    message: "Route not found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app/module/auth/auth.route.ts
import { Router } from "express";

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/module/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/app/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/module/auth/auth.service.ts
import httpStatus3 from "http-status";
import crypto from "crypto";

// src/app/lib/redis.ts
import { createClient } from "redis";
var redisClient = createClient({
  username: env_default.radis_name,
  password: env_default.radis_password,
  socket: {
    host: env_default.radis_host,
    port: Number(env_default.radis_port)
  }
});

// src/app/module/auth/auth.service.ts
import path3 from "path";
import ejs from "ejs";

// src/app/lib/nodemailer.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env_default.smtp_user,
    pass: env_default.smtp_password
  }
});

// src/app/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/module/auth/auth.service.ts
var roleProfileMap = {
  CUSTOMER: "customer",
  TECHNICIAN: "technician"
};
var registerOTP = async (payload) => {
  const { name, password, role } = payload;
  const email = payload.email.trim().toLowerCase();
  const isUserExists = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExists) {
    throw new AppError(
      httpStatus3.CONFLICT,
      "User with this email already exists"
    );
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(env_default.bcrypt_salt_rounds)
  );
  const expirationTime = 5 * 60;
  const otp = crypto.randomInt(1e5, 1e6);
  const otpKey = `register-otp: ${email}`;
  await redisClient.set(otpKey, otp, {
    expiration: {
      type: "EX",
      value: expirationTime
    }
  });
  const registerKey = `register-data: ${email}`;
  const registerValue = {
    name,
    email,
    password: hashedPassword,
    role
  };
  await redisClient.set(registerKey, JSON.stringify(registerValue), {
    expiration: {
      type: "EX",
      value: expirationTime
    }
  });
  const templatePath = path3.join(
    process.cwd(),
    "src/app/template/verification-otp.ejs"
  );
  const templateData = {
    name,
    otp,
    expire: expirationTime / 60,
    appName: env_default.app_name
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: email,
    subject: "Email Verification",
    html
  });
};
var verifyEmail = async (payload) => {
  const { email, otp } = payload;
  const registerKey = `register-data: ${email}`;
  const redisData = await redisClient.get(registerKey);
  const otpKey = `register-otp: ${email}`;
  const redisOTP = await redisClient.get(otpKey);
  if (!redisData || !redisOTP) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Invalid Data from redis!");
  }
  const payloadData = JSON.parse(redisData);
  if (payloadData.email !== email) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Invalid email");
  }
  if (redisOTP !== otp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "OTP does not match!");
  }
  const isUser = await prisma.user.findUnique({
    where: { email }
  });
  if (isUser) {
    throw new AppError(httpStatus3.CONFLICT, "Email alredy exist");
  }
  const profileKey = roleProfileMap[payloadData.role];
  const userCreated = await prisma.user.create({
    data: {
      name: payloadData.name,
      email: payloadData.email,
      password: payloadData.password,
      role: payloadData.role,
      emailVerified: true,
      status: "ACTIVE",
      [profileKey]: {
        create: {}
      }
    },
    omit: {
      password: true
    },
    include: {
      [profileKey]: true
    }
  });
  const templateData = {
    name: payloadData.name,
    appName: env_default.app_name
  };
  const html = await ejs.renderFile(
    path3.join(process.cwd(), "src/app/template/welcome.ejs"),
    templateData
  );
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: payloadData.email,
    subject: `Welcome to ${env_default.app_name}`,
    html
  });
  await redisClient.del([otpKey, registerKey]);
  const jwtPayload = {
    userId: userCreated.id,
    name: userCreated.name,
    email: userCreated.email,
    role: userCreated.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3,
    userCreated
  };
};
var loginUser = async (payload) => {
  const { password } = payload;
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(httpStatus3.NOT_FOUND, "User not found");
  }
  if (user.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is blocked");
  }
  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is deleted");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus3.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var getMe = async (user) => {
  const dynamicInclude = {};
  const userRoleLower = user.role?.toLowerCase();
  if (userRoleLower && ["customer", "technician", "manager"].includes(userRoleLower)) {
    dynamicInclude[userRoleLower] = true;
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: dynamicInclude,
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(httpStatus3.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    env_default.jwt_refresh_secret
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      httpStatus3.UNAUTHORIZED,
      env_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token"
    );
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new AppError(
      httpStatus3.UNAUTHORIZED,
      "User is inactive or not found"
    );
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var forgotPassword = async (payload) => {
  const { email } = payload;
  const isExistUser = await prisma.user.findUnique({
    where: { email }
  });
  if (!isExistUser) {
    throw new AppError(httpStatus3.NOT_FOUND, "User does not exist");
  }
  if (isExistUser.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User thas temporary blocked");
  }
  if (isExistUser.status === UserStatus.DELETED) {
    throw new AppError(httpStatus3.FORBIDDEN, "user has deleted");
  }
  const otp = crypto.randomInt(1e5, 1e6).toString();
  const expirationTime = 5 * 60;
  const key = `forgot-password-otp: ${isExistUser.email}`;
  await redisClient.set(key, otp, {
    expiration: {
      type: "EX",
      value: expirationTime
    }
  });
  const templatePath = path3.join(
    process.cwd(),
    "src/app/template/forgot-password-otp.ejs"
  );
  const templateData = {
    name: isExistUser.name,
    otp,
    expire: expirationTime / 60,
    appName: env_default.app_name
  };
  const html = await ejs.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: isExistUser.email,
    subject: "Forgot Password OTP",
    html
  });
};
var resetPassword = async (payload) => {
  const { email, otp, newPassword } = payload;
  const isExistUser = await prisma.user.findUnique({
    where: { email }
  });
  if (!isExistUser) {
    throw new AppError(httpStatus3.NOT_FOUND, "User does not exist");
  }
  if (isExistUser.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User thas temporary blocked");
  }
  if (isExistUser.status === UserStatus.DELETED) {
    throw new AppError(httpStatus3.FORBIDDEN, "user has deleted");
  }
  const key = `forgot-password-otp: ${isExistUser.email}`;
  const redisOTP = await redisClient.get(key);
  if (!redisOTP) {
    throw new AppError(httpStatus3.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOTP !== otp) {
    throw new AppError(httpStatus3.BAD_REQUEST, "OTP does not match");
  }
  const hashPass = await bcrypt.hash(
    newPassword,
    Number(env_default.bcrypt_salt_rounds)
  );
  await prisma.user.update({
    where: { email },
    data: {
      password: hashPass
    }
  });
  const templateData = {
    name: isExistUser.name,
    appName: env_default.app_name
  };
  const html = await ejs.renderFile(
    path3.join(process.cwd(), "src/app/template/reset-password.ejs"),
    templateData
  );
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: isExistUser.email,
    subject: "Reset Password",
    html
  });
  await redisClient.del(key);
};
var AuthService = {
  registerOTP,
  verifyEmail,
  loginUser,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword
};

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/app/module/auth/auth.controller.ts
import httpStatus4 from "http-status";
var registerOTP2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.registerOTP(payload);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Register  OTP send successfully",
    data: null
  });
});
var verifyEmail2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.verifyEmail(payload);
  const { accessToken, refreshToken: refreshToken3, userCreated } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.CREATED,
    success: true,
    message: "User created successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3,
      userCreated
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(
      httpStatus4.UNAUTHORIZED,
      "User information is missing in the request"
    );
  }
  const result = await AuthService.getMe(user);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(httpStatus4.UNAUTHORIZED, "Refresh token is missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
    // 24 hour or 1 day
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
    // 7 days
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var forgotPassword2 = catchAsync(async (req, res) => {
  const body = req.body;
  await AuthService.forgotPassword(body);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: `OTP send successfully email: ${body.email}`,
    data: null
  });
});
var resetPassword2 = catchAsync(async (req, res) => {
  const body = req.body;
  await AuthService.resetPassword(body);
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Password reset successfully",
    data: null
  });
});
var googleLogin = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(
      httpStatus4.INTERNAL_SERVER_ERROR,
      "Something Went wrong"
    );
  }
  const jwtPayload = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Google login successful",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var facebookLogin = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(
      httpStatus4.INTERNAL_SERVER_ERROR,
      "something went wrong"
    );
  }
  const jwtPayload = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_access_secret,
    env_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    env_default.jwt_refresh_secret,
    env_default.jwt_refresh_expires_in
  );
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: env_default.node_env === "production",
    sameSite: env_default.node_env === "production" ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "Facebook login successful",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var logout = catchAsync(async (req, res) => {
  const user = req.user;
  res.clearCookie("accessToken", {
    path: "/",
    secure: true,
    sameSite: "strict"
  });
  res.clearCookie("refreshToken", {
    path: "/",
    secure: true,
    sameSite: "strict"
  });
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "logout successfully successful",
    data: null
  });
});
var authController = {
  registerOTP: registerOTP2,
  verifyEmail: verifyEmail2,
  loginUser: loginUser2,
  getMe: getMe2,
  refreshToken: refreshToken2,
  forgotPassword: forgotPassword2,
  resetPassword: resetPassword2,
  googleLogin,
  facebookLogin,
  logout
};

// src/app/middleware/zodValidation.ts
import httpStatus5 from "http-status";
var zodValidation = (zodSchema) => {
  return catchAsync((req, res, next) => {
    const payload = zodSchema.safeParse(req.body);
    if (!payload.success) {
      console.log(payload.error.issues);
      throw new AppError(
        httpStatus5.BAD_REQUEST,
        payload.error.issues[0].message
      );
    }
    req.body = payload.data;
    next();
  });
};

// src/app/module/auth/auth.validation.ts
import z from "zod";
var CustomerRegisterZodSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
  password: z.string().min(8).max(40).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter."
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter."
  }).regex(/[0-9]/, { message: "Password must contain at least one number." }).regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character."
  })
});
var loginZodSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(40).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter."
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter."
  }).regex(/[0-9]/, { message: "Password must contain at least one number." }).regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character."
  })
});
var forgotPasswordZodSchema = z.object({
  email: z.email()
});
var resetPasswordZodSchema = z.object({
  email: z.email(),
  newPassword: z.string().min(8).max(40).regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter."
  }).regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter."
  }).regex(/[0-9]/, { message: "Password must contain at least one number." }).regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character."
  }),
  otp: z.string().length(6, { message: "OTP must be 6 digits long." })
});

// src/app/middleware/auth.ts
import httpStatus6 from "http-status";
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus6.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, env_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new AppError(httpStatus6.UNAUTHORIZED, verifiedToken.error);
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus6.FORBIDDEN,
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new AppError(
        httpStatus6.UNAUTHORIZED,
        "User not found. Please log in again."
      );
    }
    if (user.status === "BLOCKED") {
      throw new AppError(
        httpStatus6.FORBIDDEN,
        "Your account has been blocked. Please contact support."
      );
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/app/module/auth/auth.route.ts
import passport from "passport";
var route = Router();
route.post(
  "/register",
  zodValidation(CustomerRegisterZodSchema),
  authController.registerOTP
);
route.post("/email-verify", authController.verifyEmail);
route.post("/login", zodValidation(loginZodSchema), authController.loginUser);
route.get(
  "/me",
  auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.SUPER_ADMIN,
    UserRole.TECHNICIAN
  ),
  authController.getMe
);
route.post("/refresh-token", authController.refreshToken);
route.post(
  "/forgot-password",
  zodValidation(forgotPasswordZodSchema),
  authController.forgotPassword
);
route.post(
  "/reset-password",
  zodValidation(resetPasswordZodSchema),
  authController.resetPassword
);
route.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);
route.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleLogin
);
route.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"]
  })
);
route.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  authController.facebookLogin
);
route.get(
  "/logout",
  auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.SUPER_ADMIN,
    UserRole.TECHNICIAN
  ),
  authController.logout
);
var authRouter = route;

// src/app/lib/passport.ts
import passport2 from "passport";
import {
  Strategy as GoogleStrategy
} from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
passport2.use(
  new GoogleStrategy(
    {
      clientID: env_default.google_client_id,
      clientSecret: env_default.google_client_secret,
      callbackURL: env_default.google_callback_uri
    },
    async (accessToken, refreshToken3, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, {
            message: "email not found from google."
          });
        }
        let user = await prisma.user.findUnique({
          where: { email }
        });
        if (user) {
          if (user.status === "DELETED") {
            return done(null, false, {
              message: "user deleted"
            });
          }
          if (user.status === "BLOCKED") {
            return done(null, false, {
              message: "user temporary blocked. please contact administration"
            });
          }
          user = await prisma.user.update({
            where: { email },
            data: {
              googleId: profile.id,
              emailVerified: true
            }
          });
        } else if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              emailVerified: true,
              authProvider: "GOOGLE",
              googleId: profile.id,
              role: UserRole.CUSTOMER,
              customer: {
                create: {}
              }
            }
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport2.use(
  new FacebookStrategy(
    {
      clientID: env_default.facebook_app_key,
      clientSecret: env_default.facebook_app_secret,
      callbackURL: env_default.facebook_callback_url,
      profileFields: ["id", "displayName", "emails"]
    },
    async (accessToken, refreshToken3, profile, done) => {
      try {
        console.log("facebook profile", profile);
        const email = profile.emails?.[0]?.value;
        console.log("facebook email", email);
        if (!email) {
          return done(null, false, {
            message: "Facebook did not provide an email address. Please allow email permission and try again."
          });
        }
        let user = await prisma.user.findUnique({
          where: { email }
        });
        if (user) {
          if (user.status === "DELETED") {
            return done(null, false, {
              message: "user deleted"
            });
          }
          if (user.status === "BLOCKED") {
            return done(null, false, {
              message: "user temporary blocked. please contact administration"
            });
          }
          user = await prisma.user.update({
            where: { email },
            data: {
              facebookId: profile.id,
              emailVerified: true
            }
          });
        } else if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              emailVerified: true,
              authProvider: AuthProvider.FACEBOOK,
              facebookId: profile.id,
              role: UserRole.CUSTOMER,
              customer: {
                create: {}
              }
            }
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// src/app.ts
import passport3 from "passport";

// src/app/module/region/region.route.ts
import { Router as Router2 } from "express";

// src/app/module/region/region.service.ts
import httpStatus7 from "http-status";
var createRegion = async (payload, user) => {
  const { area } = payload;
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus7.NOT_FOUND, "user not found");
  }
  const isExist = await prisma.region.findUnique({
    where: {
      area
    }
  });
  if (isExist) {
    throw new AppError(httpStatus7.CONFLICT, "this region already exist");
  }
  const createArea = await prisma.region.create({
    data: {
      ...payload
    }
  });
  return createArea;
};
var getAllRegion = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus7.NOT_FOUND, "user not found");
  }
  const andCondition = [];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          area: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andCondition.push({
      isActive: query.isActive
    });
  }
  const area = await prisma.region.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.region.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    area,
    meta
  };
};
var getRegions = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const andCondition = [
    {
      isActive: true
    }
  ];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          area: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  const area = await prisma.region.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.region.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    area,
    meta
  };
};
var updateRegion = async (payload, regionId, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus7.NOT_FOUND, "user not found");
  }
  const isExist = await prisma.region.findUnique({
    where: {
      id: regionId
    }
  });
  if (!isExist) {
    throw new AppError(httpStatus7.NOT_FOUND, "this region not found");
  }
  const updateRegion3 = await prisma.region.update({
    where: {
      id: regionId
    },
    data: {
      ...payload
    }
  });
  return updateRegion3;
};
var regionService = {
  createRegion,
  getAllRegion,
  getRegions,
  updateRegion
};

// src/app/module/region/region.controller.ts
import httpStatus8 from "http-status";
var createRegion2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await regionService.createRegion(body, user);
  sendResponse(res, {
    statusCode: httpStatus8.CREATED,
    success: true,
    message: "region created successfully",
    data: result
  });
});
var getAllRegion2 = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { area, meta } = await regionService.getAllRegion(query, user);
  if (area.length === 0) {
    throw new AppError(httpStatus8.NOT_FOUND, "region not found");
  }
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "region retrive successfully",
    data: area,
    meta
  });
});
var getRegions2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { area, meta } = await regionService.getRegions(query);
  if (area.length === 0) {
    throw new AppError(httpStatus8.NOT_FOUND, "region not found");
  }
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "region retrive successfully",
    data: area,
    meta
  });
});
var updateRegion2 = catchAsync(async (req, res) => {
  const id = req.params.regionId;
  const user = req.user;
  const body = req.body;
  const result = await regionService.updateRegion(body, id, user);
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "region updated successfully",
    data: result
  });
});
var regionController = {
  createRegion: createRegion2,
  getAllRegion: getAllRegion2,
  getRegions: getRegions2,
  updateRegion: updateRegion2
};

// src/app/module/region/region.route.ts
var route2 = Router2();
route2.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  regionController.createRegion
);
route2.get(
  "/all-region",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  regionController.getAllRegion
);
route2.get("/", regionController.getRegions);
route2.put(
  "/:regionId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  regionController.updateRegion
);
var regionRouter = route2;

// src/app/module/manager/manager.route.ts
import { Router as Router3 } from "express";

// src/app/module/manager/manager.service.ts
import httpStatus9 from "http-status";
import bcrypt2 from "bcryptjs";
import crypto2 from "crypto";
import path4 from "path";
import ejs2 from "ejs";
var applyManager = async (payload) => {
  const isManager = await prisma.user.findUnique({
    where: {
      email: payload.user.email
    }
  });
  if (isManager) {
    throw new AppError(httpStatus9.CONFLICT, "manager already exists");
  }
  const regionIds = payload.manager.region || [];
  if (regionIds.length > 0) {
    const existingRegions = await prisma.region.findMany({
      where: { id: { in: regionIds } },
      select: { id: true }
    });
    const existingIds = existingRegions.map((r) => r.id);
    const invalidIds = regionIds.filter((id) => !existingIds.includes(id));
    if (invalidIds.length > 0) {
      throw new AppError(
        httpStatus9.BAD_REQUEST,
        `Invalid region ID(s): ${invalidIds.join(", ")}. These regions do not exist.`
      );
    }
  }
  const randomPass = Math.random().toString(36).slice(-8);
  console.log("random pass", randomPass);
  const hashPass = await bcrypt2.hash(
    randomPass,
    Number(env_default.bcrypt_salt_rounds)
  );
  const { region, ...managerData } = payload.manager;
  const apply = await prisma.user.create({
    data: {
      ...payload.user,
      password: hashPass,
      needPasswordChange: true,
      role: UserRole.MANAGER,
      manager: {
        create: {
          ...managerData,
          region: {
            connect: regionIds.map((id) => ({ id }))
          }
        }
      }
    },
    omit: {
      password: true
    },
    include: {
      manager: {
        include: {
          region: true
        }
      }
    }
  });
  const expirationTime = 60 * 60;
  const otpKey = `manager-otp-key: ${payload.user.email}`;
  const otp = crypto2.randomInt(99999, 1e6);
  await redisClient.set(otpKey, otp, {
    expiration: {
      type: "EX",
      value: expirationTime
    }
  });
  const templatePath = path4.join(
    process.cwd(),
    "src/app/template/verification-otp.ejs"
  );
  const templateData = {
    name: payload.user.name,
    otp,
    expire: expirationTime / 60,
    appName: env_default.app_name
  };
  const html = await ejs2.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: payload.user.email,
    subject: "Email Verification OTP",
    html
  });
  return apply;
};
var emailVerify = async (payload) => {
  const { email, otp } = payload;
  const isManager = await prisma.user.findUnique({
    where: {
      email,
      role: UserRole.MANAGER
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus9.NOT_FOUND, "Manager does not exist");
  }
  if (isManager.emailVerified) {
    throw new AppError(httpStatus9.CONFLICT, "manager's email alredy verified");
  }
  const otpKey = `manager-otp-key: ${email}`;
  const redisOTP = await redisClient.get(otpKey);
  if (!redisOTP) {
    throw new AppError(
      httpStatus9.BAD_REQUEST,
      "otp expired. please apply again"
    );
  }
  if (redisOTP !== otp) {
    throw new AppError(
      httpStatus9.BAD_REQUEST,
      "OTP mismatch. please give valid OTP"
    );
  }
  const updatedUser = await prisma.user.update({
    where: {
      email,
      role: UserRole.MANAGER
    },
    data: {
      emailVerified: true
    },
    omit: {
      password: true
    },
    include: {
      manager: {
        include: {
          region: true
        }
      }
    }
  });
  await redisClient.del(otpKey);
  return updatedUser;
};
var approveManager = async (payload, reviewer) => {
  const { email, verificationStatus, rejectionReason } = payload;
  const isManager = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      manager: true
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus9.NOT_FOUND, "Manager not found");
  }
  if (!isManager.emailVerified) {
    throw new AppError(
      httpStatus9.BAD_REQUEST,
      "Manager email not verified yet"
    );
  }
  if (isManager.isDeleted) {
    throw new AppError(httpStatus9.FORBIDDEN, "Manager is deleted");
  }
  if (isManager.manager?.verificationStatus === "APPROVED") {
    throw new AppError(httpStatus9.CONFLICT, "manager already approved");
  }
  if (isManager.manager?.verificationStatus !== "PENDING") {
    throw new AppError(
      httpStatus9.CONFLICT,
      `you can't update varification status from  '${isManager.manager?.verificationStatus.toLowerCase()}'.`
    );
  }
  if (verificationStatus === "REJECTED" && !rejectionReason) {
    throw new AppError(
      httpStatus9.BAD_REQUEST,
      "for rejection must need to rejection reason"
    );
  }
  const updateStatus2 = await prisma.managerProfile.update({
    where: {
      id: isManager.manager.id
    },
    data: {
      verificationStatus,
      rejectionReason: verificationStatus === "REJECTED" ? rejectionReason : null,
      reviewdBy: reviewer.userId,
      reviewdAt: /* @__PURE__ */ new Date()
    },
    include: {
      region: true
    }
  });
  const isApproved = updateStatus2.verificationStatus === "APPROVED";
  const templateName = isApproved ? "manager-apply-approved.ejs" : "manager-apply-rejected.ejs";
  const templatePath = path4.join(
    process.cwd(),
    `src/app/template/${templateName}`
  );
  const templateData = {
    name: isManager.name,
    reason: rejectionReason,
    // only used in the rejected template,
    appName: env_default.app_name
  };
  const html = await ejs2.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: isManager.email,
    subject: isApproved ? "Your Manager Application Has Been Approved" : "Your Manager Application Has Been Rejected",
    html
  });
  return updateStatus2;
};
var getAllManagers = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [
    {
      isDeleted: false
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          user: {
            name: {
              contains: query.search,
              mode: "insensitive"
            }
          }
        },
        {
          user: {
            email: {
              contains: query.search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (query.verificationStatus) {
    andConditions.push({
      verificationStatus: query.verificationStatus
    });
  }
  const managers = await prisma.managerProfile.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      user: {
        omit: {
          password: true
        }
      }
    }
  });
  const total = await prisma.managerProfile.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    managers,
    meta
  };
};
var managerService = {
  applyManager,
  emailVerify,
  approveManager,
  getAllManagers
};

// src/app/module/manager/manager.controller.ts
import httpStatus10 from "http-status";
var applyManger = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await managerService.applyManager(body);
  sendResponse(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: `Manager apply and OTP send successfully`,
    data: null
  });
});
var emailVerify2 = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await managerService.emailVerify(body);
  sendResponse(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: `manager email verified successfully`,
    data: result
  });
});
var approveManger = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await managerService.approveManager(body, user);
  sendResponse(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: `Manager approved/rejected successfully`,
    data: result
  });
});
var getAllMangers = catchAsync(async (req, res) => {
  const query = req.query;
  const { managers, meta } = await managerService.getAllManagers(query);
  if (managers.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus10.NOT_FOUND,
      success: false,
      message: `mangers not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus10.OK,
    success: true,
    message: `managers retrived successfully`,
    data: managers,
    meta
  });
});
var managerController = {
  applyManger,
  emailVerify: emailVerify2,
  approveManger,
  getAllMangers
};

// src/app/module/manager/manager.validation.ts
import z2 from "zod";
var managerApplyValidation = z2.object({
  user: z2.object({
    name: z2.string().min(1, "Name is required"),
    email: z2.email("Invalid email format")
  }),
  manager: z2.object({
    phone: z2.string().min(1, "Phone is required"),
    address: z2.object({}).passthrough().optional(),
    nid: z2.string().min(1, "NID is required"),
    region: z2.array(z2.uuid("Invalid region ID format")).min(1, "At least one region is required")
  })
});
var emailVerifyValidation = z2.object({
  email: z2.email("Invalid email format"),
  otp: z2.string().length(6, "OTP must be 6 digits")
});
var approveManagerValidation = z2.object({
  email: z2.email("Invalid email format"),
  verificationStatus: z2.enum(["APPROVED", "REJECTED", "PENDING"]),
  rejectionReason: z2.string().optional()
}).refine(
  (data) => data.verificationStatus !== "REJECTED" || data.rejectionReason && data.rejectionReason.length > 0,
  {
    message: "Rejection reason is required when status is REJECTED",
    path: ["rejectionReason"]
  }
);

// src/app/module/manager/manager.route.ts
var route3 = Router3();
route3.post(
  "/manager-apply",
  zodValidation(managerApplyValidation),
  managerController.applyManger
);
route3.post(
  "/email-verify",
  zodValidation(emailVerifyValidation),
  managerController.emailVerify
);
route3.post(
  "/manager-approved",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(approveManagerValidation),
  managerController.approveManger
);
route3.get(
  "/all-managers",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  managerController.getAllMangers
);
var managerRouter = route3;

// src/app/module/category/category.route.ts
import { Router as Router4 } from "express";

// src/app/module/category/category.service.ts
import httpStatus11 from "http-status";
var createCategory = async (payload, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus11.NOT_FOUND, "user not found");
  }
  const isCategory = await prisma.category.findUnique({
    where: {
      name: payload.name
    }
  });
  if (isCategory) {
    throw new AppError(httpStatus11.CONFLICT, "category already exist");
  }
  const category = await prisma.category.create({
    data: {
      ...payload
    }
  });
  return category;
};
var getAllCategory = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      isActive: query.isActive
    });
  }
  if (query.name) {
    andConditions.push({
      name: query.name
    });
  }
  const category = await prisma.category.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.category.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    category,
    meta
  };
};
var getCategories = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [
    {
      isActive: true
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.name) {
    andConditions.push({
      name: query.name
    });
  }
  const category = await prisma.category.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.category.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    category,
    meta
  };
};
var udpateCategory = async (payload, id) => {
  const isCategory = await prisma.category.findUnique({
    where: { id }
  });
  if (!isCategory) {
    throw new AppError(httpStatus11.NOT_FOUND, "category not found");
  }
  const update = await prisma.category.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var categoryService = {
  createCategory,
  getAllCategory,
  getCategories,
  udpateCategory
};

// src/app/module/category/category.controller.ts
import httpStatus12 from "http-status";
var createCategory2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await categoryService.createCategory(body, user);
  sendResponse(res, {
    statusCode: httpStatus12.CREATED,
    success: true,
    message: `category created successfully`,
    data: result
  });
});
var getAllCategory2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { category, meta } = await categoryService.getAllCategory(query);
  if (category.length === 0) {
    throw new AppError(httpStatus12.NOT_FOUND, "category not found");
  }
  sendResponse(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: `category retrive successfully`,
    data: category,
    meta
  });
});
var getCategories2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { category, meta } = await categoryService.getCategories(query);
  if (category.length === 0) {
    throw new AppError(httpStatus12.NOT_FOUND, "category not found");
  }
  sendResponse(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: `category retrive successfully`,
    data: category,
    meta
  });
});
var udpateCategory2 = catchAsync(async (req, res) => {
  const id = req.params.categoryId;
  const body = req.body;
  const result = await categoryService.udpateCategory(body, id);
  sendResponse(res, {
    statusCode: httpStatus12.OK,
    success: true,
    message: `category updated successfully`,
    data: result
  });
});
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  getCategories: getCategories2,
  udpateCategory: udpateCategory2
};

// src/app/module/category/category.route.ts
var route4 = Router4();
route4.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.createCategory
);
route4.get("/all", categoryController.getCategories);
route4.get(
  "/all-category",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.getAllCategory
);
route4.put(
  "/:categoryId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.udpateCategory
);
var categoryRotuer = route4;

// src/app/module/service/service.route.ts
import { Router as Router5 } from "express";

// src/app/module/service/service.service.ts
import {
  addMinutes,
  endOfDay,
  getDay,
  isBefore,
  isWithinInterval,
  startOfDay
} from "date-fns";
import httpStatus13 from "http-status";

// src/app/utils/utility.ts
var parseTimeOnDate = (timeValue, baseDate) => {
  const timeStr = typeof timeValue === "string" ? timeValue : timeValue.toISOString().substring(11, 16);
  const [hours, minutes] = timeStr.split(":").map(Number);
  const parsedDate = new Date(baseDate);
  parsedDate.setHours(hours, minutes, 0, 0);
  return parsedDate;
};
var formatDateToYYYYMMDD = (date) => {
  if (!date) return void 0;
  return date.toISOString().substring(0, 10);
};
var formatTimeToHHmm = (date) => {
  if (!date) return void 0;
  return date.toISOString().substring(11, 16);
};

// src/app/module/service/service.service.ts
import path5 from "path";
import ejs3 from "ejs";

// src/app/lib/bkash.ts
var getBkashIdToken = async () => {
  const redisIdTokenKey = "bkash: id_token";
  const redisRefreshKey = "bkash: refresh_token";
  const redisIdToken = await redisClient.get(redisIdTokenKey);
  const redisIdTokenTTL = await redisClient.ttl(redisIdTokenKey);
  const redisRefreshToken = await redisClient.get(redisRefreshKey);
  const redisRefreshTokenTTL = await redisClient.ttl(redisRefreshKey);
  console.log(
    "redis id token ttl and refres token ttl ",
    redisIdTokenTTL,
    redisRefreshTokenTTL
  );
  if (redisIdToken && redisIdTokenTTL > 600) {
    console.log("bkash token id from redis token id");
    return redisIdToken;
  }
  if (redisIdTokenTTL <= 600 && redisRefreshToken && redisRefreshTokenTTL > 600) {
    console.log("bkast token id from redis refrsh token");
    const res2 = await fetch(
      `${env_default.bkash_base_url}/tokenized/checkout/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: env_default.bkash_username,
          password: env_default.bkash_password
        },
        body: JSON.stringify({
          app_key: env_default.bkash_app_key,
          app_secret: env_default.bkash_app_secret,
          refresh_token: redisRefreshToken
        })
      }
    );
    if (res2.ok) {
      const data = await res2.json();
      await redisClient.set(redisIdTokenKey, data.id_token, {
        expiration: {
          type: "EX",
          value: 60 * 60
        }
      });
      return data.id_token;
    }
  }
  console.log("bkash token id from new create");
  const res = await fetch(
    `${env_default.bkash_base_url}/tokenized/checkout/token/grant`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: env_default.bkash_username,
        password: env_default.bkash_password
      },
      body: JSON.stringify({
        app_key: env_default.bkash_app_key,
        app_secret: env_default.bkash_app_secret
      })
    }
  );
  if (res.ok) {
    const data = await res.json();
    await redisClient.set(redisIdTokenKey, data.id_token, {
      expiration: {
        type: "EX",
        value: 60 * 60
      }
    });
    await redisClient.set(redisRefreshKey, data.refresh_token, {
      expiration: {
        type: "EX",
        value: 60 * 60 * 24 * 28
      }
    });
    return data.id_token;
  }
  return null;
};

// src/app/module/service/service.service.ts
var toDateKey = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
var timeToDate = (time) => time ? /* @__PURE__ */ new Date(`1970-01-01T${time}:00.000Z`) : void 0;
var formatServiceDates = (service) => ({
  ...service,
  servicingDate: formatDateToYYYYMMDD(service.servicingDate),
  preferredStartTime: formatTimeToHHmm(service.preferredStartTime),
  preferredEndTime: formatTimeToHHmm(service.preferredEndTime)
});
var formatTechnicianResponse = (technician) => ({
  id: technician.id,
  userId: technician.userId,
  rating: technician.rating,
  jobsCompleted: technician.jobsCompleted,
  user: technician.user,
  phone: technician.phone,
  skills: technician.skills,
  regions: technician.regions
});
var createService = async (payload, user) => {
  const isCustomer = await prisma.user.findUnique({
    where: {
      id: user.userId,
      role: UserRole.CUSTOMER
    },
    select: {
      customer: {
        select: {
          id: true
        }
      }
    }
  });
  if (!isCustomer?.customer?.id) {
    throw new AppError(httpStatus13.NOT_FOUND, "customer not found");
  }
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId
    }
  });
  if (!category) {
    throw new AppError(httpStatus13.NOT_FOUND, "this category not found");
  }
  const now = /* @__PURE__ */ new Date();
  console.log({
    now,
    serviceing: payload.servicingDate
  });
  if (isBefore(payload.servicingDate, now)) {
    throw new AppError(
      httpStatus13.BAD_REQUEST,
      "serviceing date can not be before current date"
    );
  }
  const service = await prisma.service.create({
    data: {
      description: payload.description,
      servicingDate: payload.servicingDate,
      address: payload.address,
      duration: category.duration,
      categoryId: payload.categoryId,
      priority: payload.priority,
      regionId: payload.regionId,
      preferredStartTime: timeToDate(payload.preferredStartTime),
      preferredEndTime: timeToDate(payload.preferredEndTime),
      customerId: isCustomer.customer?.id
    },
    include: {
      customer: true
    }
  });
  return formatServiceDates(service);
};
var getMyServices = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const customer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!customer) {
    throw new AppError(httpStatus13.NOT_FOUND, "customer not found");
  }
  const andCondition = [
    {
      customerId: customer.id
    }
  ];
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  if (query.priority) {
    andCondition.push({
      priority: query.priority
    });
  }
  const services = await prisma.service.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrders: true
    }
  });
  const total = await prisma.service.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    services: services.map(formatServiceDates),
    meta
  };
};
var getALLServices = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus13.NOT_FOUND, "user not found");
  }
  const andCondition = [];
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  if (query.priority) {
    andCondition.push({
      priority: query.priority
    });
  }
  const services = await prisma.service.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrders: true
    }
  });
  const total = await prisma.service.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    services: services.map(formatServiceDates),
    meta
  };
};
var getSingleService = async (serviceId, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customer: true,
      manager: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus13.NOT_FOUND, "user not found");
  }
  const isService = await prisma.service.findUnique({
    where: {
      id: serviceId
    },
    include: {
      workOrders: true
    }
  });
  if (!isService) {
    throw new AppError(httpStatus13.NOT_FOUND, "service not found");
  }
  if (user.role === "CUSTOMER") {
    if (isService.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus13.UNAUTHORIZED, "unauthorized access");
    }
  }
  return formatServiceDates(isService);
};
var reviewService = async (payload, reviewer) => {
  const { serviceId, status, rejectionReason } = payload;
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: reviewer.userId
    },
    include: {
      region: {
        select: {
          id: true,
          area: true
        }
      }
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus13.NOT_FOUND, "Manager not found");
  }
  if (isManager.isDeleted) {
    throw new AppError(httpStatus13.BAD_REQUEST, "Manager deleted");
  }
  if (isManager.verificationStatus !== ManagerVerificationStatus.APPROVED) {
    throw new AppError(httpStatus13.BAD_REQUEST, "manager not varified");
  }
  console.log("payload ", payload);
  const isService = await prisma.service.findUnique({
    where: {
      id: serviceId
    }
  });
  if (!isService) {
    throw new AppError(httpStatus13.NOT_FOUND, "service not found");
  }
  const canReviewAnyService = isManager.region.some(
    (region) => region.area === "All"
  );
  const canReviewService = canReviewAnyService || isManager.region.some((region) => region.id === isService.regionId);
  if (!canReviewService) {
    throw new AppError(
      httpStatus13.FORBIDDEN,
      "You can only review services in your assigned regions"
    );
  }
  if (isService.status !== "PENDING") {
    throw new AppError(
      httpStatus13.CONFLICT,
      `you can't update varification status from  '${isService.status.toString()}'.`
    );
  }
  if (status === "REJECTED" && !rejectionReason) {
    throw new AppError(
      httpStatus13.BAD_REQUEST,
      "for rejection must need to rejection reason"
    );
  }
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      await tx.service.update({
        where: {
          id: isService.id
        },
        data: {
          status,
          rejectionReason: status === "REJECTED" ? rejectionReason : null,
          reviewedBy: reviewer.userId,
          reviewedAt: /* @__PURE__ */ new Date()
        }
      });
      if (status === "APPROVED") {
        await tx.workOrder.create({
          data: {
            servicingDate: isService.servicingDate,
            customerId: isService.customerId,
            serviceId: isService.id,
            status: "SCHEDULED",
            regionId: isService.regionId,
            managerId: isManager.id
          }
        });
      }
      const service = await tx.service.findUnique({
        where: {
          id: isService.id
        },
        include: {
          workOrders: true
        }
      });
      return service;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionResult ? formatServiceDates(transactionResult) : transactionResult;
};
var getEligibleTechnicians = async (workOrderId) => {
  const workOrder = await prisma.workOrder.findUnique({
    where: {
      id: workOrderId
    },
    include: {
      service: {
        include: {
          category: true
        }
      },
      region: true
    }
  });
  if (!workOrder) {
    throw new AppError(httpStatus13.NOT_FOUND, "Work order not found");
  }
  const serviceDate = new Date(workOrder.servicingDate);
  const startTime = workOrder.service.preferredStartTime ? parseTimeOnDate(workOrder.service.preferredStartTime, serviceDate) : new Date(serviceDate);
  const endTime = workOrder.service.preferredEndTime ? parseTimeOnDate(workOrder.service.preferredEndTime, serviceDate) : addMinutes(startTime, workOrder.service.category.duration ?? 60);
  const startOfService = new Date(serviceDate);
  startOfService.setHours(9, 0, 0, 0);
  const candidates = await prisma.technicianProfile.findMany({
    where: {
      status: "AVAILABLE",
      isDeleted: false,
      isProfileCompleted: true,
      regions: {
        some: { id: workOrder.regionId }
      },
      skills: {
        some: { categoryId: workOrder.service.categoryId }
      }
    },
    select: {
      id: true,
      userId: true,
      rating: true,
      jobsCompleted: true,
      user: { select: { name: true, email: true } },
      phone: true,
      skills: {
        where: { categoryId: workOrder.service.categoryId },
        select: { id: true, name: true }
      },
      regions: {
        where: { id: workOrder.regionId },
        select: { id: true, area: true }
      },
      availability: { where: { isActive: true } }
    }
  });
  if (candidates.length === 0) {
    throw new AppError(httpStatus13.NOT_FOUND, "No eligible technicians found");
  }
  const techIds = candidates.map((t) => t.id);
  const scheduleConflicts = await prisma.schedule.findMany({
    where: {
      technicianId: { in: techIds },
      servicingDate: {
        gte: startOfDay(serviceDate),
        lte: endOfDay(serviceDate)
      },
      status: { in: ["SCHEDULED", "CONFIRMED"] },
      OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }]
    },
    select: { technicianId: true }
  });
  const conflictedTechIds = new Set(
    scheduleConflicts.map((c) => c.technicianId)
  );
  const eligible = candidates.filter((tech) => {
    if (conflictedTechIds.has(tech.id)) return false;
    const isBlocked = tech.availability.some(
      (slot) => slot.type === "BLOCKED" && slot.date && toDateKey(slot.date) === toDateKey(serviceDate)
    );
    if (isBlocked) return false;
    const hasAvailability = tech.availability.some((slot) => {
      if (slot.type === "BLOCKED") return false;
      const slotStart = slot.startTime ? parseTimeOnDate(slot.startTime, serviceDate) : null;
      const slotEnd = slot.endTime ? parseTimeOnDate(slot.endTime, serviceDate) : null;
      if (!slotStart || !slotEnd) return false;
      let coversDate = false;
      if (slot.type === "RECURRING")
        coversDate = slot.dayOfWeek === getDay(serviceDate);
      else if (slot.type === "ONE_OFF" && slot.date)
        coversDate = toDateKey(slot.date) === toDateKey(serviceDate);
      if (!coversDate) return false;
      return isWithinInterval(startTime, { start: slotStart, end: slotEnd }) && isWithinInterval(endTime, { start: slotStart, end: slotEnd });
    });
    return hasAvailability;
  });
  eligible.sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.jobsCompleted - b.jobsCompleted
  );
  return eligible.map(formatTechnicianResponse);
};
var assignTechnician = async (payload, user) => {
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus13.NOT_FOUND, "Manager not found");
  }
  const isTechnician = await prisma.technicianProfile.findUnique({
    where: {
      id: payload.technicianId
    },
    include: {
      user: true
    }
  });
  if (!isTechnician) {
    throw new AppError(httpStatus13.NOT_FOUND, "technician not found");
  }
  if (isTechnician.status !== "AVAILABLE") {
    throw new AppError(httpStatus13.CONFLICT, "technician no longer available");
  }
  const isWorkOrder = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId
    },
    include: {
      service: {
        include: {
          category: true
        }
      },
      customer: {
        select: {
          user: true
        }
      }
    }
  });
  if (!isWorkOrder) {
    throw new AppError(httpStatus13.NOT_FOUND, "order not found");
  }
  if (isWorkOrder.status !== "SCHEDULED") {
    throw new AppError(
      httpStatus13.BAD_REQUEST,
      `Status need to must be scheduled`
    );
  }
  if (isWorkOrder.service.status !== "APPROVED") {
    throw new AppError(httpStatus13.BAD_REQUEST, "service status not approved");
  }
  if (isWorkOrder.managerId !== isManager.id) {
    throw new AppError(
      httpStatus13.UNAUTHORIZED,
      "you are not eligible to assign technician"
    );
  }
  const serviceDate = new Date(isWorkOrder.servicingDate);
  const startTime = isWorkOrder.service.preferredStartTime ? parseTimeOnDate(isWorkOrder.service.preferredStartTime, serviceDate) : new Date(serviceDate);
  const endTime = isWorkOrder.service.preferredEndTime ? parseTimeOnDate(isWorkOrder.service.preferredEndTime, serviceDate) : addMinutes(startTime, isWorkOrder.service.category.duration ?? 60);
  console.log({
    serviceDate,
    startTime,
    endTime
  });
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const tech = await tx.technicianProfile.findUnique({
        where: {
          id: payload.technicianId
        }
      });
      if (!tech) {
        throw new AppError(
          httpStatus13.CONFLICT,
          "technician no longer available"
        );
      }
      const conflict = await tx.schedule.findFirst({
        where: {
          technicianId: payload.technicianId,
          servicingDate: {
            gte: startOfDay(isWorkOrder.servicingDate),
            lte: endOfDay(isWorkOrder.servicingDate)
          },
          status: {
            in: ["SCHEDULED", "CONFIRMED"]
          },
          OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }]
        }
      });
      if (conflict) {
        throw new AppError(
          httpStatus13.CONFLICT,
          "Technician has conflicting schedule"
        );
      }
      await tx.service.update({
        where: {
          id: isWorkOrder.service.id
        },
        data: {
          status: "ASSIGNED",
          assignedAt: /* @__PURE__ */ new Date()
        }
      });
      const workOrder = await tx.workOrder.update({
        where: {
          id: isWorkOrder.id
        },
        data: {
          status: "EN_ROUTE",
          technicianId: payload.technicianId
        },
        include: {
          service: {
            include: {
              region: true,
              category: true
            }
          },
          customer: true,
          technician: {
            include: {
              user: true
            }
          }
        }
      });
      const scheduleStartTime = workOrder.service.preferredStartTime ?? parseTimeOnDate("09:00", workOrder.servicingDate);
      const scheduleEndTime = workOrder.service.preferredEndTime ?? addMinutes(
        scheduleStartTime,
        workOrder.service.category.duration ?? 60
      );
      await tx.schedule.create({
        data: {
          workOrderId: payload.workOrderId,
          technicianId: payload.technicianId,
          servicingDate: workOrder.servicingDate,
          startTime: scheduleStartTime,
          endTime: scheduleEndTime,
          status: "CONFIRMED"
        }
      });
      const id_token = await getBkashIdToken();
      if (!id_token) {
        throw new AppError(httpStatus13.BAD_GATEWAY, "bkash id token faild");
      }
      const createPayment2 = await fetch(
        `${env_default.bkash_base_url}/tokenized/checkout/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: id_token,
            "x-app-key": env_default.bkash_app_key
          },
          body: JSON.stringify({
            agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
            mode: "0011",
            payerReference: isWorkOrder.customer.user.email,
            callbackURL: `${env_default.bkash_callback_url}/payment/service/callback`,
            merchantAssociationInfo: "MI05MID54RF09123456One",
            amount: payload.amount,
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: isWorkOrder.id
          })
        }
      );
      const result = await createPayment2.json();
      console.log("result ", result.bkashURL);
      await tx.payment.create({
        data: {
          amount: result.amount,
          merchantInvoiceNumber: result.merchantInvoiceNumber,
          status: "UNPAID",
          currency: result.currency,
          getwayResponse: result,
          workOrderId: isWorkOrder.id,
          paymentId: result.paymentID,
          payerReference: isWorkOrder.customer.user.email
        }
      });
      return workOrder;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  const templatePathTech = path5.join(
    process.cwd(),
    "src/app/template/technician-notification.ejs"
  );
  const templateDataTech = {
    name: isTechnician.user.name,
    serviceCategory: isWorkOrder.service.category.name,
    customerName: isWorkOrder.customer.user.name,
    address: isWorkOrder.service.address,
    scheduledDate: isWorkOrder.servicingDate.toLocaleString(),
    notes: isWorkOrder.note ?? null,
    appName: env_default.app_name
  };
  const htmlTech = await ejs3.renderFile(templatePathTech, templateDataTech);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: isTechnician.user.email,
    subject: `New Job Assigned: ${isWorkOrder.service.category.name} - ${isWorkOrder.id.slice(0, 8)}`,
    html: htmlTech
  });
  const templatePath = path5.join(
    process.cwd(),
    "src/app/template/customer-notification.ejs"
  );
  const templateData = {
    name: isWorkOrder.customer.user.name,
    technicianName: isTechnician.user.name,
    technicianRating: isTechnician.rating,
    jobsCompleted: isTechnician.jobsCompleted,
    technicianPhone: isTechnician.phone ?? null,
    serviceCategory: isWorkOrder.service.category.name,
    serviceId: isWorkOrder.service.id,
    address: isWorkOrder.service.address,
    scheduledDate: isWorkOrder.servicingDate.toLocaleString(),
    appName: env_default.app_name
  };
  const html = await ejs3.renderFile(templatePath, templateData);
  await transporter.sendMail({
    from: env_default.smtp_sender,
    to: isWorkOrder.customer.user.email,
    subject: `Technician Assigned: ${isTechnician.user.name}`,
    html
  });
  return transactionResult;
};
var serviceService = {
  createService,
  getMyServices,
  getALLServices,
  getSingleService,
  reviewService,
  getEligibleTechnicians,
  assignTechnician
};

// src/app/module/service/service.controller.ts
import httpStatus14 from "http-status";
var createService2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await serviceService.createService(body, user);
  sendResponse(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: `service request retrived successfully`,
    data: result
  });
});
var getMyServices2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { services, meta } = await serviceService.getMyServices(query, user);
  if (services.length === 0) {
    throw new AppError(httpStatus14.NOT_FOUND, "schedule not found");
  }
  sendResponse(res, {
    statusCode: httpStatus14.CREATED,
    success: true,
    message: "service retrive successfully",
    data: services,
    meta
  });
});
var getAllServices = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { services, meta } = await serviceService.getALLServices(query, user);
  if (services.length === 0) {
    throw new AppError(httpStatus14.NOT_FOUND, "service not found");
  }
  sendResponse(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: "service retrive successfully",
    data: services,
    meta
  });
});
var getSingleService2 = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.serviceId;
  const result = await serviceService.getSingleService(id, user);
  sendResponse(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: "service retrive successfully",
    data: result
  });
});
var reviewService2 = catchAsync(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const result = await serviceService.reviewService(body, user);
  sendResponse(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: "service reviewed successfully",
    data: result
  });
});
var getEligibleTechnicians2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const id = req.params.workOrderId;
    const result = await serviceService.getEligibleTechnicians(id);
    if (result.length === 0) {
      throw new AppError(httpStatus14.NOT_FOUND, "technician not found");
    }
    sendResponse(res, {
      statusCode: httpStatus14.OK,
      success: true,
      message: "eligible technician find successfully",
      data: result
    });
  }
);
var assignTechnician2 = catchAsync(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const result = await serviceService.assignTechnician(body, user);
  sendResponse(res, {
    statusCode: httpStatus14.OK,
    success: true,
    message: "technician assign successfully",
    data: result
  });
});
var serviceController = {
  createService: createService2,
  getMyServices: getMyServices2,
  getAllServices,
  getSingleService: getSingleService2,
  reviewService: reviewService2,
  getEligibleTechnicians: getEligibleTechnicians2,
  assignTechnician: assignTechnician2
};

// src/app/module/service/service.validation.ts
import { z as z3 } from "zod";
var timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
var serviceZodSchema = z3.object({
  description: z3.string().min(5),
  servicingDate: z3.coerce.date(),
  address: z3.object({}).passthrough(),
  categoryId: z3.uuid(),
  priority: z3.string(),
  regionId: z3.uuid(),
  preferredStartTime: z3.string().regex(timeRegex, "preferredStartTime must be HH:mm format").optional(),
  preferredEndTime: z3.string().regex(timeRegex, "preferredEndTime must be HH:mm format").optional()
});
var reviewServiceZodSchema = z3.object({
  status: z3.nativeEnum(ServiceStatus).refine((val) => val === "APPROVED" || val === "REJECTED", {
    message: "Status must be APPROVED or REJECTED"
  }),
  rejectionReason: z3.string().optional()
});
var assignTechnicianZodSchema = z3.object({
  workOrderId: z3.uuid(),
  technicianId: z3.uuid()
});

// src/app/module/service/service.route.ts
var route5 = Router5();
route5.post(
  "/",
  zodValidation(serviceZodSchema),
  auth(UserRole.CUSTOMER),
  serviceController.createService
);
route5.get(
  "/my-services",
  auth(UserRole.CUSTOMER),
  serviceController.getMyServices
);
route5.get(
  "/all-services",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  serviceController.getAllServices
);
route5.get(
  "/:serviceId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER),
  serviceController.getSingleService
);
route5.post("/review", auth(UserRole.MANAGER), serviceController.reviewService);
route5.post(
  "/assign-technician",
  auth(UserRole.MANAGER),
  serviceController.assignTechnician
);
route5.get(
  "/workOrder/:workOrderId",
  auth(UserRole.MANAGER),
  serviceController.getEligibleTechnicians
);
route5.patch(
  "/workOrder/technician-assign",
  auth(UserRole.MANAGER),
  serviceController.assignTechnician
);
var serviceRouter = route5;

// src/app/module/skill/skill.route.ts
import { Router as Router6 } from "express";

// src/app/module/skill/skill.service.ts
import httpStatus15 from "http-status";
var createSkill = async (payload, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus15.NOT_FOUND, "user not found");
  }
  const isCategory = await prisma.category.findUnique({
    where: {
      id: payload.categoryId
    }
  });
  if (!isCategory) {
    throw new AppError(httpStatus15.NOT_FOUND, "category not found");
  }
  const isSkill = await prisma.skill.findUnique({
    where: {
      name: payload.name
    }
  });
  if (isSkill) {
    throw new AppError(httpStatus15.CONFLICT, "skill already exist");
  }
  const skill = await prisma.skill.create({
    data: {
      ...payload
    }
  });
  return skill;
};
var getAllSkill = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          category: {
            name: {
              contains: query.search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (query.isActive) {
    andConditions.push({
      category: {
        isActive: query.isActive
      }
    });
  }
  if (query.name) {
    andConditions.push({
      name: query.name
    });
  }
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId
    });
  }
  if (query.category) {
    andConditions.push({
      category: {
        name: query.category
      }
    });
  }
  const skill = await prisma.skill.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true
        }
      }
    }
  });
  const total = await prisma.skill.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    skill,
    meta
  };
};
var getSkills = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [
    {
      category: {
        isActive: true
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          category: {
            name: {
              contains: query.search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (query.name) {
    andConditions.push({
      name: query.name
    });
  }
  if (query.categoryId) {
    andConditions.push({
      categoryId: query.categoryId
    });
  }
  if (query.category) {
    andConditions.push({
      category: {
        name: query.category
      }
    });
  }
  const skill = await prisma.skill.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          icon: true
        }
      }
    }
  });
  const total = await prisma.skill.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    skill,
    meta
  };
};
var updateSkill = async (payload, id) => {
  const isSkill = await prisma.skill.findUnique({
    where: { id }
  });
  if (!isSkill) {
    throw new AppError(httpStatus15.NOT_FOUND, "skill not found");
  }
  if (payload.categoryId) {
    const isCategory = await prisma.category.findUnique({
      where: { id: payload.categoryId }
    });
    if (!isCategory) {
      throw new AppError(httpStatus15.NOT_FOUND, "category not found");
    }
  }
  if (payload.name && payload.name !== isSkill.name) {
    const isNameExists = await prisma.skill.findUnique({
      where: { name: payload.name }
    });
    if (isNameExists) {
      throw new AppError(httpStatus15.CONFLICT, "skill name already exist");
    }
  }
  const update = await prisma.skill.update({
    where: {
      id
    },
    data: {
      ...payload
    }
  });
  return update;
};
var skillService = {
  createSkill,
  getAllSkill,
  getSkills,
  updateSkill
};

// src/app/module/skill/skill.controller.ts
import httpStatus16 from "http-status";
var createSkill2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await skillService.createSkill(body, user);
  sendResponse(res, {
    statusCode: httpStatus16.CREATED,
    success: true,
    message: `skill created successfully`,
    data: result
  });
});
var getAllSkill2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { skill, meta } = await skillService.getAllSkill(query);
  if (skill.length === 0) {
    throw new AppError(httpStatus16.NOT_FOUND, "skill not found");
  }
  sendResponse(res, {
    statusCode: httpStatus16.OK,
    success: true,
    message: `skill retrive successfully`,
    data: skill,
    meta
  });
});
var getSkills2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { skill, meta } = await skillService.getSkills(query);
  if (skill.length === 0) {
    throw new AppError(httpStatus16.NOT_FOUND, "skill not found");
  }
  sendResponse(res, {
    statusCode: httpStatus16.OK,
    success: true,
    message: `skill retrive successfully`,
    data: skill,
    meta
  });
});
var updateSkill2 = catchAsync(async (req, res) => {
  const id = req.params.skillId;
  const body = req.body;
  const result = await skillService.updateSkill(body, id);
  sendResponse(res, {
    statusCode: httpStatus16.OK,
    success: true,
    message: `skill updated successfully`,
    data: result
  });
});
var skillController = {
  createSkill: createSkill2,
  getAllSkill: getAllSkill2,
  getSkills: getSkills2,
  updateSkill: updateSkill2
};

// src/app/module/skill/skill.validate.ts
import { z as z4 } from "zod";
var skillZodSchema = z4.object({
  name: z4.string().min(1, "Name is required"),
  icon: z4.string().optional(),
  description: z4.string().optional(),
  categoryId: z4.uuid("Invalid category ID")
});
var updateSkillZodSchema = z4.object({
  name: z4.string().optional(),
  icon: z4.string().optional(),
  description: z4.string().optional(),
  categoryId: z4.uuid().optional()
});

// src/app/module/skill/skill.route.ts
var route6 = Router6();
route6.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(skillZodSchema),
  skillController.createSkill
);
route6.get("/all", skillController.getSkills);
route6.get(
  "/all-skill",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  skillController.getAllSkill
);
route6.put(
  "/:skillId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  zodValidation(updateSkillZodSchema),
  skillController.updateSkill
);
var skillRoute = route6;

// src/app/module/technician/technician.route.ts
import { Router as Router7 } from "express";

// src/app/module/technician/technician.validation.ts
import { z as z5 } from "zod";
import { isBefore as isBefore2, parse } from "date-fns";
var timeRegex2 = /^([01]\d|2[0-3]):([0-5]\d)$/;
var availabilitySchema = z5.object({
  type: z5.enum(["RECURRING", "ONE_OFF", "BLOCKED"]),
  dayOfWeek: z5.number().int().min(0).max(6).optional(),
  date: z5.string().datetime({ offset: true }).or(z5.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  startTime: z5.string().regex(timeRegex2, "startTime must be HH:mm format").optional(),
  endTime: z5.string().regex(timeRegex2, "endTime must be HH:mm format").optional()
}).refine(
  (data) => {
    if (data.type === "RECURRING") return data.dayOfWeek !== void 0;
    return true;
  },
  { message: "dayOfWeek is required for RECURRING availability" }
).refine(
  (data) => {
    if (data.type === "ONE_OFF" || data.type === "BLOCKED")
      return !!data.date;
    return true;
  },
  { message: "date is required when type is ONE_OFF or BLOCKED" }
).refine(
  (data) => {
    if (data.type !== "BLOCKED") return !!data.startTime && !!data.endTime;
    return true;
  },
  { message: "startTime and endTime are required unless type is BLOCKED" }
).refine(
  (data) => {
    if (data.type !== "BLOCKED" && data.startTime && data.endTime) {
      const start = parse(data.startTime, "HH:mm", /* @__PURE__ */ new Date());
      const end = parse(data.endTime, "HH:mm", /* @__PURE__ */ new Date());
      return isBefore2(start, end);
    }
    return true;
  },
  { message: "startTime must be before endTime" }
);
var completeProfileZodSchema = z5.object({
  phone: z5.string().min(6).optional(),
  address: z5.object({}).passthrough().optional(),
  bio: z5.string().optional(),
  nid: z5.string().optional(),
  skills: z5.array(z5.string().uuid()).optional(),
  region: z5.array(z5.string().uuid()).optional(),
  availability: z5.array(availabilitySchema).superRefine((slots, ctx) => {
    const recurring = slots.filter((slot) => slot.type === "RECURRING");
    for (let i = 0; i < recurring.length; i++) {
      for (let j = i + 1; j < recurring.length; j++) {
        const first = recurring[i];
        const second = recurring[j];
        if (first.dayOfWeek !== second.dayOfWeek) continue;
        const firstStart = parse(first.startTime, "HH:mm", /* @__PURE__ */ new Date());
        const firstEnd = parse(first.endTime, "HH:mm", /* @__PURE__ */ new Date());
        const secondStart = parse(second.startTime, "HH:mm", /* @__PURE__ */ new Date());
        const secondEnd = parse(second.endTime, "HH:mm", /* @__PURE__ */ new Date());
        if (isBefore2(firstStart, secondEnd) && isBefore2(secondStart, firstEnd)) {
          ctx.addIssue({
            code: "custom",
            message: "RECURRING availability slots must not overlap on the same day",
            path: [i]
          });
        }
      }
    }
  }).optional()
});

// src/app/module/technician/technician.controller.ts
import httpStatus18 from "http-status";

// src/app/module/technician/technician.service.ts
import httpStatus17 from "http-status";
var completeProfile = async (payload, user) => {
  const { phone, address, bio, nid, skills, region, availability } = payload;
  const isTechnician = await prisma.technicianProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!isTechnician) {
    throw new AppError(httpStatus17.NOT_FOUND, "technician not found");
  }
  if (isTechnician.isDeleted) {
    throw new AppError(httpStatus17.FORBIDDEN, "This profile has been deleted");
  }
  if (skills !== void 0) {
    const existingSkills = await prisma.skill.findMany({
      where: { id: { in: skills } },
      select: { id: true }
    });
    if (existingSkills.length !== skills.length) {
      const existingIds = existingSkills.map((s) => s.id);
      const missingIds = skills.filter((id) => !existingIds.includes(id));
      throw new AppError(
        httpStatus17.NOT_FOUND,
        `Skill not found: ${missingIds.join(", ")}`
      );
    }
  }
  if (region !== void 0) {
    const existingRegions = await prisma.region.findMany({
      where: { id: { in: region }, isActive: true },
      select: { id: true }
    });
    if (existingRegions.length !== region.length) {
      const existingIds = existingRegions.map((r) => r.id);
      const missingIds = region.filter((id) => !existingIds.includes(id));
      throw new AppError(
        httpStatus17.NOT_FOUND,
        `Region not found or inactive: ${missingIds.join(", ")}`
      );
    }
  }
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      let mergedSkills;
      if (skills !== void 0) {
        const existing = await tx.technicianProfile.findUnique({
          where: { id: isTechnician.id },
          select: { skills: { select: { id: true } } }
        });
        const existingIds = existing?.skills.map((s) => s.id) || [];
        mergedSkills = [.../* @__PURE__ */ new Set([...existingIds, ...skills])];
      }
      const update = await tx.technicianProfile.update({
        where: { id: isTechnician.id },
        data: {
          ...phone !== void 0 && { phone },
          ...address !== void 0 && { address },
          ...bio !== void 0 && { bio },
          ...nid !== void 0 && { nid },
          ...mergedSkills !== void 0 && {
            skills: { set: mergedSkills.map((id) => ({ id })) }
          },
          ...region !== void 0 && {
            regions: { set: region.map((id) => ({ id })) }
          }
        }
      });
      if (availability !== void 0 && availability.length > 0) {
        const recurring = availability.filter((s) => s.type === "RECURRING");
        const oneOffOrBlocked = availability.filter(
          (s) => s.type !== "RECURRING"
        );
        for (const slot of recurring) {
          await tx.availability.upsert({
            where: {
              technicianId_type_dayOfWeek: {
                technicianId: isTechnician.id,
                type: "RECURRING",
                dayOfWeek: slot.dayOfWeek
              }
            },
            update: {
              startTime: slot.startTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.startTime}:00Z`) : null,
              endTime: slot.endTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.endTime}:00Z`) : null,
              isActive: true
            },
            create: {
              technicianId: isTechnician.id,
              type: "RECURRING",
              dayOfWeek: slot.dayOfWeek,
              startTime: slot.startTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.startTime}:00Z`) : null,
              endTime: slot.endTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.endTime}:00Z`) : null
            }
          });
        }
        for (const slot of oneOffOrBlocked) {
          await tx.availability.upsert({
            where: {
              technicianId_type_date: {
                technicianId: isTechnician.id,
                type: slot.type,
                date: new Date(slot.date)
              }
            },
            update: {
              startTime: slot.startTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.startTime}:00Z`) : null,
              endTime: slot.endTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.endTime}:00Z`) : null,
              isActive: true
            },
            create: {
              technicianId: isTechnician.id,
              type: slot.type,
              date: new Date(slot.date),
              startTime: slot.startTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.startTime}:00Z`) : null,
              endTime: slot.endTime ? /* @__PURE__ */ new Date(`1970-01-01T${slot.endTime}:00Z`) : null
            }
          });
        }
      }
      const tech = await tx.technicianProfile.findUnique({
        where: {
          id: isTechnician.id
        }
      });
      return tech;
    },
    { maxWait: 1e4, timeout: 15e3 }
  );
  const fullProfile = await prisma.technicianProfile.findUnique({
    where: { id: transactionResult?.id },
    include: { skills: true, regions: true, availability: true }
  });
  const isNowComplete = !!fullProfile.phone && fullProfile.skills.length > 0 && fullProfile.regions.length > 0 && fullProfile.availability.length > 0;
  if (isNowComplete !== fullProfile.isProfileCompleted) {
    await prisma.technicianProfile.update({
      where: { id: fullProfile.id },
      data: { isProfileCompleted: isNowComplete }
    });
  }
  return fullProfile;
};
var technicianService = {
  completeProfile
};

// src/app/module/technician/technician.controller.ts
var completeProfile2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await technicianService.completeProfile(req.body, user);
  if (!result) {
    throw new AppError(
      httpStatus18.INTERNAL_SERVER_ERROR,
      "something went wrong"
    );
  }
  sendResponse(res, {
    statusCode: httpStatus18.OK,
    success: true,
    message: result.isProfileCompleted ? "Technician profile completed successfully" : "Technician profile updated successfully",
    data: result
  });
});
var technicianController = {
  completeProfile: completeProfile2
};

// src/app/module/technician/technician.route.ts
var route7 = Router7();
route7.patch(
  "/me/profile",
  zodValidation(completeProfileZodSchema),
  auth(UserRole.TECHNICIAN),
  technicianController.completeProfile
);
var technicianRoutes = route7;

// src/app/module/workOrder/workOrder.route.ts
import { Router as Router8 } from "express";

// src/app/module/workOrder/workOrder.controller.ts
import httpStatus20 from "http-status";

// src/app/module/workOrder/workOrder.service.ts
import httpStatus19 from "http-status";
var getMyWrokOrders = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customer: {
        select: {
          id: true
        }
      },
      manager: {
        select: {
          id: true
        }
      },
      technician: {
        select: {
          id: true
        }
      }
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus19.NOT_FOUND, "user not found");
  }
  let ownerCondition;
  switch (user.role) {
    case UserRole.MANAGER:
      if (!isUser.manager?.id) {
        throw new AppError(httpStatus19.NOT_FOUND, "Manager profile not found");
      }
      ownerCondition = { managerId: isUser.manager.id };
      break;
    case UserRole.CUSTOMER:
      if (!isUser.customer?.id) {
        throw new AppError(httpStatus19.NOT_FOUND, "Customer profile not found");
      }
      ownerCondition = { customerId: isUser.customer.id };
      break;
    case UserRole.TECHNICIAN:
      if (!isUser.technician?.id) {
        throw new AppError(
          httpStatus19.NOT_FOUND,
          "Technician profile not found"
        );
      }
      ownerCondition = { technicianId: isUser.technician.id };
      break;
    default:
      throw new AppError(
        httpStatus19.FORBIDDEN,
        "This user role cannot access work orders"
      );
  }
  const andCondition = [ownerCondition];
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  const workOrders = await prisma.workOrder.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      customer: true,
      manager: true,
      payment: true,
      service: true
    }
  });
  const total = await prisma.workOrder.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    workOrders,
    meta
  };
};
var getNewWrokOrders = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      technician: {
        select: {
          id: true
        }
      }
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus19.NOT_FOUND, "user not found");
  }
  const andCondition = [
    {
      status: "EN_ROUTE",
      technicianId: isUser.technician?.id
    }
  ];
  const workOrders = await prisma.workOrder.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      customer: true,
      manager: true,
      payment: true,
      service: true
    }
  });
  const total = await prisma.workOrder.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    workOrders,
    meta
  };
};
var udpateStatus = async (payload, user) => {
  const isTech = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isTech) {
    throw new AppError(httpStatus19.NOT_FOUND, "technician not found");
  }
  const isExist = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId,
      technicianId: isTech.id
    },
    include: {
      service: true
    }
  });
  if (!isExist) {
    throw new AppError(httpStatus19.NOT_FOUND, "order not found");
  }
  if (isExist.status === "COMPLETED") {
    throw new AppError(httpStatus19.NOT_FOUND, "service work already completed");
  }
  if (isExist.status === "SCHEDULED") {
    throw new AppError(
      httpStatus19.BAD_REQUEST,
      `You can't update status from ${isExist.status.toLocaleLowerCase()} to ${payload.status}`
    );
  }
  if (isExist.status === "CANCELLED") {
    throw new AppError(
      httpStatus19.BAD_REQUEST,
      `work order already cancelled. You can't update`
    );
  }
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const workOrder = await tx.workOrder.update({
        where: {
          id: isExist.id,
          technicianId: isTech.id
        },
        data: {
          status: payload.status
        }
      });
      if (payload.status === "STARTED") {
        await tx.service.update({
          where: {
            id: isExist.serviceId
          },
          data: {
            status: "IN_PROGRESS"
          }
        });
        await tx.schedule.update({
          where: {
            workOrderId: workOrder.id
          },
          data: {
            actualStart: /* @__PURE__ */ new Date()
          }
        });
      }
      if (payload.status === "COMPLETED") {
        await tx.service.update({
          where: {
            id: isExist.service.id
          },
          data: {
            status: "COMPLETED"
          }
        });
        await tx.schedule.update({
          where: {
            workOrderId: isExist.id
          },
          data: {
            actualEnd: /* @__PURE__ */ new Date()
          }
        });
        await tx.technicianProfile.update({
          where: {
            id: isTech.id
          },
          data: {
            status: "AVAILABLE",
            jobsCompleted: {
              increment: 1
            }
          }
        });
        await tx.workOrder.update({
          where: {
            id: isExist.id
          },
          data: {
            status: "COMPLETED"
          }
        });
      }
      return workOrder;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionResult;
};
var workOrderService = {
  getMyWrokOrders,
  getNewWrokOrders,
  udpateStatus
};

// src/app/module/workOrder/workOrder.controller.ts
var getMyWorkOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { workOrders, meta } = await workOrderService.getMyWrokOrders(
    query,
    user
  );
  if (workOrders.length === 0) {
    throw new AppError(httpStatus20.NOT_FOUND, "my work order not found");
  }
  sendResponse(res, {
    statusCode: httpStatus20.OK,
    success: true,
    message: "work order retrive successfully",
    data: workOrders,
    meta
  });
});
var getNewWorkOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { workOrders, meta } = await workOrderService.getNewWrokOrders(
    query,
    user
  );
  if (workOrders.length === 0) {
    throw new AppError(httpStatus20.NOT_FOUND, "new incomming order not found");
  }
  sendResponse(res, {
    statusCode: httpStatus20.OK,
    success: true,
    message: "work order retrive successfully",
    data: workOrders,
    meta
  });
});
var updateStatus = catchAsync(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const result = await workOrderService.udpateStatus(body, user);
  sendResponse(res, {
    statusCode: httpStatus20.OK,
    success: true,
    message: "work order status successfully",
    data: result
  });
});
var workOrderController = {
  getMyWorkOrders,
  getNewWorkOrders,
  updateStatus
};

// src/app/module/workOrder/workOrder.route.ts
var route8 = Router8();
route8.get(
  "/my-workorder",
  auth(UserRole.TECHNICIAN, UserRole.CUSTOMER, UserRole.MANAGER),
  workOrderController.getMyWorkOrders
);
route8.get(
  "/new-workorder",
  auth(UserRole.TECHNICIAN),
  workOrderController.getNewWorkOrders
);
route8.patch(
  "/update",
  auth(UserRole.TECHNICIAN),
  workOrderController.updateStatus
);
var workOrderRouter = route8;

// src/app/module/payment/payment.route.ts
import { Router as Router9 } from "express";

// src/app/module/payment/payment.service.ts
import httpStatus21 from "http-status";
import PDFDocument from "pdfkit";
var createPayment = async (payload, user) => {
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      user: true
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus21.NOT_FOUND, "customer not found");
  }
  const isWorkOrder = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId,
      customerId: isCustomer.id
    },
    include: {
      service: true,
      payment: true
    }
  });
  if (!isWorkOrder) {
    throw new AppError(httpStatus21.NOT_FOUND, "order not found");
  }
  if (isWorkOrder.payment?.status === "PAID") {
    throw new AppError(httpStatus21.CONFLICT, "you already completed payment");
  }
  if (isWorkOrder.service.status === "REJECTED" || isWorkOrder.service.status === "CANCELLED" || isWorkOrder.service.status === "PENDING") {
    throw new AppError(
      httpStatus21.CONFLICT,
      `your service is ${isWorkOrder.service.status.toString()}`
    );
  }
  if (isWorkOrder.service.status !== "COMPLETED") {
    throw new AppError(
      httpStatus21.CONFLICT,
      "you can not payment before completed work"
    );
  }
  if (isWorkOrder.status === "CANCELLED") {
    throw new AppError(httpStatus21.CONFLICT, "Yur order is cancelled");
  }
  if (isWorkOrder.status !== "COMPLETED") {
    throw new AppError(
      httpStatus21.CONFLICT,
      "Work is not completed. so you can not payemnt before completed"
    );
  }
  const amount = isWorkOrder.payment?.amount.toString();
  const id_token = await getBkashIdToken();
  if (!id_token) {
    throw new AppError(httpStatus21.BAD_GATEWAY, "bkash id token faild");
  }
  const createPayment2 = await fetch(
    `${env_default.bkash_base_url}/tokenized/checkout/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: id_token,
        "x-app-key": env_default.bkash_app_key
      },
      body: JSON.stringify({
        agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
        mode: "0011",
        payerReference: isCustomer.user.email,
        callbackURL: `${env_default.bkash_callback_url}/payment/service/callback`,
        merchantAssociationInfo: "MI05MID54RF09123456One",
        amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: isWorkOrder.id
      })
    }
  );
  const result = await createPayment2.json();
  console.log("result ", result.bkashURL);
  await prisma.payment.update({
    where: {
      workOrderId: isWorkOrder.id
    },
    data: {
      paymentId: result.paymentID,
      getwayResponse: result
    }
  });
  return result;
};
var bkashCallback = async (query) => {
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const id_token = await getBkashIdToken();
      if (!id_token) {
        throw new AppError(httpStatus21.BAD_GATEWAY, "bkash id token failed");
      }
      const paymentID = query.paymentID;
      const status = query.status;
      console.log({
        "payment id": paymentID,
        status
      });
      if (!paymentID) {
        throw new AppError(httpStatus21.BAD_REQUEST, "Payment id missing");
      }
      if (!status) {
        throw new AppError(httpStatus21.BAD_REQUEST, "status is missing");
      }
      if (status === "failure" || status === "cancel") {
        await tx.payment.update({
          where: {
            paymentId: paymentID
          },
          data: {
            status: status === "failure" ? PaymentStatus.FAILED : PaymentStatus.CANCELLED,
            getwayResponse: { statusCode: status }
          }
        });
        return {
          redirectUrl: `${env_default.frontend_url}/dashboard/my-service?status=${status}`
        };
      }
      if (status === "success") {
        const executePayment = await fetch(
          `${env_default.bkash_base_url}/tokenized/checkout/execute`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: id_token,
              "x-app-key": env_default.bkash_app_key
            },
            body: JSON.stringify({ paymentID })
          }
        );
        const result = await executePayment.json();
        console.log("execute payment", result);
        const workOrder = await tx.workOrder.findUnique({
          where: {
            id: result.merchantInvoiceNumber
          },
          include: {
            service: {
              select: {
                customer: {
                  select: {
                    user: true
                  }
                }
              }
            },
            technician: {
              include: {
                user: true
              }
            },
            manager: {
              include: {
                user: true
              }
            },
            payment: true
          }
        });
        if (!workOrder) {
          throw new AppError(httpStatus21.NOT_FOUND, "work order not found");
        }
        await tx.payment.update({
          where: {
            paymentId: paymentID
          },
          data: {
            paymentId: result.paymentID,
            status: "PAID",
            paidAt: /* @__PURE__ */ new Date(),
            getwayResponse: result,
            transectionId: result.trxID
          }
        });
        const doc = new PDFDocument({ margin: 50 });
        const pdfChunks = [];
        doc.on("data", (chunk) => {
          pdfChunks.push(chunk);
        });
        const pdfReadyPromise = new Promise((resolve) => {
          doc.on("end", () => {
            resolve(Buffer.concat(pdfChunks));
          });
        });
        doc.fontSize(20).text("Field Service Management System", { align: "center" });
        doc.fontSize(14).text("Payment Invoice", { align: "center" });
        doc.moveDown(2);
        doc.fontSize(12).text(`Customer Name: ${workOrder.service.customer.user.name}`);
        doc.text(`Customer Email: ${workOrder.service.customer.user.email}`);
        doc.moveDown();
        doc.text(`Servicing date ${workOrder.servicingDate.toString()}`);
        doc.text(`Technician Name: ${workOrder.technician?.user.name}`);
        doc.text(`Technician Rating: ${workOrder.technician?.rating}`);
        doc.text(
          `Technician Completed Jobs: ${workOrder.technician?.jobsCompleted}`
        );
        doc.text(`Technician Phone: ${workOrder.technician?.phone}`);
        doc.moveDown();
        doc.text(`Manager Name: ${workOrder.manager?.user.name}`);
        doc.text(`Manager Phone: ${workOrder.manager.phone}`);
        doc.moveDown();
        doc.text(`Amount Paid: ${result.amount}`);
        doc.text(`Payment Method : bKash`);
        doc.text(`TransectionId : ${result.trxID}`);
        doc.text(`Paid At : ${result.paymentExecuteTime}`);
        doc.moveDown();
        doc.end();
        const pdfBuffer = await pdfReadyPromise;
        await transporter.sendMail({
          from: env_default.smtp_sender,
          to: workOrder.service.customer.user.email,
          subject: "Your Service Payment Invoice - Field Service Management System",
          text: "your payment is completed",
          attachments: [
            {
              filename: "invoice.pdf",
              content: pdfBuffer
            }
          ]
        });
        return {
          result,
          redirectUrl: `${env_default.frontend_url}/dashboard/my-workorder?status=success`
        };
      } else {
        throw new AppError(httpStatus21.BAD_REQUEST, "bkash callback error!");
      }
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionResult;
};
var getMyPayment = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus21.NOT_FOUND, "patient not found");
  }
  const andCondition = [
    {
      workOrder: {
        customer: {
          userId: user.userId
        }
      }
    }
  ];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  const payment = await prisma.payment.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      getwayResponse: true
    }
  });
  const total = await prisma.payment.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    payment,
    meta
  };
};
var getTechnicianPayment = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isTech = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isTech) {
    throw new AppError(httpStatus21.NOT_FOUND, "technician not found");
  }
  const andCondition = [
    {
      workOrder: {
        technician: {
          userId: user.userId
        }
      }
    }
  ];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  const payment = await prisma.payment.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      getwayResponse: true
    }
  });
  const total = await prisma.payment.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    payment,
    meta
  };
};
var getManagerPayment = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus21.NOT_FOUND, "Manager not found");
  }
  const andCondition = [
    {
      workOrder: {
        manager: {
          userId: user.userId
        }
      }
    }
  ];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  const payment = await prisma.payment.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      getwayResponse: true
    }
  });
  const total = await prisma.payment.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    payment,
    meta
  };
};
var getAllPayments = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const andCondition = [];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.status) {
    andCondition.push({
      status: query.status
    });
  }
  if (query.workOrderId) {
    andCondition.push({
      workOrderId: query.workOrderId
    });
  }
  const payment = await prisma.payment.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    omit: {
      getwayResponse: true
    },
    include: {
      workOrder: {
        include: {
          customer: true,
          technician: true,
          manager: true
        }
      }
    }
  });
  const total = await prisma.payment.count({
    where: {
      AND: andCondition
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    payment,
    meta
  };
};
var paymentService = {
  createPayment,
  bkashCallback,
  getMyPayment,
  getTechnicianPayment,
  getAllPayments,
  getManagerPayment
};

// src/app/module/payment/payment.controller.ts
import httpStatus22 from "http-status";
var createpayment = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await paymentService.createPayment(body, user);
  sendResponse(res, {
    statusCode: httpStatus22.OK,
    success: true,
    message: `payment url created successfully`,
    data: result
  });
});
var bkashCallback2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { result, redirectUrl } = await paymentService.bkashCallback(query);
  res.redirect(redirectUrl);
  console.log("payment result = ", result);
});
var getMyPayment2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { payment, meta } = await paymentService.getMyPayment(query, user);
  if (payment.length === 0) {
    throw new AppError(httpStatus22.NOT_FOUND, "payments not found");
  }
  sendResponse(res, {
    statusCode: httpStatus22.OK,
    success: true,
    message: `payment retrive successfully`,
    data: payment,
    meta
  });
});
var getTechPayment = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { payment, meta } = await paymentService.getTechnicianPayment(
    query,
    user
  );
  if (payment.length === 0) {
    throw new AppError(httpStatus22.NOT_FOUND, "payments not found");
  }
  sendResponse(res, {
    statusCode: httpStatus22.OK,
    success: true,
    message: `payment retrive successfully`,
    data: payment,
    meta
  });
});
var getManagerPayment2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { payment, meta } = await paymentService.getManagerPayment(query, user);
  if (payment.length === 0) {
    throw new AppError(httpStatus22.NOT_FOUND, "payments not found");
  }
  sendResponse(res, {
    statusCode: httpStatus22.OK,
    success: true,
    message: `payment retrive successfully`,
    data: payment,
    meta
  });
});
var getAllPayments2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { payment, meta } = await paymentService.getAllPayments(query);
  if (payment.length === 0) {
    throw new AppError(httpStatus22.NOT_FOUND, "payments not found");
  }
  sendResponse(res, {
    statusCode: httpStatus22.OK,
    success: true,
    message: `payment retrive successfully`,
    data: payment,
    meta
  });
});
var paymentController = {
  createpayment,
  bkashCallback: bkashCallback2,
  getMyPayment: getMyPayment2,
  getTechPayment,
  getManagerPayment: getManagerPayment2,
  getAllPayments: getAllPayments2
};

// src/app/module/payment/payment.route.ts
var route9 = Router9();
route9.post("/create", auth(UserRole.CUSTOMER), paymentController.createpayment);
route9.get("/service/callback", paymentController.bkashCallback);
route9.get(
  "my-payments",
  auth(UserRole.CUSTOMER),
  paymentController.getMyPayment
);
route9.get(
  "technician-payments",
  auth(UserRole.TECHNICIAN),
  paymentController.getTechPayment
);
route9.get(
  "manager-payments",
  auth(UserRole.MANAGER),
  paymentController.getManagerPayment
);
route9.get(
  "all-payments",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  paymentController.getAllPayments
);
var paymentRouter = route9;

// src/app/module/attachment/attachment.route.ts
import { Router as Router10 } from "express";

// src/app/module/attachment/attachment.controller.ts
import httpStatus24 from "http-status";

// src/app/module/attachment/attachment.service.ts
import httpStatus23 from "http-status";

// src/app/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
cloudinary.config({
  cloud_name: env_default.cloudinary_cloud_name,
  api_key: env_default.cloudinary_api_key,
  api_secret: env_default.cloudinary_api_secret
});
var storage = multer.memoryStorage();
var upload = multer({ storage });
var Cloudinary = {
  cloudinary,
  upload
};

// src/app/module/attachment/attachment.service.ts
var createAttachment = async (payload, files, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      manager: true,
      technician: true,
      customer: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus23.NOT_FOUND, "user not found");
  }
  const isWrokOrder = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId
    },
    include: {
      technician: true,
      manager: true,
      customer: true
    }
  });
  if (!isWrokOrder) {
    throw new AppError(httpStatus23.NOT_FOUND, "work order not found");
  }
  if (isWrokOrder.status === "CANCELLED" || isWrokOrder.status === "SCHEDULED") {
    throw new AppError(
      httpStatus23.BAD_REQUEST,
      `you can not attached files from ${isWrokOrder.status} status`
    );
  }
  if (user.role === "CUSTOMER") {
    if (isWrokOrder.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "MANAGER") {
    if (isWrokOrder.managerId !== isUser.manager?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "TECHNICIAN") {
    if (isWrokOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  const filesRes = await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        Cloudinary.cloudinary.uploader.upload_stream(
          {
            folder: "Field-Service-Management/Service/Attachment",
            resource_type: "auto"
          },
          async (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new AppError(
                  httpStatus23.BAD_GATEWAY,
                  "No result returned from cloudinary"
                )
              );
            }
            return resolve(result);
          }
        ).end(file?.buffer);
      });
    })
  );
  const createAttach2 = await prisma.attachment.create({
    data: {
      ...payload,
      files: filesRes.map((file) => ({
        url: file.secure_url,
        publicId: file.public_id
      }))
    },
    include: {
      workOrder: true
    }
  });
  return createAttach2;
};
var getMyAttach = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus23.NOT_FOUND, "customer not found");
  }
  const andConditions = [
    {
      workOrder: {
        customerId: isCustomer.id
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.region) {
    const region = query.region;
    const arr = region.split(",").map((item) => item.trim());
    andConditions.push({
      workOrder: {
        region: {
          area: { in: arr }
        }
      }
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const attachments = await prisma.attachment.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.attachment.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    attachments,
    meta
  };
};
var getManager = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isManger = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isManger) {
    throw new AppError(httpStatus23.NOT_FOUND, "manager not found");
  }
  const andConditions = [
    {
      workOrder: {
        managerId: isManger.id
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const attachments = await prisma.attachment.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.attachment.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    attachments,
    meta
  };
};
var getTechnicianAttach = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isTech = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isTech) {
    throw new AppError(httpStatus23.NOT_FOUND, "technician not found");
  }
  const andConditions = [
    {
      workOrder: {
        technicianId: isTech.id
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.region) {
    const region = query.region;
    const arr = region.split(",").map((item) => item.trim());
    andConditions.push({
      workOrder: {
        region: {
          area: { in: arr }
        }
      }
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const attachments = await prisma.attachment.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.attachment.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    attachments,
    meta
  };
};
var getAllAttach = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.region) {
    const region = query.region;
    const arr = region.split(",").map((item) => item.trim());
    andConditions.push({
      workOrder: {
        region: {
          area: { in: arr }
        }
      }
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const attachments = await prisma.attachment.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.attachment.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    attachments,
    meta
  };
};
var udpateAttach = async (payload, id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      technician: true,
      customer: true,
      manager: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus23.NOT_FOUND, "user not found");
  }
  const attachment = await prisma.attachment.findUnique({
    where: {
      id
    },
    include: {
      workOrder: {
        include: {
          service: true
        }
      }
    }
  });
  if (!attachment) {
    throw new AppError(httpStatus23.NOT_FOUND, "Attachment not found");
  }
  if (user.role === "CUSTOMER") {
    if (attachment.workOrder.customerId !== isUser.customer?.id) {
      throw new AppError(
        httpStatus23.UNAUTHORIZED,
        "you can not attach files unauthorized"
      );
    }
  }
  if (user.role === "MANAGER") {
    if (attachment.workOrder.managerId !== isUser.manager?.id) {
      throw new AppError(
        httpStatus23.UNAUTHORIZED,
        "you can not attach files unauthorized"
      );
    }
  }
  if (user.role === "TECHNICIAN") {
    if (attachment.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(
        httpStatus23.UNAUTHORIZED,
        "you can not attach files unauthorized"
      );
    }
  }
  const updated = await prisma.attachment.update({
    where: {
      id: attachment.id
    },
    data: {
      ...payload
    }
  });
  return updated;
};
var deleteAttach = async (id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      technician: true,
      customer: true,
      manager: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus23.NOT_FOUND, "user not found");
  }
  const attachment = await prisma.attachment.findUnique({
    where: {
      id
    },
    include: {
      workOrder: {
        include: {
          service: true
        }
      }
    }
  });
  if (!attachment) {
    throw new AppError(httpStatus23.NOT_FOUND, "Attachment not found");
  }
  if (attachment.isDelete) {
    throw new AppError(httpStatus23.BAD_REQUEST, "attachment already deleted");
  }
  if (user.role === "CUSTOMER") {
    if (attachment.workOrder.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "MANAGER") {
    if (attachment.workOrder.managerId !== isUser.manager?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "TECHNICIAN") {
    if (attachment.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus23.UNAUTHORIZED, "you can not attach files");
    }
  }
  const deleted = await prisma.attachment.update({
    where: {
      id: attachment.id
    },
    data: {
      isDelete: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  return deleted;
};
var attachmentService = {
  createAttachment,
  getMyAttach,
  getTechnicianAttach,
  getManager,
  getAllAttach,
  udpateAttach,
  deleteAttach
};

// src/app/module/attachment/attachment.controller.ts
var createAttach = catchAsync(async (req, res) => {
  const files = req.files;
  const attachment = files?.["attachment"] || [];
  if (attachment.length === 0) {
    throw new AppError(httpStatus24.BAD_REQUEST, "minimum one file need");
  }
  if (!req.body.data) {
    throw new AppError(httpStatus24.BAD_REQUEST, "form data not found");
  }
  const data = JSON.parse(req.body.data);
  const user = req.user;
  const result = await attachmentService.createAttachment(
    data,
    attachment,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus24.CREATED,
    success: true,
    message: `attachment created successfully`,
    data: result
  });
});
var getMyAttach2 = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { attachments, meta } = await attachmentService.getMyAttach(
    query,
    user
  );
  if (attachments.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus24.NOT_FOUND,
      success: false,
      message: `You have no attach files`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `all attachments retrived successfully`,
    data: attachments,
    meta
  });
});
var getAttachTech = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { attachments, meta } = await attachmentService.getTechnicianAttach(
    query,
    user
  );
  if (attachments.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus24.NOT_FOUND,
      success: false,
      message: `You have no attach files`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `all attachments retrived successfully`,
    data: attachments,
    meta
  });
});
var getAttachManager = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { attachments, meta } = await attachmentService.getManager(query, user);
  if (attachments.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus24.NOT_FOUND,
      success: false,
      message: `You have no attach files`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `all attachments retrived successfully`,
    data: attachments,
    meta
  });
});
var getAllTech = catchAsync(async (req, res) => {
  const query = req.query;
  const { attachments, meta } = await attachmentService.getAllAttach(query);
  if (attachments.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus24.NOT_FOUND,
      success: false,
      message: `attachment not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `all attachments retrived successfully`,
    data: attachments,
    meta
  });
});
var updateAttach = catchAsync(async (req, res) => {
  const body = req.body;
  const id = req.params.attachmentId;
  const user = req.user;
  const result = await attachmentService.udpateAttach(body, id, user);
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `attachment updated successfully`,
    data: result
  });
});
var deletedAttach = catchAsync(async (req, res) => {
  const id = req.params.attachmentId;
  const user = req.user;
  const result = await attachmentService.deleteAttach(id, user);
  sendResponse(res, {
    statusCode: httpStatus24.OK,
    success: true,
    message: `soft deleted successfully`,
    data: null
  });
});
var attachmentController = {
  createAttach,
  getMyAttach: getMyAttach2,
  getAttachTech,
  getAttachManager,
  getAllTech,
  updateAttach,
  deletedAttach
};

// src/app/module/attachment/attachment.route.ts
var route10 = Router10();
route10.post(
  "/",
  Cloudinary.upload.fields([
    {
      name: "attachment",
      maxCount: 10
    }
  ]),
  auth(UserRole.CUSTOMER, UserRole.MANAGER, UserRole.TECHNICIAN),
  attachmentController.createAttach
);
route10.get(
  "/my-attachments",
  auth(UserRole.CUSTOMER),
  attachmentController.getMyAttach
);
route10.get(
  "/technician-attachments",
  auth(UserRole.TECHNICIAN),
  attachmentController.getAttachTech
);
route10.get(
  "/manager-attachments",
  auth(UserRole.MANAGER),
  attachmentController.getAttachManager
);
route10.get(
  "/all-attachments",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  attachmentController.getAllTech
);
route10.patch(
  "/update/:attachmentId",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.TECHNICIAN
  ),
  attachmentController.updateAttach
);
route10.patch(
  "/delete/:attachmentId",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.TECHNICIAN
  ),
  attachmentController.deletedAttach
);
var attachmentRouter = route10;

// src/app/module/report/report.route.ts
import { Router as Router11 } from "express";

// src/app/module/report/report.service.ts
import httpStatus25 from "http-status";
var createReport = async (payload, report, user) => {
  const isTech = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      user: true
    }
  });
  if (!isTech) {
    throw new AppError(httpStatus25.NOT_FOUND, "technician not found");
  }
  const isWrokOrder = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId,
      technicianId: isTech.id
    },
    include: {
      service: true
    }
  });
  if (!isWrokOrder) {
    throw new AppError(httpStatus25.NOT_FOUND, "work order not found");
  }
  if (isWrokOrder.status !== "COMPLETED" || isWrokOrder.service.status !== "COMPLETED") {
    throw new AppError(
      httpStatus25.BAD_REQUEST,
      `you can't attach summary report before completed work`
    );
  }
  const reportRes = await new Promise((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: "Field-Service-Management/Service/Report",
        resource_type: "auto"
      },
      async (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(
            new AppError(
              httpStatus25.BAD_GATEWAY,
              "No result returned from cloudinary"
            )
          );
        }
        return resolve(result);
      }
    ).end(report?.buffer);
  });
  const attachReport2 = await prisma.serviceReport.create({
    data: {
      ...payload,
      reportUrl: reportRes.secure_url,
      reportPublicId: reportRes.public_id
    },
    include: {
      workOrder: true
    }
  });
  return attachReport2;
};
var getMyReport = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const isTech = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!isTech) {
    throw new AppError(httpStatus25.NOT_FOUND, "technician not found");
  }
  const andConditions = [
    {
      workOrder: {
        technicianId: isTech.id
      }
    }
  ];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.region) {
    const region = query.region;
    const arr = region.split(",").map((item) => item.trim());
    andConditions.push({
      workOrder: {
        region: {
          area: { in: arr }
        }
      }
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const reports = await prisma.serviceReport.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.serviceReport.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    reports,
    meta
  };
};
var getAllReport = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.search) {
    andConditions.push({
      OR: [
        {
          workOrder: {
            manager: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            technician: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        },
        {
          workOrder: {
            customer: {
              user: {
                name: {
                  contains: query.search,
                  mode: "insensitive"
                }
              }
            }
          }
        }
      ]
    });
  }
  if (query.region) {
    const region = query.region;
    const arr = region.split(",").map((item) => item.trim());
    andConditions.push({
      workOrder: {
        region: {
          area: { in: arr }
        }
      }
    });
  }
  if (query.isDelete) {
    andConditions.push({
      isDelete: query.isDelete
    });
  }
  const reports = await prisma.serviceReport.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.serviceReport.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    reports,
    meta
  };
};
var updateReport = async (payload, report, id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      technician: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus25.NOT_FOUND, "user not found");
  }
  const isReport = await prisma.serviceReport.findUnique({
    where: {
      id
    },
    include: {
      workOrder: true
    }
  });
  if (!isReport) {
    throw new AppError(httpStatus25.NOT_FOUND, "service report not found");
  }
  if (isReport.isDelete) {
    throw new AppError(httpStatus25.BAD_REQUEST, "service report deleted");
  }
  if (user.role === "TECHNICIAN") {
    if (isReport.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus25.UNAUTHORIZED, "you can not update");
    }
  }
  const reportRes = report ? await new Promise((resolve, reject) => {
    Cloudinary.cloudinary.uploader.upload_stream(
      {
        folder: "Field-Service-Management/Service/Report",
        resource_type: "auto"
      },
      async (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(
            new AppError(
              httpStatus25.BAD_GATEWAY,
              "No result returned from cloudinary"
            )
          );
        }
        return resolve(result);
      }
    ).end(report?.buffer);
  }) : null;
  const udpatedReport = await prisma.serviceReport.update({
    where: {
      id: isReport.id
    },
    data: {
      ...payload,
      reportUrl: reportRes ? reportRes.secure_url : isReport.reportUrl,
      reportPublicId: reportRes ? reportRes.public_id : isReport.reportPublicId
    },
    include: {
      workOrder: true
    }
  });
  await Cloudinary.cloudinary.uploader.destroy(isReport.reportPublicId);
  console.log("report deleted from cloudinary");
  return udpatedReport;
};
var deleteReport = async (id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      technician: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus25.NOT_FOUND, "user not found");
  }
  const isReport = await prisma.serviceReport.findUnique({
    where: {
      id
    },
    include: {
      workOrder: true
    }
  });
  if (!isReport) {
    throw new AppError(httpStatus25.NOT_FOUND, "service report not found");
  }
  if (isReport.isDelete) {
    throw new AppError(
      httpStatus25.BAD_REQUEST,
      "service report already deleted deleted"
    );
  }
  if (user.role === "TECHNICIAN") {
    if (isReport.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus25.UNAUTHORIZED, "you can not delete");
    }
  }
  await prisma.serviceReport.update({
    where: {
      id: isReport.id
    },
    data: {
      isDelete: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  await Cloudinary.cloudinary.uploader.destroy(isReport.reportPublicId);
  console.log("report deleted from cloudinary");
};
var reportService = {
  createReport,
  getMyReport,
  getAllReport,
  updateReport,
  deleteReport
};

// src/app/module/report/report.controller.ts
import httpStatus26 from "http-status";
var attachReport = catchAsync(async (req, res) => {
  const report = req.file;
  if (!report) {
    throw new AppError(httpStatus26.BAD_REQUEST, "report must be added");
  }
  let data = null;
  if (req.body.data) {
    data = JSON.parse(req.body.data);
  }
  const user = req.user;
  const result = await reportService.createReport(data, report, user);
  sendResponse(res, {
    statusCode: httpStatus26.CREATED,
    success: true,
    message: `report attached successfully`,
    data: result
  });
});
var getMyReport2 = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { reports, meta } = await reportService.getMyReport(query, user);
  if (reports.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus26.NOT_FOUND,
      success: false,
      message: `You have no report`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus26.OK,
    success: true,
    message: `all reports retrived successfully`,
    data: reports,
    meta
  });
});
var getAllReport2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { reports, meta } = await reportService.getAllReport(query);
  if (reports.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus26.NOT_FOUND,
      success: false,
      message: `service report not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus26.OK,
    success: true,
    message: `all reports retrived successfully`,
    data: reports,
    meta
  });
});
var updateReport2 = catchAsync(async (req, res) => {
  const report = req.file;
  let data = null;
  if (req.body.data) {
    data = JSON.parse(req.body.data);
  }
  const user = req.user;
  const id = req.params.reportId;
  const result = await reportService.updateReport(data, report, id, user);
  sendResponse(res, {
    statusCode: httpStatus26.CREATED,
    success: true,
    message: `report updated successfully`,
    data: result
  });
});
var deleteReport2 = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.reportId;
  await reportService.deleteReport(id, user);
  sendResponse(res, {
    statusCode: httpStatus26.CREATED,
    success: true,
    message: `report deleted successfully`,
    data: null
  });
});
var reportController = {
  attachReport,
  getMyReport: getMyReport2,
  getAllReport: getAllReport2,
  updateReport: updateReport2,
  deleteReport: deleteReport2
};

// src/app/module/report/report.route.ts
var route11 = Router11();
route11.post(
  "/",
  Cloudinary.upload.single("report"),
  auth(UserRole.TECHNICIAN),
  reportController.attachReport
);
route11.get(
  "/my-reports",
  auth(UserRole.TECHNICIAN),
  reportController.getMyReport
);
route11.get(
  "/all-reports",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  reportController.getAllReport
);
route11.patch(
  "/update/:reportId",
  Cloudinary.upload.single("report"),
  auth(UserRole.TECHNICIAN),
  reportController.updateReport
);
route11.patch(
  "/delete/:reportId",
  auth(UserRole.TECHNICIAN, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  reportController.deleteReport
);
var reportRouter = route11;

// src/app/module/feedback/feedback.route.ts
import { Router as Router12 } from "express";

// src/app/module/feedback/feedback.service.ts
import httpStatus27 from "http-status";
var createFeedback = async (payload, user) => {
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      user: true
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus27.NOT_FOUND, "customer not found");
  }
  if (isCustomer.user.status === "BLOCKED") {
    throw new Error("You are bloked! Please unblock first then give review");
  }
  if (isCustomer.isDeleted) {
    throw new Error("You are deleted!");
  }
  const workOrder = await prisma.workOrder.findUnique({
    where: {
      id: payload.workOrderId
    },
    include: {
      service: true
    }
  });
  if (!workOrder) {
    throw new AppError(httpStatus27.NOT_FOUND, "work order not found");
  }
  if (workOrder.status !== "COMPLETED" || workOrder.service.status !== "COMPLETED") {
    throw new AppError(
      httpStatus27.BAD_REQUEST,
      "without complete you can not crate review"
    );
  }
  if (workOrder.customerId !== isCustomer.id) {
    throw new Error("You are not authorized to review");
  }
  const existingFeedback = await prisma.feedback.findFirst({
    where: {
      workOrderId: workOrder.id
    }
  });
  if (existingFeedback) {
    throw new Error("You have already reviewed this service work");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const createFeedback3 = await tx.feedback.create({
        data: {
          ...payload
        },
        include: {
          workOrder: {
            include: {
              technician: true
            }
          }
        }
      });
      const result = await tx.feedback.aggregate({
        _avg: {
          rating: true
        },
        where: {
          workOrder: {
            technicianId: createFeedback3.workOrder.technician?.id
          }
        }
      });
      const avgRating = result._avg.rating ?? 0;
      await tx.technicianProfile.update({
        where: {
          id: createFeedback3.workOrder.technician?.id
        },
        data: {
          rating: avgRating
        }
      });
      return createFeedback3;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
};
var getById = async (id) => {
  const result = await prisma.feedback.findUnique({
    where: {
      id
    },
    include: {
      workOrder: true
    }
  });
  if (!result) {
    throw new AppError(httpStatus27.NOT_FOUND, "feedback not found");
  }
  return result;
};
var getAllFeedbacks = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const andConditions = [];
  if (query.technicianId) {
    andConditions.push({
      workOrder: {
        technicianId: query.technicianId
      }
    });
  }
  if (query.customerId) {
    andConditions.push({
      workOrder: {
        customerId: query.customerId
      }
    });
  }
  if (query.managerId) {
    andConditions.push({
      workOrder: {
        managerId: query.managerId
      }
    });
  }
  if (query.minRating || query.maxRating) {
    andConditions.push({
      rating: {
        ...query.minRating && { gte: Number(query.minRating) },
        ...query.maxRating && { lte: Number(query.maxRating) }
      }
    });
  }
  const allFeedback = await prisma.feedback.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: true
    }
  });
  const total = await prisma.feedback.count({
    where: {
      AND: andConditions
    }
  });
  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
  return {
    allFeedback,
    meta
  };
};
var updateFeedback = async (payload, id, user) => {
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      user: true
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus27.NOT_FOUND, "user not found");
  }
  const feedback = await prisma.feedback.findUnique({
    where: {
      id,
      workOrder: {
        customerId: isCustomer.id
      }
    }
  });
  if (!feedback) {
    throw new AppError(httpStatus27.NOT_FOUND, "feedback not found");
  }
  const result = await prisma.feedback.update({
    where: {
      id: feedback.id,
      workOrder: {
        customerId: isCustomer.id
      }
    },
    data: {
      ...payload
    }
  });
  return result;
};
var deleteFeedback = async (id, user) => {
  const isCustomer = await prisma.customerProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      user: true
    }
  });
  if (!isCustomer) {
    throw new AppError(httpStatus27.NOT_FOUND, "user not found");
  }
  const feedback = await prisma.feedback.findUnique({
    where: {
      id,
      workOrder: {
        customerId: isCustomer.id
      }
    }
  });
  if (!feedback) {
    throw new AppError(httpStatus27.NOT_FOUND, "feedback not found");
  }
  const result = await prisma.feedback.delete({
    where: {
      id: feedback.id,
      workOrder: {
        customerId: isCustomer.id
      }
    }
  });
  return result;
};
var feedbackService = {
  createFeedback,
  getById,
  getAllFeedbacks,
  updateFeedback,
  deleteFeedback
};

// src/app/module/feedback/feedbck.controller.ts
import httpStatus28 from "http-status";
var createFeedback2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await feedbackService.createFeedback(body, user);
  sendResponse(res, {
    statusCode: httpStatus28.CREATED,
    success: true,
    message: `feedback created successfully`,
    data: result
  });
});
var getById2 = catchAsync(async (req, res) => {
  const id = req.params.feedbackId;
  const result = await feedbackService.getById(id);
  sendResponse(res, {
    statusCode: httpStatus28.OK,
    success: true,
    message: `feedback retrived successfully`,
    data: result
  });
});
var getAllFeedbacks2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { allFeedback, meta } = await feedbackService.getAllFeedbacks(query);
  if (allFeedback.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus28.NOT_FOUND,
      success: false,
      message: `feedbacks not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus28.OK,
    success: true,
    message: `feedbacks retrived successfully`,
    data: allFeedback,
    meta
  });
});
var updateFeedback2 = catchAsync(async (req, res) => {
  const id = req.params.feedbackId;
  const body = req.body;
  const user = req.user;
  const result = await feedbackService.updateFeedback(body, id, user);
  sendResponse(res, {
    statusCode: httpStatus28.OK,
    success: true,
    message: `feedback updated successfully`,
    data: result
  });
});
var deleteFeedback2 = catchAsync(async (req, res) => {
  const id = req.params.feedbackId;
  const user = req.user;
  const result = await feedbackService.deleteFeedback(id, user);
  sendResponse(res, {
    statusCode: httpStatus28.OK,
    success: true,
    message: `feedback deleted successfully`,
    data: result
  });
});
var feedbackController = {
  createFeedback: createFeedback2,
  getById: getById2,
  getAllFeedbacks: getAllFeedbacks2,
  updateFeedback: updateFeedback2,
  deleteFeedback: deleteFeedback2
};

// src/app/module/feedback/feedback.route.ts
var route12 = Router12();
route12.post("/", auth(UserRole.CUSTOMER), feedbackController.createFeedback);
route12.get(
  "/:feedbackId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  feedbackController.getById
);
route12.get("/", feedbackController.getAllFeedbacks);
route12.put(
  "/update/:feedbackId",
  auth(UserRole.CUSTOMER),
  feedbackController.updateFeedback
);
route12.delete(
  "/delete/:feedbackId",
  auth(UserRole.CUSTOMER),
  feedbackController.deleteFeedback
);
var feedbackRouter = route12;

// src/app/module/user/user.route.ts
import { Router as Router13 } from "express";

// src/app/module/user/user.service.ts
import httpStatus29 from "http-status";
var profileImageUpload = async (image, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus29.NOT_FOUND, "user not found");
  }
  const cloudinaryRes = await new Promise(
    (resolve, reject) => {
      Cloudinary.cloudinary.uploader.upload_stream(
        {
          folder: "Field-Service-Management/Profile",
          resource_type: "auto"
        },
        async (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(
              new AppError(
                httpStatus29.BAD_GATEWAY,
                "No result returned from cloudinary"
              )
            );
          }
          return resolve(result);
        }
      ).end(image.buffer);
    }
  );
  const updateImage = await prisma.user.update({
    where: {
      id: user.userId
    },
    data: {
      profileImg: cloudinaryRes.secure_url,
      profileImgPublicId: cloudinaryRes.public_id
    },
    omit: {
      password: true
    }
  });
  if (isUser.profileImgPublicId) {
    Cloudinary.cloudinary.uploader.destroy(isUser.profileImgPublicId, {
      invalidate: true
    }).catch((error) => console.log(error));
  }
  return updateImage;
};
var updateCustomer = async (payload, user) => {
  const res = await prisma.customerProfile.update({
    where: {
      userId: user.userId
    },
    data: {
      ...payload
    },
    include: {
      user: true
    }
  });
  return res;
};
var userService = {
  profileImageUpload,
  updateCustomer
};

// src/app/module/user/user.controller.ts
import httpStatus30 from "http-status";
var profileImageUpload2 = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(httpStatus30.BAD_REQUEST, "No file uploaded");
  }
  const user = req.user;
  const result = await userService.profileImageUpload(req.file, user);
  sendResponse(res, {
    statusCode: httpStatus30.OK,
    success: true,
    message: `profile updated successfully`,
    data: result
  });
});
var udpateCustomer = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await userService.updateCustomer(body, user);
  sendResponse(res, {
    statusCode: httpStatus30.OK,
    success: true,
    message: `customer profile updated successfully`,
    data: result
  });
});
var userController = {
  profileImageUpload: profileImageUpload2,
  udpateCustomer
};

// src/app/module/user/user.validation.ts
import z6 from "zod";
var CustomerUpdateZodSchema = z6.object({
  phone: z6.string().optional(),
  address: z6.object({}).passthrough().optional()
});

// src/app/module/user/user.route.ts
var route13 = Router13();
route13.patch(
  "/profile-image",
  auth(
    UserRole.ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.SUPER_ADMIN,
    UserRole.TECHNICIAN
  ),
  Cloudinary.upload.single("profile"),
  userController.profileImageUpload
);
route13.patch(
  "/customer/update-profile",
  zodValidation(CustomerUpdateZodSchema),
  auth(UserRole.CUSTOMER),
  userController.udpateCustomer
);
var userRouter = route13;

// src/app/module/analytics/analytics.route.ts
import { Router as Router14 } from "express";

// src/app/module/analytics/analytics.controller.ts
import httpStatus31 from "http-status";

// src/app/module/analytics/analytics.service.ts
var getCurrentMonthRange = () => {
  const now = /* @__PURE__ */ new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return { startOfMonth, endOfMonth };
};
var getAdminAnalytics = async () => {
  const { startOfMonth, endOfMonth } = getCurrentMonthRange();
  const totalCustomers = await prisma.customerProfile.count({
    where: { isDeleted: false }
  });
  const totalManagers = await prisma.managerProfile.count({
    where: { isDeleted: false }
  });
  const totalTechnicians = await prisma.technicianProfile.count({
    where: { isDeleted: false }
  });
  const rejectedManagers = await prisma.managerProfile.count({
    where: {
      verificationStatus: "REJECTED",
      isDeleted: false
    }
  });
  const pendingManagers = await prisma.managerProfile.count({
    where: {
      verificationStatus: "PENDING",
      isDeleted: false
    }
  });
  const totalServices = await prisma.service.count({
    where: { isDeleted: false }
  });
  const cancelledServices = await prisma.service.count({
    where: {
      status: "CANCELLED",
      isDeleted: false
    }
  });
  const pendingServices = await prisma.service.count({
    where: {
      status: "PENDING",
      isDeleted: false
    }
  });
  const rejectedServices = await prisma.service.count({
    where: {
      status: ServiceStatus.REJECTED,
      isDeleted: false
    }
  });
  const totalWorkOrders = await prisma.workOrder.count();
  const totalRevenue = await prisma.payment.aggregate({
    where: {
      status: PaymentStatus.PAID
    },
    _sum: { amount: true }
  });
  const totalRefunded = await prisma.payment.aggregate({
    where: {
      status: PaymentStatus.REFUNDED
    },
    _sum: { amount: true }
  });
  const currentMonthRevenue = await prisma.payment.aggregate({
    where: {
      status: PaymentStatus.PAID,
      paidAt: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    },
    _sum: { amount: true }
  });
  return {
    totalCustomers,
    totalManagers,
    totalTechnicians,
    rejectedManagers,
    pendingManagers,
    totalServices,
    cancelledServices,
    pendingServices,
    rejectedServices,
    totalWorkOrders,
    totalRevenue: totalRevenue._sum.amount?.toString() ?? "0",
    totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
    currentMonthRevenue: currentMonthRevenue._sum.amount?.toString() ?? "0"
  };
};
var getCustomerAnalytics = async (userId) => {
  const customer = await prisma.customerProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!customer) {
    return {
      totalServices: 0,
      cancelledServices: 0,
      pendingServices: 0,
      completedServices: 0,
      completedWorkOrders: 0,
      totalSpend: "0",
      totalRefund: "0"
    };
  }
  const totalServices = await prisma.service.count({
    where: { customerId: customer.id, isDeleted: false }
  });
  const cancelledServices = await prisma.service.count({
    where: {
      customerId: customer.id,
      status: ServiceStatus.CANCELLED,
      isDeleted: false
    }
  });
  const pendingServices = await prisma.service.count({
    where: {
      customerId: customer.id,
      status: ServiceStatus.PENDING,
      isDeleted: false
    }
  });
  const completedServices = await prisma.service.count({
    where: {
      customerId: customer.id,
      status: ServiceStatus.COMPLETED,
      isDeleted: false
    }
  });
  const completedWorkOrders = await prisma.workOrder.count({
    where: {
      customerId: customer.id,
      status: WorkOrderStatus.COMPLETED
    }
  });
  const totalSpend = await prisma.payment.aggregate({
    where: {
      workOrder: { customerId: customer.id },
      status: PaymentStatus.PAID
    },
    _sum: { amount: true }
  });
  const totalRefund = await prisma.payment.aggregate({
    where: {
      workOrder: { customerId: customer.id },
      status: PaymentStatus.REFUNDED
    },
    _sum: { amount: true }
  });
  return {
    totalServices,
    cancelledServices,
    pendingServices,
    completedServices,
    completedWorkOrders,
    totalSpend: totalSpend._sum.amount?.toString() ?? "0",
    totalRefund: totalRefund._sum.amount?.toString() ?? "0"
  };
};
var getTechnicianAnalytics = async (userId) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      regions: { select: { id: true } },
      rating: true
    }
  });
  if (!technicianProfile) {
    return {
      completedWorkOrders: 0,
      startedWorkOrders: 0,
      totalEarnings: "0",
      totalRefunded: "0",
      coverRegions: 0,
      completeJobs: 0,
      avgRating: 0
    };
  }
  const technicianId = technicianProfile.id;
  const completedWorkOrders = await prisma.workOrder.count({
    where: {
      technicianId,
      status: WorkOrderStatus.COMPLETED
    }
  });
  const startedWorkOrders = await prisma.workOrder.count({
    where: {
      technicianId,
      status: {
        in: [WorkOrderStatus.EN_ROUTE, WorkOrderStatus.STARTED]
      }
    }
  });
  const totalEarnings = await prisma.payment.aggregate({
    where: {
      workOrder: { technicianId },
      status: PaymentStatus.PAID
    },
    _sum: { amount: true }
  });
  const totalRefunded = await prisma.payment.aggregate({
    where: {
      workOrder: { technicianId },
      status: PaymentStatus.REFUNDED
    },
    _sum: { amount: true }
  });
  const completeJobs = await prisma.workOrder.count({
    where: { technicianId, status: WorkOrderStatus.COMPLETED }
  });
  return {
    completedWorkOrders,
    startedWorkOrders,
    totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
    totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
    coverRegions: technicianProfile?.regions.length ?? 0,
    completeJobs,
    avgRating: technicianProfile?.rating ?? 0
  };
};
var getManagerAnalytics = async (userId) => {
  const manager = await prisma.managerProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      region: { select: { id: true, area: true } }
    }
  });
  if (!manager) {
    return {
      coverRegions: 0,
      approvedServices: 0,
      rejectedServices: 0,
      completedWorkByTechnicians: 0,
      totalEarnings: "0",
      totalRefunded: "0"
    };
  }
  const regionIds = manager.region.map((r) => r.id);
  const managesAllRegions = manager.region.some(
    (region) => region.area.toUpperCase() === "ALL"
  );
  const serviceRegionFilter = managesAllRegions ? {} : { regionId: { in: regionIds } };
  const approvedServices = await prisma.service.count({
    where: {
      ...serviceRegionFilter,
      status: ServiceStatus.APPROVED,
      isDeleted: false
    }
  });
  const rejectedServices = await prisma.service.count({
    where: {
      ...serviceRegionFilter,
      status: ServiceStatus.REJECTED,
      isDeleted: false
    }
  });
  const completedWorkByTechnicians = await prisma.workOrder.count({
    where: {
      managerId: manager.id,
      status: WorkOrderStatus.COMPLETED
    }
  });
  const totalEarnings = await prisma.payment.aggregate({
    where: {
      workOrder: {
        managerId: manager.id
      },
      status: PaymentStatus.PAID
    },
    _sum: { amount: true }
  });
  const totalRefunded = await prisma.payment.aggregate({
    where: {
      workOrder: { managerId: manager.id },
      status: PaymentStatus.REFUNDED
    },
    _sum: { amount: true }
  });
  return {
    coverRegions: regionIds.length,
    approvedServices,
    rejectedServices,
    completedWorkByTechnicians,
    totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
    totalRefunded: totalRefunded._sum.amount?.toString() ?? "0"
  };
};
var analyticsService = {
  getAdminAnalytics,
  getCustomerAnalytics,
  getManagerAnalytics,
  getTechnicianAnalytics
};

// src/app/module/analytics/analytics.controller.ts
var getAdminStats = catchAsync(async (req, res) => {
  const result = await analyticsService.getAdminAnalytics();
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: "Admin analytics retrieved successfully",
    data: result
  });
});
var getCustomerStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getCustomerAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: "Customer analytics retrieved successfully",
    data: result
  });
});
var getTechnicianStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getTechnicianAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: "Technician analytics retrieved successfully",
    data: result
  });
});
var getManagerStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getManagerAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: "Manager analytics retrieved successfully",
    data: result
  });
});
var analyticsController = {
  getAdminStats,
  getCustomerStats,
  getTechnicianStats,
  getManagerStats
};

// src/app/module/analytics/analytics.route.ts
var router = Router14();
router.get(
  "/admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  analyticsController.getAdminStats
);
router.get(
  "/customer",
  auth(UserRole.CUSTOMER),
  analyticsController.getCustomerStats
);
router.get(
  "/technician",
  auth(UserRole.TECHNICIAN),
  analyticsController.getTechnicianStats
);
router.get(
  "/manager",
  auth(UserRole.MANAGER),
  analyticsController.getManagerStats
);
var analyticsRoutes = router;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: env_default.frontend_url,
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport3.initialize());
app.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Field Service Management System",
    author: "Md. Shahdat Hossain"
  });
});
app.get("/bkash-test", async (req, res) => {
  const result = await getBkashIdToken();
  res.status(200).json({
    message: true,
    data: result
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/region", regionRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/category", categoryRotuer);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/skill", skillRoute);
app.use("/api/v1/technician", technicianRoutes);
app.use("/api/v1/workorder", workOrderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/attachment", attachmentRouter);
app.use("/api/v1/service-report", reportRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/analytics", analyticsRoutes);
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
import bcrypt3 from "bcryptjs";
import httpStatus32 from "http-status";
var seedSuperAdmin = async () => {
  try {
    const existSuperAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" }
    });
    if (existSuperAdmin) {
      console.log("super admin already exists");
      return;
    }
    const name = env_default.super_admin_name;
    const email = env_default.super_admin_email;
    const password = env_default.super_admin_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpStatus32.INTERNAL_SERVER_ERROR,
        "no super admin name, email, password"
      );
    }
    const hasPass = await bcrypt3.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
    const superAdmi = await prisma.user.create({
      data: {
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: UserRole.SUPER_ADMIN
      }
    });
    console.log("super admin created", superAdmi);
  } catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: env_default.super_admin_email }
    });
  }
};
var seedTesterAdmin = async () => {
  try {
    const name = env_default.tester_admin_name;
    const email = env_default.tester_admin_email;
    const password = env_default.tester_admin_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpStatus32.INTERNAL_SERVER_ERROR,
        "no tester admin name, email, password"
      );
    }
    const existTesterAdmin = await prisma.user.findUnique({
      where: { email }
    });
    if (existTesterAdmin) {
      console.log("tester admin already exists");
      return;
    }
    const hasPass = await bcrypt3.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
    const testerAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: UserRole.ADMIN
      }
    });
    console.log("tester admin created", testerAdmin);
  } catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: env_default.tester_admin_email }
    });
  }
};
var seedTesterManager = async () => {
  try {
    const name = env_default.tester_manager_name;
    const email = env_default.tester_manager_email;
    const password = env_default.tester_manager_password;
    if (!name || !email || !password) {
      throw new AppError(
        httpStatus32.INTERNAL_SERVER_ERROR,
        "no tester manager name, email, password"
      );
    }
    const existTesterManager = await prisma.user.findUnique({
      where: { email }
    });
    if (existTesterManager) {
      console.log("tester manager already exists");
      return;
    }
    const hasPass = await bcrypt3.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
    const testerManager = await prisma.user.create({
      data: {
        name,
        email,
        password: hasPass,
        emailVerified: true,
        needPasswordChange: false,
        role: UserRole.MANAGER,
        manager: {
          create: {
            phone: "01885374041",
            nid: "nid-123456",
            address: {
              village: "Tapadar Para",
              PO: "Farazikandi"
            },
            verificationStatus: "APPROVED",
            region: {
              create: {
                area: "All"
              }
            }
          }
        }
      }
    });
    console.log("tester manager created", testerManager);
  } catch (error) {
    console.log("error", error);
    await prisma.user.delete({
      where: { email: env_default.tester_manager_email }
    });
    await prisma.region.delete({
      where: {
        area: "All",
        manager: {
          some: {
            user: {
              email: env_default.tester_manager_email
            }
          }
        }
      }
    });
  }
};

// src/server.ts
var PORT = env_default.port;
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`server is running port ${PORT}`);
    });
    await redisClient.connect();
    console.log("redis client connected successfully");
    await seedSuperAdmin();
    await seedTesterAdmin();
    await seedTesterManager();
  } catch (error) {
    console.error("Error statring the server", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map