<template>
  <div class="manage">
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary" disabled>
        +新增
      </el-button>
      <!-- form搜索区 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入订单号"
            v-model="userForm.tradeNo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column label="商品图片">
          <template slot-scope="scope"><img :src=scope.row.defaultImg style="width:100px;height:100px"></template>
        </el-table-column>
        <el-table-column prop="title" label="商品标题"> </el-table-column>
        <el-table-column prop="totalNum" label="数量"> </el-table-column>
        <el-table-column prop="totalPrice" label="总价格"> </el-table-column>
        <el-table-column prop="orderComment" label="留言"> </el-table-column>
        <el-table-column prop="status" label="订单状态"> </el-table-column>
        <el-table-column prop="tradeNo" label="订单号"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handle(scope.row)"
              >发货</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {reqDelivery} from "@/api"
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        status: "",
        orderComment: "",
        totalNum: "",
        totalPrice: "",
        defaultImg:'',
        tradeNo: "",
        title:""
      },

      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        tradeNo: "",
      },
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.order.tableData,
      total: (state) => state.order.total,
    }),
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取已支付的订单信息
    getData() {
      this.$store.dispatch("getOrderInfo", {
        ...this.pageData,
        ...this.userForm,
      });
    },
    handle(row) {
      // console.log('发货',row)
      this.$confirm("此操作将发货该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDelivery(row).then(() => {
            this.$message({
              type: "success",
              message: "发货成功!",
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货",
          });
        });
      // this.$store.dispatch("deleteUser", row);
    },

    // 选择页码的回调函数
    handlePage(val) {
      // console.log(val, 'val')
      this.pageData.page = val;
      this.getData();
    },
    // 搜索的查询
    onSubmit() {
      // this.$store.dispatch('searchUser',this.userForm)
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>