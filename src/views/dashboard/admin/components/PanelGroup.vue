<template>
  <el-row :gutter="40" class="panel-group">
    <el-col v-if="usersCount" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Пользователей
          </div>
          <count-to :start-val="0" :end-val="Number(usersCount)" :duration="1000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col v-if="channelsCount" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Каналов
          </div>
          <count-to :start-val="0" :end-val="Number(channelsCount)" :duration="1500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col v-if="productsCount" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Товаров
          </div>
          <count-to :start-val="0" :end-val="Number(productsCount)" :duration="2000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col v-if="paymentsCount" :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Платежей
          </div>
          <count-to :start-val="0" :end-val="Number(paymentsCount)" :duration="2500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import Cookies from 'js-cookie'

export default {
  name: 'PanelGroup',
  components: {
    CountTo
  },
  computed: {
    channelsCount() {
      if (!Cookies.get('channelsCount')) {
        return this.$store.state('app/channelsCount')
      }
      return Cookies.get('channelsCount')
    },
    usersCount() {
      if (!Cookies.get('usersCount')) {
        return this.$store.state('app/usersCount')
      }
      return Cookies.get('usersCount')
    },
    paymentsCount() {
      if (!Cookies.get('paymentsCount')) {
        return this.$store.state('app/paymentsCount')
      }
      return Cookies.get('paymentsCount')
    },
    productsCount() {
      if (!Cookies.get('productsCount')) {
        return this.$store.state('app/productsCount')
      }
      return Cookies.get('productsCount')
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 400;
      }

      .card-panel-num {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
