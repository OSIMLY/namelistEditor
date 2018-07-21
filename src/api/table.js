import request from '@/utils/request'
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v1/table/35710/record/')
  .then(res => {
    console.log(res.data)
  })

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
