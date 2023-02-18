import keyieRequest from "../index"

export const getTopMvList = async (limit: number = 20, offset: number = 0) => {
  const data = await keyieRequest.get({
    url: '/top/mv',
    data: { 
      limit,
      offset
    }
  })
  return data
}

export const getMvUrl = async (id?: string) => {
  const data = await keyieRequest.get({
    url: '/mv/url',
    data: { 
      id
    }
  })
  return data
}

export const getMvInfo = async (mvid?: string) => {
  const data = await keyieRequest.get({
    url: '/mv/detail',
    data: { 
      mvid
    }
  })
  return data
}
export const getMvRelate = async (id?: string) => {
  const data = await keyieRequest.get({
    url: '/related/allvideo',
    data: { 
      id
    }
  })
  return data
}