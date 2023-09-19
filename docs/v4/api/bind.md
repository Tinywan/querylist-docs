# QueryList bind(string $name,Closure $provide)

---

- [用法](#anchor)

QueryList功能扩展,绑定一个功能函数到QueryList对象，轻量级功能扩展，可以理解为注册了一个插件。可静态调用或动态调用。

- 参数: **$name**
绑定的功能函数名称。如果绑定多个相同名称的函数，后面绑定的会覆盖前面绑定的，所以只有最后一个同名函数会生效。

- 参数: **$provide**
匿名处理函数，函数内的`$this`对象为当前QueryList对象的内部`$this`,意味着可以通过这个`$this`调用QueryList任意的方法。

> {primary} 用该方法扩展的功能只有当前的QueryList对象可以使用，如果想要全局所有QueryList均可使用，可以查看`config()`方法文档。

<a name="anchor">
## 用法

---

- 例子一

下面演示注册一个自定义的http网络操作方法到QueryList对象:

```php
//DOM解析开发者头条

$ql = QueryList::getInstance();

//注册一个myHttp方法到QueryList对象
$ql->bind('myHttp',function ($url){
    $html = file_get_contents($url);
    $this->setHtml($html);
    return $this;
});

//然后就可以通过注册的名字来调用
$data = $ql->myHttp('https://toutiao.io')->find('h3 a')->texts();
print_r($data->all());

//或者这样用
$data = $ql->rules([
    'title' => ['h3 a','text'],
    'link' => ['h3 a','href']
])->myHttp('https://toutiao.io')->query()->getData();

print_r($data->all());
```

输出:
```php
Array
(
    [0] => 用 500 行 Golang 代码实现高性能的消息回调中间件
    [1] => 腾讯大神教你如何解决 Android 内存泄露
    [2] => [译] 普通码农入门机器学习，必须掌握这些数据技能
    [3] => 教你用 Carthage + RXSwift + MVVM + Moya + Router 写一个小说阅读 App
   //...
)

Array
(
    [0] => Array
        (
            [title] => 用 500 行 Golang 代码实现高性能的消息回调中间件
            [link] => /k/u6hhfn
        )

    [1] => Array
        (
            [title] => 腾讯大神教你如何解决 Android 内存泄露
            [link] => /k/abg526
        )

    [2] => Array
        (
            [title] => [译] 普通码农入门机器学习，必须掌握这些数据技能
            [link] => /k/cnbt4o
        )

    [3] => Array
        (
            [title] => 教你用 Carthage + RXSwift + MVVM + Moya + Router 写一个小说阅读 App
            [link] => /k/1aaumb
        )

   //....

)

```
---
- 例子二
自定义一个简单的图片下载功能:

```php
//DOM解析并下载ZOL桌面壁纸

//扩展一个图片下载功能
//参数：$path 为图片本地保存路径
$ql = QueryList::bind('downloadImage',function ($path){

    $data = $this->getData()->map(function ($item) use($path){
	    //获取图片
        $img = file_get_contents($item['image']);
        $localPath = $path.'/'.md5($img).'.jpg';
		//保存图片到本地路径
        file_put_contents($localPath,$img);
		//data数组中新增一个自定义的本地路径字段
        $item['local_path'] = $localPath;
        return $item;
    });
	
	//更新data属性
    $this->setData($data);
    return $this;
});

$data = $ql->get('http://desk.zol.com.cn')->rules([
    'image' => ['#newPicList img','src']
])->query()->downloadImage('img')->getData();

print_r($data->all());


```

输出:

```php
Array
(
    [0] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/0C/01/ChMkJ1nDaCOIatt0AAStbpl0q7sAAgrLABXih4ABK2G911.jpg
            [local_path] => img/59561f7b8c122d529b9709fdc93283cd.jpg
        )

    [1] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/04/0D/ChMkJ1mvUQ2IRSccAAIWHljxrrYAAgONAMJtn8AAhY2932.jpg
            [local_path] => img/00bfaf54c930247815b6d906827600a9.jpg
        )

    [2] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/04/00/ChMkJ1mtG--IPy-5AAOcpLiVZyQAAgLHwB3T3gAA5y8026.jpg
            [local_path] => img/60ca7c8575da1f7746cb3e69918a7d68.jpg
        )

    [3] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/03/07/ChMkJ1mqnYWIHGfnAA1lScmizi8AAgI1QBBDRQADWVh371.jpg
            [local_path] => img/18c7a79b3f20244cbf7014a42e1709f5.jpg
        )

    [4] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/0F/07/ChMkJ1auywyIfAiMAA1aJc_O3G0AAH8ygMjcosADVo9010.jpg
            [local_path] => img/83e881add90fd5908d78918390ef0659.jpg
        )

    [5] => Array
        (
            [image] => http://desk.fd.zol-img.com.cn/t_s208x130c5/g5/M00/0F/04/ChMkJlk4uwOIXe12AAebdUNvnEkAAc4jQD4SUcAB5uN513.jpg
            [local_path] => img/d2030a819368db51dec6919e141a8db3.jpg
        )

)
```

---

- 例子三

如果你想扩展的功能比较复杂，你可以把你想扩展的功能独立成一个class，然后在bind里面调用，就像这样:
```php
QueryList::bind('myHttp',function(){
	return new MyHttp($this);
})
```
---
- 例子四

一个`bind`可以依赖另一个`bind`:

```php
$ql = QueryList::bind('myHttp',function(){
	return new MyHttp($this);
});

$ql->bind('other',function(){
	//使用上一个bind
	$this->myHttp();
	return $this;
})

```