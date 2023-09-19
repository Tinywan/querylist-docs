# DOM解析乱码解决方案

---

出现乱码的问题很多，解决方法也不尽相同，要视具体情况而定，以下几种乱码解决方案仅供参考。

## 一.使用QueryList内置的乱码解决方案
Query方法: 
```php
QueryList::Query(DOM解析的目标页面,DOM解析规则[,区域选择器][，输出编码][，输入编码][，是否移除头部])
```

1.设置输入输出编码
```php
$html =<<<STR
<div>
    <p>这是内容</p>
</div>
STR;
$rule = array(
    'content' => array('div>p:last','text')
);
$data = QueryList::Query($html,$rule,'','UTF-8','GB2312')->data;
```
2.设置输入输出编码,并设置最后一个参数为true
如果设置输入输出参数仍然无法解决乱码，那就设置最后一个参数为true(移除头部)
```php
$html =<<<STR
<div>
    <p>这是内容</p>
</div>
STR;
$rule = array(
    'content' => array('div>p:last','text')
);
$data = QueryList::Query($html,$rule,'','UTF-8','GB2312',true)->data;
```


## 二.自己手动转码页面，然后再把页面传给QueryList
```php
$url = 'http://top.etao.com/level3.php?spm=0.0.0.0.Ql86zl&cat=16&show=focus&up=true&ad_id=&am_id=&cm_id=&pm_id=';

//手动转码
$html = iconv('GBK','UTF-8',file_get_contents($url));

$hj = QueryList::Query($html,array("text"=>array(".title a","text")));
print_r($hj->data);
```
