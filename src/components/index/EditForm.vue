<template>
  <div class="edit">
    <div class="edit-tool">
      <el-popover class="edit-tool-item" placement="top" width="250" v-model="visible">
        <div class="emoji-wrap">
          <span
            class="emoji-item"
            v-for="(item, index) in pack"
            @click="handleSelectEmoji(item.emoji)"
            :key="index"
          >{{item.emoji}}</span>
        </div>
        <el-button type="primary" slot="reference" icon="el-icon-magic-stick" size="mini" circle></el-button>
      </el-popover>

    </div>

    <el-form ref="form" :model="form">
      <el-form-item prop="content" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">
        
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          :maxlength="300"
          resize="none"
          placeholder="请输入内容"
          v-model="form.content"
          @keydown.meta.enter.native="onSubmit('form')"
          @keydown.ctrl.enter.native="onSubmit('form')"
        ></el-input>

      </el-form-item>
      <el-form-item>
        <span>快捷键 ( Ctrl+Enter )or(Command + Return)</span>
        <el-button type="primary" @click="onSubmit('form')">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import VEmojiPicker from 'v-emoji-picker';
import packData from "v-emoji-picker/data/emojis.json";

const pack = packData.splice(0, 63);

export default {
  data() {
    return {
      form: {
        content: ""
      },
      visible: false,
      pack: pack
    };
  },
  components: {
    // VEmojiPicker
  },
  created() {},
  methods: {
    handleSelectEmoji(emoji) {
      this.form.content += emoji;
    },
    onSubmit(refName) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          this.$emit("send", this.form.content);
          this.form.content = "";
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  width: 100%;
  min-height: 160px;
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  &-tool {
    display: flex;
    margin-bottom: 10px;
    &-item {
      margin-right: 10px;
    }
  }
}
.emoji-wrap {
  display: flex;
  flex-wrap: wrap;
}
.emoji-item {
  font-size: 27px;
  margin: 0 4px;
  cursor: pointer;
  user-select: none;
}
</style>
