# 功能扩展

QueyList是完全模块化的设计，拥有强大的可扩展性。

---

使用`bind()`方法绑定一个功能函数到QueryList对象，实现轻量级的功能扩展。`bind()`方法的第一个参数是绑定的函数名，第二个参数是一个匿名的功能函数，这个功能函数的`$this`对象指向的是**当前的QueryList实例**对象，所以在这个功能函数中可以直接通过`$this`来调用QueryList的方法。

## 例子

<larecipe-badge type="primary" circle class="mr-3 mb-2">1</larecipe-badge>

注册一个自定义的http网络操作方法到QueryList对象。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

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

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

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

<larecipe-badge type="primary" circle class="mr-3 mb-2">2</larecipe-badge>

自定义一个简单的图片下载功能。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

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

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

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
    // ...
)
```

---

<larecipe-badge type="primary" circle class="mr-3 mb-2">3</larecipe-badge>

如果你想扩展的功能比较复杂，你可以把你想扩展的功能独立成一个class，然后在bind里面调用。

```php
QueryList::bind('myHttp',function(){
    return new MyHttp($this);
})
```

<larecipe-badge type="primary" circle class="mr-3 mb-2">4</larecipe-badge>
一个`bind`可以依赖另一个`bind`。

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

