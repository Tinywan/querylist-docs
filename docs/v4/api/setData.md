# QueryList setData(Collection $data)

---

设置DOM解析结果数据，此方法紧提供给插件使用。

## 用法

---

详细用法查看 `bind`方法文档。
```php
$ql = QueryList::getInstance();

$ql->setData(collect([
    'txt' => '自定义内容'
]));

$data = $ql->getData();

print_r($data->all());
```
输出:
```php
Array
(
    [txt] => 自定义内容
)

```