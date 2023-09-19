# QueryList html($html)

---

设置待DOM解析的html源码，等价于`setHtml($html)`

## 用法
---
```php
$html = file_get_contents('https://querylist.cc/');
$ql = QueryList::html($html);
//$ql->setHtml($html);
$html = $ql->getHtml();
```

