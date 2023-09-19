# 表格DOM解析

由于网页中的`table`表格每一行、每一列没有明显的`class`或`id`,让很多人对DOM解析表格感觉束手无策。

下面演示如何通过`伪选择器`来DOM解析表格。

## 示例

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 use QL\QueryList;

$html =<<<STR
    <div>
        <table>
            <tr>
                <td>姓名</td>
                <td>年龄</td>
                <td>职位</td>
            </tr>
            <tr>
                <td>Rae</td>
                <td>29</td>
                <td>医生</td>
            </tr>
            <tr>
                <td>Marsh</td>
                <td>56</td>
                <td>牧师</td>
            </tr>
            <tr>
                <td>Solomon</td>
                <td>18</td>
                <td>作家</td>
            </tr>
        </table>
    </div>
STR;

$table = QueryList::html($html)->find('table');

// DOM解析表头
$tableHeader = $table->find('tr:eq(0)')->find('td')->texts();
// DOM解析表的每行内容
$tableRows = $table->find('tr:gt(0)')->map(function($row){
    return $row->find('td')->texts()->all();
});

print_r($tableHeader->all());
print_r($tableRows->all());

```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => 姓名
    [1] => 年龄
    [2] => 职位
)
Array
(
    [0] => Array
        (
            [0] => Rae
            [1] => 29
            [2] => 医生
        )

    [1] => Array
        (
            [0] => Marsh
            [1] => 56
            [2] => 牧师
        )

    [2] => Array
        (
            [0] => Solomon
            [1] => 18
            [2] => 作家
        )

)
```

---



