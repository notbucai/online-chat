<template>
  <div id="index">
    <el-row type="flex">
      <el-col :span="5" class="hidden-xs-only">
        <div class="box left">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>在线列表</span>
            </div>
            <div v-for="o in users" :key="o.id" class="text user_item">{{ o.name }}</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" :xs="24">
        <div class="box right">
          <el-card class="box-card">
            <!-- header -->
            <div slot="header" class="clearfix">
              <span>聊天记录</span>
            </div>
            <!-- body -->
            <template>
              <!-- 内容显示区域 -->
              <div class="main" ref="scrollMain">
                <template v-for="item in list">
                  <msg-item :key="item.id" :isme="item.u_id == me.id" v-bind="item"/>
                </template>
              </div>
              <!-- 编辑器 表单 -->
              <edit-form @send="handleSendMsg"/>
            </template>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MsgItem from "@/components/index/MsgItem.vue";
import EditForm from "@/components/index/EditForm.vue";
export default {
  name: "Index",
  created() {
    // this.$io.emit("create", { name: "不才" });
    this.openInit();
    this.$io.on("user-list", this.handleUserlist);
    this.$io.on("message", this.handleMessage);
  },
  components: {
    MsgItem,
    EditForm
  },
  data() {
    return {
      list: [],
      users: [],
      me: {
        id: "",
        name: ""
      }
    };
  },
  watch: {
    list: {
      deep: true,
      handler(val, oldVal) {
        // 异步执行 防止 没有渲染就执行了
        setTimeout(() => {
          const el = this.$refs["scrollMain"];
          el.scrollTop = el.scrollHeight + 800;
        }, 0);
      }
    }
  },
  methods: {
    handleUserlist(data) {
      this.users = [...data];
    },
    handleMessage(data) {
      this.list.push({ ...data });
    },
    handleMe(data) {
      this.me = { ...data };
    },
    handleSendMsg(message) {
      this.$io.emit("message", {
        message
      });
    },
    handleSendCreate(value) {
      this.$io.emit("create", { name: value });
    },
    openInit() {
      this.$prompt("请输入昵称", "提示", {
        confirmButtonText: "确定",
        inputPattern: /.+/,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        closeOnClickModal: false,
        showCancelButton: false,
        distinguishCancelAndClose: true,
        showClose: false,
        center:true,
        inputErrorMessage: "昵称不能为空"
      }).then(({ value }) => {
        // 接受自己的 cocket id 和 名字
        this.$io.once("me", this.handleMe);
        // 触发创建
        this.handleSendCreate(value);
        this.$message({
          type: "success",
          message: "你的昵称是: " + value
        });
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
  position: fixed;
}
.el-row {
  display: flex;
  height: 100%;
}

.box {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  .main {
    text-align: left;
    overflow-y: auto;
    height: 100%;
    flex: 1;
    padding: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.body_wrap {
  position: relative;
  /* overflow: hidden; */
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.box-card {
  text-align: center;
  min-height: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.clearfix {
  font-weight: bold;
  color: $def-color;
}
.user_item {
  margin-bottom: 24px;
  background-color: $def-bgc;
  padding: 16px;
  color: #fff;
  border-radius: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:last-child {
    margin-bottom: 10px;
  }
}

.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>


<style>
.el-card__body {
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>