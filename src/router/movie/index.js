export default{
    path:'/movie',
    component:()=>import('@/views/Movie'),
    children:[
        {
            path:'city',
            component:()=>import('@/components/City'),
        },
        {
            path:'comingsoon',
            component:()=>import('@/components/Comingsoon'),
        },
        {
            path:'nowplaying',
            component:()=>import('@/components/Nowplaying'),
        },
        {
            path:'search',
            component:()=>import('@/components/Search'),
        },
        {
            path:'detail/1/:id',
            components : {
                default : ()=> import('@/components/Nowplaying'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:id',
            components : {
                default : ()=> import('@/components/Comingsoon'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path:'/movie',
            redirect:'/movie/nowplaying'
        }
    ]
    
}