import { UserRole } from "../../../generated/prisma/enums";



export const redirectUrl = (role: UserRole) => {
  let url: null | string
  if (role === UserRole.ADMIN) {
    url = `/admin-dashboard`
  } else if (role === UserRole.CUSTOMER) {
    url = `/customer-dashboard`
  } else if (role === UserRole.MANAGER) {
    url = `/manager-dashboard`
  } else if (role === UserRole.TECHNICIAN) {
    url = `/technician-dashboard`
  } else {
    url = `/login`
  }

  return url
}