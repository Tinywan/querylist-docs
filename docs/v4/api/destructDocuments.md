# void destructDocuments() 静态方法

> V4.2.0 新增

---

- [用法](#anchor)

释放所有文档资源，销毁内存占用，一般是在使用单列模式时，你需要调用此方法来手动释放资源占用。在非单列模式下，在使用完当前QueryList对象后，你应该调用`destruct()`方法来销毁当前QueryList对象。

背景：phpQuery 会将所有DOM解析过的网页文档存到内存当中，不会主动释放文档，当涉及到大量的网页DOM解析时，内存占用就会持续增加，最终导致内存溢出。手动调用此方法可以将内存中文档全部释放。

**注意**：此方法并不是销毁QueryList对象，只是销毁phpQuery Document占用的内存，所以调用此方法后，原先设置过HTML的QueryList对象都会丢失设置的HTML，需要重新调用`html`或者`get`方法设置HTML.

<a name="anchor">
## 用法

---

- 基础用法

```php
$html = file_get_contents('https://querylist.cc/');
$ql = QueryList::html($html);

// 销毁所有文档
QueryList::destructDocuments();
// 报错
$ql->find('a');

// 需要重新设置html
$ql->html($html);
// 成功
$ql->find('a');

```

- 实际使用场景

```php
// 待DOM解析的链接集合
$urls = [
    'https://querylist.cc/1.html',
	'https://querylist.cc/2.html',
	'https://querylist.cc/3.html',
	//...
];

// 设置DOM解析规则
$ql = QueryList::getInstance()->rule([
    'title' => ['h1','text'],
	'link' => ['a','href']
]);

foreach($urls as $url){
	// 每条链接都会应用上面设置好的DOM解析规则
	$data = $ql->get($url)->query()->getData();
	// 释放Document内存占用
    //因为这里的 ql 使用的是单列模式，所以不用使用 $ql->destruct() 来销毁当前QueryList对象并释放资源占用
	QueryList::destructDocuments();
	// ...
}

```

