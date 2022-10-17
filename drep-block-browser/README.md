# 区块链浏览器前端(stake分支)
这是一个Vue前端项目,使用了后端渲染框架nuxt.js,主要功能是显示搜索有关drep链的数据,drep链的数据主要来源由https://github.com/drep-project/DrepExplorer 提供。
> 声明:这不是cc本人独立完成的项目,接手这个项目时并没有任何文档,cc本身的技术栈为React,对于vue以及nuxt不太熟练,所以难免有些使人困扰的代码片段,有些可以更正,有些已无法考究,如有本文未涉及的问题以及凭空出现的bug,可以找我解决,也可以自行解决(毕竟vue的文档较多)。本人邮箱:1539261210@qq.com

## JavaScript库
参照package.json

## 项目主要结构
**.nuxt** nuxt build之后生成的目录，真正运行在实际项目中的也是读取的此目录，里面生成以后就是我们在创建项目时候编译好的对应框架的node项目。

**assets** sass的目录

**components** 放自定义组件的地方，这里我把组件拆分为公共组件以及功能组件都是按目录存放到此目录下。

**layouts** 此目录主要是作为nuxt的布局目录，默认里面会有一个default.vue，我们在page里面不配置layout的情况下默认会采用layouts/default.vue这个布局来渲染我们的页面，在这里我们可以自定义布局页面，然后在page里面去使用,只需要在自定义布局里面引用<nuxt/>这个组件就可以了

**middleware** 目录是我们存放中间件的目录

**node_modules** 默认npm的依赖

**pages** 所有的页面都在这个文件夹里面，特别注意:页面路由也是由目录内文件生成。

**server** index.js(启动nuxt),app.js(路由定义及其处理)

**plugins** 目录是我们存放自定义插件的地方，自定的插件可以直接在我们的vue代码里面使用。

**static** 目录就是存放一些静态资源的地方，比如我们网站要用到的css、图片、第三方库之类的都可以作为静态资源存放到这个目录。

**store** 目录如果我们在创建项目之初选择了使用vuex的话就会存在此目录，主要是用来做store的。

**nuxt.config.js** nuxt项目的配置文件，这里可以配置的东西很多，比如我们的网站所有页面默认的标题、描述、关键词，引用全局样式、引用第三方库都可以在这里配置。

## 运行
dev `yarn dev`<br/>
prod 
`1.yarn build`
`2.yarn start`



## 部署
1.服务器:47.88.230.122<br/>
2.sudo -i 输入密码<br/>
3.cd /home/deploy/js-project/drep-block-browser/<br/>
4.git pull<br/>
5.yarn build<br/>
6.pm2 restart 12<br/>
