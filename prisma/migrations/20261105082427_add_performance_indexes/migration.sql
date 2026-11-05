-- CreateIndex
CREATE INDEX "attachments_workOrderId_isDelete_idx" ON "attachments"("workOrderId", "isDelete");

-- CreateIndex
CREATE INDEX "availability_technicianId_type_isActive_idx" ON "availability"("technicianId", "type", "isActive");

-- CreateIndex
CREATE INDEX "availability_type_dayOfWeek_isActive_idx" ON "availability"("type", "dayOfWeek", "isActive");

-- CreateIndex
CREATE INDEX "availability_type_date_isActive_idx" ON "availability"("type", "date", "isActive");

-- CreateIndex
CREATE INDEX "categories_name_isActive_idx" ON "categories"("name", "isActive");

-- CreateIndex
CREATE INDEX "customers_userId_isDeleted_idx" ON "customers"("userId", "isDeleted");

-- CreateIndex
CREATE INDEX "customers_isDeleted_idx" ON "customers"("isDeleted");

-- CreateIndex
CREATE INDEX "feedbacks_rating_idx" ON "feedbacks"("rating");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_paidAt_idx" ON "payments"("paidAt");

-- CreateIndex
CREATE INDEX "payments_status_paidAt_idx" ON "payments"("status", "paidAt");

-- CreateIndex
CREATE INDEX "regions_area_isActive_idx" ON "regions"("area", "isActive");

-- CreateIndex
CREATE INDEX "schedules_technicianId_idx" ON "schedules"("technicianId");

-- CreateIndex
CREATE INDEX "schedules_technicianId_servicingDate_idx" ON "schedules"("technicianId", "servicingDate");

-- CreateIndex
CREATE INDEX "schedules_servicingDate_status_idx" ON "schedules"("servicingDate", "status");

-- CreateIndex
CREATE INDEX "schedules_technicianId_servicingDate_status_idx" ON "schedules"("technicianId", "servicingDate", "status");

-- CreateIndex
CREATE INDEX "serviceReports_workOrderId_isDelete_idx" ON "serviceReports"("workOrderId", "isDelete");

-- CreateIndex
CREATE INDEX "services_customerId_isDeleted_idx" ON "services"("customerId", "isDeleted");

-- CreateIndex
CREATE INDEX "services_categoryId_idx" ON "services"("categoryId");

-- CreateIndex
CREATE INDEX "services_regionId_idx" ON "services"("regionId");

-- CreateIndex
CREATE INDEX "services_status_isDeleted_idx" ON "services"("status", "isDeleted");

-- CreateIndex
CREATE INDEX "services_priority_idx" ON "services"("priority");

-- CreateIndex
CREATE INDEX "services_servicingDate_idx" ON "services"("servicingDate");

-- CreateIndex
CREATE INDEX "services_createdAt_idx" ON "services"("createdAt");

-- CreateIndex
CREATE INDEX "services_isDeleted_status_servicingDate_idx" ON "services"("isDeleted", "status", "servicingDate");

-- CreateIndex
CREATE INDEX "services_customerId_status_isDeleted_idx" ON "services"("customerId", "status", "isDeleted");

-- CreateIndex
CREATE INDEX "skills_categoryId_idx" ON "skills"("categoryId");

-- CreateIndex
CREATE INDEX "skills_isActive_isDelete_idx" ON "skills"("isActive", "isDelete");

-- CreateIndex
CREATE INDEX "skills_isActive_categoryId_idx" ON "skills"("isActive", "categoryId");

-- CreateIndex
CREATE INDEX "technicians_isDeleted_isProfileCompleted_idx" ON "technicians"("isDeleted", "isProfileCompleted");

-- CreateIndex
CREATE INDEX "technicians_status_isDeleted_idx" ON "technicians"("status", "isDeleted");

-- CreateIndex
CREATE INDEX "technicians_rating_jobsCompleted_idx" ON "technicians"("rating", "jobsCompleted");

-- CreateIndex
CREATE INDEX "technicians_isDeleted_status_isProfileCompleted_idx" ON "technicians"("isDeleted", "status", "isProfileCompleted");

-- CreateIndex
CREATE INDEX "users_role_status_isDeleted_idx" ON "users"("role", "status", "isDeleted");

-- CreateIndex
CREATE INDEX "workOrders_regionId_idx" ON "workOrders"("regionId");

-- CreateIndex
CREATE INDEX "workOrders_customerId_idx" ON "workOrders"("customerId");

-- CreateIndex
CREATE INDEX "workOrders_technicianId_idx" ON "workOrders"("technicianId");

-- CreateIndex
CREATE INDEX "workOrders_managerId_idx" ON "workOrders"("managerId");

-- CreateIndex
CREATE INDEX "workOrders_status_servicingDate_idx" ON "workOrders"("status", "servicingDate");

-- CreateIndex
CREATE INDEX "workOrders_technicianId_status_idx" ON "workOrders"("technicianId", "status");

-- CreateIndex
CREATE INDEX "workOrders_customerId_status_idx" ON "workOrders"("customerId", "status");

-- CreateIndex
CREATE INDEX "workOrders_managerId_status_idx" ON "workOrders"("managerId", "status");

-- CreateIndex
CREATE INDEX "workOrders_createdAt_idx" ON "workOrders"("createdAt");
