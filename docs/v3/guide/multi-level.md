# 递归多级DOM解析

---

可以在`getData()`方法中多次调用QueryList来实现递归多级DOM解析。

## 示例
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

$data = QueryList::Query($html,array(
        'title' => array('h3','text'),
        'list' => array('.list','html')
    ),'#demo li')->getData(function($item){

    $item['list'] = QueryList::Query($item['list'],array(
             'item' => array('.item','text')
        ))->data;
    return $item;

});
print_r($data);

/**
 结果:
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
 */

```