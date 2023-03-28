import { defineStore } from "pinia";
import {getecharts} from '@/services/echarts'
const  echartss = defineStore('echarts',{
    state:()=>{
        return ({
          
        //   echartdata:{}
        })
    },
    actions:{
            async getechart(){
              let res = await getecharts()
              return res.data
           }
    }
})
export default echartss