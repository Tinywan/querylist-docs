# 递归多级DOM解析

可以在`getData()`方法中多次调用QueryList来实现递归多级DOM解析。

使用场景：如DOM解析多级菜单，需要先DOM解析第一级菜单，然后DOM解析第二级菜单，以此类推。

## 示例



<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
<?php
require 'QueryList/vendor/autoload.php';
use QL\QueryList;

//获取每个li里面的h3标签内容，和class为item的元素内容

$html =<<<STR
    <div id="demo">
        <ul>
            <li>
              <h3>xxx</h3>
              <div class="list">
                <div class="item">item1</div>
                <div class="item">item2</div>
              </div>
            </li>
             <li>
              <h3>xxx2</h3>
              <div class="list">
                <div class="item">item12</div>
                <div class="item">item22</div>
              </div>
            </li>
        </ul>
    </div>
STR;

$data = QueryList::html($html)->rules(array(
        'title' => array('h3','text'),
        'list' => array('.list','html')
    ))->range('#demo li')->queryData(function($item){
        // 注意这里的QueryList对象与上面的QueryList对象是同一个对象
        // 所以这里要重置range()参数，否则会共用前面的range()参数，导致出现DOM解析不到结果的诡异现象
        $item['list'] = QueryList::html($item['list'])->rules(array(
                 'item' => array('.item','text')
            ))->range('')->queryData();
        return $item;
});
print_r($data); 
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [title] => xxx
            [list] => Array
                (
                    [0] => Array
                        (
                            [item] => item1
                        )
                    [1] => Array
                        (
                            [item] => item2
                        )
                )
        )
    [1] => Array
        (
            [title] => xxx2
            [list] => Array
                (
                    [0] => Array
                        (
                            [item] => item12
                        )
                    [1] => Array
                        (
                            [item] => item22
                        )
                )
        )
)
```

---

