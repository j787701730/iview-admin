<template>
  <div class="logs-card">
    <div v-for="log in data" :key="log.log_id" class="logs-card-item">
      <template v-for="row in columns">
        <div :key="row.key">
          <div class="log-name">{{row.title}}</div>
          <div class="log-value" @click="row.event?handleClick(log[row.key]):''">{{log[row.key]}}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'log-card',
  props: {
    columns: {},
    data: {}
  },
  methods: {
    handleClick (data) {
      this.$emit('on-click-log', data)
    }
  }
}
</script>

<style scoped lang="less">
  .logs-card {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .logs-card {
      display: block;
    }

    .logs-card-item {
      border: 1px solid #ddd;
      margin-bottom: 15px;
      padding: 10px 0;
    }

    .log-name {
      width: 70px;
      text-align: right;
      display: inline-block;
      padding-right: 12px;
      vertical-align: top;
    }

    .log-value {
      width: ~'calc(100% - 80px)';
      display: inline-block;
      word-break: break-all;
      vertical-align: top;
      max-height: 60px;
      overflow: auto;
    }
  }
</style>
