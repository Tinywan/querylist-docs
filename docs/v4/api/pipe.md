# QueryList pipe(Closure $callback)

---

数据流管道方法,可以在QueryList链式调用的任意一环节调用使用。

## 用法

```php
$html = '...';
$qlHtml = QueryList::html($html)
	->pipe(function(QueryList $ql){
        $html = $ql->getHtml();
        // 对HTML做一些处理
        $html = str_replace('aa','bb',$html);
        $ql->setHtml($html);
        return $ql;
    })->getHtml();
```
```php
QueryList::get(...)
	->rules(...)
    ->query()
    ->pipe(function(QueryList $ql){
      $data = $ql->getData();
      return $data;
    });
```

