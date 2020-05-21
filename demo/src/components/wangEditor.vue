<template>
	<div class="wrap">
		<div id="editor" class="editor" ></div>
		<!-- <input type="button" value="获取" @click="get" /> -->
	</div>
</template>

<script>
	import Editor from "wangeditor"
	export default{
		name:"WangEditor",
		data(){
			return{
				editor:"",
        info_:null
			}
		},
    model:{
      prop:"value",
      event:"change"
    },
    watch:{
      isClear(val){
        if(val){
          this.editor.txt.clear()
          this.info_=null
        }
      },
      value(val){
        this.editor.txt.html(val)
      }
    },
    props: {
      isClear: {
        type: Boolean,
        default: false
      },
      value:{
        type:String,
        default:""
      }
    },
		methods:{
			get(){
        this.editor=new Editor("#editor");
        this.editor.customConfig.uploadImgShowBase64=true;
        this.editor.customConfig.showLinkImg=false;
				// let htmlStr=this.editor.txt.html()
        this.editor.customConfig.onchange=(html)=>{
          this.info_=html
          console.log(html)
          this.$emit("change",this.info_)
        }
        this.editor.create();
			}
		},
		mounted() {
      console.log
      this.get();

			// this.editor.txt.html();
		}
	}
</script>

<style>
</style>
