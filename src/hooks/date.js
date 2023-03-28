import moment from 'moment'
const fordatemat = (value)=>{
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
}
export {
    fordatemat
}