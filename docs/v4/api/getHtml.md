# string getHtml($rel = true)

---

- [用法](#anchor)

获取设置的待DOM解析的html源码

- 参数：`$rel`用于设置获取源码的两种方式，默认值为`true`表示获取底层 phpQuery 所设置的HTML源码，值为`false`表示获取用户设置的HTML源码，理论上两种方式获取到的HTML源码是一致的，但某些情况下 phpQuery 会截断HTML源码，导致内容不一致，从而导致DOM解析结果超出预期。

<a name="anchor">
## 用法

---

```php
$html = <<<STR
<div class="two">
        <a href="http://querylist.cc">QueryList官网</a>
        <img src="http://querylist.com/1.jpg" alt="这是图片">
        <img src="http://querylist.com/2.jpg" alt="这是图片2">
    </div>       
STR;

$ql = QueryList::html($html);
$html = $ql->getHtml();
echo $html;
```
