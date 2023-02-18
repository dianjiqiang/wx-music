import keyieRequest from '../index'

export const getMusicBanner = async (type = 0) => {
  const data = await keyieRequest.get({
    url: '/banner',
    data: { 
      type
    }
  })
  return data
}

export const getPlayListDetail = async (id: string) => {
  const data = await keyieRequest.get({
    url: '/playlist/detail',
    data:{
      id
    }
  })
  return data
}

export const getSongMenuList = async (cat="全部", limit = 6, offset = 0) => {
  const data = await keyieRequest.get({
    url: '/top/playlist',
    data:{
      cat,
      limit,
      offset
    }
  })
  return data
}

export const getSongMenuTag = async () => {
  const data = await keyieRequest.get({
    url: '/playlist/hot',
  })
  return data
}

export const getSongDetail = async (id: string) => {
  const data = await keyieRequest.get({
    url: '/song/detail',
    data:{
      ids: id
    }
  })
  return data
}

export const getSongLyric = async (id: string) => {
  const data = await keyieRequest.get({
    url: '/lyric',
    data:{
      id
    }
  })
  return data
}