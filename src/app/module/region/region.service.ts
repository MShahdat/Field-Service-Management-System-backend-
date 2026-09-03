import { RegionWhereInput } from "../../../../generated/prisma/models"
import { IQuery, IRequestUser } from "../../interface"
import { prisma } from "../../lib/prisma"
import { AppError } from "../../utils/appError"
import { IRegionPayload, IUpdateRegionPayload } from "./region.interface"
import httpStatus from 'http-status'

//& CREATE REGION (ADMIN)
const createRegion = async (payload: IRegionPayload, user: IRequestUser) => {

  const {area} = payload

  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  })

  if(!isUser){
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }

  const isExist = await prisma.region.findUnique({
    where: {
      area
    }
  })

  if(isExist){
    throw new AppError(httpStatus.CONFLICT, 'this region already exist')
  }

  const createArea = await prisma.region.create({
    data: {
      ...payload
    }
  })

  return createArea
}


//& GET REGION (ADMIN)
const getAllRegion = async (query: IQuery, user: IRequestUser) => {

  const sort = query.sortBy ? query.sortBy : "createdAt";
	const order = query.sortOrder ? query.sortOrder : "desc";
	const page = Number(query.page || 1);
	const limit = Number(query.limit || 9);

  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  })

  if(!isUser){
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }

  const andCondition: RegionWhereInput[] = []

  if(query.search){
    andCondition.push({
      OR: [
        {
          area: {
            contains: query.search,
            mode: "insensitive"
          }
        }
      ]
    })
  }

  const area = await prisma.region.findMany({
    where: {
      AND: andCondition
    },
    take: limit,
    skip: (page -1 ) * limit,
    orderBy: {
      [sort]: order
    },
  })


  const total = await prisma.region.count({
		where: {
			AND: andCondition,
		},
	});

	const meta = {
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};

	return {
		area,
		meta,
	};
}


//& UPDATE REGION (ADMIN)
const updateRegion = async (payload: IUpdateRegionPayload, regionId: string, user: IRequestUser) => {

  const isUser = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  })

  if(!isUser){
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }

  const isExist = await prisma.region.findUnique({
    where: {
      id: regionId
    }
  })

  if(!isExist){
    throw new AppError(httpStatus.NOT_FOUND, 'this region not found')
  }

  const updateRegion = await prisma.region.update({
    where: {
      id: regionId
    },
    data: {
      ...payload
    }
  })

  return updateRegion
}


export const regionService = {
  createRegion,
  getAllRegion,
  updateRegion
}
