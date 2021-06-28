import {request} from "./request";

export function _getHomeMutidata() {
  return request({
    url: '/home/multidata'
  })
}

export function _getProductData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  })
}