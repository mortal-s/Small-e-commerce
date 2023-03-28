import Myrequest from '@/services/request/request'
//获取订单数据
function  getorders(value){
    return Myrequest.get({
        url:'/orders',
        params:{
            ...value
        }
    })
}
export{
    getorders
}