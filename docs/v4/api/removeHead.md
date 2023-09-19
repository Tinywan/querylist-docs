# QueryList removeHead()

---

移除页面头部head区域,乱码终极解决方案，DOM解析出现不可解决的乱码问题的时候，可以尝试调用这个方法来解决乱码问题。

> {danger} 当调用这个方法后，无法选择页面中head区域里面的内容。

## 用法

---

```php
$html = file_get_contents('http://www.baidu.com/s?wd=QueryList');

$ql = QueryList::rules([
	'title'=>array('h3','text'),
    'link'=>array('h3>a','href')
]);

$data = $ql->setHtml($html)->removeHead()->query()->getData();

print_r($data);
```