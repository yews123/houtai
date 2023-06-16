<template>
  <div class="manage">
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary">
        +新增
      </el-button>
      <!-- form搜索区 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入品牌关键字"
            v-model="userForm.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="商品id"> </el-table-column>
        <el-table-column prop="price" label="商品价格"> </el-table-column>
        <el-table-column prop="title" label="商品标题"> </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope"><img :src=scope.row.defaultImg style="width:100px;height:100px"></template>
        </el-table-column>
        <el-table-column prop="msg" label="商品信息"> </el-table-column>
        <el-table-column prop="keyword" label="关键字"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="handle(scope.row)"
              >下架</el-button
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
        id: "",
        price: "",
        title: "",
        defaultImg:'',
        msg: "",
        keyword:""
      },

      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        keyword: "",
      },
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.product.tableData,
      total: (state) => state.product.total,
    }),
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取订单信息
    getData() {
      this.$store.dispatch("getGoodsInfo", {
        ...this.pageData,
        ...this.userForm,
      });
    },
    handle(row) {
      this.$confirm("此操作将下架该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDelivery(row).then(() => {
            this.$message({
              type: "success",
              message: "下架成功!",
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架",
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