import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
    redirect:'/login'
    },
    {
      path: '/login',
      component: () =>
      import ('@/views/Login.vue')
    },{
       path:'/list',
       component:()=>
       import ('@/views/list/list.vue'),
       children:[{
        path:'/list',
        redirect:'/list/home'
       },{
        path:'home',
        component:()=>
        import ('@/views/Levellist/home.vue')
       },
        {path:'users',
        component:()=>
        import ('@/views/Levellist/users.vue')
      },{
         path:'roles',
         component:()=>
         import ('@/views/Levellist/roles.vue')
      },{
         path:'categories',
         component:()=>
         import ('@/views/Levellist/categories.vue')
      },{
        path:'goods',
        component:()=>
        import ('@/views/Levellist/goods.vue')
      },{
        path:'orders',
        component:()=>
        import ('@/views/Levellist/orders.vue')
      },{
        path:'params',
        component:()=>
        import ('@/views/Levellist/params.vue')
      },{
        path:'reports',
        component:()=>
          import ('@/views/Levellist/reports.vue')
      },{
        path:'rights',
        component:()=>
          import ('@/views/Levellist/rights.vue')
      },
       ]
    }
  ]
})
  // router.beforeEach((to,from,next)=>{
  //   let token = window.sessionStorage.getItem('token');
  //     let path = to.path
  //       if(path=='/login')  next()
  //       if( path.indexOf('list')!==-1){
  //         if(token){
  //           next() 
  //          }else {
  //            next('/login');
  //          }
  //       }
       
  // })

export default router
