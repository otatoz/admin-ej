import {post_array, post} from '@/http/axios'
export default {
    namespaced:true,
    state:{
        customer:[]
    },
    getters:{

    },
    mutations:{
        refreshCustomer(state,customer){
            state.customer = customer;
        }
    },
    actions:{
        // 批量删除
        async batcheleteCustomer(context,params){
            let res = await post_array('/customer/batchDelete',params);
        },
        // 添加
        async saveOrUpdate(context,params){
            let res = await post('/customer/saveOrUpdate',params);
        },
        // 查找顾客
        async findAllCustomer(context,params){
            let res = await post('/customer/query',params);
            context.commit('refreshCustomer',res.data)
        }
    }
}