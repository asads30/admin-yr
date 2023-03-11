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
      <el-table-column label="Автор" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Сумма" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.amount }} рублей</span>
        </template>
      </el-table-column>
      <el-table-column label="Статус" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ (row.status == 0) ? 'Принято' : 'Выведено' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Зарегистрирован" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ Date.parse(row.createdAt) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Активность" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ Date.parse(row.updatedAt) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchPayouts } from '@/api/payment'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'Payouts',
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
      fetchPayouts(this.listQuery).then(response => {
        this.list = response.paymentQueries
        this.total = response.totalPaymentQueriesCount
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
