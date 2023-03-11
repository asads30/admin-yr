<template>
  <el-table v-if="paymentsList" :data="paymentsList.slice(-10)" style="width: 100%;">
    <el-table-column label="ID заказа" width="100">
      <template slot-scope="scope">
        {{ scope.row.id }}
      </template>
    </el-table-column>
    <el-table-column label="Пользователь" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.user_id }}: {{ scope.row.name }} {{ scope.row.email }} {{ scope.row.phone }} {{ scope.row.address }}
      </template>
    </el-table-column>
    <el-table-column label="Товара" width="200">
      <template slot-scope="scope">
        {{ scope.row.product_id }}
      </template>
    </el-table-column>
    <el-table-column label="Цена" width="200" align="center">
      <template slot-scope="scope">
        {{ scope.row.price }}₽
      </template>
    </el-table-column>
    <el-table-column label="Время" width="300" align="center">
      <template slot-scope="{row}">
        {{ Date.parse(row.createdAt) | parseTime('{y}-{m}-{d} {h}:{i}') }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TransactionTable',
  computed: {
    ...mapGetters([
      'paymentsList'
    ])
  }
}
</script>
