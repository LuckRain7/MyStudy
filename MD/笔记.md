### vue Bus
- 如果组件没有明显的父子关系,使用中央事件总线进行传递

main.js

注册：`   Vue.prototype.$bus = new Vue(); `

发送事件：` this.$bus.$emit('addGood',good); `

接受事件：` this.$bus.$on('addGood', callback)`




### vue 数据持久化: ` localStorage `

### 可选链

`const personFirstName = person?.details?.name?.firstName ?? 'stranger';`

- 动态属性 `const secondJob = person?.jobs?.[jobNumber] ?? 'none';` 
- 函数或方法调用 `const currentJob = person?.jobs.getCurrentJob?.() ?? 'none';`

