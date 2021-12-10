<script setup>
import { encrypt, decrypt } from './util/aes'
import { ElMessage } from 'element-plus'


const mode = ref('cbc')
const padding = ref('pkcs7')
const blockSize = ref('128')
const outFormat = ref('base64')
const inputFormat = ref('utf-8')

const source = ref('')
const encryptedStr = ref('')
const password = ref('')
const iv = ref('')

function check(field='') {
  if (!source.value && field == 'encrypt') {
    ElMessage.closeAll()
    ElMessage.warning({ message: '请输入待加密文本', duration: 2000 })
    return
  }
  if (!encryptedStr.value && field == 'decrypt') {
    ElMessage.closeAll()
    ElMessage.warning({ message: '请输入需解密密文本', duration: 2000 })
    return
  }
  if (!password.value) {
    ElMessage.closeAll()
    ElMessage.warning({ message: '请输入密码', duration: 2000 })
    return
  }
  if (!iv.value) {
    ElMessage.closeAll()
    ElMessage.warning({ message: '请输入偏移量', duration: 2000 })
    return
  }
  if (iv.value.length < 16) {
    ElMessage.closeAll()
    ElMessage.warning({ message: '偏移量最小16字符', duration: 2000 })
    return
  }
  return true
}


function doEncrypt() {
  let checkRes = check('encrypt')
  if (checkRes)
    encryptedStr.value = encrypt(source.value, password.value, iv.value)
}
function doDescrypt() {
  let checkRes = check('decrypt')
  if (checkRes)
    source.value = decrypt(encryptedStr.value, password.value, iv.value)
}


</script>

<template>
  <div id="main">
    <div class="convert alert-info alert">
      <div>
        <label class="f14 bold">AES加密模式:</label>
        <select :value="mode" prop="m" class="h30" disabled>
          <option value="ecb">ECB</option>
          <option value="cbc">CBC</option>
          <option value="ctr">CTR</option>
          <option value="ofb">OFB</option>
          <option value="cfb">CFB</option>
        </select> &nbsp;
        <label class="f14 bold">填充:</label>
        <select :value="padding" prop="pad" class="h30" disabled>
          <option value="pkcs5">pkcs5padding</option>
          <option value="pkcs7">pkcs7padding</option>
          <option value="zero" selected>zeropadding</option>
          <option value="iso10126">iso10126</option>
          <option value="ansix923">ansix923</option>
          <option value="no">no padding</option>
        </select>
        <label class="f14 bold">数据块:</label>
        <select :value="blockSize" prop="block" class="h30" disabled>
          <option value="128">128位</option>
          <option value="192">192位</option>
          <option value="256">256位</option>
        </select>
        &nbsp;
        <label class="f14 bold">密码:</label>
        <input
          type="text"
          prop="p"
          valid="{&quot;minlength&quot;:1}"
          tipsinfo="请输入密码！"
          title="请输入密码！"
          class="inline-block sareainput f16p"
          style
          v-model="password"
        />
        <label class="f14 bold">偏移量:</label>
        <input
          type="text"
          prop="i"
          tipsinfo="iv偏移量，ecb模式不用填写！"
          title="iv偏移量，ecb模式不用填写！"
          class="inline-block sareainput f16p"
          style
          v-model="iv"
        />
        <label class="f14 bold">输出:</label>
        <select :value="outFormat" prop="o" class="h30" disabled>
          <option value="base64">base64</option>
          <option value="hex">hex</option>
        </select>
        <label class="f14 bold p_l10">字符集：</label>
        <select :value="inputFormat" prop="s" class="h30" disabled>
          <option value="gb2312">gb2312编码（简体）</option>
          <option value="gbk">gbk编码（简繁体）</option>
          <option value="gb18030">gb18030编码（中日韩）</option>
          <option value="utf-8">utf8编码（unicode编码）</option>
          <option value="iso-8859-1">iso-8859-1(单字节)</option>
        </select>
      </div>
      <div class="m_t10">
        <span class="l">待加密文本:</span>
      </div>
      <textarea
        id="converts"
        name="converts"
        source="true"
        drag="text"
        class="textarea f14 blue"
        valid="{&quot;minlength&quot;:1}"
        title="请输入需要转换文本！"
        tipsinfo="请输入需要转换文本！"
        v-model="source"
      ></textarea>
      <input id="t" prop="t" type="hidden" value="0" />
      <div class="tc button-wrap">
        <input
          type="button"
          value="AES加密"
          title="AES加密"
          wait="正在处理，稍后..."
          class="btn f14 h30"
          arg="aes"
          @click="doEncrypt"
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="button"
          value="AES解密"
          title="AES解密"
          wait="正在处理，稍后..."
          class="btn f14 h30"
          arg="aes"
          @click="doDescrypt"
        />
      </div>
      <div class="inline-block clearfix">
        <span id="formatinfo" class="r"></span>
        <span class="l">解密转换结果(base64了):</span>
      </div>
      <textarea
        v-model="encryptedStr"
        name="convertd"
        id="convertd"
        class="textarea f14 blue"
        destin="true"
      ></textarea>
    </div>
  </div>
</template>

<style>
#main {
  height: 100vh;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.button-wrap {
  padding: 15px 0;
}
.btn,
.btn:focus,
.btn:hover,
.btn:visited {
  outline: none !important;
}
</style>
