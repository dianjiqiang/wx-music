import type { RequestOptions } from "./options"

class KeyieRequest {
  public baseUrl = ''
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  request(options: RequestOptions): Promise<any> {
    options.url = this.baseUrl + options.url
    return new Promise<any>((resove, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          resove(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  get(options: RequestOptions): Promise<any> {
    options.url = this.baseUrl + options.url
    return new Promise<any>((resove, reject) => {
      wx.request({
        ...options,
        method: 'GET',
        success: (res) => {
          resove(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  post(options: RequestOptions): Promise<any> {
    options.url = this.baseUrl + options.url
    return new Promise<any>((resove, reject) => {
      wx.request({
        ...options,
        method: 'POST',
        success: (res) => {
          resove(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}

export const keyieRequest = new KeyieRequest('https://coderwhy-music.vercel.app')
// export const keyieRequest = new KeyieRequest('http://codercba.com:9002')