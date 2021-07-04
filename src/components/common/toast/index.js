import Toast from './Toast'
const obj = {}

obj.install = function(vue) { //同时传入一个vue
  console.log("------------", vue)
  // document.body.appendChild(Toast.$el)
  // 解决内容不添加到body的方法
  
  // 1.创建组件构造器
  const toastContrustor = vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建一个出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //这样只是把组件放到原型上，但是它的模板内容不会添加到body上的
  vue.prototype.$toast = toast;
   

}


export default obj