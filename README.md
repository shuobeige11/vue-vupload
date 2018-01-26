// vupload 组件
   基于swiper 组件制作查看大图，可滑动查看全图
   解决 前端图片压缩，图片颠倒问题，
   图片压缩: {
      宽高压缩： 以手机屏幕宽度为值，等比例压缩高度
      质量宽度： canvas 压缩质量参数压缩
   }


简化了使用配置，优化了删除功能，修复安卓下上传不了

优化了上传异步请求队列
增加了上传失败提示，超时
摈弃了对swiper的依赖
增加了 data 属性（string/Object）
例： 上传参数为file=图片&type='png'两个参数，
即data={file:'', type: 'png'}, 组件以对象中位空的参数为图片内容字段


// 引入上传组件
import {
  upload,
  uploadList,
  uploadFile
} from 'vupload'

## 注
注：以上方式如果出现报错可换成
  import upload from 'vupload/upload'
  import uploadList from 'vupload/component/uploadlist'
  import uploadFile from 'vupload/component/upload'
分别引入

export default {
  components: {
    upload,
    uploadList,
    uploadFile
  }
}



### 上传组件使用方法
```
<template>
  <div class="ins-btn">
    <upload class="base remark-img" 
        :list="option"// 上传图片参数
        :server="'/'"//服务器地址
        :data="{
          file:'',
          type: 'png'
        }//不填默认 上传参数为file"
        
        :multiple="true"//不填默认为true（开启批量上传）
        quality="0.8"//图片质量，默认50%
        max="5"//一次最多上传图片个数，默认5张
        :progress="onProgress"//上传进度，移动端支持度不高
        :start="onStart"// 上传开始事件，显示缩略图
        :success="onSuccess"// 上传成功回调
        :error="onError">// 上传失败回调（前端拦截失败的情况，比如                     超过上限之类）
      <upload-list 
        :list="option.imgList"// 上传成功图片
        :thunb="option.imgCache"// 缩略图
        :onDel="onDel"// 删除图片事件
        class="list"
      />
      <upload-file class="uploader" />
    </upload>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        option: {
           imgList: [],
           imgCache: []
        }
      }
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
```
#样式
  从父组件定义组件内样式， 

  ‘scoped’ 不需要加，否则会导致内部样式丢失，以防冲突，可以通过，顶层id包含下面的样式

````

<style lang="scss">
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
  background: url('../../assets/upload.png') no-repeat;
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
         background:url('../../assets/loading.gif');
         background-size: turnToRem(66px) auto;
       }
       //新增fail样式
       .failure {
         margin: 0 auto;
         width: turnToRem(88px);
         height: turnToRem(88px);
         background:url('../../assets/img_fail.png');
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
       background: url('../../assets/del.png');
       background-size: turnToRem(40px) auto
    }
  }
}
</style>