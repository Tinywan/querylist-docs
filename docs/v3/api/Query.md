# Query() 静态方法

返回值:`QueryList对象`

---


Query方法为QueryList唯一的主方法，用静态的方式调用。

**原型: **
```php
QueryList::Query($page,array $rules, $range = '', $outputEncoding = null, $inputEncoding = null,$removeHead = false)
```


**中文解释:**
```php
QueryList::Query(DOM解析的目标页面,DOM解析规则[,区域选择器][，输出编码][，输入编码][，是否移除头部])
//DOM解析规则
$rules = array(
   '规则名' => array('jQuery选择器','要DOM解析的属性'[,"标签过滤列表"][,"回调函数"]),
   '规则名2' => array('jQuery选择器','要DOM解析的属性'[,"标签过滤列表"][,"回调函数"]),
    ..........
	[,"callback"=>"全局回调函数"]
);

//注:方括号括起来的参数可选
```

### 参数解释:
#### $page DOM解析的目标页面
类型:`string`
要抓取的网页URL地址(支持https);或者是html代码片段
#### $rules DOM解析规则
类型:`array`
- **规则名**
 规则名随便取，只要不重复就行。
- **jQuery选择器**
任意CSS3选择器，与jQuery选择器完全通用
- **要DOM解析的属性**
```php
值为以下3种:
	1.text:返回当前选中标签下面的纯文本
	2.html:返回当前选中标签下面的html片段
	3.[HTML标签属性]:如src、href、name、data-src等任意HTML标签属性名
```
- **过滤标签列表**
```php
如果要使用QueryList的内容过滤功能，就请设置这个参数,多个值之间用空格隔开
	1.当标签名前面添加减号(-)时（此时标签可以为任意的jQuery选择器），表示移除该标签以及标签内容。
	2.当标签名前面没有减号(-)时，当 [要DOM解析的属性] 值为text时表示需要保留的HTML标签，为html时表示要过滤掉的HTML标签
```
说明:有减号与没有减号的区别就在于，有减号时会移除那个标签包括那个标签内的所有内容，没有减号时只会移除那个标签并不会移除标签内的内容
> 例子:`内容过滤`

- **回调函数/全局回调函数**
类型:`callback`
在回调函数里面可以做任意额外的事情，如：替换内容、补全链接，下载图片等等;
回调函数有俩个参数，第一个参数是选择到的内容，第二个参数是选择器数组下标(也就是`规则名`)，回调函数会覆盖全局回调函数。
**注意**:回调函数里面不能使用QueryList进行嵌套多级DOM解析，请把这些操作延迟到`getData( )`方法的回调函数中去使用。

#### $range 区域选择器 （可选）
类型:`string`
默认值:`''`

`区域选择器`或者说`范围选择器`,指 先按照规则 选出 几个大块 ，然后再分别再在块里面 进行相关的选择。当DOM解析列表的时候，建议设置这个参数。

>查看区域选择器例子:[http://doc.querylist.cc/site/index/doc/29](http://doc.querylist.cc/site/index/doc/29 "http://doc.querylist.cc/site/index/doc/29")

#### $outputEncoding 输出编码（可选）
类型:`string`
默认值:`null`

指要以什么编码输出(UTF-8,GB2312,.....)，防止出现乱码,如果设置`null`则不改变原字符串编码

#### $inputEncoding 输入编码（可选）
类型:`string`
默认值:`null`

明确指定输入的页面编码格式(UTF-8,GB2312,.....)，防止出现乱码,如果设置`null`则自动识别

#### $removeHead  是否移除头部（可选）
类型:`bool`
默认值:`false`

是否移除页面头部区域,乱码终极解决方案。
**注意:**当这个参数设置为`true`的时候，无法选择页面中head区域里面的内容。
