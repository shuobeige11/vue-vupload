<template>
  <div class="ins-btn">
    <upload class="base remark-img" 
        :list="option"
        :server="'/'"
        :start="onStart"
        :success="onSuccess"
        :error="onError">
      <upload-list 
        :list="option.imgList"
        :thunb="option.imgCache"
        :onDel="onDel"
        class="list"
      />
      <upload-file class="uploader" />
    </upload>
  </div>
</template>

<script>
  import upload from 'vupload/upload'
  import uploadList from 'vupload/component/uploadlist'
  import uploadFile from 'vupload/component/upload'
 
  export default {
    data () {
      return {
        option: {
           imgList: [],
           imgCache: []
        }
      }
    },
    components: {
      upload,
      uploadList,
      uploadFile
    },
    methods: {
      onStart(canvas) {
         this.option.imgCache.push(canvas)//上传前回调
       },
       onSuccess(jsons) {
         this.option.imgList.push(jsons.content.downloadUrl)//上传成功回调
       },
       onError(e) {
         console.log(e)//发生异常
       },
       onDel(index) {
         this.option.imgList = this.option.imgList.filter((data, num) => num != index )
         this.option.imgCache = this.option.imgCache.filter((data, num) => num != index )
         //删除图片(可选)
       },
       onProgress(num) {
         console.log(num)//进度条事件(可选)
       }
    }
  }
  
</script>

<style lang='scss'>
html, body, div, p, section, span, ul, li, em, a, dl, dd {
  padding:0;
  margin:0;
  list-style: none
}
@function turnToRem($px) {
  @return 64px * $px / 75px / 32px * 1rem;
}


.ins-btn {
  position: relative;
  min-height: turnToRem(45px);
  overflow: hidden;
}

.uploader {
  float: left;
  width: turnToRem(200px);
  height: turnToRem(200px);
}

.upload {
  width: 100%;
  height: 100%;
  background: url('../assets/upload.png') no-repeat;
  background-size: 100% auto;
  position: relative;
  overflow:hidden;
}
.list {
  .item {
     float: left;
     width: turnToRem(198px);
     height: turnToRem(198px);
     border: 1px solid #ddd;
     margin-right: 2%;
     position: relative;
     margin-bottom: 2%;
     overflow: hidden;
     img {
       width: 100%;
        height: 100%;
     }
     
     .loadImg {
       width: 100%;
       height: 100%;
       position: absolute;
       background:rgba(239,239,239,.6);
       top: 0;
       left: 0;
       display: flex;
       align-items: center;
       .loading {
         margin: 0 auto;
         width: turnToRem(66px);
         height: turnToRem(6px);
         background:url('../assets/loading.gif');
         background-size: turnToRem(66px) auto;
       }
  
       .failure {
         margin: 0 auto;
         width: turnToRem(88px);
         height: turnToRem(88px);
         background:url('../assets/img_fail.png');
         background-size: turnToRem(88px) auto;
       }
       .failImg {
         background: #eee
       }
       .del {
         position: absolute;
         top: 0;
         right: 0;
         width: turnToRem(40px);
         height: turnToRem(40px);
         background: url('../assets/del.png');
         background-size: turnToRem(40px) auto
      }
    }
  }
}
</style>
