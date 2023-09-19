# 处理乱码

内容乱码是DOM解析过程中很常见的问题。

---

出现乱码的问题很多，解决方法也不尽相同，要视具体情况而定，以下几种乱码解决方案仅供参考。

## 一.使用QueryList内置的乱码解决方案

1.使用编码转换插件，设置输入输出编码

```php
$html =<<<STR
<div>
    <p>这是内容</p>
</div>
STR;
$rule = [
    'content' => ['div>p:last','text']
];
$data = QueryList::html($html)->rules($rule)
                ->encoding('UTF-8','GB2312')->query()->getData();
```

2.设置输入输出编码,并移除html头部

如果设置输入输出参数仍然无法解决乱码，那就使用 `removeHead()`方法移除html头部

```php
$html =<<<STR
<div>
    <p>这是内容</p>
</div>
STR;
$rule = [
    'content' => ['div>p:last','text']
];
$data = QueryList::html($html)->rules($rule)
                ->removeHead()->query()->getData();
// 或者
$data = QueryList::html($html)->rules($rule)
                ->encoding('UTF-8','GB2312')->removeHead()->query()->getData();
```

## 二.自己手动转码页面，然后再把页面传给QueryList

```php
$url = 'http://top.etao.com/level3.php?spm=0.0.0.0.Ql86zl&cat=16&show=focus&up=true&ad_id=&am_id=&cm_id=&pm_id=';
//手动转码
$html = iconv('GBK','UTF-8',file_get_contents($url));
$data = QueryList::html($html)->rules([
    "text" => [".title a","text"]
    ])->query()->getData();
print_r($data);
```