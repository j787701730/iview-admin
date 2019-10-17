<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
<template>
  <Table :columns="columns10" :data="row.children"></Table>
</template>
<script>
export default {
  data () {
    return {
      columns10: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },
  props: {
    row: Object
  }
}
</script>
