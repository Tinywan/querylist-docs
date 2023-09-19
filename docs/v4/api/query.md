# QueryList query(Closure $callback = null)

---

- [](#anchor)

执行DOM解析规则rules，执行完这个方法后才可以用`getData()`方法获取到DOM解析数据。

- 参数: $callback
可以通过这个回调函数进一步处理结果，替换内容、补全链接，下载图片等等；返回值会修改原始data数据。
**并且还可以在这个回调函数用使用QueyList进行嵌套无限级DOM解析。**
> 具体用法可查看`getData()`方法文档。

## 用法

---

```php
$ql = QueryList::get('http://www.baidu.com/s?wd=QueryList')->rules([
	'title'=>array('h3','text'),
    'link'=>array('h3>a','href')
]);

$data = $ql->query(function($item, $key){
	$item['title'] = $item['title'].' - other string...';
	return $item;
})->getData();

print_r($data->all());
```
