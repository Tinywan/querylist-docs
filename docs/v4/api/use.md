# QueryList use($plugins,...$opt)

---

- [](#anchor)

注册插件，用于扩展QueryList功能。

- 参数: **$plugins**
插件类名，也可以是插件类名集合数组

- 参数: **...$opt**
安装插件时附带的多个参数。是否需要携带参数以及该携带什么参数跟具体的插件有关。

> {primary} 用该方法安装的插件只有当前的QueryList对象可以使用，如果想要全局安装插件让所有QueryList均可使用，可以查看`config()`方法文档。

## 用法

---

有两种用法

- 用法一
安装单个插件，可携带安装参数
```php
$ql = QueryList::getInstance();
$ql->use(My\MyPlugin::class);
//或者，带安装参数
$ql->use(My\MyPlugin::class,$arg1,$arg2,$arg3);
```

- 用法二
同时安装多个插件，不能携带安装参数
```php
$ql = QueryList::getInstance();
$ql->use([
   My\MyPlugin::class,
   My\MyPlugin2::class,
   Other\OtherPlugin::class
]);
```

