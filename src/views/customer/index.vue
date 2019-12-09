<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="dialogFormVisible = true" plain>新增</el-button>
    <el-button type="danger" @click="batchDelete" plain>批量删除</el-button>
    <!-- 表格数据 -->
    <el-table
      ref="multipleTable"
      :data="customer.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="联系方式"
        show-overflow-tooltip>
      </el-table-column>
      
    </el-table>

    <!-- 模态框 -->
    <el-dialog title="新增顾客" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="顾客姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomer(form)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="4"
      layout="total, prev, pager, next"
      :total="customer.total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
  data(){
    return{
      dialogFormVisible: false,
      form: {},
      formLabelWidth:'120px',
      page:0,
      ids:[]
    }
  },
  computed: {
    ...mapState('customer',['customer'])
  },
  created(){
    this.findAll()
  },
  methods:{
    ...mapActions('customer',['findAllCustomer','saveOrUpdate','batcheleteCustomer']),
    // 批量删除
    handleSelectionChange(val) {
      var idsBatch = [];
      val.forEach((item)=>{
        idsBatch.push(item.id)
      })
      this.ids = idsBatch
    },
    batchDelete(){
      let obj = {
        ids:this.ids
      }
      this.batcheleteCustomer(obj).then((res)=>{
        this.findAll()
      })
    },
    // 查询顾客
    findAll(){
      let obj = {
        page:this.page,
        pageSize:4,
      }
      this.findAllCustomer(obj)
    },
    // 添加顾客
    addCustomer(form){
      this.saveOrUpdate({...form}).then((res)=>{
        this.findAll();
        this.dialogFormVisible = false;
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val - 1 
    }
  },
  // 监听分页，查询顾客
  watch:{
    page:function(){
      this.findAll()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
