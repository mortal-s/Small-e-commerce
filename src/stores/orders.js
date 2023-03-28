import { defineStore } from "pinia";

import {getorders} from '@/services/orders'
const  orders = defineStore('orders',{
    state:()=>{
        return ({
           orderslist:[

           ],
           page:{

           }
        })
    },
    actions:{
            async getorder(value){
                let res =await getorders(value)
                this.orderslist=res.data.goods
                this.page=res.data
            }
    }
})
export default orders