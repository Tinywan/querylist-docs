# 处理DOM解析结果

QueryList返回的集合数据均为`Collection`集合对象而非普通数组，目的就是为了方便处理DOM解析结果数据。

---

QueryList引入了Laravel中`Collection`集合对象，它提供了一个更具可读性的、更便于处理数组数据的封装。下面通过几个例子来说明它的用法，更多用法可以去查看Laravel文档。

>  Collection文档：<https://d.laravel-china.org/docs/5.4/collections>



## 例子

DOM解析所有图片链接，DOM解析目标：

```php
$html =<<<STR
    <div class="xx">
        <img data-src="/path/to/1.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/2.jpg" alt="">
    </div>
    <div class="xx">
        <img data-src="/path/to/3.jpg" alt="">
    </div>
STR;
```

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 $data = QueryList::html($html)->rules([
        'image' => ['img','data-src']
    ])->range('.xx')->query()->getData(function($item){
        return $item;
    });
print_r($data->all());
```

<larecipe-badge type="success">DOM解析结果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [image] => /path/to/1.jpg
        )
    [1] => Array
        (
            [image] => /path/to/2.jpg
        )
    [2] => Array
        (
            [image] => /path/to/3.jpg
        )
)
```

------



## 简化数据

如果我们想要的结果是一位数组，而非二位数组，那该怎么做呢？

可以使用`flatten()`方法将多维集合转为一维的，对上面的DOM解析结果`data`进行处理:

```php
$rt = $data->flatten()->all();
print_r($rt);
```

输出结果:

```php
Array
(
    [0] => /path/to/1.jpg
    [1] => /path/to/2.jpg
    [2] => /path/to/3.jpg
)
```



## 截取数据

如果我们只想要前2条数据，其它数据都是多余的，那该怎么做呢？

`take()` 方法返回给定数量项目的新集合，对最初的DOM解析结果`data`进行处理:

```php
$rt = $data->take(2)->all();
print_r($rt);
```

输出结果:

```php
Array
(
    [0] => Array
        (
            [image] => /path/to/1.jpg
        )

    [1] => Array
        (
            [image] => /path/to/2.jpg
        )

)
```

你也可以传入负整数从集合末尾开始获取指定数量的项目，下面获取`data`数据中最后2条数据：

```php
$rt = $data->take(-2)->all();
print_r($rt);
```

输出结果:

```php
Array
(
    [1] => Array
        (
            [image] => /path/to/2.jpg
        )

    [2] => Array
        (
            [image] => /path/to/3.jpg
        )

)
```

## 翻转数据顺序

某些情况下我们需要翻转数据顺序，比如：DOM解析论坛的帖子列表，帖子默认是按照发布日期由新到旧排序的，但我们把这些数据存入数据库的时候，想要按照发布日期由旧到新存入。

`reverse()` 方法用来倒转集合中项目的顺序:

```php
$rt = $data->reverse()->all();
print_r($rt);
```

输出结果:

```php
Array
(
    [2] => Array
        (
            [image] => /path/to/3.jpg
        )

    [1] => Array
        (
            [image] => /path/to/2.jpg
        )

    [0] => Array
        (
            [image] => /path/to/1.jpg
        )

)
```

## 过滤数据

`filter()`方法用于按条件过滤数据，只保留满足条件的数据。

下面例子过滤掉图片路径为`/path/to/2.jpg`的值。

<larecipe-badge type="info">DOM解析代码:</larecipe-badge>

```php
 $rt = $data->filter(function($item){
	return $item['image'] != '/path/to/2.jpg';
})->all();

print_r($rt);
```

<larecipe-badge type="success">DOM解析果:</larecipe-badge>

```php
Array
(
    [0] => Array
        (
            [image] => /path/to/1.jpg
        )

    [2] => Array
        (
            [image] => /path/to/3.jpg
        )

)
```



## 遍历数据，依次处理每一项数据

`map()` 方法遍历集合并将每一个值传入给定的回调。该回调可以任意修改项目并返回，从而形成新的被修改过项目的集合。下面遍历`data`并补全图片链接地址：

```php
$rt = $data->map(function($item){
	$item['image'] = 'http://xxx.com'.$item['image'];
	return $item;
})->all();
print_r($rt);
```

输出结果：

```php
Array
(
    [0] => Array
        (
            [image] => http://xxx.com/path/to/1.jpg
        )

    [1] => Array
        (
            [image] => http://xxx.com/path/to/2.jpg
        )

    [2] => Array
        (
            [image] => http://xxx.com/path/to/3.jpg
        )

)
```



## 连贯操作

`Collection`对象的所有方法都是可以连贯操作的，比如下面操作,先翻转数数据顺序，然后补全图片链接，最后截取前2条数据:

```php
$rt = $data->reverse()->map(function($item){
	$item['image'] = 'http://xxx.com'.$item['image'];
	return $item;
})->take(2)->all();
print_r($rt);
```

输出结果：

```php
Array
(
    [2] => Array
        (
            [image] => http://xxx.com/path/to/3.jpg
        )

    [1] => Array
        (
            [image] => http://xxx.com/path/to/2.jpg
        )

)
```





> {primary} 大家可以举一反三，更多用法查看Collection文档。