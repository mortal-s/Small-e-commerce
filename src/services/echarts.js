import Myrequest from '@/services/request/request'
//获取图表数据 数据可视化
function getecharts (){
    return  Myrequest.get({
        url:'/reports/type/1'
    })
}
export {
    getecharts
}