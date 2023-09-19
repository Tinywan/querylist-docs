# void destruct()

---



销毁当前QueryList对象以及文档，释放内存占用。

**注意**：当涉及到大量网页循环DOM解析时，QueryList对象使用完之后，请调用此方法销毁QueryList对象，防止内存溢出.


## 用法

下面写法是并不推荐的，但很多新手喜欢这样写。不建议在循环里面重复实例化QueryList对象，应该将实例化QueryList对象放到循环之外，重复使用同一个QueryList对象。

---

```php
// 待DOM解析的链接集合
$urls = [
    'https://querylist.cc/1.html',
	'https://querylist.cc/2.html',
	'https://querylist.cc/3.html',
	//...
];


foreach($urls as $url){
	$ql = QueryList::rule([
            'title' => ['h1','text'],
            'link' => ['a','href']
          ]);
	$data = $ql->get($url)->query()->getData();

    //....

	// 销毁当前QueryList对象
	$ql->destruct();
}

```

