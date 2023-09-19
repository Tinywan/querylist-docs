# QueryList encoding(string $outputEncoding,string $inputEncoding = null)

---

对HTML进行编码转换，解决乱码问题。第一个参数表示期望输出的编码格式，第二个可选参数表示输入的内容的编码格式，第二参数不传则会尝试自动识别输入的内容的编码格式。

## 用法

---

```php
$data = QueryList::get('https://top.etao.com')->encoding('UTF-8')->find('a')->texts();

print_r($data);
```

```php
$data = QueryList::rules([
	'txt' => ['a','text']
])->get('https://top.etao.com')->encoding('UTF-8','GB2312')->queryData();

print_r($data);
```

