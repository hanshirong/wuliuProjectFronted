<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">解析前: <b>{{ result }}</b></p>
    <p class="decode-result">解析后: <b>{{ parsing }}</b></p>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {

  components: { QrcodeStream },

  data () {
    return {
      result: '',
      parsing:{},
      error: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result
      var strs = new Array(); //定义一数组
      strs = result.trim().split(/\s+/) //字符分割 
      let ticket=strs[0]+'-'+strs[1].substring(0,2)
      let serial=strs[1].substring(2)
      let count=strs[2]
     this.parsing.ticket=ticket
     this.parsing.serial=serial
     this.parsing.count=parseInt(count)

      
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
