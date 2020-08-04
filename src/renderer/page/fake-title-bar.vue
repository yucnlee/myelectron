<template>
  <div class="fake-title-bar">
  <div>桌面应用</div>
  <div class="handle-bar">
    <div>
        <i class="el-icon-minus" @click="minimizeWindow" style="font-size:16px;"></i>
    </div>
    <div>
        <a-icon type="border" @click="MaximizeWindow"></a-icon>
    </div>
    <div>
        <i class="el-icon-close" @click="closeWindow" style="font-size:16px;"></i>
    </div>
  </div>
  <div>

  </div>
</div>
</template>

<script>
export default {
    name:"fakeTitleBar",
    methods:{
        minimizeWindow() {
            let win = this.$electron.remote.getCurrentWindow();
            win.minimize();
        },
        MaximizeWindow() {
            let win = this.$electron.remote.getCurrentWindow();
            win.maximize();  
        },
        closeWindow() {
            let win = this.$electron.remote.getCurrentWindow();
            win.close();
        },
    }

}
</script>

<style lang="scss" scoped>
    .fake-title-bar {
        display:flex;
        justify-content: space-between;
        // position: absolute;
        // top: 0;
        width: 100%;
        line-height: 30px;
        height: 30px;
        // padding: 0 15px;
        background-color: #515e6c;
        -webkit-app-region:drag;
    }

    .handle-bar {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        -webkit-app-region: no-drag;

        div {
            width: 40px;
            height: 100%;
            text-align: center;
            &:hover{
                background-color: gray;
            }
            i {
                color: white;
            }
            .square {
                display: inline-block;
                margin-top: 8px;
                width: 14px;
                height: 14px;
                border: 1px solid white;
            }
        }
    }
</style>