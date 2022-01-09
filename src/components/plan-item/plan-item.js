Component({
  properties: {
    // item
    item: {
      type: Object,
      value: null,
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { }
  },
  onReady() {
    console.log('kkk')
  },
  toSignin() {
    console.log('mmmm')
  }
})