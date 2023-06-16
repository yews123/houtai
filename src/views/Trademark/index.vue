<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 用户表单数据 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="品牌id" prop="tmId">
          <el-input placeholder="请输入品牌id" v-model="form.tmId"></el-input>
        </el-form-item>
        <el-form-item label="品牌名" prop="tmName">
          <el-input placeholder="请输入品牌名" v-model="form.tmName"></el-input>
        </el-form-item>
        <el-form-item label="产品名" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择">
            <el-option label="手机、平板、笔记本" :value="1"></el-option>
            <el-option label="电视机" :value="2"></el-option>
            <el-option label="空调" :value="3"></el-option>
            <el-option label="热水器" :value="4"></el-option>
            <el-option label="风扇" :value="5"></el-option>
            <el-option label="洗衣机" :value="6"></el-option>
            <el-option label="冰箱" :value="7"></el-option>
            <el-option label="电饭煲" :value="8"></el-option>
            <el-option label="微波炉" :value="9"></el-option>
            <el-option label="电磁炉" :value="10"></el-option>
            <el-option label="消毒柜" :value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary">
        +新增
      </el-button>
      <!-- form搜索区 -->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input
            placeholder="请输入品牌名称"
            v-model="userForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="tmId" label="品牌id"> </el-table-column>

        <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
        <el-table-column prop="productId" label="产品id">
          <template slot-scope="scope">
           <!-- <el-input v-model="scope.row.status"  readonly=""></el-input> -->
           <span @mouseenter="handleCheck(scope.row.productId)">{{ scope.row.productId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            > -->
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
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
import { mapState } from "vuex";
import { reqDeleteTrademark } from "@/api";
import handleCheck from "@/utils/function"
export default {
  data() {
      let self=this
    return {
      value:self.handleCheck(), 
      dialogVisible: false,
      form: {
        tmId: "",
        tmName: "",
        productId: "",
      },
      rules: {
        tmId: [
          { required: true, message: "请输入品牌id" },
          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   message: "手机号码格式不正确",
          //   trigger: "blur",
          // },
        ],
        tmName: [{ required: true, message: "请输入品牌名称" }],
        productId: [{ required: true, message: "请选择产品" }],
      },
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        tmName: "",
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
    handleCheck(row){
    console.log('handleCheck')
    console.log(row)
    switch(row){
      case 1: return "手机、平板、笔记本";
      case 2: return "电视机";
      case 3: return "空调";
      case 4: return "热水器";
      case 5: return "风扇";
      case 6: return "洗衣机";
      case 7: return "冰箱";
      case 8: return "电饭煲";
      case 9: return "微波炉";
      case 10: return "电磁炉";
      case 11: return "消毒柜";
    }
  },

    //获取品牌信息
    getData() {
      this.$store.dispatch("getTrademarkInfo", {...this.pageData,...this.userForm});
    },
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        console.log(valid, "valid");
        if (valid) {
          // 后续对表单数据的处理
          console.log("2");
          this.$store.dispatch("addTrademark", this.form);
          //重新获取数据
          this.getData();

          // 清空表单的数据
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
          console.log("1");
        }
      });
    },
    // 弹窗关闭的时候
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    //编辑
    // handleEdit(row) {
    //   this.modalType = 1;
    //   this.dialogVisible = true;
    //   // 注意需要对当前行数据进行深拷贝，否则会出错
    //   this.form = JSON.parse(JSON.stringify(row));
    // },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDeleteTrademark(row).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
      this.getData()
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