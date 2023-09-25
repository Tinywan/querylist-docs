# 示例代码

先来感受一下使用 QueryList 来做DOM解析是什么样子。

----


**1. DOM解析百度搜索结果列表的标题和链接。**

::: code-group

```php [code]
$data = QueryList::get('https://www.baidu.com/s?wd=QueryList', null, [
        'headers' => [
            'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            'Accept-Encoding' => 'gzip, deflate, br',
        ]
    ])->rules([
        'title' => ['h3', 'text'],
        'link' => ['h3>a', 'href']
    ])
    ->range('.result')
    ->queryData();

print_r($data);
```

```php [output]
  Array
  (
    [0] => Array
        (
            [title] => QueryList|基于phpQuery的无比强大的PHPDOM解析工具
            [link] => http://www.baidu.com/link?url=GU_YbDT2IHk4ns1tjG2I8_vjmH0SCJEAPuuZN
        )
    [1] => Array
        (
            [title] => PHP 用QueryList抓取网页内容 - wb145230 - 博客园
            [link] => http://www.baidu.com/link?url=zn0DXBnrvIF2ibRVW34KcRVFG1_bCdZvqvwIhUqiXaS
        )
    [2] => Array
        (
            [title] => 介绍- QueryList指导文档
            [link] => http://www.baidu.com/link?url=pSypvMovqS4v2sWeQo5fDBJ4EoYhXYi0Lxx
        )
        //...
  )
```
:::



---



**2.分别DOM解析百度搜索结果列表的标题和链接。**

::: code-group

```php [code]
$ql = QueryList::get('https://www.baidu.com/s?wd=QueryList', null, [
    'headers' => [
        'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'Accept-Encoding' => 'gzip, deflate, br',
    ]
]);
$titles = $ql->find('h3>a')->texts(); //获取搜索结果标题列表
$links = $ql->find('h3>a')->attrs('href'); //获取搜索结果链接列表
print_r($titles->all());
print_r($links->all());
```

```php [output]
Array
(
    [0] => QueryList|简洁、优雅的PHPDOM解析工具
    [1] => phpQuery选择器 - QueryList 4.0 指导文档
    [2] => php写爬虫进行DOM解析 QueryList的使用 - CSDN博客
    [3] => QueryListDOM解析在线测试
    [4] => 介绍- QueryList 4.0 指导文档
    [5] => QueryList交流社区|基于phpQuery的无比强大的DOM解析工具
    [6] => 介绍- QueryList 3.0 指导文档
    [7] => thinkphp5使用QueryList实现DOM解析功能 - 坚持一点点 - 博客园
    [8] => QueryList一个基于phpQuery的无比强大的DOM解析工具 - ThinkPHP框架
    [9] => php使用QueryList轻松DOM解析JavaScript动态渲染页面 - QueryList - ...
)
Array
(
    [0] => http://www.baidu.com/link?url=CNKBNz0t9t6YLmIfXjKYnIkcQ-JzNOpAyiAHPDSnlkmrEqMq5q9o44ElplTf7nON
    [1] => http://www.baidu.com/link?url=VKDqdL3WXxuy0xV3uHMDXRrqQlWGhh4qMQ5h4UCBw0sRJvE9uLlMbr5fE_gsURX8oehsAyzi9_QxVuC1CBjoTa
    [2] => http://www.baidu.com/link?url=rjDcaEbicrZjIG-iFJdkHJTWxoxYA2EBatxh-EyvMDdPMPxtOi8nDUi7UiuIgmW9X7o6CvcFUqPqCrqJp7M4FmRKpJ52-ceBowE0ek_jb5O
    [3] => http://www.baidu.com/link?url=9FAlKAB_4xCVP1hv_RlpPN8ROxsTSTDHpnvvxYn4j_veTkhxHfaPHUFAtc8BctDmN9ZVigMS7ggaVy778zAMzK
    [4] => http://www.baidu.com/link?url=CFOkrOHOFsWPddZC1fuRv8ZqwhbF7P6vH1Pg1covRawG6wsmszFW1qnxHf7mWKPM
    [5] => http://www.baidu.com/link?url=7kCwV_WRMZjWAeyOWP3zfX4Jx21tPeZhmyuENciN86BBd_g8znMD3JgEEfvGRbNc
    [6] => http://www.baidu.com/link?url=p3JenyGg7qtP7lSKXkbLM8_eGTzxzjJGch7__-8fmuIsZOdEQbCquS6P_NdR4LoG
    [7] => http://www.baidu.com/link?url=_EJBv9sxVtGT1paHERifcDHEaG8twDHk-Av2JD5DlkJUvipLAdNqovTdXAxijcI3LTaC3F_jYuMkHuTOJ0ic7_
    [8] => http://www.baidu.com/link?url=ad9pwRrrkyTVOB7ZMKN29XyLX1MsXRIFPbA0ldPLTQQ58Dnw_YpZFKJZwxZ-jfaL
    [9] => http://www.baidu.com/link?url=mEjYM95SeHFYCnfITubUoTOj7XWR1NparEcb3hCGqPGv_uChSvVFat6xcvyCz_9mLogw5ol5gU_isHqYRTJj2q
)
```
:::

:::tip
 So Easy~ 有没有被 **QueryList** DOM解析代码的简洁优雅惊艳到，那就赶紧上车吧！😎
:::
