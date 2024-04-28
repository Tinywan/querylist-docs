# 安装

使用QueryList,从学习安装开始。

---






`QueryList`目前有2个支持的版本`V3`和`V4`，安装之前你需要根据实际环境来选择,它们的区别如下:
- V3
	- PHP版本要求PHP5.3以上；
	- 只有一个主文件，可直接引入无需使用Composer安装，使用便捷；
	- 只有一个主要的API，学习简单；
	- 支持V4版本的大多数功能特性
- V4
	- PHP版本要求PHP8.0以上;
	- 更加现代化的设计思想，文件结构复杂，需要使用Composer安装;
	- 更加丰富的富有表现力的API,功能更加强大;
	- 完全模块化的设计，更加强大的可扩展性;

总的来说，如果条件允许请尽量使用最新版本。


## 环境要求

```shell
PHP >= 8.0
```

QueryList 4.0 要求PHP版本7.1，如果你的PHP版本还停留在PHP5，或者不会使用Composer,你可以选择使用QueryList3,QueryList3支持php5.3以及手动安装。

> QueryList3 文档:[https://querylist.cc/docs/guide/v3](https://querylist.cc/docs/guide/v3)

---

> {danger} 这里有个很多人都会犯的错误，那就是安装QueryList之前没有在命令行下执行`php -v` 命令来检查命令行下的PHP版本，很多人的PHP版本是PHP5，不满足QueryList4.0的依赖需求，所以composer就默认选择了安装QueryList3.0，导致按照QueryList4.0的文档来使用时报各种错误，比如`get()方法未定义` ,希望我在这里强调之后不要有人再犯这个错！



## 安装QueryList

一切准备就绪后，安装QueryList只需要执行下面这条命令就可以了：

```shell
composer require jaeger/querylist
```

如果使用Composer安装出现了问题，这里打包了一份QueryList4的源码，开箱即用：[https://pan.baidu.com/s/1QPMUalL5HcVJ4L7zUY0LMg](https://pan.baidu.com/s/1QPMUalL5HcVJ4L7zUY0LMg)



## 学习建议

*工欲善其事,必先利其器!*

- 会使用**Composer**

如果你之前没有接触过Composer，强烈建议你学习一下。Composer 是 PHP 的一个依赖管理工具，使用它你可以轻松安装别人发布的PHP包，现在流行的PHP项目基本上都是Composer来管理依赖，[🔗Composer中文文档](http://docs.phpcomposer.com/) 。

- 非常熟悉**jQuery选择器**或**CSS选择器**

`QueryList`的核心思想就是使用**jQuery选择器**来做DOM解析，所以选择器语法会贯穿全文。如果你之前从未了解过**jQuery选择器**，那后面的章节你可能就会看的一脸懵逼，请先熟练学习完**jQuery选择器**后再来继续学习QueryList，这也是学习QueryList中的唯一难点，请自行百度**jQuery学习教程**或**jQuery选择器**学习相关知识。

---

达到上面2点要求再来学习QueryList，会有事半功倍的效果。据以往经验，大多数QueryList初学者遇到的问题都是composer安装出现了问题和选择器不会写。

> {primary} **jQuery选择器**与**CSS选择器**的区别**:** 它们两者基本一致，如果你想要了解它们之间的细微区别的话[🔗可以看看这篇文章](https://segmentfault.com/a/1190000010746086) 。由于QueryList是基于phpQuery的，而phpQuery是jQuery的PHP实现，所以QueryList中的选择器以**jQuery选择器**为主。

---


## 常见问题FAQ

### Composer安装速度太慢

如果composer安装速度太慢，可以尝试执行下面命令更换国内镜像：

```shell
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

### Composer安装报错

多半是PHP版本问题,检查你的PHP版本是否是PHP7,可以在命令行执行下面命令检查：

```shell
php -v
```

### 方法未定义

安装好QueryList后，使用诸如`QueryList::get()`之类的方法，提示方法未定义。 

基本上可以确认出现此类错误是因为你安装的QueryList版本是V3版本，确认一下你当前安装的QueryList版本号,并在命令行下执行命令:`php -v`确认PHP版本号，如果PHP版本号小于`PHP7.0`的话,composer就会自动安装QueryList V3版本，确认PHP版本为7.0后可以使用composer安装时强制指定版本号:

```shell
composer require jaeger/querylist:~V4
```
