

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
  "inlineSchema": 'model Attachment {\n  id String @id @default(uuid())\n\n  files       Json\n  description String?\n\n  type AttachmentType\n\n  isDelete  Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("attachments")\n}\n\nmodel Availability {\n  id String @id @default(uuid())\n\n  type      AvailabilityType\n  dayOfWeek Int? // 0 = Sunday, 1 = Monday, ..., 6 = Saturday\n  date      DateTime?        @db.Date\n\n  startTime DateTime? @db.Time()\n  endTime   DateTime? @db.Time()\n  isActive  Boolean   @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@unique([technicianId, type, dayOfWeek])\n  @@unique([technicianId, type, date])\n  @@map("availability")\n}\n\nmodel Category {\n  id String @id @default(uuid())\n\n  name        String  @unique\n  icon        String?\n  description String?\n  isActive    Boolean @default(true)\n  duration    Int\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  services Service[]\n  skill    Skill[]\n\n  @@map("categories")\n}\n\nmodel CustomerProfile {\n  id String @id @default(uuid())\n\n  phone     String?\n  address   Json?\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  service  Service[]\n  workOder WorkOrder[]\n\n  @@map("customers")\n}\n\nenum UserRole {\n  SUPER_ADMIN\n  ADMIN\n  CUSTOMER\n  TECHNICIAN\n  MANAGER\n}\n\nenum AuthProvider {\n  CREDENTIAL\n  GOOGLE\n  FACEBOOK\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum Gender {\n  MALE\n  FEMALE\n}\n\nenum AvailabilityType {\n  RECURRING\n  ONE_OFF\n  BLOCKED\n}\n\nenum TechStatus {\n  AVAILABLE\n  BUSY\n  OFF_DUTY\n}\n\nenum Priority {\n  LOW\n  MEDIUM\n  HIGH\n  URGENT\n}\n\nenum ServiceStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  ASSIGNED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum WorkOrderStatus {\n  SCHEDULED\n  EN_ROUTE\n  STARTED\n  COMPLETED\n  CANCELLED\n}\n\nenum ScheduleStatus {\n  SCHEDULED\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nenum AttachmentType {\n  BEFORE_PHOTO\n  AFTER_PHOTO\n  SIGNATURE\n  DOCUMENT\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  FAILED\n  CANCELLED\n  REFUNDED\n}\n\nenum ManagerVerificationStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nmodel Feedback {\n  id String @id @default(uuid())\n\n  rating    Float\n  comment   String?\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("feedbacks")\n}\n\nmodel ManagerProfile {\n  id String @id @default(uuid())\n\n  phone   String\n  address Json?\n  nid     String\n\n  verificationStatus ManagerVerificationStatus @default(PENDING)\n  rejectionReason    String?\n  reviewdBy          String?\n  reviewdAt          DateTime?\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  region    Region[]\n  workOrder WorkOrder[]\n\n  @@map("managerProfiles")\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  paymentId             String        @unique\n  amount                Decimal       @db.Decimal(10, 2)\n  method                String        @default("bKash")\n  transectionId         String?       @unique\n  status                PaymentStatus @default(UNPAID)\n  paidAt                DateTime?\n  payerReference        String?\n  currency              String        @default("BDT")\n  merchantInvoiceNumber String        @unique\n\n  getwayResponse Json?\n\n  refundTrxId  String?\n  refundAmount Decimal? @db.Decimal(10, 2)\n  refundedAt   String?\n  reason       String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("payments")\n}\n\nmodel Region {\n  id String @id @default(uuid())\n\n  area        String  @unique\n  description String?\n  isActive    Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  manager     ManagerProfile[]\n  services    Service[]\n  technicians TechnicianProfile[] @relation("TechnicianRegions")\n  workOrders  WorkOrder[]\n\n  @@map("regions")\n}\n\nmodel Schedule {\n  id String @id @default(uuid())\n\n  servicingDate DateTime\n  startTime     DateTime\n  endTime       DateTime\n  actualStart   DateTime?\n  actualEnd     DateTime?\n\n  status    ScheduleStatus @default(SCHEDULED)\n  isdeleted Boolean        @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  technicianId String\n  technician   TechnicianProfile @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("schedules")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Service {\n  id String @id @default(uuid())\n\n  title       String        @default("")\n  description String?\n  priority    Priority      @default(MEDIUM)\n  status      ServiceStatus @default(PENDING)\n  address     Json\n\n  servicingDate      DateTime  @db.Date\n  preferredStartTime DateTime? @db.Time()\n  preferredEndTime   DateTime? @db.Time()\n  duration           Int?\n\n  isDeleted   Boolean   @default(false)\n  isDeletedAt DateTime?\n\n  assignedAt      DateTime?\n  reviewedBy      String?\n  reviewedAt      DateTime?\n  rejectionReason String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customerId String\n  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n\n  regionId String\n  region   Region @relation(fields: [regionId], references: [id])\n\n  workOrders WorkOrder?\n\n  @@map("services")\n}\n\nmodel ServiceReport {\n  id String @id @default(uuid())\n\n  reportUrl      String\n  reportPublicId String\n  description    String?\n  isDelete       Boolean   @default(false)\n  deletedAt      DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  workOrderId String    @unique\n  workOrder   WorkOrder @relation(fields: [workOrderId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  @@map("serviceReports")\n}\n\nmodel Skill {\n  id String @id @default(uuid())\n\n  name        String    @unique\n  icon        String?\n  description String?\n  isActive    Boolean   @default(true)\n  isDelete    Boolean   @default(false)\n  deletedAt   DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  technician TechnicianProfile[]\n\n  @@map("skills")\n}\n\nmodel TechnicianProfile {\n  id String @id @default(uuid())\n\n  phone              String?\n  address            Json?\n  bio                String?\n  nid                String?\n  isProfileCompleted Boolean   @default(false)\n  isDeleted          Boolean   @default(false)\n  deletedAt          DateTime?\n\n  skills       Skill[]\n  availability Availability[]\n  regions      Region[]       @relation("TechnicianRegions")\n\n  status        TechStatus @default(AVAILABLE)\n  rating        Float?     @default(0)\n  jobsCompleted Int        @default(0)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  workOrder WorkOrder[]\n  schedule  Schedule[]\n\n  @@map("technicians")\n}\n\nmodel User {\n  id String @id @default(uuid())\n\n  name               String\n  email              String  @unique\n  password           String?\n  profileImg         String?\n  profileImgPublicId String?\n\n  googleId           String?      @unique\n  facebookId         String?      @unique\n  authProvider       AuthProvider @default(CREDENTIAL)\n  emailVerified      Boolean      @default(false)\n  role               UserRole     @default(CUSTOMER)\n  status             UserStatus   @default(ACTIVE)\n  needPasswordChange Boolean      @default(false)\n  isDeleted          Boolean      @default(false)\n  deletedAt          DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customer   CustomerProfile?\n  technician TechnicianProfile?\n  manager    ManagerProfile?\n\n  @@map("users")\n}\n\nmodel WorkOrder {\n  id String @id @default(uuid())\n\n  servicingDate DateTime\n\n  status WorkOrderStatus @default(SCHEDULED)\n  note   String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  regionId String\n  region   Region @relation(fields: [regionId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  customerId String\n  customer   CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  technicianId String?\n  technician   TechnicianProfile? @relation(fields: [technicianId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  serviceId String  @unique\n  service   Service @relation(fields: [serviceId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  managerId String?\n  manager   ManagerProfile? @relation(fields: [managerId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  attachment    Attachment[]\n  serviceReport ServiceReport?\n  feedback      Feedback?\n  payment       Payment?\n  schedule      Schedule?\n\n  @@map("workOrders")\n}\n',
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
config2.runtimeDataModel = JSON.parse('{"models":{"Attachment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"files","kind":"scalar","type":"Json"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"AttachmentType"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"AttachmentToWorkOrder"}],"dbName":"attachments"},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"type","kind":"enum","type":"AvailabilityType"},{"name":"dayOfWeek","kind":"scalar","type":"Int"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"AvailabilityToTechnicianProfile"}],"dbName":"availability"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"services","kind":"object","type":"Service","relationName":"CategoryToService"},{"name":"skill","kind":"object","type":"Skill","relationName":"CategoryToSkill"}],"dbName":"categories"},"CustomerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CustomerProfileToUser"},{"name":"service","kind":"object","type":"Service","relationName":"CustomerProfileToService"},{"name":"workOder","kind":"object","type":"WorkOrder","relationName":"CustomerProfileToWorkOrder"}],"dbName":"customers"},"Feedback":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"FeedbackToWorkOrder"}],"dbName":"feedbacks"},"ManagerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"nid","kind":"scalar","type":"String"},{"name":"verificationStatus","kind":"enum","type":"ManagerVerificationStatus"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"reviewdBy","kind":"scalar","type":"String"},{"name":"reviewdAt","kind":"scalar","type":"DateTime"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ManagerProfileToUser"},{"name":"region","kind":"object","type":"Region","relationName":"ManagerProfileToRegion"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ManagerProfileToWorkOrder"}],"dbName":"managerProfiles"},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"paymentId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"method","kind":"scalar","type":"String"},{"name":"transectionId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"paidAt","kind":"scalar","type":"DateTime"},{"name":"payerReference","kind":"scalar","type":"String"},{"name":"currency","kind":"scalar","type":"String"},{"name":"merchantInvoiceNumber","kind":"scalar","type":"String"},{"name":"getwayResponse","kind":"scalar","type":"Json"},{"name":"refundTrxId","kind":"scalar","type":"String"},{"name":"refundAmount","kind":"scalar","type":"Decimal"},{"name":"refundedAt","kind":"scalar","type":"String"},{"name":"reason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"PaymentToWorkOrder"}],"dbName":"payments"},"Region":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToRegion"},{"name":"services","kind":"object","type":"Service","relationName":"RegionToService"},{"name":"technicians","kind":"object","type":"TechnicianProfile","relationName":"TechnicianRegions"},{"name":"workOrders","kind":"object","type":"WorkOrder","relationName":"RegionToWorkOrder"}],"dbName":"regions"},"Schedule":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"DateTime"},{"name":"endTime","kind":"scalar","type":"DateTime"},{"name":"actualStart","kind":"scalar","type":"DateTime"},{"name":"actualEnd","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"ScheduleStatus"},{"name":"isdeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"ScheduleToTechnicianProfile"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ScheduleToWorkOrder"}],"dbName":"schedules"},"Service":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"priority","kind":"enum","type":"Priority"},{"name":"status","kind":"enum","type":"ServiceStatus"},{"name":"address","kind":"scalar","type":"Json"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"preferredStartTime","kind":"scalar","type":"DateTime"},{"name":"preferredEndTime","kind":"scalar","type":"DateTime"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"isDeletedAt","kind":"scalar","type":"DateTime"},{"name":"assignedAt","kind":"scalar","type":"DateTime"},{"name":"reviewedBy","kind":"scalar","type":"String"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToService"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToService"},{"name":"regionId","kind":"scalar","type":"String"},{"name":"region","kind":"object","type":"Region","relationName":"RegionToService"},{"name":"workOrders","kind":"object","type":"WorkOrder","relationName":"ServiceToWorkOrder"}],"dbName":"services"},"ServiceReport":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reportUrl","kind":"scalar","type":"String"},{"name":"reportPublicId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"workOrderId","kind":"scalar","type":"String"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"ServiceReportToWorkOrder"}],"dbName":"serviceReports"},"Skill":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"isDelete","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToSkill"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"SkillToTechnicianProfile"}],"dbName":"skills"},"TechnicianProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"Json"},{"name":"bio","kind":"scalar","type":"String"},{"name":"nid","kind":"scalar","type":"String"},{"name":"isProfileCompleted","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"skills","kind":"object","type":"Skill","relationName":"SkillToTechnicianProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTechnicianProfile"},{"name":"regions","kind":"object","type":"Region","relationName":"TechnicianRegions"},{"name":"status","kind":"enum","type":"TechStatus"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"jobsCompleted","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TechnicianProfileToUser"},{"name":"workOrder","kind":"object","type":"WorkOrder","relationName":"TechnicianProfileToWorkOrder"},{"name":"schedule","kind":"object","type":"Schedule","relationName":"ScheduleToTechnicianProfile"}],"dbName":"technicians"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"profileImg","kind":"scalar","type":"String"},{"name":"profileImgPublicId","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"facebookId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToUser"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToUser"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToUser"}],"dbName":"users"},"WorkOrder":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"servicingDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"WorkOrderStatus"},{"name":"note","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"regionId","kind":"scalar","type":"String"},{"name":"region","kind":"object","type":"Region","relationName":"RegionToWorkOrder"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToWorkOrder"},{"name":"technicianId","kind":"scalar","type":"String"},{"name":"technician","kind":"object","type":"TechnicianProfile","relationName":"TechnicianProfileToWorkOrder"},{"name":"serviceId","kind":"scalar","type":"String"},{"name":"service","kind":"object","type":"Service","relationName":"ServiceToWorkOrder"},{"name":"managerId","kind":"scalar","type":"String"},{"name":"manager","kind":"object","type":"ManagerProfile","relationName":"ManagerProfileToWorkOrder"},{"name":"attachment","kind":"object","type":"Attachment","relationName":"AttachmentToWorkOrder"},{"name":"serviceReport","kind":"object","type":"ServiceReport","relationName":"ServiceReportToWorkOrder"},{"name":"feedback","kind":"object","type":"Feedback","relationName":"FeedbackToWorkOrder"},{"name":"payment","kind":"object","type":"Payment","relationName":"PaymentToWorkOrder"},{"name":"schedule","kind":"object","type":"Schedule","relationName":"ScheduleToWorkOrder"}],"dbName":"workOrders"}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","customer","services","category","skills","technician","availability","regions","workOrder","schedule","_count","skill","region","workOrders","service","workOder","manager","technicians","attachment","serviceReport","feedback","payment","Attachment.findUnique","Attachment.findUniqueOrThrow","Attachment.findFirst","Attachment.findFirstOrThrow","Attachment.findMany","data","Attachment.createOne","Attachment.createMany","Attachment.createManyAndReturn","Attachment.updateOne","Attachment.updateMany","Attachment.updateManyAndReturn","create","update","Attachment.upsertOne","Attachment.deleteOne","Attachment.deleteMany","having","_min","_max","Attachment.groupBy","Attachment.aggregate","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","_avg","_sum","Availability.groupBy","Availability.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","CustomerProfile.findUnique","CustomerProfile.findUniqueOrThrow","CustomerProfile.findFirst","CustomerProfile.findFirstOrThrow","CustomerProfile.findMany","CustomerProfile.createOne","CustomerProfile.createMany","CustomerProfile.createManyAndReturn","CustomerProfile.updateOne","CustomerProfile.updateMany","CustomerProfile.updateManyAndReturn","CustomerProfile.upsertOne","CustomerProfile.deleteOne","CustomerProfile.deleteMany","CustomerProfile.groupBy","CustomerProfile.aggregate","Feedback.findUnique","Feedback.findUniqueOrThrow","Feedback.findFirst","Feedback.findFirstOrThrow","Feedback.findMany","Feedback.createOne","Feedback.createMany","Feedback.createManyAndReturn","Feedback.updateOne","Feedback.updateMany","Feedback.updateManyAndReturn","Feedback.upsertOne","Feedback.deleteOne","Feedback.deleteMany","Feedback.groupBy","Feedback.aggregate","ManagerProfile.findUnique","ManagerProfile.findUniqueOrThrow","ManagerProfile.findFirst","ManagerProfile.findFirstOrThrow","ManagerProfile.findMany","ManagerProfile.createOne","ManagerProfile.createMany","ManagerProfile.createManyAndReturn","ManagerProfile.updateOne","ManagerProfile.updateMany","ManagerProfile.updateManyAndReturn","ManagerProfile.upsertOne","ManagerProfile.deleteOne","ManagerProfile.deleteMany","ManagerProfile.groupBy","ManagerProfile.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","Payment.groupBy","Payment.aggregate","Region.findUnique","Region.findUniqueOrThrow","Region.findFirst","Region.findFirstOrThrow","Region.findMany","Region.createOne","Region.createMany","Region.createManyAndReturn","Region.updateOne","Region.updateMany","Region.updateManyAndReturn","Region.upsertOne","Region.deleteOne","Region.deleteMany","Region.groupBy","Region.aggregate","Schedule.findUnique","Schedule.findUniqueOrThrow","Schedule.findFirst","Schedule.findFirstOrThrow","Schedule.findMany","Schedule.createOne","Schedule.createMany","Schedule.createManyAndReturn","Schedule.updateOne","Schedule.updateMany","Schedule.updateManyAndReturn","Schedule.upsertOne","Schedule.deleteOne","Schedule.deleteMany","Schedule.groupBy","Schedule.aggregate","Service.findUnique","Service.findUniqueOrThrow","Service.findFirst","Service.findFirstOrThrow","Service.findMany","Service.createOne","Service.createMany","Service.createManyAndReturn","Service.updateOne","Service.updateMany","Service.updateManyAndReturn","Service.upsertOne","Service.deleteOne","Service.deleteMany","Service.groupBy","Service.aggregate","ServiceReport.findUnique","ServiceReport.findUniqueOrThrow","ServiceReport.findFirst","ServiceReport.findFirstOrThrow","ServiceReport.findMany","ServiceReport.createOne","ServiceReport.createMany","ServiceReport.createManyAndReturn","ServiceReport.updateOne","ServiceReport.updateMany","ServiceReport.updateManyAndReturn","ServiceReport.upsertOne","ServiceReport.deleteOne","ServiceReport.deleteMany","ServiceReport.groupBy","ServiceReport.aggregate","Skill.findUnique","Skill.findUniqueOrThrow","Skill.findFirst","Skill.findFirstOrThrow","Skill.findMany","Skill.createOne","Skill.createMany","Skill.createManyAndReturn","Skill.updateOne","Skill.updateMany","Skill.updateManyAndReturn","Skill.upsertOne","Skill.deleteOne","Skill.deleteMany","Skill.groupBy","Skill.aggregate","TechnicianProfile.findUnique","TechnicianProfile.findUniqueOrThrow","TechnicianProfile.findFirst","TechnicianProfile.findFirstOrThrow","TechnicianProfile.findMany","TechnicianProfile.createOne","TechnicianProfile.createMany","TechnicianProfile.createManyAndReturn","TechnicianProfile.updateOne","TechnicianProfile.updateMany","TechnicianProfile.updateManyAndReturn","TechnicianProfile.upsertOne","TechnicianProfile.deleteOne","TechnicianProfile.deleteMany","TechnicianProfile.groupBy","TechnicianProfile.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","WorkOrder.findUnique","WorkOrder.findUniqueOrThrow","WorkOrder.findFirst","WorkOrder.findFirstOrThrow","WorkOrder.findMany","WorkOrder.createOne","WorkOrder.createMany","WorkOrder.createManyAndReturn","WorkOrder.updateOne","WorkOrder.updateMany","WorkOrder.updateManyAndReturn","WorkOrder.upsertOne","WorkOrder.deleteOne","WorkOrder.deleteMany","WorkOrder.groupBy","WorkOrder.aggregate","AND","OR","NOT","id","servicingDate","WorkOrderStatus","status","note","createdAt","updatedAt","regionId","customerId","technicianId","serviceId","managerId","equals","in","notIn","lt","lte","gt","gte","contains","startsWith","endsWith","not","name","email","password","profileImg","profileImgPublicId","googleId","facebookId","AuthProvider","authProvider","emailVerified","UserRole","role","UserStatus","needPasswordChange","isDeleted","deletedAt","phone","address","bio","nid","isProfileCompleted","TechStatus","rating","jobsCompleted","userId","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","icon","description","isActive","isDelete","categoryId","reportUrl","reportPublicId","workOrderId","title","Priority","priority","ServiceStatus","preferredStartTime","preferredEndTime","duration","isDeletedAt","assignedAt","reviewedBy","reviewedAt","rejectionReason","startTime","endTime","actualStart","actualEnd","ScheduleStatus","isdeleted","area","paymentId","amount","method","transectionId","PaymentStatus","paidAt","payerReference","currency","merchantInvoiceNumber","getwayResponse","refundTrxId","refundAmount","refundedAt","reason","ManagerVerificationStatus","verificationStatus","reviewdBy","reviewdAt","comment","every","some","none","AvailabilityType","type","dayOfWeek","date","files","AttachmentType","technicianId_type_dayOfWeek","technicianId_type_date","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "vwiMAfABDQsAAOIDACCRAgAAnAQAMJICAABCABCTAgAAnAQAMJQCAQAAAAGZAkAAzwMAIZoCQADPAwAhugJAAM4DACHLAgEAyQMAIc0CIADLAwAh0QIBAMgDACH8AgAAngSBAyL_AgAAnQQAIAEAAAABACATAwAAjQQAIAsAAI8EACAPAAC4BAAgkQIAAMAEADCSAgAAAwAQkwIAAMAEADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMgDACG8AgAAgAQAIL4CAQDIAwAhwwIBAMgDACHdAgEAyQMAIfQCAADBBPQCIvUCAQDJAwAh9gJAAM4DACEIAwAAngcAIAsAAKAHACAPAADTBwAgugIAAMIEACC8AgAAwgQAIN0CAADCBAAg9QIAAMIEACD2AgAAwgQAIBMDAACNBAAgCwAAjwQAIA8AALgEACCRAgAAwAQAMJICAAADABCTAgAAwAQAMJQCAQAAAAGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDIAwAhvAIAAIAEACC-AgEAyAMAIcMCAQAAAAHdAgEAyQMAIfQCAADBBPQCIvUCAQDJAwAh9gJAAM4DACEDAAAAAwAgAQAABAAwAgAABQAgDgMAAI0EACARAACOBAAgEgAAjwQAIJECAACMBAAwkgIAAAcAEJMCAACMBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACDDAgEAyAMAIQEAAAAHACAcBAAApQQAIAYAALsEACAPAACkBAAgEAAAvwQAIJECAAC8BAAwkgIAAAkAEJMCAAC8BAAwlAIBAMgDACGVAkAAzwMAIZcCAAC-BNYCIpkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhuQIgAMsDACG8AgAAnQQAIMsCAQDJAwAhzgIBAMgDACHSAgEAyAMAIdQCAAC9BNQCItYCQADOAwAh1wJAAM4DACHYAgIAswQAIdkCQADOAwAh2gJAAM4DACHbAgEAyQMAIdwCQADOAwAh3QIBAMkDACENBAAA4gYAIAYAANUHACAPAADJBwAgEAAA_AYAIMsCAADCBAAg1gIAAMIEACDXAgAAwgQAINgCAADCBAAg2QIAAMIEACDaAgAAwgQAINsCAADCBAAg3AIAAMIEACDdAgAAwgQAIBwEAAClBAAgBgAAuwQAIA8AAKQEACAQAAC_BAAgkQIAALwEADCSAgAACQAQkwIAALwEADCUAgEAAAABlQJAAM8DACGXAgAAvgTWAiKZAkAAzwMAIZoCQADPAwAhmwIBAMgDACGcAgEAyAMAIbkCIADLAwAhvAIAAJ0EACDLAgEAyQMAIc4CAQDIAwAh0gIBAMgDACHUAgAAvQTUAiLWAkAAzgMAIdcCQADOAwAh2AICALMEACHZAkAAzgMAIdoCQADOAwAh2wIBAMkDACHcAkAAzgMAId0CAQDJAwAhAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAAJACABAAAKADACAAALACAPBgAAuwQAIAgAAK4EACCRAgAAugQAMJICAAAOABCTAgAAugQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIasCAQDIAwAhugJAAM4DACHKAgEAyQMAIcsCAQDJAwAhzAIgAMsDACHNAiAAywMAIc4CAQDIAwAhBQYAANUHACAIAADRBwAgugIAAMIEACDKAgAAwgQAIMsCAADCBAAgDwYAALsEACAIAACuBAAgkQIAALoEADCSAgAADgAQkwIAALoEADCUAgEAAAABmQJAAM8DACGaAkAAzwMAIasCAQAAAAG6AkAAzgMAIcoCAQDJAwAhywIBAMkDACHMAiAAywMAIc0CIADLAwAhzgIBAMgDACEDAAAADgAgAQAADwAwAgAAEAAgFwMAAI0EACAHAACTBAAgCQAAtwQAIAoAALgEACALAACPBAAgDAAAuQQAIJECAAC0BAAwkgIAABIAEJMCAAC0BAAwlAIBAMgDACGXAgAAtQTBAiKZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACC9AgEAyQMAIb4CAQDJAwAhvwIgAMsDACHBAggAtgQAIcICAgCSBAAhwwIBAMgDACEMAwAAngcAIAcAALwHACAJAADSBwAgCgAA0wcAIAsAAKAHACAMAADUBwAgugIAAMIEACC7AgAAwgQAILwCAADCBAAgvQIAAMIEACC-AgAAwgQAIMECAADCBAAgFwMAAI0EACAHAACTBAAgCQAAtwQAIAoAALgEACALAACPBAAgDAAAuQQAIJECAAC0BAAwkgIAABIAEJMCAAC0BAAwlAIBAAAAAZcCAAC1BMECIpkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMkDACG8AgAAgAQAIL0CAQDJAwAhvgIBAMkDACG_AiAAywMAIcECCAC2BAAhwgICAJIEACHDAgEAAAABAwAAABIAIAEAABMAMAIAABQAIAMAAAAOACABAAAPADACAAAQACAOCAAAoQQAIJECAACxBAAwkgIAABcAEJMCAACxBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhnQIBAMgDACHMAiAAywMAId4CQADOAwAh3wJAAM4DACH8AgAAsgT8AiL9AgIAswQAIf4CQADOAwAhBQgAAOMGACDeAgAAwgQAIN8CAADCBAAg_QIAAMIEACD-AgAAwgQAIBAIAAChBAAgkQIAALEEADCSAgAAFwAQkwIAALEEADCUAgEAAAABmQJAAM8DACGaAkAAzwMAIZ0CAQDIAwAhzAIgAMsDACHeAkAAzgMAId8CQADOAwAh_AIAALIE_AIi_QICALMEACH-AkAAzgMAIYEDAACvBAAgggMAALAEACADAAAAFwAgAQAAGAAwAgAAGQAgDQUAAI4EACAQAACPBAAgEwAArQQAIBQAAK4EACCRAgAArAQAMJICAAAbABCTAgAArAQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIcsCAQDJAwAhzAIgAMsDACHkAgEAyAMAIQUFAACfBwAgEAAAoAcAIBMAANAHACAUAADRBwAgywIAAMIEACANBQAAjgQAIBAAAI8EACATAACtBAAgFAAArgQAIJECAACsBAAwkgIAABsAEJMCAACsBAAwlAIBAAAAAZkCQADPAwAhmgJAAM8DACHLAgEAyQMAIcwCIADLAwAh5AIBAAAAAQMAAAAbACABAAAcADACAAAdACAYBAAApQQAIAgAANEDACAMAACrBAAgDwAApAQAIBEAAKYEACATAADSAwAgFQAApwQAIBYAAKgEACAXAACpBAAgGAAAqgQAIJECAACiBAAwkgIAAB8AEJMCAACiBAAwlAIBAMgDACGVAkAAzwMAIZcCAACjBJcCIpgCAQDJAwAhmQJAAM8DACGaAkAAzwMAIZsCAQDIAwAhnAIBAMgDACGdAgEAyQMAIZ4CAQDIAwAhnwIBAMkDACENBAAA4gYAIAgAAOMGACAMAADPBwAgDwAAyQcAIBEAAMoHACATAADkBgAgFQAAywcAIBYAAMwHACAXAADNBwAgGAAAzgcAIJgCAADCBAAgnQIAAMIEACCfAgAAwgQAIBgEAAClBAAgCAAA0QMAIAwAAKsEACAPAACkBAAgEQAApgQAIBMAANIDACAVAACnBAAgFgAAqAQAIBcAAKkEACAYAACqBAAgkQIAAKIEADCSAgAAHwAQkwIAAKIEADCUAgEAAAABlQJAAM8DACGXAgAAowSXAiKYAgEAyQMAIZkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhnQIBAMkDACGeAgEAAAABnwIBAMkDACEDAAAAHwAgAQAAIAAwAgAAIQAgEggAAKEEACALAADiAwAgkQIAAJ8EADCSAgAAIwAQkwIAAJ8EADCUAgEAyAMAIZUCQADPAwAhlwIAAKAE4wIimQJAAM8DACGaAkAAzwMAIZ0CAQDIAwAhugJAAM4DACHRAgEAyAMAId4CQADPAwAh3wJAAM8DACHgAkAAzgMAIeECQADOAwAh4wIgAMsDACEFCAAA4wYAIAsAAPwGACC6AgAAwgQAIOACAADCBAAg4QIAAMIEACASCAAAoQQAIAsAAOIDACCRAgAAnwQAMJICAAAjABCTAgAAnwQAMJQCAQAAAAGVAkAAzwMAIZcCAACgBOMCIpkCQADPAwAhmgJAAM8DACGdAgEAyAMAIboCQADOAwAh0QIBAAAAAd4CQADPAwAh3wJAAM8DACHgAkAAzgMAIeECQADOAwAh4wIgAMsDACEDAAAAIwAgAQAAJAAwAgAAJQAgAQAAAA4AIAEAAAAXACABAAAAGwAgAQAAAB8AIAEAAAAjACABAAAAEgAgAQAAAAkAIAEAAAAOACABAAAAHwAgAwAAAB8AIAEAACAAMAIAACEAIAEAAAAJACABAAAAHwAgAQAAABIAIAEAAAADACADAAAAGwAgAQAAHAAwAgAAHQAgAwAAAB8AIAEAACAAMAIAACEAIAEAAAAbACABAAAAHwAgAwAAAAkAIAEAAAoAMAIAAAsAIAMAAAASACABAAATADACAAAUACADAAAAHwAgAQAAIAAwAgAAIQAgAQAAAAMAIAEAAAAJACABAAAAEgAgAQAAAB8AIAEAAAASACABAAAAAwAgDQsAAOIDACCRAgAAnAQAMJICAABCABCTAgAAnAQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIboCQADOAwAhywIBAMkDACHNAiAAywMAIdECAQDIAwAh_AIAAJ4EgQMi_wIAAJ0EACADCwAA_AYAILoCAADCBAAgywIAAMIEACADAAAAQgAgAQAAQwAwAgAAAQAgDQsAAOIDACCRAgAA4QMAMJICAABFABCTAgAA4QMAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIboCQADOAwAhywIBAMkDACHNAiAAywMAIc8CAQDIAwAh0AIBAMgDACHRAgEAyAMAIQEAAABFACAMCwAA4gMAIJECAACJBAAwkgIAAEcAEJMCAACJBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIcECCACKBAAh0QIBAMgDACH3AgEAyQMAIQEAAABHACAWCwAA4gMAIJECAAD9AwAwkgIAAEkAEJMCAAD9AwAwlAIBAMgDACGXAgAA_wPqAiKZAkAAzwMAIZoCQADPAwAh0QIBAMgDACHlAgEAyAMAIeYCEAD-AwAh5wIBAMgDACHoAgEAyQMAIeoCQADOAwAh6wIBAMkDACHsAgEAyAMAIe0CAQDIAwAh7gIAAIAEACDvAgEAyQMAIfACEACBBAAh8QIBAMkDACHyAgEAyQMAIQEAAABJACABAAAAIwAgAQAAAEIAIAEAAAABACADAAAAQgAgAQAAQwAwAgAAAQAgAwAAAEIAIAEAAEMAMAIAAAEAIAMAAABCACABAABDADACAAABACAKCwAAyAcAIJQCAQAAAAGZAkAAAAABmgJAAAAAAboCQAAAAAHLAgEAAAABzQIgAAAAAdECAQAAAAH8AgAAAIEDAv8CgAAAAAEBHgAAUQAgCZQCAQAAAAGZAkAAAAABmgJAAAAAAboCQAAAAAHLAgEAAAABzQIgAAAAAdECAQAAAAH8AgAAAIEDAv8CgAAAAAEBHgAAUwAwAR4AAFMAMAoLAADHBwAglAIBAMYEACGZAkAAxwQAIZoCQADHBAAhugJAANkEACHLAgEAyQQAIc0CIADbBAAh0QIBAMYEACH8AgAA-wSBAyL_AoAAAAABAgAAAAEAIB4AAFYAIAmUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG6AkAA2QQAIcsCAQDJBAAhzQIgANsEACHRAgEAxgQAIfwCAAD7BIEDIv8CgAAAAAECAAAAQgAgHgAAWAAgAgAAAEIAIB4AAFgAIAMAAAABACAlAABRACAmAABWACABAAAAAQAgAQAAAEIAIAUNAADEBwAgKwAAxgcAICwAAMUHACC6AgAAwgQAIMsCAADCBAAgDJECAACYBAAwkgIAAF8AEJMCAACYBAAwlAIBAKkDACGZAkAAqgMAIZoCQACqAwAhugJAALwDACHLAgEArAMAIc0CIAC5AwAh0QIBAKkDACH8AgAAmQSBAyL_AgAA5gMAIAMAAABCACABAABeADAqAABfACADAAAAQgAgAQAAQwAwAgAAAQAgAQAAABkAIAEAAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgAwAAABcAIAEAABgAMAIAABkAIAMAAAAXACABAAAYADACAAAZACALCAAAwwcAIJQCAQAAAAGZAkAAAAABmgJAAAAAAZ0CAQAAAAHMAiAAAAAB3gJAAAAAAd8CQAAAAAH8AgAAAPwCAv0CAgAAAAH-AkAAAAABAR4AAGcAIAqUAgEAAAABmQJAAAAAAZoCQAAAAAGdAgEAAAABzAIgAAAAAd4CQAAAAAHfAkAAAAAB_AIAAAD8AgL9AgIAAAAB_gJAAAAAAQEeAABpADABHgAAaQAwCwgAAMIHACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACGdAgEAxgQAIcwCIADbBAAh3gJAANkEACHfAkAA2QQAIfwCAADuBfwCIv0CAgDvBQAh_gJAANkEACECAAAAGQAgHgAAbAAgCpQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIZ0CAQDGBAAhzAIgANsEACHeAkAA2QQAId8CQADZBAAh_AIAAO4F_AIi_QICAO8FACH-AkAA2QQAIQIAAAAXACAeAABuACACAAAAFwAgHgAAbgAgAwAAABkAICUAAGcAICYAAGwAIAEAAAAZACABAAAAFwAgCQ0AAL0HACArAADABwAgLAAAvwcAID0AAL4HACA-AADBBwAg3gIAAMIEACDfAgAAwgQAIP0CAADCBAAg_gIAAMIEACANkQIAAJQEADCSAgAAdQAQkwIAAJQEADCUAgEAqQMAIZkCQACqAwAhmgJAAKoDACGdAgEAqQMAIcwCIAC5AwAh3gJAALwDACHfAkAAvAMAIfwCAACVBPwCIv0CAgDnAwAh_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_A-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_wYAID0AAP4GACA-AACBBwAgywIAAMIEACDWAgAAwgQAINcCAADCBAAg2AIAAMIEACDZAgAAwgQAINoCAADCBAAg2wIAAMIEACDcAgAAwgQAIN0CAADCBAAgGJECAADjAwAwkgIAAK4CABCTAgAA4wMAMJQCAQCpAwAhlQJAAKoDACGXAgAA5QPWAiKZAkAAqgMAIZoCQACqAwAhmwIBAKkDACGcAgEAqQMAIbkCIAC5AwAhvAIAAOYDACDLAgEArAMAIc4CAQCpAwAh0gIBAKkDACHUAgAA5APUAiLWAkAAvAMAIdcCQAC8AwAh2AICAOcDACHZAkAAvAMAIdoCQAC8AwAh2wIBAKwDACHcAkAAvAMAId0CAQCsAwAhAwAAAAkAIAEAAK0CADAqAACuAgAgAwAAAAkAIAEAAAoAMAIAAAsAIA0LAADiAwAgkQIAAOEDADCSAgAARQAQkwIAAOEDADCUAgEAAAABmQJAAM8DACGaAkAAzwMAIboCQADOAwAhywIBAMkDACHNAiAAywMAIc8CAQDIAwAh0AIBAMgDACHRAgEAAAABAQAAALECACABAAAAsQIAIAMLAAD8BgAgugIAAMIEACDLAgAAwgQAIAMAAABFACABAAC0AgAwAgAAsQIAIAMAAABFACABAAC0AgAwAgAAsQIAIAMAAABFACABAAC0AgAwAgAAsQIAIAoLAAD7BgAglAIBAAAAAZkCQAAAAAGaAkAAAAABugJAAAAAAcsCAQAAAAHNAiAAAAABzwIBAAAAAdACAQAAAAHRAgEAAAABAR4AALgCACAJlAIBAAAAAZkCQAAAAAGaAkAAAAABugJAAAAAAcsCAQAAAAHNAiAAAAABzwIBAAAAAdACAQAAAAHRAgEAAAABAR4AALoCADABHgAAugIAMAoLAAD6BgAglAIBAMYEACGZAkAAxwQAIZoCQADHBAAhugJAANkEACHLAgEAyQQAIc0CIADbBAAhzwIBAMYEACHQAgEAxgQAIdECAQDGBAAhAgAAALECACAeAAC9AgAgCZQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIboCQADZBAAhywIBAMkEACHNAiAA2wQAIc8CAQDGBAAh0AIBAMYEACHRAgEAxgQAIQIAAABFACAeAAC_AgAgAgAAAEUAIB4AAL8CACADAAAAsQIAICUAALgCACAmAAC9AgAgAQAAALECACABAAAARQAgBQ0AAPcGACArAAD5BgAgLAAA-AYAILoCAADCBAAgywIAAMIEACAMkQIAAOADADCSAgAAxgIAEJMCAADgAwAwlAIBAKkDACGZAkAAqgMAIZoCQACqAwAhugJAALwDACHLAgEArAMAIc0CIAC5AwAhzwIBAKkDACHQAgEAqQMAIdECAQCpAwAhAwAAAEUAIAEAAMUCADAqAADGAgAgAwAAAEUAIAEAALQCADACAACxAgAgAQAAABAAIAEAAAAQACADAAAADgAgAQAADwAwAgAAEAAgAwAAAA4AIAEAAA8AMAIAABAAIAMAAAAOACABAAAPADACAAAQACAMBgAA_gUAIAgAAPYGACCUAgEAAAABmQJAAAAAAZoCQAAAAAGrAgEAAAABugJAAAAAAcoCAQAAAAHLAgEAAAABzAIgAAAAAc0CIAAAAAHOAgEAAAABAR4AAM4CACAKlAIBAAAAAZkCQAAAAAGaAkAAAAABqwIBAAAAAboCQAAAAAHKAgEAAAABywIBAAAAAcwCIAAAAAHNAiAAAAABzgIBAAAAAQEeAADQAgAwAR4AANACADAMBgAA_AUAIAgAAO0GACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACGrAgEAxgQAIboCQADZBAAhygIBAMkEACHLAgEAyQQAIcwCIADbBAAhzQIgANsEACHOAgEAxgQAIQIAAAAQACAeAADTAgAgCpQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIasCAQDGBAAhugJAANkEACHKAgEAyQQAIcsCAQDJBAAhzAIgANsEACHNAiAA2wQAIc4CAQDGBAAhAgAAAA4AIB4AANUCACACAAAADgAgHgAA1QIAIAMAAAAQACAlAADOAgAgJgAA0wIAIAEAAAAQACABAAAADgAgBg0AAOoGACArAADsBgAgLAAA6wYAILoCAADCBAAgygIAAMIEACDLAgAAwgQAIA2RAgAA3wMAMJICAADcAgAQkwIAAN8DADCUAgEAqQMAIZkCQACqAwAhmgJAAKoDACGrAgEAqQMAIboCQAC8AwAhygIBAKwDACHLAgEArAMAIcwCIAC5AwAhzQIgALkDACHOAgEAqQMAIQMAAAAOACABAADbAgAwKgAA3AIAIAMAAAAOACABAAAPADACAAAQACABAAAAFAAgAQAAABQAIAMAAAASACABAAATADACAAAUACADAAAAEgAgAQAAEwAwAgAAFAAgAwAAABIAIAEAABMAMAIAABQAIBQDAACCBgAgBwAAgAYAIAkAAIEGACAKAADBBgAgCwAAgwYAIAwAAIQGACCUAgEAAAABlwIAAADBAgKZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAG9AgEAAAABvgIBAAAAAb8CIAAAAAHBAggAAAABwgICAAAAAcMCAQAAAAEBHgAA5AIAIA6UAgEAAAABlwIAAADBAgKZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAG9AgEAAAABvgIBAAAAAb8CIAAAAAHBAggAAAABwgICAAAAAcMCAQAAAAEBHgAA5gIAMAEeAADmAgAwFAMAAMoFACAHAADIBQAgCQAAyQUAIAoAAKkGACALAADLBQAgDAAAzAUAIJQCAQDGBAAhlwIAAMQFwQIimQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAyQQAIbwCgAAAAAG9AgEAyQQAIb4CAQDJBAAhvwIgANsEACHBAggAxQUAIcICAgDGBQAhwwIBAMYEACECAAAAFAAgHgAA6QIAIA6UAgEAxgQAIZcCAADEBcECIpkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABvQIBAMkEACG-AgEAyQQAIb8CIADbBAAhwQIIAMUFACHCAgIAxgUAIcMCAQDGBAAhAgAAABIAIB4AAOsCACACAAAAEgAgHgAA6wIAIAMAAAAUACAlAADkAgAgJgAA6QIAIAEAAAAUACABAAAAEgAgCw0AAOUGACArAADoBgAgLAAA5wYAID0AAOYGACA-AADpBgAgugIAAMIEACC7AgAAwgQAILwCAADCBAAgvQIAAMIEACC-AgAAwgQAIMECAADCBAAgEZECAADTAwAwkgIAAPICABCTAgAA0wMAMJQCAQCpAwAhlwIAANUDwQIimQJAAKoDACGaAkAAqgMAIbkCIAC5AwAhugJAALwDACG7AgEArAMAIbwCAADUAwAgvQIBAKwDACG-AgEArAMAIb8CIAC5AwAhwQIIANYDACHCAgIA1wMAIcMCAQCpAwAhAwAAABIAIAEAAPECADAqAADyAgAgAwAAABIAIAEAABMAMAIAABQAIBcEAADQAwAgCAAA0QMAIBMAANIDACCRAgAAxwMAMJICAAD4AgAQkwIAAMcDADCUAgEAAAABlwIAAM0DuAIimQJAAM8DACGaAkAAzwMAIasCAQDIAwAhrAIBAAAAAa0CAQDJAwAhrgIBAMkDACGvAgEAyQMAIbACAQAAAAGxAgEAAAABswIAAMoDswIitAIgAMsDACG2AgAAzAO2AiK4AiAAywMAIbkCIADLAwAhugJAAM4DACEBAAAA9QIAIAEAAAD1AgAgFwQAANADACAIAADRAwAgEwAA0gMAIJECAADHAwAwkgIAAPgCABCTAgAAxwMAMJQCAQDIAwAhlwIAAM0DuAIimQJAAM8DACGaAkAAzwMAIasCAQDIAwAhrAIBAMgDACGtAgEAyQMAIa4CAQDJAwAhrwIBAMkDACGwAgEAyQMAIbECAQDJAwAhswIAAMoDswIitAIgAMsDACG2AgAAzAO2AiK4AiAAywMAIbkCIADLAwAhugJAAM4DACEJBAAA4gYAIAgAAOMGACATAADkBgAgrQIAAMIEACCuAgAAwgQAIK8CAADCBAAgsAIAAMIEACCxAgAAwgQAILoCAADCBAAgAwAAAPgCACABAAD5AgAwAgAA9QIAIAMAAAD4AgAgAQAA-QIAMAIAAPUCACADAAAA-AIAIAEAAPkCADACAAD1AgAgFAQAAN8GACAIAADgBgAgEwAA4QYAIJQCAQAAAAGXAgAAALgCApkCQAAAAAGaAkAAAAABqwIBAAAAAawCAQAAAAGtAgEAAAABrgIBAAAAAa8CAQAAAAGwAgEAAAABsQIBAAAAAbMCAAAAswICtAIgAAAAAbYCAAAAtgICuAIgAAAAAbkCIAAAAAG6AkAAAAABAR4AAP0CACARlAIBAAAAAZcCAAAAuAICmQJAAAAAAZoCQAAAAAGrAgEAAAABrAIBAAAAAa0CAQAAAAGuAgEAAAABrwIBAAAAAbACAQAAAAGxAgEAAAABswIAAACzAgK0AiAAAAABtgIAAAC2AgK4AiAAAAABuQIgAAAAAboCQAAAAAEBHgAA_wIAMAEeAAD_AgAwFAQAAI4FACAIAACPBQAgEwAAkAUAIJQCAQDGBAAhlwIAAI0FuAIimQJAAMcEACGaAkAAxwQAIasCAQDGBAAhrAIBAMYEACGtAgEAyQQAIa4CAQDJBAAhrwIBAMkEACGwAgEAyQQAIbECAQDJBAAhswIAAIsFswIitAIgANsEACG2AgAAjAW2AiK4AiAA2wQAIbkCIADbBAAhugJAANkEACECAAAA9QIAIB4AAIIDACARlAIBAMYEACGXAgAAjQW4AiKZAkAAxwQAIZoCQADHBAAhqwIBAMYEACGsAgEAxgQAIa0CAQDJBAAhrgIBAMkEACGvAgEAyQQAIbACAQDJBAAhsQIBAMkEACGzAgAAiwWzAiK0AiAA2wQAIbYCAACMBbYCIrgCIADbBAAhuQIgANsEACG6AkAA2QQAIQIAAAD4AgAgHgAAhAMAIAIAAAD4AgAgHgAAhAMAIAMAAAD1AgAgJQAA_QIAICYAAIIDACABAAAA9QIAIAEAAAD4AgAgCQ0AAIgFACArAACKBQAgLAAAiQUAIK0CAADCBAAgrgIAAMIEACCvAgAAwgQAILACAADCBAAgsQIAAMIEACC6AgAAwgQAIBSRAgAAtwMAMJICAACLAwAQkwIAALcDADCUAgEAqQMAIZcCAAC7A7gCIpkCQACqAwAhmgJAAKoDACGrAgEAqQMAIawCAQCpAwAhrQIBAKwDACGuAgEArAMAIa8CAQCsAwAhsAIBAKwDACGxAgEArAMAIbMCAAC4A7MCIrQCIAC5AwAhtgIAALoDtgIiuAIgALkDACG5AiAAuQMAIboCQAC8AwAhAwAAAPgCACABAACKAwAwKgAAiwMAIAMAAAD4AgAgAQAA-QIAMAIAAPUCACABAAAAIQAgAQAAACEAIAMAAAAfACABAAAgADACAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIBUEAAD_BAAgCAAAgAUAIAwAAIcFACAPAAD-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_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_AMAID4AAPwDACCgAhAAAAABoQIQAAAABKICEAAAAASjAhAAAAABpAIQAAAAAaUCEAAAAAGmAhAAAAABqgIQAPsDACEHDQAAsQMAICsAAPoDACAsAAD6AwAgoAIAAADqAgKhAgAAAOoCCKICAAAA6gIIqgIAAPkD6gIiDQ0AAK4DACArAAD4AwAgLAAA-AMAID0AAPgDACA-AAD4AwAgoAIQAAAAAaECEAAAAAWiAhAAAAAFowIQAAAAAaQCEAAAAAGlAhAAAAABpgIQAAAAAaoCEAD3AwAhDQ0AAK4DACArAAD4AwAgLAAA-AMAID0AAPgDACA-AAD4AwAgoAIQAAAAAaECEAAAAAWiAhAAAAAFowIQAAAAAaQCEAAAAAGlAhAAAAABpgIQAAAAAaoCEAD3AwAhCKACEAAAAAGhAhAAAAAFogIQAAAABaMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA-AMAIQcNAACxAwAgKwAA-gMAICwAAPoDACCgAgAAAOoCAqECAAAA6gIIogIAAADqAgiqAgAA-QPqAiIEoAIAAADqAgKhAgAAAOoCCKICAAAA6gIIqgIAAPoD6gIiDQ0AALEDACArAAD8AwAgLAAA_AMAID0AAPwDACA-AAD8AwAgoAIQAAAAAaECEAAAAASiAhAAAAAEowIQAAAAAaQCEAAAAAGlAhAAAAABpgIQAAAAAaoCEAD7AwAhCKACEAAAAAGhAhAAAAAEogIQAAAABKMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA_AMAIRYLAADiAwAgkQIAAP0DADCSAgAASQAQkwIAAP0DADCUAgEAyAMAIZcCAAD_A-oCIpkCQADPAwAhmgJAAM8DACHRAgEAyAMAIeUCAQDIAwAh5gIQAP4DACHnAgEAyAMAIegCAQDJAwAh6gJAAM4DACHrAgEAyQMAIewCAQDIAwAh7QIBAMgDACHuAgAAgAQAIO8CAQDJAwAh8AIQAIEEACHxAgEAyQMAIfICAQDJAwAhCKACEAAAAAGhAhAAAAAEogIQAAAABKMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA_AMAIQSgAgAAAOoCAqECAAAA6gIIogIAAADqAgiqAgAA-gPqAiIMoAKAAAAAAaMCgAAAAAGkAoAAAAABpQKAAAAAAaYCgAAAAAGqAoAAAAABxAIBAAAAAcUCAQAAAAHGAgEAAAABxwKAAAAAAcgCgAAAAAHJAoAAAAABCKACEAAAAAGhAhAAAAAFogIQAAAABaMCEAAAAAGkAhAAAAABpQIQAAAAAaYCEAAAAAGqAhAA-AMAIRCRAgAAggQAMJICAADUAQAQkwIAAIIEADCUAgEAqQMAIZkCQACqAwAhmgJAAKoDACG5AiAAuQMAIboCQAC8AwAhuwIBAKkDACG8AgAA1AMAIL4CAQCpAwAhwwIBAKkDACHdAgEArAMAIfQCAACDBPQCIvUCAQCsAwAh9gJAALwDACEHDQAAsQMAICsAAIUEACAsAACFBAAgoAIAAAD0AgKhAgAAAPQCCKICAAAA9AIIqgIAAIQE9AIiBw0AALEDACArAACFBAAgLAAAhQQAIKACAAAA9AICoQIAAAD0AgiiAgAAAPQCCKoCAACEBPQCIgSgAgAAAPQCAqECAAAA9AIIogIAAAD0AgiqAgAAhQT0AiILkQIAAIYEADCSAgAAvgEAEJMCAACGBAAwlAIBAKkDACGZAkAAqgMAIZoCQACqAwAhuQIgALkDACG6AkAAvAMAIcECCACHBAAh0QIBAKkDACH3AgEArAMAIQ0NAACxAwAgKwAA2QMAICwAANkDACA9AADZAwAgPgAA2QMAIKACCAAAAAGhAggAAAAEogIIAAAABKMCCAAAAAGkAggAAAABpQIIAAAAAaYCCAAAAAGqAggAiAQAIQ0NAACxAwAgKwAA2QMAICwAANkDACA9AADZAwAgPgAA2QMAIKACCAAAAAGhAggAAAAEogIIAAAABKMCCAAAAAGkAggAAAABpQIIAAAAAaYCCAAAAAGqAggAiAQAIQwLAADiAwAgkQIAAIkEADCSAgAARwAQkwIAAIkEADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhwQIIAIoEACHRAgEAyAMAIfcCAQDJAwAhCKACCAAAAAGhAggAAAAEogIIAAAABKMCCAAAAAGkAggAAAABpQIIAAAAAaYCCAAAAAGqAggA2QMAIQuRAgAAiwQAMJICAACmAQAQkwIAAIsEADCUAgEAqQMAIZkCQACqAwAhmgJAAKoDACG5AiAAuQMAIboCQAC8AwAhuwIBAKwDACG8AgAA1AMAIMMCAQCpAwAhDgMAAI0EACARAACOBAAgEgAAjwQAIJECAACMBAAwkgIAAAcAEJMCAACMBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACDDAgEAyAMAIRkEAADQAwAgCAAA0QMAIBMAANIDACCRAgAAxwMAMJICAAD4AgAQkwIAAMcDADCUAgEAyAMAIZcCAADNA7gCIpkCQADPAwAhmgJAAM8DACGrAgEAyAMAIawCAQDIAwAhrQIBAMkDACGuAgEAyQMAIa8CAQDJAwAhsAIBAMkDACGxAgEAyQMAIbMCAADKA7MCIrQCIADLAwAhtgIAAMwDtgIiuAIgAMsDACG5AiAAywMAIboCQADOAwAhgwMAAPgCACCEAwAA-AIAIAP4AgAACQAg-QIAAAkAIPoCAAAJACAD-AIAAB8AIPkCAAAfACD6AgAAHwAgC5ECAACQBAAwkgIAAI4BABCTAgAAkAQAMJQCAQCpAwAhmQJAAKoDACGaAkAAqgMAIasCAQCpAwAhygIBAKwDACHLAgEArAMAIcwCIAC5AwAh2AICANcDACENBQAAjgQAIA4AAJMEACCRAgAAkQQAMJICAAB7ABCTAgAAkQQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIasCAQDIAwAhygIBAMkDACHLAgEAyQMAIcwCIADLAwAh2AICAJIEACEIoAICAAAAAaECAgAAAASiAgIAAAAEowICAAAAAaQCAgAAAAGlAgIAAAABpgICAAAAAaoCAgCxAwAhA_gCAAAOACD5AgAADgAg-gIAAA4AIA2RAgAAlAQAMJICAAB1ABCTAgAAlAQAMJQCAQCpAwAhmQJAAKoDACGaAkAAqgMAIZ0CAQCpAwAhzAIgALkDACHeAkAAvAMAId8CQAC8AwAh_AIAAJUE_AIi_QICAOcDACH-AkAAvAMAIQcNAACxAwAgKwAAlwQAICwAAJcEACCgAgAAAPwCAqECAAAA_AIIogIAAAD8AgiqAgAAlgT8AiIHDQAAsQMAICsAAJcEACAsAACXBAAgoAIAAAD8AgKhAgAAAPwCCKICAAAA_AIIqgIAAJYE_AIiBKACAAAA_AICoQIAAAD8AgiiAgAAAPwCCKoCAACXBPwCIgyRAgAAmAQAMJICAABfABCTAgAAmAQAMJQCAQCpAwAhmQJAAKoDACGaAkAAqgMAIboCQAC8AwAhywIBAKwDACHNAiAAuQMAIdECAQCpAwAh_AIAAJkEgQMi_wIAAOYDACAHDQAAsQMAICsAAJsEACAsAACbBAAgoAIAAACBAwKhAgAAAIEDCKICAAAAgQMIqgIAAJoEgQMiBw0AALEDACArAACbBAAgLAAAmwQAIKACAAAAgQMCoQIAAACBAwiiAgAAAIEDCKoCAACaBIEDIgSgAgAAAIEDAqECAAAAgQMIogIAAACBAwiqAgAAmwSBAyINCwAA4gMAIJECAACcBAAwkgIAAEIAEJMCAACcBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhugJAAM4DACHLAgEAyQMAIc0CIADLAwAh0QIBAMgDACH8AgAAngSBAyL_AgAAnQQAIAygAoAAAAABowKAAAAAAaQCgAAAAAGlAoAAAAABpgKAAAAAAaoCgAAAAAHEAgEAAAABxQIBAAAAAcYCAQAAAAHHAoAAAAAByAKAAAAAAckCgAAAAAEEoAIAAACBAwKhAgAAAIEDCKICAAAAgQMIqgIAAJsEgQMiEggAAKEEACALAADiAwAgkQIAAJ8EADCSAgAAIwAQkwIAAJ8EADCUAgEAyAMAIZUCQADPAwAhlwIAAKAE4wIimQJAAM8DACGaAkAAzwMAIZ0CAQDIAwAhugJAAM4DACHRAgEAyAMAId4CQADPAwAh3wJAAM8DACHgAkAAzgMAIeECQADOAwAh4wIgAMsDACEEoAIAAADjAgKhAgAAAOMCCKICAAAA4wIIqgIAAPED4wIiGQMAAI0EACAHAACTBAAgCQAAtwQAIAoAALgEACALAACPBAAgDAAAuQQAIJECAAC0BAAwkgIAABIAEJMCAAC0BAAwlAIBAMgDACGXAgAAtQTBAiKZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACC9AgEAyQMAIb4CAQDJAwAhvwIgAMsDACHBAggAtgQAIcICAgCSBAAhwwIBAMgDACGDAwAAEgAghAMAABIAIBgEAAClBAAgCAAA0QMAIAwAAKsEACAPAACkBAAgEQAApgQAIBMAANIDACAVAACnBAAgFgAAqAQAIBcAAKkEACAYAACqBAAgkQIAAKIEADCSAgAAHwAQkwIAAKIEADCUAgEAyAMAIZUCQADPAwAhlwIAAKMElwIimAIBAMkDACGZAkAAzwMAIZoCQADPAwAhmwIBAMgDACGcAgEAyAMAIZ0CAQDJAwAhngIBAMgDACGfAgEAyQMAIQSgAgAAAJcCAqECAAAAlwIIogIAAACXAgiqAgAAsgOXAiIPBQAAjgQAIBAAAI8EACATAACtBAAgFAAArgQAIJECAACsBAAwkgIAABsAEJMCAACsBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhywIBAMkDACHMAiAAywMAIeQCAQDIAwAhgwMAABsAIIQDAAAbACAQAwAAjQQAIBEAAI4EACASAACPBAAgkQIAAIwEADCSAgAABwAQkwIAAIwEADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMkDACG8AgAAgAQAIMMCAQDIAwAhgwMAAAcAIIQDAAAHACAeBAAApQQAIAYAALsEACAPAACkBAAgEAAAvwQAIJECAAC8BAAwkgIAAAkAEJMCAAC8BAAwlAIBAMgDACGVAkAAzwMAIZcCAAC-BNYCIpkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhuQIgAMsDACG8AgAAnQQAIMsCAQDJAwAhzgIBAMgDACHSAgEAyAMAIdQCAAC9BNQCItYCQADOAwAh1wJAAM4DACHYAgIAswQAIdkCQADOAwAh2gJAAM4DACHbAgEAyQMAIdwCQADOAwAh3QIBAMkDACGDAwAACQAghAMAAAkAIAP4AgAAQgAg-QIAAEIAIPoCAABCACAPCwAA4gMAIJECAADhAwAwkgIAAEUAEJMCAADhAwAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhugJAAM4DACHLAgEAyQMAIc0CIADLAwAhzwIBAMgDACHQAgEAyAMAIdECAQDIAwAhgwMAAEUAIIQDAABFACAOCwAA4gMAIJECAACJBAAwkgIAAEcAEJMCAACJBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIcECCACKBAAh0QIBAMgDACH3AgEAyQMAIYMDAABHACCEAwAARwAgGAsAAOIDACCRAgAA_QMAMJICAABJABCTAgAA_QMAMJQCAQDIAwAhlwIAAP8D6gIimQJAAM8DACGaAkAAzwMAIdECAQDIAwAh5QIBAMgDACHmAhAA_gMAIecCAQDIAwAh6AIBAMkDACHqAkAAzgMAIesCAQDJAwAh7AIBAMgDACHtAgEAyAMAIe4CAACABAAg7wIBAMkDACHwAhAAgQQAIfECAQDJAwAh8gIBAMkDACGDAwAASQAghAMAAEkAIBQIAAChBAAgCwAA4gMAIJECAACfBAAwkgIAACMAEJMCAACfBAAwlAIBAMgDACGVAkAAzwMAIZcCAACgBOMCIpkCQADPAwAhmgJAAM8DACGdAgEAyAMAIboCQADOAwAh0QIBAMgDACHeAkAAzwMAId8CQADPAwAh4AJAAM4DACHhAkAAzgMAIeMCIADLAwAhgwMAACMAIIQDAAAjACANBQAAjgQAIBAAAI8EACATAACtBAAgFAAArgQAIJECAACsBAAwkgIAABsAEJMCAACsBAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhywIBAMkDACHMAiAAywMAIeQCAQDIAwAhA_gCAAADACD5AgAAAwAg-gIAAAMAIAP4AgAAEgAg-QIAABIAIPoCAAASACADnQIBAAAAAfwCAAAA_AIC_QICAAAAAQOdAgEAAAAB_AIAAAD8AgL-AkAAAAABDggAAKEEACCRAgAAsQQAMJICAAAXABCTAgAAsQQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIZ0CAQDIAwAhzAIgAMsDACHeAkAAzgMAId8CQADOAwAh_AIAALIE_AIi_QICALMEACH-AkAAzgMAIQSgAgAAAPwCAqECAAAA_AIIogIAAAD8AgiqAgAAlwT8AiIIoAICAAAAAaECAgAAAAWiAgIAAAAFowICAAAAAaQCAgAAAAGlAgIAAAABpgICAAAAAaoCAgCuAwAhFwMAAI0EACAHAACTBAAgCQAAtwQAIAoAALgEACALAACPBAAgDAAAuQQAIJECAAC0BAAwkgIAABIAEJMCAAC0BAAwlAIBAMgDACGXAgAAtQTBAiKZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACC9AgEAyQMAIb4CAQDJAwAhvwIgAMsDACHBAggAtgQAIcICAgCSBAAhwwIBAMgDACEEoAIAAADBAgKhAgAAAMECCKICAAAAwQIIqgIAAN0DwQIiCKACCAAAAAGhAggAAAAFogIIAAAABaMCCAAAAAGkAggAAAABpQIIAAAAAaYCCAAAAAGqAggA2wMAIQP4AgAAFwAg-QIAABcAIPoCAAAXACAD-AIAABsAIPkCAAAbACD6AgAAGwAgA_gCAAAjACD5AgAAIwAg-gIAACMAIA8GAAC7BAAgCAAArgQAIJECAAC6BAAwkgIAAA4AEJMCAAC6BAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhqwIBAMgDACG6AkAAzgMAIcoCAQDJAwAhywIBAMkDACHMAiAAywMAIc0CIADLAwAhzgIBAMgDACEPBQAAjgQAIA4AAJMEACCRAgAAkQQAMJICAAB7ABCTAgAAkQQAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIasCAQDIAwAhygIBAMkDACHLAgEAyQMAIcwCIADLAwAh2AICAJIEACGDAwAAewAghAMAAHsAIBwEAAClBAAgBgAAuwQAIA8AAKQEACAQAAC_BAAgkQIAALwEADCSAgAACQAQkwIAALwEADCUAgEAyAMAIZUCQADPAwAhlwIAAL4E1gIimQJAAM8DACGaAkAAzwMAIZsCAQDIAwAhnAIBAMgDACG5AiAAywMAIbwCAACdBAAgywIBAMkDACHOAgEAyAMAIdICAQDIAwAh1AIAAL0E1AIi1gJAAM4DACHXAkAAzgMAIdgCAgCzBAAh2QJAAM4DACHaAkAAzgMAIdsCAQDJAwAh3AJAAM4DACHdAgEAyQMAIQSgAgAAANQCAqECAAAA1AIIogIAAADUAgiqAgAA7QPUAiIEoAIAAADWAgKhAgAAANYCCKICAAAA1gIIqgIAAOsD1gIiGgQAAKUEACAIAADRAwAgDAAAqwQAIA8AAKQEACARAACmBAAgEwAA0gMAIBUAAKcEACAWAACoBAAgFwAAqQQAIBgAAKoEACCRAgAAogQAMJICAAAfABCTAgAAogQAMJQCAQDIAwAhlQJAAM8DACGXAgAAowSXAiKYAgEAyQMAIZkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhnQIBAMkDACGeAgEAyAMAIZ8CAQDJAwAhgwMAAB8AIIQDAAAfACATAwAAjQQAIAsAAI8EACAPAAC4BAAgkQIAAMAEADCSAgAAAwAQkwIAAMAEADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMgDACG8AgAAgAQAIL4CAQDIAwAhwwIBAMgDACHdAgEAyQMAIfQCAADBBPQCIvUCAQDJAwAh9gJAAM4DACEEoAIAAAD0AgKhAgAAAPQCCKICAAAA9AIIqgIAAIUE9AIiAAAAAAGLAwEAAAABAYsDQAAAAAEBiwMAAACXAgIBiwMBAAAAAQUlAACpCAAgJgAAvggAIIUDAACqCAAghgMAAL0IACCJAwAAHQAgBSUAAKcIACAmAAC7CAAghQMAAKgIACCGAwAAuggAIIkDAACRAQAgByUAAKUIACAmAAC4CAAghQMAAKYIACCGAwAAtwgAIIcDAAASACCIAwAAEgAgiQMAABQAIAUlAACjCAAgJgAAtQgAIIUDAACkCAAghgMAALQIACCJAwAACwAgByUAAKEIACAmAACyCAAghQMAAKIIACCGAwAAsQgAIIcDAAADACCIAwAAAwAgiQMAAAUAIAslAADxBAAwJgAA9gQAMIUDAADyBAAwhgMAAPMEADCHAwAA9QQAMIgDAAD1BAAwiQMAAPUEADCKAwAA9AQAIIsDAAD1BAAwjAMAAPcEADCNAwAA-AQAMAclAADsBAAgJgAA7wQAIIUDAADtBAAghgMAAO4EACCHAwAARQAgiAMAAEUAIIkDAACxAgAgByUAAOYEACAmAADpBAAghQMAAOcEACCGAwAA6AQAIIcDAABHACCIAwAARwAgiQMAAKkBACAHJQAA3gQAICYAAOEEACCFAwAA3wQAIIYDAADgBAAghwMAAEkAIIgDAABJACCJAwAA1wEAIAclAADUBAAgJgAA1wQAIIUDAADVBAAghgMAANYEACCHAwAAIwAgiAMAACMAIIkDAAAlACANCAAA3QQAIJQCAQAAAAGVAkAAAAABlwIAAADjAgKZAkAAAAABmgJAAAAAAZ0CAQAAAAG6AkAAAAAB3gJAAAAAAd8CQAAAAAHgAkAAAAAB4QJAAAAAAeMCIAAAAAECAAAAJQAgJQAA1AQAIAMAAAAjACAlAADUBAAgJgAA2AQAIA8AAAAjACAIAADcBAAgHgAA2AQAIJQCAQDGBAAhlQJAAMcEACGXAgAA2gTjAiKZAkAAxwQAIZoCQADHBAAhnQIBAMYEACG6AkAA2QQAId4CQADHBAAh3wJAAMcEACHgAkAA2QQAIeECQADZBAAh4wIgANsEACENCAAA3AQAIJQCAQDGBAAhlQJAAMcEACGXAgAA2gTjAiKZAkAAxwQAIZoCQADHBAAhnQIBAMYEACG6AkAA2QQAId4CQADHBAAh3wJAAMcEACHgAkAA2QQAIeECQADZBAAh4wIgANsEACEBiwNAAAAAAQGLAwAAAOMCAgGLAyAAAAABBSUAAKwIACAmAACvCAAghQMAAK0IACCGAwAArggAIIkDAAAUACADJQAArAgAIIUDAACtCAAgiQMAABQAIBGUAgEAAAABlwIAAADqAgKZAkAAAAABmgJAAAAAAeUCAQAAAAHmAhAAAAAB5wIBAAAAAegCAQAAAAHqAkAAAAAB6wIBAAAAAewCAQAAAAHtAgEAAAAB7gKAAAAAAe8CAQAAAAHwAhAAAAAB8QIBAAAAAfICAQAAAAECAAAA1wEAICUAAN4EACADAAAASQAgJQAA3gQAICYAAOIEACATAAAASQAgHgAA4gQAIJQCAQDGBAAhlwIAAOQE6gIimQJAAMcEACGaAkAAxwQAIeUCAQDGBAAh5gIQAOMEACHnAgEAxgQAIegCAQDJBAAh6gJAANkEACHrAgEAyQQAIewCAQDGBAAh7QIBAMYEACHuAoAAAAAB7wIBAMkEACHwAhAA5QQAIfECAQDJBAAh8gIBAMkEACERlAIBAMYEACGXAgAA5ATqAiKZAkAAxwQAIZoCQADHBAAh5QIBAMYEACHmAhAA4wQAIecCAQDGBAAh6AIBAMkEACHqAkAA2QQAIesCAQDJBAAh7AIBAMYEACHtAgEAxgQAIe4CgAAAAAHvAgEAyQQAIfACEADlBAAh8QIBAMkEACHyAgEAyQQAIQWLAxAAAAABjgMQAAAAAY8DEAAAAAGQAxAAAAABkQMQAAAAAQGLAwAAAOoCAgWLAxAAAAABjgMQAAAAAY8DEAAAAAGQAxAAAAABkQMQAAAAAQeUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAcECCAAAAAH3AgEAAAABAgAAAKkBACAlAADmBAAgAwAAAEcAICUAAOYEACAmAADqBAAgCQAAAEcAIB4AAOoEACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhwQIIAOsEACH3AgEAyQQAIQeUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhwQIIAOsEACH3AgEAyQQAIQWLAwgAAAABjgMIAAAAAY8DCAAAAAGQAwgAAAABkQMIAAAAAQiUAgEAAAABmQJAAAAAAZoCQAAAAAG6AkAAAAABywIBAAAAAc0CIAAAAAHPAgEAAAAB0AIBAAAAAQIAAACxAgAgJQAA7AQAIAMAAABFACAlAADsBAAgJgAA8AQAIAoAAABFACAeAADwBAAglAIBAMYEACGZAkAAxwQAIZoCQADHBAAhugJAANkEACHLAgEAyQQAIc0CIADbBAAhzwIBAMYEACHQAgEAxgQAIQiUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG6AkAA2QQAIcsCAQDJBAAhzQIgANsEACHPAgEAxgQAIdACAQDGBAAhCJQCAQAAAAGZAkAAAAABmgJAAAAAAboCQAAAAAHLAgEAAAABzQIgAAAAAfwCAAAAgQMC_wKAAAAAAQIAAAABACAlAAD9BAAgAwAAAAEAICUAAP0EACAmAAD8BAAgAR4AAKsIADANCwAA4gMAIJECAACcBAAwkgIAAEIAEJMCAACcBAAwlAIBAAAAAZkCQADPAwAhmgJAAM8DACG6AkAAzgMAIcsCAQDJAwAhzQIgAMsDACHRAgEAyAMAIfwCAACeBIEDIv8CAACdBAAgAgAAAAEAIB4AAPwEACACAAAA-QQAIB4AAPoEACAMkQIAAPgEADCSAgAA-QQAEJMCAAD4BAAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhugJAAM4DACHLAgEAyQMAIc0CIADLAwAh0QIBAMgDACH8AgAAngSBAyL_AgAAnQQAIAyRAgAA-AQAMJICAAD5BAAQkwIAAPgEADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG6AkAAzgMAIcsCAQDJAwAhzQIgAMsDACHRAgEAyAMAIfwCAACeBIEDIv8CAACdBAAgCJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIboCQADZBAAhywIBAMkEACHNAiAA2wQAIfwCAAD7BIEDIv8CgAAAAAEBiwMAAACBAwIIlAIBAMYEACGZAkAAxwQAIZoCQADHBAAhugJAANkEACHLAgEAyQQAIc0CIADbBAAh_AIAAPsEgQMi_wKAAAAAAQiUAgEAAAABmQJAAAAAAZoCQAAAAAG6AkAAAAABywIBAAAAAc0CIAAAAAH8AgAAAIEDAv8CgAAAAAEDJQAAqQgAIIUDAACqCAAgiQMAAB0AIAMlAACnCAAghQMAAKgIACCJAwAAkQEAIAMlAAClCAAghQMAAKYIACCJAwAAFAAgAyUAAKMIACCFAwAApAgAIIkDAAALACADJQAAoQgAIIUDAACiCAAgiQMAAAUAIAQlAADxBAAwhQMAAPIEADCJAwAA9QQAMIoDAAD0BAAgAyUAAOwEACCFAwAA7QQAIIkDAACxAgAgAyUAAOYEACCFAwAA5wQAIIkDAACpAQAgAyUAAN4EACCFAwAA3wQAIIkDAADXAQAgAyUAANQEACCFAwAA1QQAIIkDAAAlACAAAAABiwMAAACzAgIBiwMAAAC2AgIBiwMAAAC4AgIHJQAAwgYAICYAAMUGACCFAwAAwwYAIIYDAADEBgAghwMAAAcAIIgDAAAHACCJAwAAkQEAIAclAACkBgAgJgAApwYAIIUDAAClBgAghgMAAKYGACCHAwAAEgAgiAMAABIAIIkDAAAUACAHJQAAkQUAICYAAJQFACCFAwAAkgUAIIYDAACTBQAghwMAAAMAIIgDAAADACCJAwAABQAgDgsAAKMGACAPAACiBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb4CAQAAAAHdAgEAAAAB9AIAAAD0AgL1AgEAAAAB9gJAAAAAAQIAAAAFACAlAACRBQAgAwAAAAMAICUAAJEFACAmAACVBQAgEAAAAAMAIAsAAJgFACAPAACXBQAgHgAAlQUAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAxgQAIbwCgAAAAAG-AgEAxgQAId0CAQDJBAAh9AIAAJYF9AIi9QIBAMkEACH2AkAA2QQAIQ4LAACYBQAgDwAAlwUAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAxgQAIbwCgAAAAAG-AgEAxgQAId0CAQDJBAAh9AIAAJYF9AIi9QIBAMkEACH2AkAA2QQAIQGLAwAAAPQCAgolAAClBQAwJgAAqQUAMIUDAACmBQAwhgMAAKcFADCHAwAAqAUAMIgDAACoBQAwiQMAAKgFADCLAwAAqAUAMIwDAACqBQAwjQMAAKsFADALJQAAmQUAMCYAAJ4FADCFAwAAmgUAMIYDAACbBQAwhwMAAJ0FADCIAwAAnQUAMIkDAACdBQAwigMAAJwFACCLAwAAnQUAMIwDAACfBQAwjQMAAKAFADATBAAA_wQAIAgAAIAFACAMAACHBQAgDwAA_gQAIBEAAIEFACAVAACDBQAgFgAAhAUAIBcAAIUFACAYAACGBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAECAAAAIQAgJQAApAUAIAMAAAAhACAlAACkBQAgJgAAowUAIAEeAACgCAAwGAQAAKUEACAIAADRAwAgDAAAqwQAIA8AAKQEACARAACmBAAgEwAA0gMAIBUAAKcEACAWAACoBAAgFwAAqQQAIBgAAKoEACCRAgAAogQAMJICAAAfABCTAgAAogQAMJQCAQAAAAGVAkAAzwMAIZcCAACjBJcCIpgCAQDJAwAhmQJAAM8DACGaAkAAzwMAIZsCAQDIAwAhnAIBAMgDACGdAgEAyQMAIZ4CAQAAAAGfAgEAyQMAIQIAAAAhACAeAACjBQAgAgAAAKEFACAeAACiBQAgDpECAACgBQAwkgIAAKEFABCTAgAAoAUAMJQCAQDIAwAhlQJAAM8DACGXAgAAowSXAiKYAgEAyQMAIZkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhnQIBAMkDACGeAgEAyAMAIZ8CAQDJAwAhDpECAACgBQAwkgIAAKEFABCTAgAAoAUAMJQCAQDIAwAhlQJAAM8DACGXAgAAowSXAiKYAgEAyQMAIZkCQADPAwAhmgJAAM8DACGbAgEAyAMAIZwCAQDIAwAhnQIBAMkDACGeAgEAyAMAIZ8CAQDJAwAhCpQCAQDGBAAhlQJAAMcEACGXAgAAyASXAiKYAgEAyQQAIZkCQADHBAAhmgJAAMcEACGbAgEAxgQAIZwCAQDGBAAhnQIBAMkEACGeAgEAxgQAIRMEAADLBAAgCAAAzAQAIAwAANMEACAPAADKBAAgEQAAzQQAIBUAAM8EACAWAADQBAAgFwAA0QQAIBgAANIEACCUAgEAxgQAIZUCQADHBAAhlwIAAMgElwIimAIBAMkEACGZAkAAxwQAIZoCQADHBAAhmwIBAMYEACGcAgEAxgQAIZ0CAQDJBAAhngIBAMYEACETBAAA_wQAIAgAAIAFACAMAACHBQAgDwAA_gQAIBEAAIEFACAVAACDBQAgFgAAhAUAIBcAAIUFACAYAACGBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAEJBQAAnwYAIBAAAKEGACAUAACgBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABywIBAAAAAcwCIAAAAAHkAgEAAAABAgAAAB0AICUAAJ4GACADAAAAHQAgJQAAngYAICYAAK4FACANBQAAjgQAIBAAAI8EACATAACtBAAgFAAArgQAIJECAACsBAAwkgIAABsAEJMCAACsBAAwlAIBAAAAAZkCQADPAwAhmgJAAM8DACHLAgEAyQMAIcwCIADLAwAh5AIBAAAAAQIAAAAdACAeAACuBQAgAgAAAKwFACAeAACtBQAgCZECAACrBQAwkgIAAKwFABCTAgAAqwUAMJQCAQDIAwAhmQJAAM8DACGaAkAAzwMAIcsCAQDJAwAhzAIgAMsDACHkAgEAyAMAIQmRAgAAqwUAMJICAACsBQAQkwIAAKsFADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACHLAgEAyQMAIcwCIADLAwAh5AIBAMgDACEGlAIBAMYEACGZAkAAxwQAIZoCQADHBAAhywIBAMkEACHMAiAA2wQAIeQCAQDGBAAhCQUAAK8FACAQAACxBQAgFAAAsAUAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIcsCAQDJBAAhzAIgANsEACHkAgEAxgQAIQslAACFBgAwJgAAigYAMIUDAACGBgAwhgMAAIcGADCHAwAAiQYAMIgDAACJBgAwiQMAAIkGADCKAwAAiAYAIIsDAACJBgAwjAMAAIsGADCNAwAAjAYAMAolAAC7BQAwJgAAvwUAMIUDAAC8BQAwhgMAAL0FADCHAwAAvgUAMIgDAAC-BQAwiQMAAL4FADCLAwAAvgUAMIwDAADABQAwjQMAAMEFADALJQAAsgUAMCYAALYFADCFAwAAswUAMIYDAAC0BQAwhwMAAJ0FADCIAwAAnQUAMIkDAACdBQAwigMAALUFACCLAwAAnQUAMIwDAAC3BQAwjQMAAKAFADATBAAA_wQAIAgAAIAFACAMAACHBQAgEQAAgQUAIBMAAIIFACAVAACDBQAgFgAAhAUAIBcAAIUFACAYAACGBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAAugUAIAMAAAAhACAlAAC6BQAgJgAAuQUAIAEeAACfCAAwAgAAACEAIB4AALkFACACAAAAoQUAIB4AALgFACAKlAIBAMYEACGVAkAAxwQAIZcCAADIBJcCIpgCAQDJBAAhmQJAAMcEACGaAkAAxwQAIZwCAQDGBAAhnQIBAMkEACGeAgEAxgQAIZ8CAQDJBAAhEwQAAMsEACAIAADMBAAgDAAA0wQAIBEAAM0EACATAADOBAAgFQAAzwQAIBYAANAEACAXAADRBAAgGAAA0gQAIJQCAQDGBAAhlQJAAMcEACGXAgAAyASXAiKYAgEAyQQAIZkCQADHBAAhmgJAAMcEACGcAgEAxgQAIZ0CAQDJBAAhngIBAMYEACGfAgEAyQQAIRMEAAD_BAAgCAAAgAUAIAwAAIcFACARAACBBQAgEwAAggUAIBUAAIMFACAWAACEBQAgFwAAhQUAIBgAAIYFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABnAIBAAAAAZ0CAQAAAAGeAgEAAAABnwIBAAAAARMDAACCBgAgBwAAgAYAIAkAAIEGACALAACDBgAgDAAAhAYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAAD_BQAgAwAAABQAICUAAP8FACAmAADHBQAgFwMAAI0EACAHAACTBAAgCQAAtwQAIAoAALgEACALAACPBAAgDAAAuQQAIJECAAC0BAAwkgIAABIAEJMCAAC0BAAwlAIBAAAAAZcCAAC1BMECIpkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMkDACG8AgAAgAQAIL0CAQDJAwAhvgIBAMkDACG_AiAAywMAIcECCAC2BAAhwgICAJIEACHDAgEAAAABAgAAABQAIB4AAMcFACACAAAAwgUAIB4AAMMFACARkQIAAMEFADCSAgAAwgUAEJMCAADBBQAwlAIBAMgDACGXAgAAtQTBAiKZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACC9AgEAyQMAIb4CAQDJAwAhvwIgAMsDACHBAggAtgQAIcICAgCSBAAhwwIBAMgDACERkQIAAMEFADCSAgAAwgUAEJMCAADBBQAwlAIBAMgDACGXAgAAtQTBAiKZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDJAwAhvAIAAIAEACC9AgEAyQMAIb4CAQDJAwAhvwIgAMsDACHBAggAtgQAIcICAgCSBAAhwwIBAMgDACEOlAIBAMYEACGXAgAAxAXBAiKZAkAAxwQAIZoCQADHBAAhuQIgANsEACG6AkAA2QQAIbsCAQDJBAAhvAKAAAAAAb0CAQDJBAAhvgIBAMkEACG_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_wQAIAwAAIcFACAPAAD-BAAgEQAAgQUAIBMAAIIFACAVAACDBQAgFgAAhAUAIBcAAIUFACAYAACGBQAglAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAA4wUAIAMAAAAhACAlAADjBQAgJgAA4gUAIAEeAACVCAAwAgAAACEAIB4AAOIFACACAAAAoQUAIB4AAOEFACAKlAIBAMYEACGVAkAAxwQAIZcCAADIBJcCIpgCAQDJBAAhmQJAAMcEACGaAkAAxwQAIZsCAQDGBAAhnAIBAMYEACGeAgEAxgQAIZ8CAQDJBAAhEwQAAMsEACAMAADTBAAgDwAAygQAIBEAAM0EACATAADOBAAgFQAAzwQAIBYAANAEACAXAADRBAAgGAAA0gQAIJQCAQDGBAAhlQJAAMcEACGXAgAAyASXAiKYAgEAyQQAIZkCQADHBAAhmgJAAMcEACGbAgEAxgQAIZwCAQDGBAAhngIBAMYEACGfAgEAyQQAIRMEAAD_BAAgDAAAhwUAIA8AAP4EACARAACBBQAgEwAAggUAIBUAAIMFACAWAACEBQAgFwAAhQUAIBgAAIYFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGeAgEAAAABnwIBAAAAAQmUAgEAAAABmQJAAAAAAZoCQAAAAAHMAiAAAAAB3gJAAAAAAd8CQAAAAAH8AgAAAPwCAv0CAgAAAAH-AkAAAAABAgAAABkAICUAAPEFACADAAAAGQAgJQAA8QUAICYAAPAFACABHgAAlAgAMBAIAAChBAAgkQIAALEEADCSAgAAFwAQkwIAALEEADCUAgEAAAABmQJAAM8DACGaAkAAzwMAIZ0CAQDIAwAhzAIgAMsDACHeAkAAzgMAId8CQADOAwAh_AIAALIE_AIi_QICALMEACH-AkAAzgMAIYEDAACvBAAgggMAALAEACACAAAAGQAgHgAA8AUAIAIAAADsBQAgHgAA7QUAIA2RAgAA6wUAMJICAADsBQAQkwIAAOsFADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACGdAgEAyAMAIcwCIADLAwAh3gJAAM4DACHfAkAAzgMAIfwCAACyBPwCIv0CAgCzBAAh_gJAAM4DACENkQIAAOsFADCSAgAA7AUAEJMCAADrBQAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhnQIBAMgDACHMAiAAywMAId4CQADOAwAh3wJAAM4DACH8AgAAsgT8AiL9AgIAswQAIf4CQADOAwAhCZQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIcwCIADbBAAh3gJAANkEACHfAkAA2QQAIfwCAADuBfwCIv0CAgDvBQAh_gJAANkEACEBiwMAAAD8AgIFiwMCAAAAAY4DAgAAAAGPAwIAAAABkAMCAAAAAZEDAgAAAAEJlAIBAMYEACGZAkAAxwQAIZoCQADHBAAhzAIgANsEACHeAkAA2QQAId8CQADZBAAh_AIAAO4F_AIi_QICAO8FACH-AkAA2QQAIQmUAgEAAAABmQJAAAAAAZoCQAAAAAHMAiAAAAAB3gJAAAAAAd8CQAAAAAH8AgAAAPwCAv0CAgAAAAH-AkAAAAABCwYAAP4FACCUAgEAAAABmQJAAAAAAZoCQAAAAAGrAgEAAAABugJAAAAAAcoCAQAAAAHLAgEAAAABzAIgAAAAAc0CIAAAAAHOAgEAAAABAgAAABAAICUAAP0FACADAAAAEAAgJQAA_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_AiAAAAABwQIIAAAAAcICAgAAAAECAAAAFAAgJQAApAYAIAMAAAASACAlAACkBgAgJgAAqAYAIBQAAAASACAHAADIBQAgCQAAyQUAIAoAAKkGACALAADLBQAgDAAAzAUAIB4AAKgGACCUAgEAxgQAIZcCAADEBcECIpkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABvQIBAMkEACG-AgEAyQQAIb8CIADbBAAhwQIIAMUFACHCAgIAxgUAIRIHAADIBQAgCQAAyQUAIAoAAKkGACALAADLBQAgDAAAzAUAIJQCAQDGBAAhlwIAAMQFwQIimQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAyQQAIbwCgAAAAAG9AgEAyQQAIb4CAQDJBAAhvwIgANsEACHBAggAxQUAIcICAgDGBQAhCiUAAKoGADAmAACtBgAwhQMAAKsGADCGAwAArAYAMIcDAACoBQAwiAMAAKgFADCJAwAAqAUAMIsDAACoBQAwjAMAAK4GADCNAwAAqwUAMAkFAACfBgAgEAAAoQYAIBMAAMAGACCUAgEAAAABmQJAAAAAAZoCQAAAAAHLAgEAAAABzAIgAAAAAeQCAQAAAAECAAAAHQAgJQAAvwYAIAMAAAAdACAlAAC_BgAgJgAAsAYAIAIAAAAdACAeAACwBgAgAgAAAKwFACAeAACvBgAgBpQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIcsCAQDJBAAhzAIgANsEACHkAgEAxgQAIQkFAACvBQAgEAAAsQUAIBMAALEGACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACHLAgEAyQQAIcwCIADbBAAh5AIBAMYEACEKJQAAsgYAMCYAALYGADCFAwAAswYAMIYDAAC0BgAwhwMAALUGADCIAwAAtQYAMIkDAAC1BgAwiwMAALUGADCMAwAAtwYAMI0DAAC4BgAwDwMAAL4GACALAACjBgAglAIBAAAAAZkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb4CAQAAAAHDAgEAAAAB3QIBAAAAAfQCAAAA9AIC9QIBAAAAAfYCQAAAAAECAAAABQAgJQAAvQYAIAMAAAAFACAlAAC9BgAgJgAAuwYAIBMDAACNBAAgCwAAjwQAIA8AALgEACCRAgAAwAQAMJICAAADABCTAgAAwAQAMJQCAQAAAAGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDIAwAhvAIAAIAEACC-AgEAyAMAIcMCAQAAAAHdAgEAyQMAIfQCAADBBPQCIvUCAQDJAwAh9gJAAM4DACECAAAABQAgHgAAuwYAIAIAAAC5BgAgHgAAugYAIBCRAgAAuAYAMJICAAC5BgAQkwIAALgGADCUAgEAyAMAIZkCQADPAwAhmgJAAM8DACG5AiAAywMAIboCQADOAwAhuwIBAMgDACG8AgAAgAQAIL4CAQDIAwAhwwIBAMgDACHdAgEAyQMAIfQCAADBBPQCIvUCAQDJAwAh9gJAAM4DACEQkQIAALgGADCSAgAAuQYAEJMCAAC4BgAwlAIBAMgDACGZAkAAzwMAIZoCQADPAwAhuQIgAMsDACG6AkAAzgMAIbsCAQDIAwAhvAIAAIAEACC-AgEAyAMAIcMCAQDIAwAh3QIBAMkDACH0AgAAwQT0AiL1AgEAyQMAIfYCQADOAwAhDZQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAxgQAIbwCgAAAAAG-AgEAxgQAIcMCAQDGBAAh3QIBAMkEACH0AgAAlgX0AiL1AgEAyQQAIfYCQADZBAAhDwMAALwGACALAACYBQAglAIBAMYEACGZAkAAxwQAIZoCQADHBAAhuQIgANsEACG6AkAA2QQAIbsCAQDGBAAhvAKAAAAAAb4CAQDGBAAhwwIBAMYEACHdAgEAyQQAIfQCAACWBfQCIvUCAQDJBAAh9gJAANkEACEFJQAA_QcAICYAAIAIACCFAwAA_gcAIIYDAAD_BwAgiQMAAPUCACAPAwAAvgYAIAsAAKMGACCUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvgIBAAAAAcMCAQAAAAHdAgEAAAAB9AIAAAD0AgL1AgEAAAAB9gJAAAAAAQMlAAD9BwAghQMAAP4HACCJAwAA9QIAIAkFAACfBgAgEAAAoQYAIBMAAMAGACCUAgEAAAABmQJAAAAAAZoCQAAAAAHLAgEAAAABzAIgAAAAAeQCAQAAAAEDJQAAsgYAMIUDAACzBgAwiQMAALUGADADJQAAqgYAMIUDAACrBgAwiQMAAKgFADAJEQAA3QYAIBIAAN4GACCUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABAgAAAJEBACAlAADCBgAgAwAAAAcAICUAAMIGACAmAADGBgAgCwAAAAcAIBEAAMcGACASAADIBgAgHgAAxgYAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAyQQAIbwCgAAAAAEJEQAAxwYAIBIAAMgGACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABCyUAANIGADAmAADWBgAwhQMAANMGADCGAwAA1AYAMIcDAACJBgAwiAMAAIkGADCJAwAAiQYAMIoDAADVBgAgiwMAAIkGADCMAwAA1wYAMI0DAACMBgAwCyUAAMkGADAmAADNBgAwhQMAAMoGADCGAwAAywYAMIcDAACdBQAwiAMAAJ0FADCJAwAAnQUAMIoDAADMBgAgiwMAAJ0FADCMAwAAzgYAMI0DAACgBQAwEwgAAIAFACAMAACHBQAgDwAA_gQAIBEAAIEFACATAACCBQAgFQAAgwUAIBYAAIQFACAXAACFBQAgGAAAhgUAIJQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGbAgEAAAABnQIBAAAAAZ4CAQAAAAGfAgEAAAABAgAAACEAICUAANEGACADAAAAIQAgJQAA0QYAICYAANAGACABHgAA_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-BQAwiAMAAL4FADCJAwAAvgUAMIsDAAC-BQAwjAMAAPIGADCNAwAAwQUAMBMDAACCBgAgCQAAgQYAIAoAAMEGACALAACDBgAgDAAAhAYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAAD1BgAgAwAAABQAICUAAPUGACAmAAD0BgAgAgAAABQAIB4AAPQGACACAAAAwgUAIB4AAPMGACAOlAIBAMYEACGXAgAAxAXBAiKZAkAAxwQAIZoCQADHBAAhuQIgANsEACG6AkAA2QQAIbsCAQDJBAAhvAKAAAAAAb0CAQDJBAAhvgIBAMkEACG_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_BAAgCAAAgAUAIAwAAIcFACAPAAD-BAAgEQAAgQUAIBMAAIIFACAVAACDBQAgFgAAhAUAIBgAAIYFACCUAgEAAAABlQJAAAAAAZcCAAAAlwICmAIBAAAAAZkCQAAAAAGaAkAAAAABmwIBAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAECAAAAIQAgJQAA5wcAIAMAAAAfACAlAADnBwAgJgAA6wcAIBYAAAAfACAEAADLBAAgCAAAzAQAIAwAANMEACAPAADKBAAgEQAAzQQAIBMAAM4EACAVAADPBAAgFgAA0AQAIBgAANIEACAeAADrBwAglAIBAMYEACGVAkAAxwQAIZcCAADIBJcCIpgCAQDJBAAhmQJAAMcEACGaAkAAxwQAIZsCAQDGBAAhnAIBAMYEACGdAgEAyQQAIZ4CAQDGBAAhnwIBAMkEACEUBAAAywQAIAgAAMwEACAMAADTBAAgDwAAygQAIBEAAM0EACATAADOBAAgFQAAzwQAIBYAANAEACAYAADSBAAglAIBAMYEACGVAkAAxwQAIZcCAADIBJcCIpgCAQDJBAAhmQJAAMcEACGaAkAAxwQAIZsCAQDGBAAhnAIBAMYEACGdAgEAyQQAIZ4CAQDGBAAhnwIBAMkEACEUBAAA_wQAIAgAAIAFACAMAACHBQAgDwAA_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_gQAIBEAAIEFACATAACCBQAgFQAAgwUAIBYAAIQFACAXAACFBQAgGAAAhgUAIJQCAQAAAAGVAkAAAAABlwIAAACXAgKYAgEAAAABmQJAAAAAAZoCQAAAAAGbAgEAAAABnAIBAAAAAZ0CAQAAAAGeAgEAAAABnwIBAAAAAQIAAAAhACAlAACWCAAgAwAAAB8AICUAAJYIACAmAACaCAAgFgAAAB8AIAQAAMsEACAIAADMBAAgDwAAygQAIBEAAM0EACATAADOBAAgFQAAzwQAIBYAANAEACAXAADRBAAgGAAA0gQAIB4AAJoIACCUAgEAxgQAIZUCQADHBAAhlwIAAMgElwIimAIBAMkEACGZAkAAxwQAIZoCQADHBAAhmwIBAMYEACGcAgEAxgQAIZ0CAQDJBAAhngIBAMYEACGfAgEAyQQAIRQEAADLBAAgCAAAzAQAIA8AAMoEACARAADNBAAgEwAAzgQAIBUAAM8EACAWAADQBAAgFwAA0QQAIBgAANIEACCUAgEAxgQAIZUCQADHBAAhlwIAAMgElwIimAIBAMkEACGZAkAAxwQAIZoCQADHBAAhmwIBAMYEACGcAgEAxgQAIZ0CAQDJBAAhngIBAMYEACGfAgEAyQQAIQyUAgEAAAABlQJAAAAAAZcCAAAA4wICmQJAAAAAAZoCQAAAAAG6AkAAAAAB0QIBAAAAAd4CQAAAAAHfAkAAAAAB4AJAAAAAAeECQAAAAAHjAiAAAAABAwAAAPgCACAlAACNCAAgJgAAnggAIBUAAAD4AgAgBAAAjgUAIBMAAJAFACAeAACeCAAglAIBAMYEACGXAgAAjQW4AiKZAkAAxwQAIZoCQADHBAAhqwIBAMYEACGsAgEAxgQAIa0CAQDJBAAhrgIBAMkEACGvAgEAyQQAIbACAQDJBAAhsQIBAMkEACGzAgAAiwWzAiK0AiAA2wQAIbYCAACMBbYCIrgCIADbBAAhuQIgANsEACG6AkAA2QQAIRMEAACOBQAgEwAAkAUAIJQCAQDGBAAhlwIAAI0FuAIimQJAAMcEACGaAkAAxwQAIasCAQDGBAAhrAIBAMYEACGtAgEAyQQAIa4CAQDJBAAhrwIBAMkEACGwAgEAyQQAIbECAQDJBAAhswIAAIsFswIitAIgANsEACG2AgAAjAW2AiK4AiAA2wQAIbkCIADbBAAhugJAANkEACEKlAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZwCAQAAAAGdAgEAAAABngIBAAAAAZ8CAQAAAAEKlAIBAAAAAZUCQAAAAAGXAgAAAJcCApgCAQAAAAGZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABnQIBAAAAAZ4CAQAAAAEPAwAAvgYAIA8AAKIGACCUAgEAAAABmQJAAAAAAZoCQAAAAAG5AiAAAAABugJAAAAAAbsCAQAAAAG8AoAAAAABvgIBAAAAAcMCAQAAAAHdAgEAAAAB9AIAAAD0AgL1AgEAAAAB9gJAAAAAAQIAAAAFACAlAAChCAAgGAQAAJsGACAGAACcBgAgDwAA3AYAIJQCAQAAAAGVAkAAAAABlwIAAADWAgKZAkAAAAABmgJAAAAAAZsCAQAAAAGcAgEAAAABuQIgAAAAAbwCgAAAAAHLAgEAAAABzgIBAAAAAdICAQAAAAHUAgAAANQCAtYCQAAAAAHXAkAAAAAB2AICAAAAAdkCQAAAAAHaAkAAAAAB2wIBAAAAAdwCQAAAAAHdAgEAAAABAgAAAAsAICUAAKMIACATAwAAggYAIAcAAIAGACAJAACBBgAgCgAAwQYAIAwAAIQGACCUAgEAAAABlwIAAADBAgKZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAG9AgEAAAABvgIBAAAAAb8CIAAAAAHBAggAAAABwgICAAAAAcMCAQAAAAECAAAAFAAgJQAApQgAIAoDAACdBwAgEQAA3QYAIJQCAQAAAAGZAkAAAAABmgJAAAAAAbkCIAAAAAG6AkAAAAABuwIBAAAAAbwCgAAAAAHDAgEAAAABAgAAAJEBACAlAACnCAAgCQUAAJ8GACATAADABgAgFAAAoAYAIJQCAQAAAAGZAkAAAAABmgJAAAAAAcsCAQAAAAHMAiAAAAAB5AIBAAAAAQIAAAAdACAlAACpCAAgCJQCAQAAAAGZAkAAAAABmgJAAAAAAboCQAAAAAHLAgEAAAABzQIgAAAAAfwCAAAAgQMC_wKAAAAAARMDAACCBgAgBwAAgAYAIAkAAIEGACAKAADBBgAgCwAAgwYAIJQCAQAAAAGXAgAAAMECApkCQAAAAAGaAkAAAAABuQIgAAAAAboCQAAAAAG7AgEAAAABvAKAAAAAAb0CAQAAAAG-AgEAAAABvwIgAAAAAcECCAAAAAHCAgIAAAABwwIBAAAAAQIAAAAUACAlAACsCAAgAwAAABIAICUAAKwIACAmAACwCAAgFQAAABIAIAMAAMoFACAHAADIBQAgCQAAyQUAIAoAAKkGACALAADLBQAgHgAAsAgAIJQCAQDGBAAhlwIAAMQFwQIimQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAyQQAIbwCgAAAAAG9AgEAyQQAIb4CAQDJBAAhvwIgANsEACHBAggAxQUAIcICAgDGBQAhwwIBAMYEACETAwAAygUAIAcAAMgFACAJAADJBQAgCgAAqQYAIAsAAMsFACCUAgEAxgQAIZcCAADEBcECIpkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABvQIBAMkEACG-AgEAyQQAIb8CIADbBAAhwQIIAMUFACHCAgIAxgUAIcMCAQDGBAAhAwAAAAMAICUAAKEIACAmAACzCAAgEQAAAAMAIAMAALwGACAPAACXBQAgHgAAswgAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIbkCIADbBAAhugJAANkEACG7AgEAxgQAIbwCgAAAAAG-AgEAxgQAIcMCAQDGBAAh3QIBAMkEACH0AgAAlgX0AiL1AgEAyQQAIfYCQADZBAAhDwMAALwGACAPAACXBQAglAIBAMYEACGZAkAAxwQAIZoCQADHBAAhuQIgANsEACG6AkAA2QQAIbsCAQDGBAAhvAKAAAAAAb4CAQDGBAAhwwIBAMYEACHdAgEAyQQAIfQCAACWBfQCIvUCAQDJBAAh9gJAANkEACEDAAAACQAgJQAAowgAICYAALYIACAaAAAACQAgBAAAkgYAIAYAAJMGACAPAADaBgAgHgAAtggAIJQCAQDGBAAhlQJAAMcEACGXAgAAkAbWAiKZAkAAxwQAIZoCQADHBAAhmwIBAMYEACGcAgEAxgQAIbkCIADbBAAhvAKAAAAAAcsCAQDJBAAhzgIBAMYEACHSAgEAxgQAIdQCAACPBtQCItYCQADZBAAh1wJAANkEACHYAgIA7wUAIdkCQADZBAAh2gJAANkEACHbAgEAyQQAIdwCQADZBAAh3QIBAMkEACEYBAAAkgYAIAYAAJMGACAPAADaBgAglAIBAMYEACGVAkAAxwQAIZcCAACQBtYCIpkCQADHBAAhmgJAAMcEACGbAgEAxgQAIZwCAQDGBAAhuQIgANsEACG8AoAAAAABywIBAMkEACHOAgEAxgQAIdICAQDGBAAh1AIAAI8G1AIi1gJAANkEACHXAkAA2QQAIdgCAgDvBQAh2QJAANkEACHaAkAA2QQAIdsCAQDJBAAh3AJAANkEACHdAgEAyQQAIQMAAAASACAlAAClCAAgJgAAuQgAIBUAAAASACADAADKBQAgBwAAyAUAIAkAAMkFACAKAACpBgAgDAAAzAUAIB4AALkIACCUAgEAxgQAIZcCAADEBcECIpkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABvQIBAMkEACG-AgEAyQQAIb8CIADbBAAhwQIIAMUFACHCAgIAxgUAIcMCAQDGBAAhEwMAAMoFACAHAADIBQAgCQAAyQUAIAoAAKkGACAMAADMBQAglAIBAMYEACGXAgAAxAXBAiKZAkAAxwQAIZoCQADHBAAhuQIgANsEACG6AkAA2QQAIbsCAQDJBAAhvAKAAAAAAb0CAQDJBAAhvgIBAMkEACG_AiAA2wQAIcECCADFBQAhwgICAMYFACHDAgEAxgQAIQMAAAAHACAlAACnCAAgJgAAvAgAIAwAAAAHACADAACcBwAgEQAAxwYAIB4AALwIACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABwwIBAMYEACEKAwAAnAcAIBEAAMcGACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACG5AiAA2wQAIboCQADZBAAhuwIBAMkEACG8AoAAAAABwwIBAMYEACEDAAAAGwAgJQAAqQgAICYAAL8IACALAAAAGwAgBQAArwUAIBMAALEGACAUAACwBQAgHgAAvwgAIJQCAQDGBAAhmQJAAMcEACGaAkAAxwQAIcsCAQDJBAAhzAIgANsEACHkAgEAxgQAIQkFAACvBQAgEwAAsQYAIBQAALAFACCUAgEAxgQAIZkCQADHBAAhmgJAAMcEACHLAgEAyQQAIcwCIADbBAAh5AIBAMYEACEBCwACCwQABghACgxLDA0AFg8AAxEABxNBBBVEARZGExdIFBhKFQUFOQcNABIQOwITBgQUOgoEAwAFCzYCDQARDzUDAwQIBggzChM0BAQDAAUNABARDAcSMAIEBAAGBgAIDwADEC8CAwUNBw0ADw4RCQMGAAgIFQoNAA4HAwAFBxYJCRoLCh4DCyICDCYMDQANAQgACgIIAAoLAAIFBycACSgACikACyoADCsAAQgsAAIFLQAOLgACETEAEjIAAgs4AA83AAQFPQAQPwATPAAUPgABCwACAQsAAgELAAIBFUwAAAELAAIBCwACAw0AGysAHCwAHQAAAAMNABsrABwsAB0BCAAKAQgACgUNACIrACUsACY9ACM-ACQAAAAAAAUNACIrACUsACY9ACM-ACQAAAUNACsrAC4sAC89ACw-AC0AAAAAAAUNACsrAC4sAC89ACw-AC0BAwAFAQMABQMNADQrADUsADYAAAADDQA0KwA1LAA2AQsAAgELAAIFDQA7KwA-LAA_PQA8PgA9AAAAAAAFDQA7KwA-LAA_PQA8PgA9AQMABQEDAAUDDQBEKwBFLABGAAAAAw0ARCsARSwARgELAAIBCwACBQ0ASysATiwATz0ATD4ATQAAAAAABQ0ASysATiwATz0ATD4ATQAAAw0AVCsAVSwAVgAAAAMNAFQrAFUsAFYCCAAKCwACAggACgsAAgMNAFsrAFwsAF0AAAADDQBbKwBcLABdAwQABgYACA8AAwMEAAYGAAgPAAMFDQBiKwBlLABmPQBjPgBkAAAAAAAFDQBiKwBlLABmPQBjPgBkAQsAAgELAAIDDQBrKwBsLABtAAAAAw0AaysAbCwAbQEGAAgBBgAIAw0AcisAcywAdAAAAAMNAHIrAHMsAHQBAwAFAQMABQUNAHkrAHwsAH09AHo-AHsAAAAAAAUNAHkrAHwsAH09AHo-AHsAAAMNAIIBKwCDASwAhAEAAAADDQCCASsAgwEsAIQBBQQABgiYAwoPAAMRAAcTmQMEBQQABgifAwoPAAMRAAcToAMEAw0AiQErAIoBLACLAQAAAAMNAIkBKwCKASwAiwEZAgEaTQEbTgEcTwEdUAEfUgEgVBchVRgiVwEjWRckWhknWwEoXAEpXRctYBouYR4vYgswYwsxZAsyZQszZgs0aAs1ahc2ax83bQs4bxc5cCA6cQs7cgs8cxc_diFAdydBeQhCeghDfQhEfghFfwhGgQEIR4MBF0iEAShJhgEISogBF0uJASlMigEITYsBCE6MARdPjwEqUJABMFGSAQZSkwEGU5UBBlSWAQZVlwEGVpkBBlebARdYnAExWZ4BBlqgARdboQEyXKIBBl2jAQZepAEXX6cBM2CoATdhqgEUYqsBFGOtARRkrgEUZa8BFGaxARRnswEXaLQBOGm2ARRquAEXa7kBOWy6ARRtuwEUbrwBF2-_ATpwwAFAccEBBHLCAQRzwwEEdMQBBHXFAQR2xwEEd8kBF3jKAUF5zAEEes4BF3vPAUJ80AEEfdEBBH7SARd_1QFDgAHWAUeBAdgBFYIB2QEVgwHbARWEAdwBFYUB3QEVhgHfARWHAeEBF4gB4gFIiQHkARWKAeYBF4sB5wFJjAHoARWNAekBFY4B6gEXjwHtAUqQAe4BUJEB7wEDkgHwAQOTAfEBA5QB8gEDlQHzAQOWAfUBA5cB9wEXmAH4AVGZAfoBA5oB_AEXmwH9AVKcAf4BA50B_wEDngGAAhefAYMCU6ABhAJXoQGFAgyiAYYCDKMBhwIMpAGIAgylAYkCDKYBiwIMpwGNAheoAY4CWKkBkAIMqgGSAherAZMCWawBlAIMrQGVAgyuAZYCF68BmQJasAGaAl6xAZsCB7IBnAIHswGdAge0AZ4CB7UBnwIHtgGhAge3AaMCF7gBpAJfuQGmAge6AagCF7sBqQJgvAGqAge9AasCB74BrAIXvwGvAmHAAbACZ8EBsgITwgGzAhPDAbUCE8QBtgITxQG3AhPGAbkCE8cBuwIXyAG8AmjJAb4CE8oBwAIXywHBAmnMAcICE80BwwITzgHEAhfPAccCatAByAJu0QHJAgnSAcoCCdMBywIJ1AHMAgnVAc0CCdYBzwIJ1wHRAhfYAdICb9kB1AIJ2gHWAhfbAdcCcNwB2AIJ3QHZAgneAdoCF98B3QJx4AHeAnXhAd8CCuIB4AIK4wHhAgrkAeICCuUB4wIK5gHlAgrnAecCF-gB6AJ26QHqAgrqAewCF-sB7QJ37AHuAgrtAe8CCu4B8AIX7wHzAnjwAfQCfvEB9gIF8gH3AgXzAfoCBfQB-wIF9QH8AgX2Af4CBfcBgAMX-AGBA3_5AYMDBfoBhQMX-wGGA4AB_AGHAwX9AYgDBf4BiQMX_wGMA4EBgAKNA4UBgQKOAwKCAo8DAoMCkAMChAKRAwKFApIDAoYClAMChwKWAxeIApcDhgGJApsDAooCnQMXiwKeA4cBjAKhAwKNAqIDAo4CowMXjwKmA4gBkAKnA4wB"
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
  title: "title",
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
var ScheduleStatus = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
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

// src/app/utils/utility.ts
var parseTimeOnDate = (timeValue, baseDate) => {
  const timeStr = typeof timeValue === "string" ? timeValue : timeValue.toISOString().substring(11, 16);
  const [hours, minutes] = timeStr.split(":").map(Number);
  const parsedDate = new Date(baseDate);
  parsedDate.setUTCHours(hours, minutes, 0, 0);
  return parsedDate;
};
var toDateKeyUTC = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};
var getUTCDayOfWeek = (date) => new Date(date).getUTCDay();
var utcDayRange = (date) => {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);
  return { start, end };
};
var formatDateToYYYYMMDD = (date) => {
  if (!date) return void 0;
  return date.toISOString().substring(0, 10);
};
var formatTimeToHHmm = (date) => {
  if (!date) return void 0;
  return date.toISOString().substring(11, 16);
};
var TZ = "Asia/Dhaka";
var dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
});
function formatDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return dateTimeFmt.format(d);
}

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
  const isUser = await prisma.user.findUnique({
    where: { email }
  });
  if (!isUser) {
    throw new AppError(httpStatus3.NOT_FOUND, "User not found");
  }
  if (isUser.status === "BLOCKED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is blocked");
  }
  if (isUser.isDeleted || isUser.status === "DELETED") {
    throw new AppError(httpStatus3.FORBIDDEN, "User is deleted");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUser.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus3.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    userId: isUser.id,
    name: isUser.name,
    email: isUser.email,
    role: isUser.role
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
  const { password: pass, ...user } = isUser;
  return {
    user,
    accessToken,
    refreshToken: refreshToken3
  };
};
var getMe = async (user) => {
  const dynamicInclude = {};
  const userRoleLower = user.role?.toLowerCase();
  if (userRoleLower && ["customer", "technician", "manager"].includes(userRoleLower)) {
    if (userRoleLower === "manager") {
      dynamicInclude["manager"] = {
        include: {
          region: true
        }
      };
    } else if (userRoleLower === "technician") {
      dynamicInclude["technician"] = {
        include: {
          regions: true,
          availability: true,
          skills: {
            include: {
              category: true
            }
          }
        }
      };
    } else {
      dynamicInclude[userRoleLower] = true;
    }
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
  const technician = isUserExists.technician;
  if (technician?.availability) {
    technician.availability = technician.availability.map((slot) => ({
      ...slot,
      startTime: formatTimeToHHmm(slot.startTime),
      endTime: formatTimeToHHmm(slot.endTime)
    }));
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

// src/app/utils/redirect.ts
var redirectUrl = (role) => {
  let url;
  if (role === UserRole.ADMIN) {
    url = `/admin-dashboard`;
  } else if (role === UserRole.CUSTOMER) {
    url = `/customer-dashboard`;
  } else if (role === UserRole.MANAGER) {
    url = `/manager-dashboard`;
  } else if (role === UserRole.TECHNICIAN) {
    url = `/technician-dashboard`;
  } else {
    url = `/login`;
  }
  return url;
};

// src/app/module/auth/auth.controller.ts
var isProduction = env_default.node_env === "production";
var getAuthCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge
});
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
  const { user, accessToken, refreshToken: refreshToken3 } = result;
  res.cookie(
    "accessToken",
    accessToken,
    getAuthCookieOptions(1e3 * 60 * 60 * 24)
  );
  res.cookie(
    "refreshToken",
    refreshToken3,
    getAuthCookieOptions(1e3 * 60 * 60 * 24 * 7)
  );
  sendResponse(res, {
    statusCode: httpStatus4.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      user,
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
  res.cookie(
    "accessToken",
    accessToken,
    getAuthCookieOptions(1e3 * 60 * 60 * 24)
  );
  res.cookie(
    "refreshToken",
    refreshToken2,
    getAuthCookieOptions(1e3 * 60 * 60 * 24 * 7)
  );
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
  res.cookie(
    "accessToken",
    accessToken,
    getAuthCookieOptions(1e3 * 60 * 60 * 24)
  );
  res.cookie(
    "refreshToken",
    refreshToken3,
    getAuthCookieOptions(1e3 * 60 * 60 * 24 * 7)
  );
  const url = redirectUrl(user.role);
  res.redirect(`${env_default.frontend_url}/${url}`);
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
  res.cookie(
    "accessToken",
    accessToken,
    getAuthCookieOptions(1e3 * 60 * 60 * 24)
  );
  res.cookie(
    "refreshToken",
    refreshToken3,
    getAuthCookieOptions(1e3 * 60 * 60 * 24 * 7)
  );
  const url = redirectUrl(user.role);
  res.redirect(`${env_default.frontend_url}/${url}`);
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
  res.clearCookie("accessToken", getAuthCookieOptions());
  res.clearCookie("refreshToken", getAuthCookieOptions());
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
    const { userId, name, email, role } = verifiedToken.data;
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
      userId,
      name,
      email,
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
  passport.authenticate(
    "google",
    {
      session: false,
      scope: ["profile", "email"]
    }
  )
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
route.post(
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
    },
    {
      area: {
        notIn: ["All"]
      }
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
var getSingleRegion = async (id) => {
  const isRegion = await prisma.region.findUnique({
    where: { id },
    include: {
      manager: {
        where: {
          verificationStatus: "APPROVED"
        },
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      technicians: {
        where: {
          isDeleted: false,
          isProfileCompleted: true
        },
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      }
    }
  });
  if (!isRegion) {
    throw new AppError(httpStatus7.NOT_FOUND, "region not found");
  }
  return isRegion;
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
var statusUpdate = async (regionId) => {
  const isRegion = await prisma.region.findUnique({
    where: { id: regionId }
  });
  if (!isRegion) {
    throw new AppError(httpStatus7.NOT_FOUND, "region not found");
  }
  if (isRegion.isActive === true) {
    await prisma.region.update({
      where: {
        id: regionId
      },
      data: {
        isActive: false
      }
    });
  } else {
    await prisma.region.update({
      where: {
        id: regionId
      },
      data: {
        isActive: true
      }
    });
  }
};
var regionService = {
  createRegion,
  getAllRegion,
  getRegions,
  updateRegion,
  getSingleRegion,
  statusUpdate
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
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "region retrive successfully",
    data: area,
    meta
  });
});
var getSingleRegion2 = catchAsync(async (req, res) => {
  const id = req.params.regionId;
  const result = await regionService.getSingleRegion(id);
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: "region retrieved successfully",
    data: result
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
var statusUpdate2 = catchAsync(async (req, res) => {
  const id = req.params.regionId;
  const result = await regionService.statusUpdate(id);
  sendResponse(res, {
    statusCode: httpStatus8.OK,
    success: true,
    message: `region status updated successfully`,
    data: result
  });
});
var regionController = {
  createRegion: createRegion2,
  getAllRegion: getAllRegion2,
  getRegions: getRegions2,
  updateRegion: updateRegion2,
  statusUpdate: statusUpdate2,
  getSingleRegion: getSingleRegion2
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
route2.get(
  "/:regionId",
  regionController.getSingleRegion
);
route2.get("/", regionController.getRegions);
route2.put(
  "/:regionId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  regionController.updateRegion
);
route2.patch(
  "/:regionId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  regionController.statusUpdate
);
var regionRouter = route2;

// src/app/module/manager/manager.route.ts
import { Router as Router3 } from "express";

// src/app/module/manager/manager.service.ts
import httpStatus10 from "http-status";
import bcrypt2 from "bcryptjs";
import crypto3 from "crypto";
import path4 from "path";
import ejs2 from "ejs";

// src/app/utils/randomPassword.ts
import httpStatus9 from "http-status";
import crypto2 from "crypto";
var generateRandomPass = (lenght = 10) => {
  if (lenght < 8) {
    throw new AppError(
      httpStatus9.BAD_REQUEST,
      "Lenght must be at least 8 characters"
    );
  }
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digit = "0123456789";
  const special = "!@#$%^&*_?+=";
  const all = lower + upper + digit + special;
  const pick = (chars2) => chars2[crypto2.randomInt(chars2.length)];
  const chars = [pick(lower), pick(upper), pick(digit), pick(special)];
  for (let i = chars.length; i < lenght; i++) {
    chars.push(pick(all));
  }
  for (let i = chars.length; i < lenght; i++) {
    const j = crypto2.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
};

// src/app/module/manager/manager.service.ts
var applyManager = async (payload) => {
  const isManager = await prisma.user.findUnique({
    where: {
      email: payload.user.email
    }
  });
  if (isManager) {
    throw new AppError(httpStatus10.CONFLICT, "manager already exists");
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
        httpStatus10.BAD_REQUEST,
        `Invalid region ID(s): ${invalidIds.join(", ")}. These regions do not exist.`
      );
    }
  }
  const { region, ...managerData } = payload.manager;
  const apply = await prisma.user.create({
    data: {
      ...payload.user,
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
  const otp = crypto3.randomInt(99999, 1e6);
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
    throw new AppError(httpStatus10.NOT_FOUND, "Manager does not exist");
  }
  if (isManager.emailVerified) {
    throw new AppError(httpStatus10.CONFLICT, "manager's email alredy verified");
  }
  const otpKey = `manager-otp-key: ${email}`;
  const redisOTP = await redisClient.get(otpKey);
  if (!redisOTP) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "otp expired. please apply again"
    );
  }
  if (redisOTP !== otp) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
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
    throw new AppError(httpStatus10.NOT_FOUND, "Manager not found");
  }
  if (!isManager.emailVerified) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "Manager email not verified yet"
    );
  }
  if (isManager.isDeleted) {
    throw new AppError(httpStatus10.FORBIDDEN, "Manager is deleted");
  }
  if (isManager.manager?.verificationStatus === "APPROVED") {
    throw new AppError(httpStatus10.CONFLICT, "manager already approved");
  }
  if (isManager.manager?.verificationStatus !== "PENDING") {
    throw new AppError(
      httpStatus10.CONFLICT,
      `you can't update varification status from  '${isManager.manager?.verificationStatus.toLowerCase()}'.`
    );
  }
  if (verificationStatus === "REJECTED" && !rejectionReason) {
    throw new AppError(
      httpStatus10.BAD_REQUEST,
      "for rejection must need to rejection reason"
    );
  }
  let password = null;
  let hashPass = null;
  if (payload.verificationStatus === "APPROVED") {
    password = generateRandomPass();
    hashPass = await bcrypt2.hash(
      password,
      Number(env_default.bcrypt_salt_rounds)
    );
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      await tx.user.update({
        where: {
          id: isManager.id
        },
        data: {
          password: hashPass
        }
      });
      const updateStatus2 = await tx.managerProfile.update({
        where: {
          id: isManager.manager?.id
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
        email: isManager.email,
        password,
        reason: rejectionReason,
        // only used in the rejected template,
        appName: env_default.app_name,
        loginUrl: `${env_default.frontend_url}/login`
      };
      const html = await ejs2.renderFile(templatePath, templateData);
      await transporter.sendMail({
        from: env_default.smtp_sender,
        to: isManager.email,
        subject: isApproved ? "Your Manager Application Has Been Approved" : "Your Manager Application Has Been Rejected",
        html
      });
      return updateStatus2;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
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
        },
        {
          phone: {
            contains: query.search,
            mode: "insensitive"
          }
        },
        {
          nid: {
            contains: query.search,
            mode: "insensitive"
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
  if (query.emailVerified) {
    andConditions.push({
      user: {
        emailVerified: Boolean(query.emailVerified)
      }
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
      region: true,
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
import httpStatus11 from "http-status";
var applyManger = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await managerService.applyManager(body);
  sendResponse(res, {
    statusCode: httpStatus11.OK,
    success: true,
    message: `Manager apply and OTP send successfully`,
    data: null
  });
});
var emailVerify2 = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await managerService.emailVerify(body);
  sendResponse(res, {
    statusCode: httpStatus11.OK,
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
    statusCode: httpStatus11.OK,
    success: true,
    message: `Manager approved/rejected successfully`,
    data: result
  });
});
var getAllMangers = catchAsync(async (req, res) => {
  const query = req.query;
  const { managers, meta } = await managerService.getAllManagers(query);
  sendResponse(res, {
    statusCode: httpStatus11.OK,
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
import httpStatus12 from "http-status";
var createCategory = async (payload, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus12.NOT_FOUND, "user not found");
  }
  const isCategory = await prisma.category.findUnique({
    where: {
      name: payload.name
    }
  });
  if (isCategory) {
    throw new AppError(httpStatus12.CONFLICT, "category already exist");
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
var getSingleCategory = async (id) => {
  const isCategory = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      skill: true
    }
  });
  if (!isCategory) {
    throw new AppError(httpStatus12.NOT_FOUND, "Category not found");
  }
  return isCategory;
};
var udpateCategory = async (payload, id) => {
  const isCategory = await prisma.category.findUnique({
    where: { id }
  });
  if (!isCategory) {
    throw new AppError(httpStatus12.NOT_FOUND, "category not found");
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
var statusUpdate3 = async (id) => {
  const isCategory = await prisma.category.findUnique({
    where: { id }
  });
  if (!isCategory) {
    throw new AppError(httpStatus12.NOT_FOUND, "category not found");
  }
  if (isCategory.isActive === true) {
    await prisma.category.update({
      where: {
        id
      },
      data: {
        isActive: false
      }
    });
  } else {
    await prisma.category.update({
      where: {
        id
      },
      data: {
        isActive: true
      }
    });
  }
};
var categoryService = {
  createCategory,
  getAllCategory,
  getCategories,
  udpateCategory,
  statusUpdate: statusUpdate3,
  getSingleCategory
};

// src/app/module/category/category.controller.ts
import httpStatus13 from "http-status";
var createCategory2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await categoryService.createCategory(body, user);
  sendResponse(res, {
    statusCode: httpStatus13.CREATED,
    success: true,
    message: `category created successfully`,
    data: result
  });
});
var getAllCategory2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { category, meta } = await categoryService.getAllCategory(query);
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: `category retrive successfully`,
    data: category,
    meta
  });
});
var getCategories2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { category, meta } = await categoryService.getCategories(query);
  sendResponse(res, {
    statusCode: httpStatus13.OK,
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
    statusCode: httpStatus13.OK,
    success: true,
    message: `category updated successfully`,
    data: result
  });
});
var getSingleCategory2 = catchAsync(async (req, res) => {
  const id = req.params.categoryId;
  const result = await categoryService.getSingleCategory(id);
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: `category retrive successfully`,
    data: result
  });
});
var statusUpdate4 = catchAsync(async (req, res) => {
  const id = req.params.categoryId;
  const result = await categoryService.statusUpdate(id);
  sendResponse(res, {
    statusCode: httpStatus13.OK,
    success: true,
    message: `category status updated successfully`,
    data: result
  });
});
var categoryController = {
  createCategory: createCategory2,
  getAllCategory: getAllCategory2,
  getCategories: getCategories2,
  udpateCategory: udpateCategory2,
  statusUpdate: statusUpdate4,
  getSingleCategory: getSingleCategory2
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
route4.get(
  "/:categoryId",
  categoryController.getSingleCategory
);
route4.put(
  "/:categoryId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.udpateCategory
);
route4.patch(
  "/:categoryId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  categoryController.statusUpdate
);
var categoryRouter = route4;

// src/app/module/service/service.route.ts
import { Router as Router5 } from "express";

// src/app/module/service/service.service.ts
import { addMinutes, isBefore } from "date-fns";
import httpStatus14 from "http-status";
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
var timeToDate = (time) => time ? /* @__PURE__ */ new Date(`1970-01-01T${time}:00.000Z`) : void 0;
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
    throw new AppError(httpStatus14.NOT_FOUND, "customer not found");
  }
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId
    }
  });
  if (!category) {
    throw new AppError(httpStatus14.NOT_FOUND, "this category not found");
  }
  const now = /* @__PURE__ */ new Date();
  console.log({
    now,
    serviceing: payload.servicingDate
  });
  if (isBefore(payload.servicingDate, now)) {
    throw new AppError(
      httpStatus14.BAD_REQUEST,
      "serviceing date can not be before current date"
    );
  }
  const preferredStartTime = timeToDate(payload.preferredStartTime);
  const service = await prisma.service.create({
    data: {
      title: payload.title,
      description: payload.description,
      servicingDate: payload.servicingDate,
      address: payload.address,
      duration: category.duration,
      categoryId: payload.categoryId,
      priority: payload.priority,
      regionId: payload.regionId,
      preferredStartTime,
      preferredEndTime: preferredStartTime ? addMinutes(preferredStartTime, category.duration) : void 0,
      customerId: isCustomer.customer?.id,
      workOrders: {
        create: {
          servicingDate: payload.servicingDate,
          customerId: isCustomer.customer?.id,
          status: "SCHEDULED",
          regionId: payload.regionId
        }
      }
    },
    include: {
      customer: true,
      workOrders: true
    }
  });
  return {
    ...service,
    servicingDate: formatDateToYYYYMMDD(service.servicingDate),
    preferredStartTime: formatTimeToHHmm(service.preferredStartTime),
    preferredEndTime: formatTimeToHHmm(service.preferredEndTime)
  };
};
var updateService = async (id, payload, user) => {
  const isService = await prisma.service.findUnique({
    where: {
      id,
      customer: {
        userId: user.userId
      }
    }
  });
  if (!isService) {
    throw new AppError(httpStatus14.NOT_FOUND, "service not found");
  }
  if (isService.status !== "PENDING") {
    throw new AppError(httpStatus14.BAD_REQUEST, "service cannot be updated");
  }
  let duration = isService.duration;
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId
      }
    });
    if (!category) {
      throw new AppError(httpStatus14.NOT_FOUND, "this category not found");
    }
    duration = category.duration;
  }
  if (payload.regionId) {
    const region = await prisma.region.findUnique({
      where: {
        id: payload.regionId
      }
    });
    if (!region) {
      throw new AppError(httpStatus14.NOT_FOUND, "this region not found");
    }
  }
  const now = /* @__PURE__ */ new Date();
  console.log({
    now,
    serviceing: payload.servicingDate
  });
  if (payload.servicingDate && isBefore(payload.servicingDate, now)) {
    throw new AppError(
      httpStatus14.BAD_REQUEST,
      "serviceing date can not be before current date"
    );
  }
  const preferredStartTime = timeToDate(payload.preferredStartTime) ?? isService.preferredStartTime;
  const updatedService = await prisma.service.update({
    where: {
      id
    },
    data: {
      description: payload.description,
      servicingDate: payload.servicingDate,
      address: payload.address,
      categoryId: payload.categoryId,
      duration,
      priority: payload.priority,
      regionId: payload.regionId,
      preferredStartTime,
      preferredEndTime: preferredStartTime ? addMinutes(preferredStartTime, duration ?? 60) : void 0
    },
    include: {
      customer: true
    }
  });
  return {
    ...updatedService,
    servicingDate: formatDateToYYYYMMDD(updatedService.servicingDate),
    preferredStartTime: formatTimeToHHmm(updatedService.preferredStartTime),
    preferredEndTime: formatTimeToHHmm(updatedService.preferredEndTime)
  };
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
    throw new AppError(httpStatus14.NOT_FOUND, "customer not found");
  }
  const andCondition = [
    {
      customerId: customer.id
    },
    {
      isDeleted: false
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
  if (query.today === "true" || query.today === true) {
    const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(/* @__PURE__ */ new Date());
    const { start, end } = utcDayRange(/* @__PURE__ */ new Date(`${todayKey}T00:00:00.000Z`));
    andCondition.push({
      servicingDate: {
        gte: start,
        lte: end
      }
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
    select: {
      id: true,
      title: true,
      address: true,
      description: true,
      preferredEndTime: true,
      preferredStartTime: true,
      priority: true,
      rejectionReason: true,
      servicingDate: true,
      status: true,
      workOrders: {
        select: {
          id: true,
          technician: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profileImg: true,
                  emailVerified: true,
                  status: true
                }
              }
            }
          }
        }
      },
      category: {
        select: {
          name: true,
          id: true
        }
      }
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
    data: services.map((s) => ({
      ...s,
      servicingDate: formatDateToYYYYMMDD(s.servicingDate),
      preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
      preferredEndTime: formatTimeToHHmm(s.preferredEndTime)
    })),
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
    throw new AppError(httpStatus14.NOT_FOUND, "user not found");
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
  if (query.today === "true" || query.today === true) {
    const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(/* @__PURE__ */ new Date());
    const { start, end } = utcDayRange(/* @__PURE__ */ new Date(`${todayKey}T00:00:00.000Z`));
    andCondition.push({
      servicingDate: {
        gte: start,
        lte: end
      }
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
      category: true,
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
    data: services.map((s) => ({
      ...s,
      servicingDate: formatDateToYYYYMMDD(s.servicingDate),
      preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
      preferredEndTime: formatTimeToHHmm(s.preferredEndTime)
    })),
    meta
  };
};
var getMyRegionServices = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
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
    throw new AppError(httpStatus14.NOT_FOUND, "manager not found");
  }
  const managerRegionIds = isManager.region.map((r) => r.id);
  const managesAllRegions = isManager.region.some((r) => r.area.toUpperCase() === "ALL");
  const allowStatus = ["APPROVED", "ASSIGNED", "COMPLETED", "IN_PROGRESS", "PENDING"];
  const andCondition = [
    { status: { in: allowStatus } },
    { isDeleted: false }
  ];
  if (!managesAllRegions) {
    andCondition.push({
      regionId: { in: managerRegionIds }
    });
  }
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
  if (query.today === "true" || query.today === true) {
    const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(/* @__PURE__ */ new Date());
    const { start, end } = utcDayRange(/* @__PURE__ */ new Date(`${todayKey}T00:00:00.000Z`));
    andCondition.push({
      servicingDate: {
        gte: start,
        lte: end
      }
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
      customer: {
        select: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      category: true,
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
    data: services.map((s) => ({
      ...s,
      servicingDate: formatDateToYYYYMMDD(s.servicingDate),
      preferredStartTime: formatTimeToHHmm(s.preferredStartTime),
      preferredEndTime: formatTimeToHHmm(s.preferredEndTime)
    })),
    meta
  };
};
var getSingleService = async (serviceId, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customer: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus14.NOT_FOUND, "user not found");
  }
  const isService = await prisma.service.findUnique({
    where: {
      id: serviceId
    },
    include: {
      region: true,
      customer: {
        select: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      workOrders: {
        include: {
          payment: {
            omit: {
              getwayResponse: true
            }
          },
          manager: {
            include: {
              user: {
                omit: {
                  password: true
                }
              }
            }
          },
          feedback: true,
          attachment: true,
          schedule: true,
          technician: {
            include: {
              user: {
                omit: {
                  password: true
                }
              }
            }
          },
          serviceReport: true
        }
      },
      category: true
    }
  });
  if (!isService) {
    throw new AppError(httpStatus14.NOT_FOUND, "service not found");
  }
  if (user.role === "CUSTOMER") {
    if (isService.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus14.UNAUTHORIZED, "unauthorized access");
    }
  }
  return {
    ...isService,
    servicingDate: formatDateToYYYYMMDD(isService.servicingDate),
    preferredStartTime: formatTimeToHHmm(isService.preferredStartTime),
    preferredEndTime: formatTimeToHHmm(isService.preferredEndTime)
  };
};
var getEligibleTechnicians = async (workOrderId, user) => {
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
    throw new AppError(httpStatus14.NOT_FOUND, "Work order not found");
  }
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
    },
    select: {
      region: {
        select: {
          id: true,
          area: true
        }
      }
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus14.NOT_FOUND, "Manager not found");
  }
  if (isManager.region[0].area !== "All") {
    const managesWorkOrderRegion = isManager.region.some(
      (region) => region.id === workOrder.regionId
    );
    if (!managesWorkOrderRegion) {
      throw new AppError(
        httpStatus14.FORBIDDEN,
        "You are not authorized to access work orders in this region"
      );
    }
  }
  const serviceDate = new Date(workOrder.servicingDate);
  const startTime = workOrder.service.preferredStartTime ? parseTimeOnDate(workOrder.service.preferredStartTime, serviceDate) : parseTimeOnDate("09:00", serviceDate);
  const endTime = workOrder.service.preferredEndTime ? parseTimeOnDate(workOrder.service.preferredEndTime, serviceDate) : addMinutes(startTime, workOrder.service.category.duration ?? 60);
  if (endTime.getTime() <= startTime.getTime()) {
    throw new AppError(httpStatus14.BAD_REQUEST, "Invalid service time window");
  }
  const candidates = await prisma.technicianProfile.findMany({
    where: {
      status: "AVAILABLE",
      isDeleted: false,
      isProfileCompleted: true,
      user: { status: "ACTIVE", isDeleted: false },
      regions: {
        some: { id: workOrder.regionId, isActive: true }
      },
      skills: {
        some: { categoryId: workOrder.service.categoryId, isActive: true }
      }
    },
    include: {
      user: {
        omit: {
          password: true
        }
      },
      availability: {
        omit: {
          technicianId: true,
          createdAt: true,
          updatedAt: true,
          isActive: true
        }
      },
      regions: {
        select: {
          id: true,
          area: true
        }
      }
    }
  });
  console.log("eligible technician==========", candidates);
  if (candidates.length === 0) return [];
  const { start: dayStart, end: dayEnd } = utcDayRange(serviceDate);
  const techIds = candidates.map((t) => t.id);
  const scheduleConflicts = await prisma.schedule.findMany({
    where: {
      technicianId: { in: techIds },
      workOrderId: { not: workOrderId },
      isdeleted: false,
      servicingDate: {
        gte: dayStart,
        lte: dayEnd
      },
      status: { in: ["SCHEDULED", "CONFIRMED"] },
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }]
    },
    select: { technicianId: true }
  });
  const conflictedTechIds = new Set(
    scheduleConflicts.map((c) => c.technicianId)
  );
  const serviceDateKey = toDateKeyUTC(serviceDate);
  const serviceDOW = getUTCDayOfWeek(serviceDate);
  const eligible = candidates.filter((tech) => {
    if (conflictedTechIds.has(tech.id)) return false;
    const isBlocked = tech.availability.some((slot) => {
      if (slot.type !== "BLOCKED") return false;
      const dateHit = slot.date ? toDateKeyUTC(slot.date) === serviceDateKey : false;
      const dowHit = slot.dayOfWeek != null ? slot.dayOfWeek === serviceDOW : false;
      if (!dateHit && !dowHit) return false;
      if (!slot.startTime || !slot.endTime) return true;
      const blockStart = parseTimeOnDate(slot.startTime, serviceDate);
      const blockEnd = parseTimeOnDate(slot.endTime, serviceDate);
      return blockStart.getTime() < endTime.getTime() && blockEnd.getTime() > startTime.getTime();
    });
    if (isBlocked) return false;
    const hasAvailability = tech.availability.some((slot) => {
      if (slot.type === "BLOCKED") return false;
      const slotStart = slot.startTime ? parseTimeOnDate(slot.startTime, serviceDate) : null;
      const slotEnd = slot.endTime ? parseTimeOnDate(slot.endTime, serviceDate) : null;
      if (!slotStart || !slotEnd) return false;
      let coversDate = false;
      if (slot.type === "RECURRING")
        coversDate = slot.dayOfWeek === serviceDOW;
      else if (slot.type === "ONE_OFF" && slot.date)
        coversDate = toDateKeyUTC(slot.date) === serviceDateKey;
      if (!coversDate) return false;
      return slotStart.getTime() <= startTime.getTime() && endTime.getTime() <= slotEnd.getTime();
    });
    return hasAvailability;
  });
  eligible.sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.jobsCompleted - a.jobsCompleted
  );
  return {
    service: workOrder.service,
    eligibleTech: eligible
  };
};
var assignTechnician = async (payload, user) => {
  const { amount, status, technicianId, workOrderId, rejectionReason } = payload;
  const isWorkOrder = await prisma.workOrder.findUnique({
    where: {
      id: workOrderId
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
      },
      region: true
    }
  });
  if (!isWorkOrder) {
    throw new AppError(httpStatus14.NOT_FOUND, "order not found");
  }
  const isManager = await prisma.managerProfile.findUnique({
    where: {
      userId: user.userId
    },
    include: {
      region: true
    }
  });
  if (!isManager) {
    throw new AppError(httpStatus14.NOT_FOUND, "Manager not found");
  }
  if (isManager.region[0].area !== "All") {
    const managesWorkOrderRegion = isManager.region.some(
      (region) => region.id === isWorkOrder.regionId
    );
    if (!managesWorkOrderRegion) {
      throw new AppError(
        httpStatus14.FORBIDDEN,
        "You are not authorized to access work orders in this region"
      );
    }
  }
  if (status === "REJECTED") {
    const transactionRes = await prisma.$transaction(
      async (tx) => {
        const service = await tx.service.update({
          where: {
            id: isWorkOrder.service.id
          },
          data: {
            rejectionReason,
            assignedAt: /* @__PURE__ */ new Date(),
            status,
            reviewedAt: /* @__PURE__ */ new Date(),
            reviewedBy: user.userId
          }
        });
        await tx.workOrder.update({
          where: {
            id: isWorkOrder.id
          },
          data: {
            status: WorkOrderStatus.CANCELLED
          }
        });
        return service;
      },
      {
        maxWait: 1e4,
        timeout: 15e3
      }
    );
    return transactionRes;
  }
  const isTechnician = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId
    },
    include: {
      user: true
    }
  });
  if (!isTechnician) {
    throw new AppError(httpStatus14.NOT_FOUND, "technician not found");
  }
  if (isTechnician.status !== "AVAILABLE") {
    throw new AppError(httpStatus14.CONFLICT, "technician no longer available");
  }
  if (isWorkOrder.status !== "SCHEDULED") {
    throw new AppError(
      httpStatus14.BAD_REQUEST,
      `Status need to must be scheduled`
    );
  }
  if (isWorkOrder.service.status !== "PENDING") {
    throw new AppError(httpStatus14.BAD_REQUEST, "service status not approved");
  }
  const serviceDate = new Date(isWorkOrder.servicingDate);
  const startTime = isWorkOrder.service.preferredStartTime ? parseTimeOnDate(isWorkOrder.service.preferredStartTime, serviceDate) : parseTimeOnDate("09:00", serviceDate);
  const endTime = isWorkOrder.service.preferredEndTime ? parseTimeOnDate(isWorkOrder.service.preferredEndTime, serviceDate) : addMinutes(startTime, isWorkOrder.service.category.duration ?? 60);
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const tech = await tx.technicianProfile.findUnique({
        where: {
          id: technicianId
        }
      });
      if (!tech) {
        throw new AppError(
          httpStatus14.CONFLICT,
          "technician no longer available"
        );
      }
      const { start: dayStart, end: dayEnd } = utcDayRange(
        isWorkOrder.servicingDate
      );
      const conflict = await tx.schedule.findFirst({
        where: {
          technicianId,
          workOrderId: { not: workOrderId },
          isdeleted: false,
          servicingDate: {
            gte: dayStart,
            lte: dayEnd
          },
          status: {
            in: ["SCHEDULED", "CONFIRMED"]
          },
          AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }]
        }
      });
      if (conflict) {
        throw new AppError(
          httpStatus14.CONFLICT,
          "Technician has conflicting schedule"
        );
      }
      await tx.service.update({
        where: {
          id: isWorkOrder.service.id
        },
        data: {
          assignedAt: /* @__PURE__ */ new Date(),
          status,
          reviewedAt: /* @__PURE__ */ new Date(),
          reviewedBy: user.userId
        }
      });
      const workOrder = await tx.workOrder.update({
        where: {
          id: isWorkOrder.id
        },
        data: {
          status: "EN_ROUTE",
          technicianId,
          managerId: isManager.id
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
              user: {
                omit: {
                  password: true
                }
              }
            }
          }
        }
      });
      const scheduleStartTime = parseTimeOnDate(
        workOrder.service.preferredStartTime ?? "09:00",
        workOrder.servicingDate
      );
      const scheduleEndTime = workOrder.service.preferredEndTime ? parseTimeOnDate(
        workOrder.service.preferredEndTime,
        workOrder.servicingDate
      ) : addMinutes(
        scheduleStartTime,
        workOrder.service.category.duration ?? 60
      );
      await tx.schedule.create({
        data: {
          workOrderId,
          technicianId,
          servicingDate: workOrder.servicingDate,
          startTime: scheduleStartTime,
          endTime: scheduleEndTime,
          status: ScheduleStatus.CONFIRMED
        }
      });
      const id_token = await getBkashIdToken();
      if (!id_token) {
        throw new AppError(httpStatus14.BAD_GATEWAY, "bkash id token faild");
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
var softDelete = async (id, user) => {
  const isService = await prisma.service.findUnique({
    where: {
      id,
      customer: {
        userId: user.userId
      }
    }
  });
  if (!isService) {
    throw new AppError(httpStatus14.NOT_FOUND, "service not found");
  }
  if (isService.isDeleted) {
    throw new AppError(httpStatus14.BAD_REQUEST, "Already Deleted");
  }
  if (isService.status === "APPROVED" || isService.status === "IN_PROGRESS" || isService.status === "ASSIGNED") {
    throw new AppError(httpStatus14.BAD_REQUEST, "service cannot be deleted");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      await tx.service.update({
        where: {
          id
        },
        data: {
          isDeleted: true,
          isDeletedAt: /* @__PURE__ */ new Date(),
          status: "CANCELLED"
        },
        include: {
          customer: true
        }
      });
      await tx.workOrder.update({
        where: {
          serviceId: id
        },
        data: {
          status: WorkOrderStatus.CANCELLED
        }
      });
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
};
var serviceService = {
  createService,
  getMyServices,
  getALLServices,
  getSingleService,
  getEligibleTechnicians,
  assignTechnician,
  updateService,
  softDelete,
  getMyRegionServices
};

// src/app/module/service/service.controller.ts
import httpStatus15 from "http-status";
var createService2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await serviceService.createService(body, user);
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: `service request retrived successfully`,
    data: result
  });
});
var updateService2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const serviceId = req.params.serviceId;
  const result = await serviceService.updateService(serviceId, body, user);
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: "service updated successfully",
    data: result
  });
});
var getMyServices2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { data, meta } = await serviceService.getMyServices(query, user);
  sendResponse(res, {
    statusCode: httpStatus15.CREATED,
    success: true,
    message: "service retrive successfully",
    data,
    meta
  });
});
var getAllServices = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { data, meta } = await serviceService.getALLServices(query, user);
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: "service retrive successfully",
    data,
    meta
  });
});
var getMyRegionServices2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { data, meta } = await serviceService.getMyRegionServices(
    query,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: "service retrive successfully",
    data,
    meta
  });
});
var getSingleService2 = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.serviceId;
  const result = await serviceService.getSingleService(id, user);
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: "service retrive successfully",
    data: result
  });
});
var getEligibleTechnicians2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const id = req.params.workOrderId;
    const result = await serviceService.getEligibleTechnicians(id, user);
    sendResponse(res, {
      statusCode: httpStatus15.OK,
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
    statusCode: httpStatus15.OK,
    success: true,
    message: body.status === "REJECTED" ? "Service rejected successfully" : "Technician assigned successfully",
    data: result
  });
});
var softDelete2 = catchAsync(async (req, res) => {
  const user = req.user;
  const serviceId = req.params.serviceId;
  await serviceService.softDelete(serviceId, user);
  sendResponse(res, {
    statusCode: httpStatus15.OK,
    success: true,
    message: "service deleted successfully",
    data: null
  });
});
var serviceController = {
  createService: createService2,
  getMyServices: getMyServices2,
  getAllServices,
  getSingleService: getSingleService2,
  getEligibleTechnicians: getEligibleTechnicians2,
  assignTechnician: assignTechnician2,
  updateService: updateService2,
  softDelete: softDelete2,
  getMyRegionServices: getMyRegionServices2
};

// src/app/module/service/service.validation.ts
import { z as z3 } from "zod";
var timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
var serviceZodSchema = z3.object({
  title: z3.string().min(5),
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
var serviceUpdateZodSchema = z3.object({
  title: z3.string().min(5).optional(),
  description: z3.string().min(5).optional(),
  servicingDate: z3.coerce.date().optional(),
  address: z3.object({}).passthrough().optional(),
  categoryId: z3.uuid().optional(),
  priority: z3.string().optional(),
  regionId: z3.uuid().optional(),
  preferredStartTime: z3.string().regex(timeRegex, "preferredStartTime must be HH:mm format").optional(),
  preferredEndTime: z3.string().regex(timeRegex, "preferredEndTime must be HH:mm format").optional()
});

// src/app/module/service/service.route.ts
var route5 = Router5();
route5.post(
  "/",
  zodValidation(serviceZodSchema),
  auth(UserRole.CUSTOMER),
  serviceController.createService
);
route5.put(
  "/:serviceId",
  zodValidation(serviceUpdateZodSchema),
  auth(UserRole.CUSTOMER),
  serviceController.updateService
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
  "/my-region",
  auth(UserRole.MANAGER),
  serviceController.getMyRegionServices
);
route5.get(
  "/:serviceId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.CUSTOMER, UserRole.MANAGER, UserRole.TECHNICIAN),
  serviceController.getSingleService
);
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
route5.patch(
  "/delete/:serviceId",
  auth(UserRole.CUSTOMER),
  serviceController.softDelete
);
var serviceRouter = route5;

// src/app/module/skill/skill.route.ts
import { Router as Router6 } from "express";

// src/app/module/skill/skill.service.ts
import httpStatus16 from "http-status";
var createSkill = async (payload, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus16.NOT_FOUND, "user not found");
  }
  const isCategory = await prisma.category.findUnique({
    where: {
      id: payload.categoryId
    }
  });
  if (!isCategory) {
    throw new AppError(httpStatus16.NOT_FOUND, "category not found");
  }
  const isSkill = await prisma.skill.findUnique({
    where: {
      name: payload.name
    }
  });
  if (isSkill) {
    throw new AppError(httpStatus16.CONFLICT, "skill already exist");
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
    },
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
    throw new AppError(httpStatus16.NOT_FOUND, "skill not found");
  }
  if (payload.categoryId) {
    const isCategory = await prisma.category.findUnique({
      where: { id: payload.categoryId }
    });
    if (!isCategory) {
      throw new AppError(httpStatus16.NOT_FOUND, "category not found");
    }
  }
  if (payload.name && payload.name !== isSkill.name) {
    const isNameExists = await prisma.skill.findUnique({
      where: { name: payload.name }
    });
    if (isNameExists) {
      throw new AppError(httpStatus16.CONFLICT, "skill name already exist");
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
var statusUpdate5 = async (skillId) => {
  const isSkill = await prisma.skill.findUnique({
    where: { id: skillId }
  });
  if (!isSkill) {
    throw new AppError(httpStatus16.NOT_FOUND, "skill not found");
  }
  if (isSkill.isActive) {
    await prisma.skill.update({
      where: {
        id: skillId
      },
      data: {
        isActive: false
      }
    });
  } else {
    await prisma.skill.update({
      where: {
        id: skillId
      },
      data: {
        isActive: true
      }
    });
  }
};
var deleteSkill = async (skillId) => {
  const isSkill = await prisma.skill.findUnique({
    where: { id: skillId }
  });
  if (!isSkill) {
    throw new AppError(httpStatus16.NOT_FOUND, "skill not found");
  }
  if (isSkill.isDelete === true) {
    await prisma.skill.update({
      where: {
        id: skillId
      },
      data: {
        isDelete: false,
        deletedAt: null
      }
    });
  } else {
    await prisma.skill.update({
      where: {
        id: skillId
      },
      data: {
        isDelete: true,
        deletedAt: /* @__PURE__ */ new Date()
      }
    });
  }
  ;
};
var skillService = {
  createSkill,
  getAllSkill,
  getSkills,
  updateSkill,
  statusUpdate: statusUpdate5,
  deleteSkill
};

// src/app/module/skill/skill.controller.ts
import httpStatus17 from "http-status";
var createSkill2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await skillService.createSkill(body, user);
  sendResponse(res, {
    statusCode: httpStatus17.CREATED,
    success: true,
    message: `skill created successfully`,
    data: result
  });
});
var getAllSkill2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { skill, meta } = await skillService.getAllSkill(query);
  sendResponse(res, {
    statusCode: httpStatus17.OK,
    success: true,
    message: `skill retrive successfully`,
    data: skill,
    meta
  });
});
var getSkills2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { skill, meta } = await skillService.getSkills(query);
  sendResponse(res, {
    statusCode: httpStatus17.OK,
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
    statusCode: httpStatus17.OK,
    success: true,
    message: `skill updated successfully`,
    data: result
  });
});
var statusUpdate6 = catchAsync(async (req, res) => {
  const id = req.params.skillId;
  const result = await skillService.statusUpdate(id);
  sendResponse(res, {
    statusCode: httpStatus17.OK,
    success: true,
    message: `skill status updated successfully`,
    data: result
  });
});
var deleteSkill2 = catchAsync(async (req, res) => {
  const id = req.params.skillId;
  const result = await skillService.deleteSkill(id);
  sendResponse(res, {
    statusCode: httpStatus17.OK,
    success: true,
    message: `skill soft deleted update successfully`,
    data: result
  });
});
var skillController = {
  createSkill: createSkill2,
  getAllSkill: getAllSkill2,
  getSkills: getSkills2,
  updateSkill: updateSkill2,
  statusUpdate: statusUpdate6,
  deleteSkill: deleteSkill2
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
  categoryId: z4.uuid().optional(),
  isActive: z4.boolean().optional()
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
route6.patch(
  "/:skillId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  skillController.statusUpdate
);
route6.patch(
  "/delete/:skillId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  skillController.deleteSkill
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
import httpStatus19 from "http-status";

// src/app/module/technician/technician.service.ts
import httpStatus18 from "http-status";
var completeProfile = async (payload, user) => {
  const { phone, address, bio, nid, skills, region, availability } = payload;
  const isTechnician = await prisma.technicianProfile.findUnique({
    where: { userId: user.userId }
  });
  if (!isTechnician) {
    throw new AppError(httpStatus18.NOT_FOUND, "technician not found");
  }
  if (isTechnician.isDeleted) {
    throw new AppError(httpStatus18.FORBIDDEN, "This profile has been deleted");
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
        httpStatus18.NOT_FOUND,
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
        httpStatus18.NOT_FOUND,
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
      await tx.technicianProfile.update({
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
        },
        include: {
          skills: true,
          availability: true,
          regions: true
        }
      });
      if (!tech) {
        throw new AppError(
          httpStatus18.INTERNAL_SERVER_ERROR,
          "Failed to retrieve updated technician profile"
        );
      }
      const isProfileCompleted = Boolean(
        tech.phone && tech.address && tech.nid && tech.skills.length > 0 && tech.availability.length > 0 && tech.regions.length > 0
      );
      await tx.technicianProfile.update({
        where: {
          id: tech.id
        },
        data: {
          isProfileCompleted
        }
      });
      return {
        ...tech,
        availability: tech.availability.map((slot) => ({
          ...slot,
          startTime: formatTimeToHHmm(slot.startTime),
          endTime: formatTimeToHHmm(slot.endTime)
        })),
        isProfileCompleted
      };
    },
    { maxWait: 3e4, timeout: 5e4 }
  );
  return transactionResult;
};
var parseCsv = (v) => {
  if (!v) return [];
  const raw3 = Array.isArray(v) ? v.join(",") : String(v);
  return raw3.split(",").map((s) => s.trim()).filter(Boolean);
};
var getAllTech = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [
    {
      isDeleted: false
    },
    {
      user: {
        emailVerified: true,
        status: UserStatus.ACTIVE,
        isDeleted: false
      }
    },
    {
      isProfileCompleted: true
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
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  if (query.minJobsCompleted || query.maxJobsCompleted) {
    andConditions.push({
      jobsCompleted: {
        ...query.minJobsCompleted && { gte: Number(query.minJobsCompleted) },
        ...query.maxJobsCompleted && { lte: Number(query.maxJobsCompleted) }
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
  const skillNames = parseCsv(query.skills ?? query.skill);
  if (skillNames.length > 0) {
    andConditions.push({
      skills: {
        some: {
          name: { in: skillNames, mode: "insensitive" },
          isActive: true
        }
      }
    });
  }
  const regionNames = parseCsv(query.regions ?? query.region);
  if (regionNames.length > 0) {
    andConditions.push({
      regions: {
        some: {
          area: { in: regionNames, mode: "insensitive" },
          isActive: true
        }
      }
    });
  }
  const dowList = parseCsv(query.dayOfWeek ?? query.dayofweek ?? query.dow).map(Number).filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
  if (dowList.length > 0) {
    andConditions.push({
      availability: {
        some: {
          isActive: true,
          type: { not: "BLOCKED" },
          dayOfWeek: { in: dowList }
        }
      }
    });
  }
  const technicians = await prisma.technicianProfile.findMany({
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
        select: {
          id: true,
          name: true,
          email: true,
          profileImg: true
        }
      },
      skills: { select: { id: true, name: true } },
      regions: { select: { id: true, area: true } },
      availability: {
        where: { isActive: true },
        select: {
          id: true,
          type: true,
          dayOfWeek: true,
          startTime: true,
          endTime: true
        }
      }
    }
  });
  const total = await prisma.technicianProfile.count({
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
    technicians: technicians.map((tech) => ({
      ...tech,
      availability: tech.availability.map((slot) => ({
        ...slot,
        startTime: formatTimeToHHmm(slot.startTime),
        endTime: formatTimeToHHmm(slot.endTime)
      }))
    })),
    meta
  };
};
var getTechById = async (technicianId) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId,
      isDeleted: false,
      isProfileCompleted: true,
      user: {
        emailVerified: true,
        status: UserStatus.ACTIVE,
        isDeleted: false
      }
    },
    include: {
      user: {
        omit: { password: true }
      },
      skills: { select: { id: true, name: true, icon: true } },
      regions: { select: { id: true, area: true } },
      availability: {
        where: { isActive: true },
        select: {
          id: true,
          type: true,
          dayOfWeek: true,
          date: true,
          startTime: true,
          endTime: true
        }
      }
    }
  });
  if (!technician) {
    throw new AppError(httpStatus18.NOT_FOUND, "technician not found");
  }
  return {
    ...technician,
    availability: technician.availability.map((slot) => ({
      ...slot,
      startTime: formatTimeToHHmm(slot.startTime),
      endTime: formatTimeToHHmm(slot.endTime)
    }))
  };
};
var technicianService = {
  completeProfile,
  getAllTech,
  getTechById
};

// src/app/module/technician/technician.controller.ts
var completeProfile2 = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await technicianService.completeProfile(req.body, user);
  if (!result) {
    throw new AppError(
      httpStatus19.INTERNAL_SERVER_ERROR,
      "something went wrong"
    );
  }
  sendResponse(res, {
    statusCode: httpStatus19.OK,
    success: true,
    message: result.isProfileCompleted ? "Technician profile completed successfully" : "Technician profile updated successfully",
    data: result
  });
});
var getAllTech2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { technicians, meta } = await technicianService.getAllTech(query);
  sendResponse(res, {
    statusCode: httpStatus19.OK,
    success: true,
    message: `technicians retrive successfully`,
    data: technicians,
    meta
  });
});
var getTechById2 = catchAsync(async (req, res) => {
  const { technicianId } = req.params;
  const result = await technicianService.getTechById(technicianId);
  sendResponse(res, {
    statusCode: httpStatus19.OK,
    success: true,
    message: `technician retrive successfully`,
    data: result
  });
});
var technicianController = {
  completeProfile: completeProfile2,
  getAllTech: getAllTech2,
  getTechById: getTechById2
};

// src/app/module/technician/technician.route.ts
var route7 = Router7();
route7.put(
  "/me/profile",
  zodValidation(completeProfileZodSchema),
  auth(UserRole.TECHNICIAN),
  technicianController.completeProfile
);
route7.get(
  "/all-technicians",
  technicianController.getAllTech
);
route7.get(
  "/:technicianId",
  technicianController.getTechById
);
var technicianRoutes = route7;

// src/app/module/workOrder/workOrder.route.ts
import { Router as Router8 } from "express";

// src/app/module/workOrder/workOrder.controller.ts
import httpStatus21 from "http-status";

// src/app/module/workOrder/workOrder.service.ts
import httpStatus20 from "http-status";
var formatWorkOrder = (wo) => ({
  ...wo,
  servicingDate: formatDateToYYYYMMDD(wo.servicingDate) ?? wo.servicingDate,
  service: wo.service ? {
    ...wo.service,
    servicingDate: formatDateToYYYYMMDD(wo.service.servicingDate) ?? wo.service.servicingDate,
    preferredStartTime: formatTimeToHHmm(wo.service.preferredStartTime),
    preferredEndTime: formatTimeToHHmm(wo.service.preferredEndTime)
  } : wo.service,
  schedule: wo.schedule ? {
    ...wo.schedule,
    servicingDate: formatDateToYYYYMMDD(wo.schedule.servicingDate) ?? wo.schedule.servicingDate,
    startTime: formatTimeToHHmm(wo.schedule.startTime),
    endTime: formatTimeToHHmm(wo.schedule.endTime),
    actualStart: formatDateTime(wo.schedule.actualStart),
    actualEnd: formatDateTime(wo.schedule.actualEnd)
  } : wo.schedule
});
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
          id: true,
          region: {
            select: {
              id: true,
              area: true
            }
          }
        }
      },
      technician: {
        select: {
          id: true,
          regions: {
            select: {
              id: true,
              area: true
            }
          }
        }
      }
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus20.NOT_FOUND, "user not found");
  }
  let ownerCondition;
  let cancelledCondition = {};
  switch (user.role) {
    case UserRole.ADMIN:
    case UserRole.SUPER_ADMIN:
      ownerCondition = {};
      cancelledCondition = {
        status: {
          in: ["SCHEDULED", "EN_ROUTE", "STARTED", "COMPLETED"]
        }
      };
      break;
    case UserRole.MANAGER: {
      if (!isUser.manager?.id) {
        throw new AppError(httpStatus20.NOT_FOUND, "Manager profile not found");
      }
      const managerRegions = isUser.manager.region ?? [];
      const managesAllRegions = managerRegions.some(
        (region) => region.area.toUpperCase() === "ALL"
      );
      ownerCondition = managesAllRegions ? {} : { regionId: { in: managerRegions.map((region) => region.id) } };
      cancelledCondition = {
        status: {
          in: ["SCHEDULED", "EN_ROUTE", "STARTED", "COMPLETED"]
        }
      };
      break;
    }
    case UserRole.CUSTOMER:
      if (!isUser.customer?.id) {
        throw new AppError(httpStatus20.NOT_FOUND, "Customer profile not found");
      }
      ownerCondition = { customerId: isUser.customer.id };
      break;
    case UserRole.TECHNICIAN: {
      if (!isUser.technician?.id) {
        throw new AppError(
          httpStatus20.NOT_FOUND,
          "Technician profile not found"
        );
      }
      const technicianRegions = isUser.technician.regions ?? [];
      ownerCondition = {
        regionId: { in: technicianRegions.map((region) => region.id) }
      };
      cancelledCondition = {
        status: {
          in: ["SCHEDULED", "EN_ROUTE", "STARTED", "COMPLETED"]
        }
      };
      break;
    }
    default:
      throw new AppError(
        httpStatus20.FORBIDDEN,
        "This user role cannot access work orders"
      );
  }
  const andCondition = [
    ownerCondition,
    cancelledCondition,
    {
      service: {
        isDeleted: false
        // stat
      }
    }
  ];
  if (query.search) {
    andCondition.push({
      OR: [
        {
          service: {
            title: {
              contains: query.search,
              mode: "insensitive"
            }
          }
        },
        {
          service: {
            category: {
              name: {
                contains: query.search,
                mode: "insensitive"
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
  if (query.today === "true" || query.today === true) {
    const todayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(/* @__PURE__ */ new Date());
    const { start, end } = utcDayRange(/* @__PURE__ */ new Date(`${todayKey}T00:00:00.000Z`));
    andCondition.push({
      servicingDate: {
        gte: start,
        lte: end
      }
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
      feedback: true,
      attachment: true,
      serviceReport: true,
      customer: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      manager: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      schedule: true,
      payment: {
        omit: {
          getwayResponse: true
        }
      },
      service: {
        include: {
          category: true
        }
      }
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
    workOrders: workOrders.map(formatWorkOrder),
    meta
  };
};
var getWrokOrder = async (id, user) => {
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
          id: true,
          region: {
            select: {
              id: true,
              area: true
            }
          }
        }
      },
      technician: {
        select: {
          id: true,
          regions: {
            select: {
              id: true,
              area: true
            }
          }
        }
      }
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus20.NOT_FOUND, "user not found");
  }
  let workOrderWhereCondition;
  switch (user.role) {
    case UserRole.ADMIN:
    case UserRole.SUPER_ADMIN:
      workOrderWhereCondition = { id };
      break;
    case UserRole.MANAGER: {
      if (!isUser.manager?.id) {
        throw new AppError(httpStatus20.NOT_FOUND, "Manager profile not found");
      }
      const managerRegions = isUser.manager.region ?? [];
      const managesAllRegions = managerRegions.some(
        (region) => region.area.toUpperCase() === "ALL"
      );
      workOrderWhereCondition = managesAllRegions ? { id } : { id, regionId: { in: managerRegions.map((region) => region.id) } };
      break;
    }
    case UserRole.CUSTOMER:
      if (!isUser.customer?.id) {
        throw new AppError(httpStatus20.NOT_FOUND, "Customer profile not found");
      }
      workOrderWhereCondition = {
        id,
        customerId: isUser.customer.id
      };
      break;
    case UserRole.TECHNICIAN: {
      if (!isUser.technician?.id) {
        throw new AppError(
          httpStatus20.NOT_FOUND,
          "Technician profile not found"
        );
      }
      const technicianRegions = isUser.technician.regions ?? [];
      workOrderWhereCondition = {
        id,
        regionId: { in: technicianRegions.map((region) => region.id) }
      };
      break;
    }
    default:
      throw new AppError(
        httpStatus20.FORBIDDEN,
        "This user role cannot access work orders"
      );
  }
  const workOrder = await prisma.workOrder.findFirst({
    where: workOrderWhereCondition,
    include: {
      feedback: true,
      attachment: true,
      serviceReport: true,
      customer: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      manager: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true
            }
          }
        }
      },
      schedule: true,
      payment: {
        omit: {
          getwayResponse: true
        }
      },
      service: {
        include: {
          category: true
        }
      }
    }
  });
  if (!workOrder) {
    throw new AppError(httpStatus20.NOT_FOUND, "Work order not found");
  }
  return formatWorkOrder(workOrder);
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
    throw new AppError(httpStatus20.NOT_FOUND, "user not found");
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
    workOrders: workOrders.map(formatWorkOrder),
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
    throw new AppError(httpStatus20.NOT_FOUND, "technician not found");
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
    throw new AppError(httpStatus20.NOT_FOUND, "order not found");
  }
  if (isExist.status === WorkOrderStatus.COMPLETED) {
    throw new AppError(httpStatus20.NOT_FOUND, "service work already completed");
  }
  if (isExist.status === "SCHEDULED") {
    throw new AppError(
      httpStatus20.BAD_REQUEST,
      `You can't update status from ${isExist.status.toLocaleLowerCase()} to ${payload.status}`
    );
  }
  if (isExist.status === "CANCELLED") {
    throw new AppError(
      httpStatus20.BAD_REQUEST,
      `work order already cancelled. You can't update`
    );
  }
  if (isExist.status === "EN_ROUTE" && payload.status === "COMPLETED") {
    throw new AppError(httpStatus20.BAD_REQUEST, `work order status can't be updated from ${isExist.status} to ${payload.status}`);
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
            actualEnd: /* @__PURE__ */ new Date(),
            status: ScheduleStatus.COMPLETED
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
  return formatWorkOrder(transactionResult);
};
var workOrderService = {
  getMyWrokOrders,
  getNewWrokOrders,
  udpateStatus,
  getWrokOrder
};

// src/app/module/workOrder/workOrder.controller.ts
var getMyWorkOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { workOrders, meta } = await workOrderService.getMyWrokOrders(
    query,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus21.OK,
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
  sendResponse(res, {
    statusCode: httpStatus21.OK,
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
    statusCode: httpStatus21.OK,
    success: true,
    message: "work order status successfully",
    data: result
  });
});
var getWorkOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.workOrderId;
  const result = await workOrderService.getWrokOrder(id, user);
  sendResponse(res, {
    statusCode: httpStatus21.OK,
    success: true,
    message: "work order retrive successfully",
    data: result
  });
});
var workOrderController = {
  getMyWorkOrders,
  getNewWorkOrders,
  updateStatus,
  getWorkOrder
};

// src/app/module/workOrder/workOrder.route.ts
var route8 = Router8();
route8.get(
  "/my-workorder",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.TECHNICIAN,
    UserRole.CUSTOMER,
    UserRole.MANAGER
  ),
  workOrderController.getMyWorkOrders
);
route8.get(
  "/new-workorder",
  auth(UserRole.TECHNICIAN),
  workOrderController.getNewWorkOrders
);
route8.get(
  "/:workOrderId",
  auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.MANAGER, UserRole.SUPER_ADMIN, UserRole.TECHNICIAN),
  workOrderController.getWorkOrder
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
import httpStatus22 from "http-status";
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
    throw new AppError(httpStatus22.NOT_FOUND, "customer not found");
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
    throw new AppError(httpStatus22.NOT_FOUND, "order not found");
  }
  if (isWorkOrder.payment?.status === "PAID") {
    throw new AppError(httpStatus22.CONFLICT, "you already completed payment");
  }
  if (isWorkOrder.service.status === "REJECTED" || isWorkOrder.service.status === "CANCELLED" || isWorkOrder.service.status === "PENDING" || isWorkOrder.service.status === "APPROVED" || isWorkOrder.service.status === "ASSIGNED") {
    throw new AppError(
      httpStatus22.CONFLICT,
      `your service is ${isWorkOrder.service.status.toString()}. You can't payment before in-progress or completed`
    );
  }
  if (isWorkOrder.status === "CANCELLED") {
    throw new AppError(httpStatus22.CONFLICT, "Yur order is cancelled");
  }
  if (isWorkOrder.status === "EN_ROUTE") {
    throw new AppError(
      httpStatus22.CONFLICT,
      "Work is not completed. so you can not payemnt before completed or start"
    );
  }
  const amount = isWorkOrder.payment?.amount.toString();
  const id_token = await getBkashIdToken();
  if (!id_token) {
    throw new AppError(httpStatus22.BAD_GATEWAY, "bkash id token faild");
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
        throw new AppError(httpStatus22.BAD_GATEWAY, "bkash id token failed");
      }
      const paymentID = query.paymentID;
      const status = query.status;
      console.log({
        "payment id": paymentID,
        status
      });
      if (!paymentID) {
        throw new AppError(httpStatus22.BAD_REQUEST, "Payment id missing");
      }
      if (!status) {
        throw new AppError(httpStatus22.BAD_REQUEST, "status is missing");
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
          redirectUrl: `${env_default.frontend_url}?status=${status}`
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
          throw new AppError(httpStatus22.NOT_FOUND, "work order not found");
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
        doc.text(`Manager Phone: ${workOrder.manager?.phone}`);
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
          redirectUrl: `${env_default.frontend_url}/customer-dashboard/payment/my-payment?status=success`
        };
      } else {
        throw new AppError(httpStatus22.BAD_REQUEST, "bkash callback error!");
      }
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionResult;
};
var getPaymentInfo = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 9);
  const andCondition = [];
  if (user.role === UserRole.CUSTOMER) {
    const isCustomer = await prisma.customerProfile.findUnique({
      where: {
        userId: user.userId
      }
    });
    if (!isCustomer) {
      throw new AppError(httpStatus22.NOT_FOUND, "customer not found");
    }
    andCondition.push({
      workOrder: {
        customer: {
          userId: user.userId
        }
      }
    });
  } else if (user.role === UserRole.TECHNICIAN) {
    const isTech = await prisma.technicianProfile.findUnique({
      where: {
        userId: user.userId
      }
    });
    if (!isTech) {
      throw new AppError(httpStatus22.NOT_FOUND, "technician not found");
    }
    andCondition.push({
      workOrder: {
        technician: {
          userId: user.userId
        }
      }
    });
  } else if (user.role === UserRole.MANAGER) {
    const isManager = await prisma.managerProfile.findUnique({
      where: {
        userId: user.userId
      }
    });
    if (!isManager) {
      throw new AppError(httpStatus22.NOT_FOUND, "manager not found");
    }
    andCondition.push({
      workOrder: {
        manager: {
          userId: user.userId
        }
      }
    });
  } else if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
    throw new AppError(
      httpStatus22.FORBIDDEN,
      "Forbidden. You don't have permission to access payments."
    );
  }
  if (query.search) {
    andCondition.push({
      OR: [
        {
          workOrder: {
            service: {
              category: {
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
  if (query.workOrderId) {
    andCondition.push({
      workOrderId: query.workOrderId
    });
  }
  if (query.serviceId) {
    andCondition.push({
      workOrder: {
        serviceId: query.serviceId
      }
    });
  }
  if (query.trxId) {
    andCondition.push({
      transectionId: query.trxId
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
          service: {
            include: {
              category: true,
              region: true
            }
          },
          manager: {
            select: {
              user: {
                omit: {
                  password: true
                }
              }
            }
          },
          customer: {
            select: {
              user: {
                omit: {
                  password: true
                }
              }
            }
          },
          technician: {
            select: {
              user: {
                omit: {
                  password: true
                }
              }
            }
          }
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
  getPaymentInfo
};

// src/app/module/payment/payment.controller.ts
import httpStatus23 from "http-status";
var createpayment = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await paymentService.createPayment(body, user);
  sendResponse(res, {
    statusCode: httpStatus23.OK,
    success: true,
    message: `payment url created successfully`,
    data: result
  });
});
var bkashCallback2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { result, redirectUrl: redirectUrl2 } = await paymentService.bkashCallback(query);
  res.redirect(redirectUrl2);
  console.log("payment result = ", result);
});
var getPaymentInfo2 = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { payment, meta } = await paymentService.getPaymentInfo(query, user);
  sendResponse(res, {
    statusCode: httpStatus23.OK,
    success: true,
    message: `payment retrive successfully`,
    data: payment,
    meta
  });
});
var paymentController = {
  createpayment,
  bkashCallback: bkashCallback2,
  getPaymentInfo: getPaymentInfo2
};

// src/app/module/payment/payment.route.ts
var route9 = Router9();
route9.post("/create", auth(UserRole.CUSTOMER), paymentController.createpayment);
route9.get("/service/callback", paymentController.bkashCallback);
route9.get("/payment-info", auth(), paymentController.getPaymentInfo);
var paymentRouter = route9;

// src/app/module/attachment/attachment.route.ts
import { Router as Router10 } from "express";

// src/app/module/attachment/attachment.controller.ts
import httpStatus25 from "http-status";

// src/app/module/attachment/attachment.service.ts
import httpStatus24 from "http-status";

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
    throw new AppError(httpStatus24.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus24.NOT_FOUND, "work order not found");
  }
  if (isWrokOrder.status === "CANCELLED") {
    throw new AppError(
      httpStatus24.BAD_REQUEST,
      `you can not attached files from ${isWrokOrder.status} status`
    );
  }
  if (user.role === "CUSTOMER") {
    if (isWrokOrder.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "MANAGER") {
    if (isWrokOrder.managerId !== isUser.manager?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "TECHNICIAN") {
    if (isWrokOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
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
                  httpStatus24.BAD_GATEWAY,
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
var getAttachments = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  const PARTIES = ["customer", "manager", "technician"];
  switch (user.role) {
    case "CUSTOMER": {
      const profile = await prisma.customerProfile.findUnique({
        where: {
          userId: user.userId
        },
        select: {
          id: true
        }
      });
      if (!profile) {
        throw new AppError(httpStatus24.NOT_FOUND, "customer not found");
      }
      andConditions.push({ workOrder: { customerId: profile.id } });
      break;
    }
    case "MANAGER": {
      const profile = await prisma.managerProfile.findUnique({
        where: { userId: user.userId },
        select: { id: true }
      });
      if (!profile) throw new AppError(httpStatus24.NOT_FOUND, "manager not found");
      andConditions.push({ workOrder: { managerId: profile.id } });
      break;
    }
    case "TECHNICIAN": {
      const profile = await prisma.technicianProfile.findUnique({
        where: { userId: user.userId },
        select: { id: true }
      });
      if (!profile) throw new AppError(httpStatus24.NOT_FOUND, "technician not found");
      andConditions.push({ workOrder: { technicianId: profile.id } });
      break;
    }
    case "ADMIN":
    case "SUPER_ADMIN":
      break;
    default:
      throw new AppError(httpStatus24.FORBIDDEN, "you are not allowed to view attachments");
  }
  if (query.search) {
    const partiesToSearch = PARTIES.filter((p) => p.toUpperCase() !== user.role);
    andConditions.push({
      OR: partiesToSearch.map(
        (party) => ({
          workOrder: {
            [party]: {
              user: {
                name: { contains: query.search, mode: "insensitive" }
              }
            }
          }
        })
      )
    });
  }
  if (query.region) {
    const areas = query.region.split(",").map((item) => item.trim());
    andConditions.push({ workOrder: { region: { area: { in: areas } } } });
  }
  if (query.isDelete !== void 0) {
    andConditions.push({ isDelete: String(query.isDelete) === "true" });
  }
  const where = { AND: andConditions };
  const [attachments, total] = await Promise.all([
    prisma.attachment.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { [sort]: order },
      include: { workOrder: true }
    }),
    prisma.attachment.count({ where })
  ]);
  return {
    attachments,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
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
    throw new AppError(httpStatus24.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus24.NOT_FOUND, "Attachment not found");
  }
  if (user.role === "CUSTOMER") {
    if (attachment.workOrder.customerId !== isUser.customer?.id) {
      throw new AppError(
        httpStatus24.UNAUTHORIZED,
        "you can not attach files unauthorized"
      );
    }
  }
  if (user.role === "MANAGER") {
    if (attachment.workOrder.managerId !== isUser.manager?.id) {
      throw new AppError(
        httpStatus24.UNAUTHORIZED,
        "you can not attach files unauthorized"
      );
    }
  }
  if (user.role === "TECHNICIAN") {
    if (attachment.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(
        httpStatus24.UNAUTHORIZED,
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
    throw new AppError(httpStatus24.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus24.NOT_FOUND, "Attachment not found");
  }
  if (user.role === "CUSTOMER") {
    if (attachment.workOrder.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "MANAGER") {
    if (attachment.workOrder.managerId !== isUser.manager?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
    }
  }
  if (user.role === "TECHNICIAN") {
    if (attachment.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus24.UNAUTHORIZED, "you can not attach files");
    }
  }
  await prisma.attachment.delete({
    where: {
      id: attachment.id
    }
  });
};
var attachmentService = {
  createAttachment,
  udpateAttach,
  deleteAttach,
  getAttachments
};

// src/app/module/attachment/attachment.controller.ts
var createAttach = catchAsync(async (req, res) => {
  const files = req.files;
  const attachment = files?.["attachment"] || [];
  if (attachment.length === 0) {
    throw new AppError(httpStatus25.BAD_REQUEST, "minimum one file need");
  }
  if (!req.body.data) {
    throw new AppError(httpStatus25.BAD_REQUEST, "form data not found");
  }
  const data = JSON.parse(req.body.data);
  const user = req.user;
  const result = await attachmentService.createAttachment(
    data,
    attachment,
    user
  );
  sendResponse(res, {
    statusCode: httpStatus25.CREATED,
    success: true,
    message: `attachment created successfully`,
    data: result
  });
});
var getAttatchments = catchAsync(async (req, res) => {
  const user = req.user;
  const query = req.query;
  const { attachments, meta } = await attachmentService.getAttachments(query, user);
  sendResponse(res, {
    statusCode: httpStatus25.OK,
    success: true,
    message: `attachment updated successfully`,
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
    statusCode: httpStatus25.OK,
    success: true,
    message: `attachment updated successfully`,
    data: result
  });
});
var deletedAttach = catchAsync(async (req, res) => {
  const id = req.params.attachmentId;
  const user = req.user;
  await attachmentService.deleteAttach(id, user);
  sendResponse(res, {
    statusCode: httpStatus25.OK,
    success: true,
    message: `attatchemnt deleted successfully`,
    data: null
  });
});
var attachmentController = {
  createAttach,
  getAttatchments,
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
  auth(UserRole.CUSTOMER, UserRole.TECHNICIAN),
  attachmentController.createAttach
);
route10.get(
  "/",
  auth(),
  attachmentController.getAttatchments
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
route10.delete(
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
import httpStatus26 from "http-status";
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
    throw new AppError(httpStatus26.NOT_FOUND, "technician not found");
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
    throw new AppError(httpStatus26.NOT_FOUND, "work order not found");
  }
  if (isWrokOrder.status !== "COMPLETED" || isWrokOrder.service.status !== "COMPLETED") {
    throw new AppError(
      httpStatus26.BAD_REQUEST,
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
              httpStatus26.BAD_GATEWAY,
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
    throw new AppError(httpStatus26.NOT_FOUND, "technician not found");
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
    throw new AppError(httpStatus26.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus26.NOT_FOUND, "service report not found");
  }
  if (isReport.isDelete) {
    throw new AppError(httpStatus26.BAD_REQUEST, "service report deleted");
  }
  if (user.role === "TECHNICIAN") {
    if (isReport.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus26.UNAUTHORIZED, "you can not update");
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
              httpStatus26.BAD_GATEWAY,
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
    throw new AppError(httpStatus26.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus26.NOT_FOUND, "service report not found");
  }
  if (user.role === "TECHNICIAN") {
    if (isReport.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus26.UNAUTHORIZED, "you can not delete");
    }
  }
  await Cloudinary.cloudinary.uploader.destroy(isReport.reportPublicId);
  console.log("report deleted from cloudinary");
  await prisma.serviceReport.delete({
    where: {
      id: isReport.id
    }
  });
};
var reportService = {
  createReport,
  getMyReport,
  getAllReport,
  updateReport,
  deleteReport
};

// src/app/module/report/report.controller.ts
import httpStatus27 from "http-status";
var attachReport = catchAsync(async (req, res) => {
  const report = req.file;
  if (!report) {
    throw new AppError(httpStatus27.BAD_REQUEST, "report must be added");
  }
  let data = null;
  if (req.body.data) {
    data = JSON.parse(req.body.data);
  }
  const user = req.user;
  const result = await reportService.createReport(data, report, user);
  sendResponse(res, {
    statusCode: httpStatus27.CREATED,
    success: true,
    message: `report attached successfully`,
    data: result
  });
});
var getMyReport2 = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { reports, meta } = await reportService.getMyReport(query, user);
  sendResponse(res, {
    statusCode: httpStatus27.OK,
    success: true,
    message: `all reports retrived successfully`,
    data: reports,
    meta
  });
});
var getAllReport2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { reports, meta } = await reportService.getAllReport(query);
  sendResponse(res, {
    statusCode: httpStatus27.OK,
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
    statusCode: httpStatus27.CREATED,
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
    statusCode: httpStatus27.CREATED,
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
route11.delete(
  "/delete/:reportId",
  auth(UserRole.TECHNICIAN, UserRole.SUPER_ADMIN, UserRole.ADMIN),
  reportController.deleteReport
);
var reportRouter = route11;

// src/app/module/feedback/feedback.route.ts
import { Router as Router12 } from "express";

// src/app/module/feedback/feedback.service.ts
import httpStatus28 from "http-status";
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
    throw new AppError(httpStatus28.NOT_FOUND, "customer not found");
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
      service: true,
      payment: true
    }
  });
  if (!workOrder) {
    throw new AppError(httpStatus28.NOT_FOUND, "work order not found");
  }
  if (workOrder.status !== "COMPLETED" || workOrder.service.status !== "COMPLETED") {
    throw new AppError(
      httpStatus28.BAD_REQUEST,
      "without complete you can not crate review"
    );
  }
  if (workOrder.customerId !== isCustomer.id) {
    throw new AppError(httpStatus28.UNAUTHORIZED, "You are not authorized to review");
  }
  if (workOrder.payment?.status !== "PAID") {
    throw new AppError(httpStatus28.BAD_REQUEST, "you can not feedback before payment");
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
      const technicianId = createFeedback3.workOrder.technician?.id;
      if (!technicianId) {
        throw new AppError(httpStatus28.BAD_REQUEST, "technician not found");
      }
      const result = await tx.feedback.aggregate({
        _avg: {
          rating: true
        },
        where: {
          workOrder: {
            technicianId
          }
        }
      });
      const avgRating = result._avg.rating ?? 0;
      await tx.technicianProfile.update({
        where: {
          id: technicianId
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
var getById = async (id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customer: true,
      manager: true,
      technician: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus28.NOT_FOUND, "user not found");
  }
  const result = await prisma.feedback.findUnique({
    where: {
      id
    },
    include: {
      workOrder: true
    }
  });
  if (!result) {
    throw new AppError(httpStatus28.NOT_FOUND, "feedback not found");
  }
  if (user.role === "TECHNICIAN") {
    if (result.workOrder.technicianId !== isUser.technician?.id) {
      throw new AppError(httpStatus28.UNAUTHORIZED, "unauthorized");
    }
  }
  if (user.role === "MANAGER") {
    if (result.workOrder.managerId !== isUser.manager?.id) {
      throw new AppError(httpStatus28.UNAUTHORIZED, "unauthorized");
    }
  }
  if (user.role === "CUSTOMER") {
    if (result.workOrder.customerId !== isUser.customer?.id) {
      throw new AppError(httpStatus28.UNAUTHORIZED, "unauthorized");
    }
  }
  return result;
};
var getAllFeedbacks = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
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
      workOrder: {
        include: {
          service: {
            include: {
              category: true
            }
          }
        }
      }
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
    throw new AppError(httpStatus28.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus28.NOT_FOUND, "feedback not found");
  }
  const transactionRes = await prisma.$transaction(
    async (tx) => {
      const result = await tx.feedback.update({
        where: {
          id: feedback.id,
          workOrder: {
            customerId: isCustomer.id
          }
        },
        data: {
          ...payload
        },
        include: {
          workOrder: true
        }
      });
      const res = await tx.feedback.aggregate({
        _avg: {
          rating: true
        },
        where: {
          workOrder: {
            technicianId: result.workOrder.technicianId
          }
        }
      });
      const avgRating = res._avg.rating ?? 0;
      await tx.technicianProfile.update({
        where: {
          id: result.workOrder.technicianId
        },
        data: {
          rating: avgRating
        }
      });
      return result;
    },
    {
      maxWait: 1e4,
      timeout: 15e3
    }
  );
  return transactionRes;
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
    throw new AppError(httpStatus28.NOT_FOUND, "user not found");
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
    throw new AppError(httpStatus28.NOT_FOUND, "feedback not found");
  }
  const result = await prisma.$transaction(async (tx) => {
    const deletedFeedback = await tx.feedback.delete({
      where: {
        id: feedback.id
      },
      include: {
        workOrder: true
      }
    });
    if (deletedFeedback.workOrder.technicianId) {
      const average = await tx.feedback.aggregate({
        _avg: {
          rating: true
        },
        where: {
          workOrder: {
            technicianId: deletedFeedback.workOrder.technicianId
          }
        }
      });
      await tx.technicianProfile.update({
        where: {
          id: deletedFeedback.workOrder.technicianId
        },
        data: {
          rating: average._avg.rating ?? 0
        }
      });
    }
    return deletedFeedback;
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
import httpStatus29 from "http-status";
var createFeedback2 = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const result = await feedbackService.createFeedback(body, user);
  sendResponse(res, {
    statusCode: httpStatus29.CREATED,
    success: true,
    message: `feedback created successfully`,
    data: result
  });
});
var getById2 = catchAsync(async (req, res) => {
  const id = req.params.feedbackId;
  const user = req.user;
  const result = await feedbackService.getById(id, user);
  sendResponse(res, {
    statusCode: httpStatus29.OK,
    success: true,
    message: `feedback retrived successfully`,
    data: result
  });
});
var getAllFeedbacks2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { allFeedback, meta } = await feedbackService.getAllFeedbacks(query);
  sendResponse(res, {
    statusCode: httpStatus29.OK,
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
    statusCode: httpStatus29.OK,
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
    statusCode: httpStatus29.OK,
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
route12.get("/all-feedback", feedbackController.getAllFeedbacks);
route12.get(
  "/:feedbackId",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CUSTOMER,
    UserRole.TECHNICIAN,
    UserRole.MANAGER
  ),
  feedbackController.getById
);
route12.patch(
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
import httpStatus30 from "http-status";
var profileImageUpload = async (image, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus30.NOT_FOUND, "user not found");
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
                httpStatus30.BAD_GATEWAY,
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
var getAllUsers = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [
    {
      role: {
        in: ["CUSTOMER", "TECHNICIAN", "MANAGER"]
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
          email: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  if (query.role) {
    andConditions.push({
      role: query.role
    });
  }
  if (query.isDeleted) {
    andConditions.push({
      isDeleted: Boolean(query.isDeleted)
    });
  }
  if (query.isEmailVerified) {
    andConditions.push({
      emailVerified: Boolean(query.isEmailVerified)
    });
  }
  const users = await prisma.user.findMany({
    where: {
      AND: andConditions
    },
    omit: {
      password: true
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    }
  });
  const total = await prisma.user.count({
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
    users,
    meta
  };
};
var statusUpdate7 = async (payload, userId) => {
  const isUser = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!isUser) {
    throw new AppError(httpStatus30.NOT_FOUND, "user not found");
  }
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status: payload.status
    }
  });
};
var userService = {
  profileImageUpload,
  updateCustomer,
  getAllUsers,
  statusUpdate: statusUpdate7
};

// src/app/module/user/user.controller.ts
import httpStatus31 from "http-status";
var profileImageUpload2 = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(httpStatus31.BAD_REQUEST, "No file uploaded");
  }
  const user = req.user;
  const result = await userService.profileImageUpload(req.file, user);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
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
    statusCode: httpStatus31.OK,
    success: true,
    message: `customer profile updated successfully`,
    data: result
  });
});
var getAllUsers2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { users, meta } = await userService.getAllUsers(query);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: `users retrive successfully`,
    data: users,
    meta
  });
});
var statusUpdate8 = catchAsync(async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;
  await userService.statusUpdate(data, userId);
  sendResponse(res, {
    statusCode: httpStatus31.OK,
    success: true,
    message: `users status updated successfully`,
    data: null
  });
});
var userController = {
  profileImageUpload: profileImageUpload2,
  udpateCustomer,
  getAllUsers: getAllUsers2,
  statusUpdate: statusUpdate8
};

// src/app/module/user/user.validation.ts
import z6 from "zod";
var CustomerUpdateZodSchema = z6.object({
  phone: z6.string().optional(),
  address: z6.object({}).passthrough().optional()
});
var StatusUpdateZodSchema = z6.object({
  status: z6.enum(["ACTIVE", "BLOCKED", "DELETED"], "status must be one of ACTIVE, BLOCKED, DELETED")
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
route13.get(
  "/all-users",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.getAllUsers
);
route13.patch(
  "/status-update/:userId",
  zodValidation(StatusUpdateZodSchema),
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.statusUpdate
);
var userRouter = route13;

// src/app/module/analytics/analytics.route.ts
import { Router as Router14 } from "express";

// src/app/module/analytics/analytics.controller.ts
import httpStatus32 from "http-status";

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
  const totalStartedWorkOrders = await prisma.workOrder.count({
    where: {
      status: WorkOrderStatus.STARTED
    }
  });
  const totalScheduleWorkOrders = await prisma.workOrder.count({
    where: {
      status: WorkOrderStatus.SCHEDULED
    }
  });
  const totalEnrouteWorkOrders = await prisma.workOrder.count({
    where: {
      status: WorkOrderStatus.EN_ROUTE
    }
  });
  const totalCompletedWorkOrders = await prisma.workOrder.count({
    where: {
      status: WorkOrderStatus.COMPLETED
    }
  });
  const totalCancelledWorkOrders = await prisma.workOrder.count({
    where: {
      status: WorkOrderStatus.CANCELLED
    }
  });
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
    totalStartedWorkOrders,
    totalScheduleWorkOrders,
    totalEnrouteWorkOrders,
    totalCompletedWorkOrders,
    totalCancelledWorkOrders,
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
      rejectedServices: 0,
      pendingServices: 0,
      completedServices: 0,
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
  const rejectedServices = await prisma.service.count({
    where: {
      customerId: customer.id,
      status: ServiceStatus.REJECTED,
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
  const totalStartedWorkOrders = await prisma.workOrder.count({
    where: {
      customerId: customer.id,
      status: WorkOrderStatus.STARTED
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
    rejectedServices,
    completedServices,
    completedWorkOrders,
    totalStartedWorkOrders,
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
      enrouteWorkOrders: 0,
      totalEarnings: "0",
      totalRefunded: "0",
      currentMonthRevenue: "0",
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
  const enrouteWorkOrders = await prisma.workOrder.count({
    where: {
      technicianId,
      status: WorkOrderStatus.EN_ROUTE
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
  const currentMonthRevenue = await prisma.payment.aggregate({
    where: {
      workOrder: { technicianId },
      status: PaymentStatus.PAID,
      paidAt: {
        gte: getCurrentMonthRange().startOfMonth,
        lte: getCurrentMonthRange().endOfMonth
      }
    },
    _sum: { amount: true }
  });
  const completeJobs = await prisma.workOrder.count({
    where: { technicianId, status: WorkOrderStatus.COMPLETED }
  });
  return {
    completedWorkOrders,
    startedWorkOrders,
    enrouteWorkOrders,
    totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
    totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
    currentMonthRevenue: currentMonthRevenue._sum.amount?.toString() ?? "0",
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
      assignedServices: 0,
      rejectedServices: 0,
      completedWorkByTechnicians: 0,
      totalStartedWorkOrders: 0,
      totalEnrouteWorkOrders: 0,
      totalEarnings: "0",
      totalRefunded: "0",
      currentMonthRevenue: "0"
    };
  }
  const regionIds = manager.region.map((r) => r.id);
  const managesAllRegions = manager.region.some(
    (region) => region.area.toUpperCase() === "ALL"
  );
  const serviceRegionFilter = managesAllRegions ? {} : { regionId: { in: regionIds } };
  const assignedServices = await prisma.service.count({
    where: {
      ...serviceRegionFilter,
      status: ServiceStatus.ASSIGNED,
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
  const totalStartedWorkOrders = await prisma.workOrder.count({
    where: {
      managerId: manager.id,
      status: WorkOrderStatus.STARTED
    }
  });
  const totalEnrouteWorkOrders = await prisma.workOrder.count({
    where: {
      managerId: manager.id,
      status: WorkOrderStatus.EN_ROUTE
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
  const currentMonthRevenue = await prisma.payment.aggregate({
    where: {
      workOrder: {
        managerId: manager.id
      },
      status: PaymentStatus.PAID,
      paidAt: {
        gte: getCurrentMonthRange().startOfMonth,
        lte: getCurrentMonthRange().endOfMonth
      }
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
    assignedServices,
    rejectedServices,
    completedWorkByTechnicians,
    totalStartedWorkOrders,
    totalEnrouteWorkOrders,
    totalEarnings: totalEarnings._sum.amount?.toString() ?? "0",
    totalRefunded: totalRefunded._sum.amount?.toString() ?? "0",
    currentMonthRevenue: currentMonthRevenue._sum.amount?.toString() ?? "0"
  };
};
var getPublicAnalytics = async () => {
  const totalCompletedServices = await prisma.service.count({
    where: {
      isDeleted: false,
      status: ServiceStatus.COMPLETED
    }
  });
  const totalTechnician = await prisma.user.count({
    where: {
      role: UserRole.TECHNICIAN,
      isDeleted: false,
      technician: {
        isProfileCompleted: true,
        isDeleted: false
      }
    }
  });
  const totalCategory = await prisma.category.count({
    where: {
      isActive: true
    }
  });
  const totalRegion = await prisma.region.count({
    where: {
      area: {
        not: "ALL"
      },
      isActive: true
    }
  });
  const totalAvgRating = await prisma.feedback.aggregate({
    _avg: {
      rating: true
    }
  });
  return {
    totalCompletedServices,
    totalTechnician,
    totalCategory,
    totalRegion,
    totalAvgRating: totalAvgRating._avg.rating ?? 0
  };
};
var analyticsService = {
  getAdminAnalytics,
  getCustomerAnalytics,
  getManagerAnalytics,
  getTechnicianAnalytics,
  getPublicAnalytics
};

// src/app/module/analytics/analytics.controller.ts
var getAdminStats = catchAsync(async (req, res) => {
  const result = await analyticsService.getAdminAnalytics();
  sendResponse(res, {
    statusCode: httpStatus32.OK,
    success: true,
    message: "Admin analytics retrieved successfully",
    data: result
  });
});
var getCustomerStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getCustomerAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus32.OK,
    success: true,
    message: "Customer analytics retrieved successfully",
    data: result
  });
});
var getTechnicianStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getTechnicianAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus32.OK,
    success: true,
    message: "Technician analytics retrieved successfully",
    data: result
  });
});
var getManagerStats = catchAsync(async (req, res) => {
  const id = req.user?.userId;
  const result = await analyticsService.getManagerAnalytics(id);
  sendResponse(res, {
    statusCode: httpStatus32.OK,
    success: true,
    message: "Manager analytics retrieved successfully",
    data: result
  });
});
var getPublicStats = catchAsync(async (req, res) => {
  const result = await analyticsService.getPublicAnalytics();
  sendResponse(res, {
    statusCode: httpStatus32.OK,
    success: true,
    message: "Public analytics retrieved successfully",
    data: result
  });
});
var analyticsController = {
  getAdminStats,
  getCustomerStats,
  getTechnicianStats,
  getManagerStats,
  getPublicStats
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
router.get(
  "/public",
  analyticsController.getPublicStats
);
var analyticsRoutes = router;

// src/app/module/schedule/schedule.route.ts
import { Router as Router15 } from "express";

// src/app/module/schedule/schedule.service.ts
import httpStatus33 from "http-status";
var getAllSchedule = async (query) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const andConditions = [];
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const schedules = await prisma.schedule.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: {
        select: {
          service: true
        }
      }
    }
  });
  const total = await prisma.schedule.count({
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
    schedules,
    meta
  };
};
var getScheduleTech = async (query, user) => {
  const sort = query.sortBy ? query.sortBy : "createdAt";
  const order = query.sortOrder ? query.sortOrder : "desc";
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      userId: user.userId
    }
  });
  if (!technician) {
    throw new AppError(httpStatus33.NOT_FOUND, "technician not found");
  }
  const andConditions = [
    {
      technicianId: technician.id
    }
  ];
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const schedules = await prisma.schedule.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sort]: order
    },
    include: {
      workOrder: {
        select: {
          service: true
        }
      }
    }
  });
  const total = await prisma.schedule.count({
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
    schedules,
    meta
  };
};
var singleSchedule = async (id, user) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      customer: true,
      manager: true,
      technician: true
    }
  });
  if (!isUser) {
    throw new AppError(httpStatus33.NOT_FOUND, "user nto found");
  }
  const schedule = await prisma.schedule.findUnique({
    where: {
      id
    },
    include: {
      workOrder: {
        include: {
          service: true,
          manager: true,
          technician: true,
          customer: true
        }
      }
    }
  });
  if (!schedule) {
    throw new AppError(httpStatus33.NOT_FOUND, "schedule not found");
  }
  if (user.role === "CUSTOMER") {
    if (schedule.workOrder.customer.id !== isUser.customer?.id) {
      throw new AppError(httpStatus33.UNAUTHORIZED, "unauthorized access");
    }
  }
  if (user.role === "MANAGER") {
    if (schedule.workOrder.manager.id !== isUser.manager?.id) {
      throw new AppError(httpStatus33.UNAUTHORIZED, "unauthorized access");
    }
  }
  if (user.role === "TECHNICIAN") {
    if (schedule.workOrder.technician?.id !== isUser.technician?.id) {
      throw new AppError(httpStatus33.UNAUTHORIZED, "unauthorized access");
    }
  }
  return schedule;
};
var scheduleService = {
  getAllSchedule,
  getScheduleTech,
  singleSchedule
};

// src/app/module/schedule/schedule.controller.ts
import httpStatus34 from "http-status";
var getAllSchedule2 = catchAsync(async (req, res) => {
  const query = req.query;
  const { schedules, meta } = await scheduleService.getAllSchedule(query);
  if (schedules.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus34.NOT_FOUND,
      success: false,
      message: `scheule not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus34.OK,
    success: true,
    message: `all scheudle retrived successfully`,
    data: schedules,
    meta
  });
});
var getSchedulesTech = catchAsync(async (req, res) => {
  const query = req.query;
  const user = req.user;
  const { schedules, meta } = await scheduleService.getScheduleTech(
    query,
    user
  );
  if (schedules.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus34.NOT_FOUND,
      success: false,
      message: `schedule not found`,
      data: null
    });
  }
  sendResponse(res, {
    statusCode: httpStatus34.OK,
    success: true,
    message: `schudel retrived successfully`,
    data: schedules,
    meta
  });
});
var singleSchedule2 = catchAsync(async (req, res) => {
  const user = req.user;
  const id = req.params.scheduleId;
  const result = await scheduleService.singleSchedule(id, user);
  sendResponse(res, {
    statusCode: httpStatus34.OK,
    success: true,
    message: `scheule retrived successfully`,
    data: result
  });
});
var scheduleController = {
  getAllSchedule: getAllSchedule2,
  getSchedulesTech,
  singleSchedule: singleSchedule2
};

// src/app/module/schedule/schedule.route.ts
var route14 = Router15();
route14.get(
  "/all-schedule",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  scheduleController.getAllSchedule
);
route14.get(
  "/my-schedule",
  auth(UserRole.TECHNICIAN),
  scheduleController.getSchedulesTech
);
route14.get(
  "/:scheduleId",
  auth(
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN,
    UserRole.CUSTOMER,
    UserRole.MANAGER,
    UserRole.TECHNICIAN
  ),
  scheduleController.singleSchedule
);
var scheduleRouter = route14;

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
app.use("/api/v1/category", categoryRouter);
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
app.use("/api/v1/schedule", scheduleRouter);
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
import bcrypt3 from "bcryptjs";
import httpStatus35 from "http-status";
var seedSuperAdmin = async () => {
  try {
    const existSuperAdmin = await prisma.user.findFirst({
      where: { role: "SUPER_ADMIN" },
      omit: { password: true }
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
        httpStatus35.INTERNAL_SERVER_ERROR,
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
      },
      omit: { password: true }
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
        httpStatus35.INTERNAL_SERVER_ERROR,
        "no tester admin name, email, password"
      );
    }
    const existTesterAdmin = await prisma.user.findUnique({
      where: { email },
      omit: { password: true }
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
      },
      omit: { password: true }
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
        httpStatus35.INTERNAL_SERVER_ERROR,
        "no tester manager name, email, password"
      );
    }
    const existTesterManager = await prisma.user.findUnique({
      where: { email },
      omit: { password: true }
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
      },
      omit: { password: true }
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