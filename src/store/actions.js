export default {
  addCart(context, payload) { //context 上下文这里相当于this
    return new Promise((res) => {
      // let oldProduct
      // for(let item of context.state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断 oldProduct是否存在
      if (oldProduct) { //数量+1
        // oldProduct.count += 1 
        context.commit('addCounter', oldProduct)
        res('当前商品+1')
      }else { //添加商品
        payload.count = 0
        // context.state.cartList.push(payload)
        context.commit('addCart', payload)
        res('添加当前商品')
      }   
    },100) 
  }
}