<template>
  <div>
    <h1>文章栏目</h1>
    <div style="height: 10px"></div>
    <Table :columns="columns10" :data="data9" border></Table>
    <div style="height: 15px"></div>
    <Table :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="name">
        <Input type="text" @click.native.stop="" v-model="editName" v-if="editIndex === index"/>
        <span v-else>{{ row.name }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="age">
        <Input type="text" @click.native.stop="" v-model="editAge" v-if="editIndex === index"/>
        <span v-else>{{ row.age }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="birthday">
        <Input type="text" @click.native.stop="" v-model="editBirthday" v-if="editIndex === index"/>
        <span v-else>{{ getBirthday(row.birthday) }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="address">
        <Input type="text" @click.native.stop="" v-model="editAddress" v-if="editIndex === index"/>
        <span v-else>{{ row.address }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
          &nbsp;<Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click.stop="handleEdit(row, index)">操作</Button>
        </div>
      </template>
    </Table>
    <div style="height: 15px;"></div>
  </div>
</template>

<script>
import expandRow from './table-expand.vue'
import { on, off } from '@/libs/tools'

export default {
  name: 'article-class',
  data () {
    return {
      columns10: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'Name',
          key: 'name',
          width: 100,
          resizable: true
        },
        {
          title: 'Age',
          key: 'age',
          width: 200,
          resizable: true
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data9: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          job: 'Data engineer',
          interest: 'badminton',
          birthday: '1991-05-14',
          book: 'Steve Jobs',
          movie: 'The Prestige',
          music: 'I Cry',
          children: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              job: 'Data engineer',
              interest: 'badminton',
              birthday: '1991-05-14',
              book: 'Steve Jobs',
              movie: 'The Prestige',
              music: 'I Cry'
            },
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              job: 'Data engineer',
              interest: 'badminton',
              birthday: '1991-05-14',
              book: 'Steve Jobs',
              movie: 'The Prestige',
              music: 'I Cry'
            }
          ]
        },
        {
          name: 'Jim Green',
          age: 25,
          address: 'London No. 1 Lake Park',
          job: 'Data Scientist',
          interest: 'volleyball',
          birthday: '1989-03-18',
          book: 'My Struggle',
          movie: 'Roman Holiday',
          music: 'My Heart Will Go On'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          job: 'Data Product Manager',
          interest: 'tennis',
          birthday: '1992-01-31',
          book: 'Win',
          movie: 'Jobs',
          music: 'Don’t Cry'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          job: 'Data Analyst',
          interest: 'snooker',
          birthday: '1988-7-25',
          book: 'A Dream in Red Mansions',
          movie: 'A Chinese Ghost Story',
          music: 'actor'
        }
      ],
      columns: [
        {
          title: '姓名',
          slot: 'name'
        },
        {
          title: '年龄',
          slot: 'age'
        },
        {
          title: '出生日期',
          slot: 'birthday'
        },
        {
          title: '地址',
          slot: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          birthday: '919526400000',
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          birthday: '696096000000',
          address: '北京市海淀区西二旗'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: '', // 第二列输入框
      editBirthday: '', // 第三列输入框
      editAddress: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editName = row.name
      this.editAge = row.age
      this.editAddress = row.address
      this.editBirthday = row.birthday
      this.editIndex = index
    },
    handleSave (index) {
      this.data[index].name = this.editName
      this.data[index].age = this.editAge
      this.data[index].birthday = this.editBirthday
      this.data[index].address = this.editAddress
      this.editIndex = -1
    },
    getBirthday (birthday) {
      const date = new Date(parseInt(birthday))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    },
    docClick: function () {
      this.editIndex = -1
    }
  },
  mounted () {
    on(document, 'click', this.docClick)
  },
  beforeDestroy () {
    off(document, 'click', this.docClick)
  }
}
</script>

<style scoped>

</style>
