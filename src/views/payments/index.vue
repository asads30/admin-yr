<template>
  <div class="app-container">
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID платежа" min-width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.provider_payment_charge_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Автор" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Система" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ (row.payment_system == 'sber') ? 'Сбербанк' : 'Paybox' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Цена" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }} рублей</span>
        </template>
      </el-table-column>
      <el-table-column label="Имя" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Телефон" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Зарегистрирован" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ Date.parse(row.createdAt) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Активность" width="180px" align="center">
        <template slot-scope="{row}">
          <span>{{ Date.parse(row.updatedAt) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList } from '@/api/payment'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'Payments',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 50
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.payments
        this.total = response.totalPaymentsCount
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
