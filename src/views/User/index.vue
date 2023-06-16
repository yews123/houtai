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
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="正常" :value="0"></el-option>
            <el-option label="异常" :value="1"></el-option>
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
            placeholder="请输入手机号"
            v-model="userForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="phone" label="手机号"> </el-table-column>

        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 0 ? "正常" : "异常" }}</span>
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
import { reqDeleteUser } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        phone: "",
        password: "",
        status: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号" },
          // {
          //   pattern: /^1[3456789]\d{9}$/,
          //   message: "手机号码格式不正确",
          //   trigger: "blur",
          // },
        ],
        password: [{ required: true, message: "请输入密码" }],
        status: [{ required: true, message: "请选择状态" }],
      },
      modalType: 0, // 0表示新增的弹窗， 1表示编辑
      // total: 0, //当前数据的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        phone: "",
      },
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.user.tableData,
      total: (state) => state.user.total,
    }),
    // ...mapState({
    //   total:state=>state.user.total
    // })
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取用户信息
    getData() {
      this.$store.dispatch("getUserInfo", {...this.pageData,...this.userForm});
    },
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        console.log(valid, "valid");
        if (valid) {
          // 后续对表单数据的处理
          console.log("2");
          this.$store.dispatch("addUser", this.form);
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
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDeleteUser(row).then(() => {
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