# Config static config()

---




静态方法,全局配置QueryList,返回值为`QL\Config`对象.

## QL\Config 对象

---

方法列表:
- **use()** 全局安装插件
- **bind()** 全局功能扩展


### Config use($plugins,...$opt)

用法同QueryList的use方法,全局安装插件后，所有QueryList对象均可使用这些插件。

```php
QueryList::config()->use(My\MyPlugin::class,$arg1,$arg2,$arg3);

QueryList::config()->use(My\MyPlugin::class)->use([
 My\MyPlugin::class,
 My\MyPlugin2::class,
 Other\OtherPlugin::class
]);

```

### Config bind(string $name, Closure $provider)
用法同QueryList的bind方法，全局功能扩展，所有QueryList对象均可使用扩展的方法。

- 例一

```php
//全局注册一个自定义的编码转换方法
QueryList::config()->bind('myEncode',function($outputEncoding,$inputEncoding){
    $html = iconv($inputEncoding,$outputEncoding.'//IGNORE',$this->getHtml());
    $this->setHtml($html);
    return $this;
});


$data = QueryList::get('https://top.etao.com')->myEncode('UTF-8','GBK')->find('a')->texts();

print_r($data->all());
```

- 例二

```php
//全局注册一个myHttp方法到QueryList对象
QueryList::config()->bind('myHttp',function($url){
   $html = file_get_contents($url);
    $this->setHtml($html);
    return $this;
});


$data = QueryList::myHttp('https://top.etao.com')->find('a')->texts();

print_r($data->all());
```