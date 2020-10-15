<template>
  <el-row>
    <!-- <h2>
        <span style="color: #e1e5f0">新版本前端框架</span> &lt;!&ndash; 标题&ndash;&gt;
      </h2>-->
    <el-col :span="4">
      <h2>
        <span style="color: white">视频云管理系统</span>
      </h2>
    </el-col>
    <el-col :span="8">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item :index="item.id" v-for="item in items" :key="item.id" @click="handleClick(item.router,item.id)">
         {{item.title}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="5" :offset="1" class="demo-autocomplete">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo hidden-md-and-down"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2c3e50"
        text-color="#fff"
      >

        <el-menu-item index="1002">

          <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="请输入查询内容"
            @select="handleSelect"
          ></el-autocomplete>
          <i class="el-icon-search" style="color: white"></i>
        </el-menu-item>

      </el-menu>

    </el-col>
     <el-col :span="6">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="999">
          <el-dropdown size="small" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white">
                  {{language}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cn">中文</el-dropdown-item>
              <el-dropdown-item command="en">Engilsh</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-submenu index="1000">
          <template slot="title">个人中心</template>
          <el-menu-item index="1000-1" @click="person">个人信息</el-menu-item>
          <el-menu-item index="1000-2" @click="changePassword">密码修改</el-menu-item>
          <el-menu-item index="1000-3" @click="myHelp">帮助</el-menu-item>
          <el-menu-item index="1000-4" @click="onLogout">退出</el-menu-item>
        </el-submenu>
        <el-menu-item index="1001" class="hidden-md-and-down">
          <img  v-if="imageUrl" :src="imageUrl" class="picture1">
          <el-tag type="warning">{{userInfo}}</el-tag>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>

</template>
<script>

export default {
  data () {
    return {
      items: [
      ],
      activeIndex: '1',
      activeIndex2: '1',
      search: '',
      state2: '',
      restaurants: [],
      language: sessionStorage.language || '中文',
      userInfo: sessionStorage.getItem('userInfo'),
      imageUrl: '',
      isSelect:1,
    }
  },
  mounted: function () {
    this.restaurants = this.loadAll()
    this.selectPicture()
    this.selectMenu()
  },
  methods: {
    onLogout () {
      sessionStorage.removeItem('Authorization')// 移除token
      this.$router.push({path: '/'})
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        {'value': '视频联网平台', 'address': '长宁区新渔路144号'},
        {'value': 'Camera1', 'address': '上海市长宁区淞虹路661号'},
        {'value': '产品部', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '航天长峰', 'address': '天山西路438号'},
        {'value': '北京航天', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
        {'value': '中国航天二院', 'address': '上海市长宁区金钟路633号'},
        {'value': '永定路全景摄像机', 'address': '上海市嘉定区曹安公路曹安路1685号'},
        {'value': '32号楼大门口', 'address': '上海市普陀区同普路1435号'},
        {'value': '长峰大厦', 'address': '上海市北翟路1444弄81号B幢-107'},
        {'value': '北京航天长峰科技工业集团有限公司', 'address': '上海市嘉定区新郁路817号'},
        {'value': '人脸识别', 'address': '嘉定区曹安路1611号'},
        {'value': '语音识别', 'address': '嘉定区曹安公路2383弄55号'}
      ]
    },
    handleSelect (item) {
      // console.log(item.value)

    },
    handleClick (obj,id) {
      this.isSelect = id;
      this.$router.push(obj);
    },
    handleCommand (command) {
      if (command === 'en') {
        this.language = 'English'// 设置标签显示文字
        this.$i18n.locale = 'en'// 设置加载i18n显示语言
        sessionStorage.setItem('lang', 'en')// 塞入标签到缓存
        sessionStorage.setItem('language', 'English')// 指定初始化标签显示文字
      } else {
        this.language = '中文'
        this.$i18n.locale = 'cn'
        sessionStorage.setItem('lang', 'cn')
        sessionStorage.setItem('language', '中文')
      }
    },
    person () {
      this.$router.push({path: '/userInfo'})
    },
    changePassword () {
      this.$router.push('/changePassword')
    },
    myHelp () {
      this.$router.push('/help')
    },
    selectPicture () {
      // 判断当前登录用户是否已注册头像
      let picture = sessionStorage.getItem('userPicture')
      if (parseInt(picture) === 200) {
        this.imageUrl = '/qmy/user/download?id=' + sessionStorage.getItem('userId')
        this.pictureClass = 'picture1'
      } else if (parseInt(picture) === 404) {
        this.imageUrl = '/static/img/b5.ico'
        this.pictureClass = 'picture2'
      } else {
        console.log('server error')
      }
    },
    selectMenu () {
      let type = sessionStorage.getItem('userType')
      this.$axios({
        method: 'post',
        url: '/qmy/menu',
        data: {type: type}
      }).then(res => { // res是返回结果
        console.log(res.data.data)
        this.items = res.data.data
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log(err)
      })
    }

  }

}
</script>
<style>
  .Underline {
    text-decoration: none
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .picture1 {
    width: 38px;
    height: 50px;
    /*display: block;*/
    vertical-align: middle;
    display: inline-block;
    transform: translateY(2px);
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;
  }
</style>
