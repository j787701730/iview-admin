<template>
  <div style="font-size:20px">
    <span>TEST{{value}}</span>
    <Button type="primary" @click="fun('子组件传值')">调取父fun</Button>
    <Button type="success" @click="fun2" ghost shape="circle">调取父fun2</Button>
    <Select v-model="model" @on-change="cg">
      <Option v-for="item in list" :value="item.value" :key="item.value">{{item.name}}</Option>
    </Select>
    <Table width="650" border :columns="columns2" :data="data3"></Table>
    <Button type="primary" @click="addTr">添加一行</Button>&nbsp;
    <Button type="primary" @click="commit">提交数据</Button>
    <UL style="background:#fff">
      <LI v-for="(item, index) in data3" :key="index">
        <span>{{item.name}}</span>
        <Button type="default" @click="clli(index)">edit</Button>
      </LI>
    </UL>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      list: [{ value: 'china', name: 'china' }, { value: 'usa', name: 'usa' }],
      columns2: [
        {
          title: 'Name',
          key: 'name',
          width: 100,
          fixed: 'left'
        },
        {
          title: '阶段',
          key: '',
          width: 100,
          fixed: 'left',
          render: (h, params) => {
            return h('Button', {
              on: {
                click: () => {
                  console.log(params)
                }
              }
            },
            '阶段')
          }
        },
        {
          title: 'Age',
          key: 'age',
          width: 100
        },
        {
          title: 'Province',
          key: 'province',
          width: 100,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.province
              },
              on: {
                'on-change': (e) => {
                  // params.row.city = e.target.value
                  this.data3[params.index].province = e.target.value
                }
              }
            })
          }
        },
        {
          title: 'City',
          key: 'city',
          width: 100,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.city
              },
              on: {
                'on-change': (e) => {
                  // params.row.city = e.target.value
                  this.data3[params.index].city = e.target.value
                  console.log(params)
                }
              }
            })
          }
        },
        {
          title: 'Address',
          key: 'address',
          width: 200
        },
        {
          title: 'Postcode',
          key: 'zip',
          width: 100
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params)
                    }
                  }
                },
                'View'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: 'User Info',
                        content: `Name：${params.row.name}<br>Province：${params.row.province}<br>City：${params.row.city}<br>
                        Age：${params.row.age}<br>Address：${params.row.address}`
                      })
                    }
                  }
                },
                'Edit'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params)
                      this.data3.splice(params.index, 1)
                    }
                  }
                },
                '删除'
              ),
              h(
                'Radio',
                {
                  props: {
                    value: this.selectedIndex === params.index
                  },
                  on: {
                    input: () => {
                      this.selectedIndex = params.index
                      console.log('ID: ' + this.data3[this.selectedIndex].id)
                    }
                  }
                }
              )
            ])
          }
        }
      ],
      selectedIndex: '',
      data3: [
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          province: 'America',
          city: 'New York',
          zip: 100000
        },
        {
          id: 100,
          name: 'Jim Green',
          age: 24,
          address: 'Washington, D.C. No. 1 Lake Park',
          province: 'America',
          city: 'Washington, D.C.',
          zip: 100000
        }
      ]
    }
  },
  mounted () {
    // console.log(this.$props)
  },
  props: {
    fun: {
      type: Function,
      default: () => {
        // return "from child";
      }
    },
    value: {
      type: String,
      default: () => {
        // return "from child";
      }
    }
  },
  methods: {
    cg () {
      console.log(this.model)
    },
    fun2 () {
      this.$emit('fun2', '子组件传的值2')
    },
    clli (index) {
      // console.log('index: ' + index)
      // console.log(this.data3[index])
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data3[index].name}<br>Age：${this.data3[index].age}<br>Address：${this.data3[index].address}`
      })
      // window.console.log(this.data3[0].city)
    },
    addTr () {
      this.data3.push({
        name: '',
        age: '',
        address: '',
        province: '',
        city: '',
        zip: ''
      })
    },
    commit () {
      console.log(JSON.stringify(this.data3))
    }

  }
}
</script>
