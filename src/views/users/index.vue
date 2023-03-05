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
      <el-table-column label="ID Telegram" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.tg_user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Username" min-width="150px" align="center">
        <template slot-scope="{row}">
          <a :href="'https://t.me/' + row.username" target="_blank">{{ row.username }}</a>
        </template>
      </el-table-column>
      <el-table-column label="Автор" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.first_name }} {{ row.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Роль" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ (row.role_id == 1) ? 'Автор' : 'Админ' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Баланс" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.balance }} рублей</span>
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
import { fetchList } from '@/api/user'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'Users',
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
        this.list = response.users
        this.total = response.totalUserCount
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
