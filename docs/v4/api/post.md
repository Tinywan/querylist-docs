# QueryList post($url,$args = null,$otherArgs = [])

---

Http post插件,用于post表单。默认已经开启了与`get()`方法共享cookie 。

`postJson()`方法用法同`post()方法`.

## 用法

---

### 用法同http get插件
```php
$ql->post('http://httpbin.org/post',[
    'param1' => 'testvalue',
    'params2' => 'somevalue'
],[
    'proxy' => 'http://222.141.11.17:8118',
    'timeout' => 30,
    'headers' => [
        'Referer' => 'https://querylist.cc/',
        'User-Agent' => 'testing/1.0',
        'Accept'     => 'application/json',
        'X-Foo'      => ['Bar', 'Baz'],
        'Cookie'    => 'abc=111;xxx=222'
    ]
]);
echo $ql->getHtml();
```
输出:
```php
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "param1": "testvalue",
    "params2": "somevalue"
  },
  "headers": {
    "Accept": "application/json",
    "Connection": "close",
    "Content-Length": "34",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "abc=111;xxx=222",
    "Host": "httpbin.org",
    "Proxy-Connection": "Keep-Alive",
    "Referer": "https://querylist.cc/",
    "User-Agent": "testing/1.0",
    "X-Foo": "Baz"
  },
  "json": null,
  "origin": "222.141.11.17",
  "url": "http://httpbin.org/post"
}
```

### 连贯操作
http插件默认已经开启了全局cookie，`post`操作和`get`操作是cookie共享的,意味着你可以先调用`post`方法登录，然后`get`方法就可以DOM解析所有登录后的页面。
```php
$ql = QueryList::post('http://xxxx.com/login',[
    'username' => 'admin',
    'password' => '123456'
])->get('http://xxx.com/admin');

$ql->get('http://xxx.com/admin/page');

//echo $ql->getHtml();
```

### 实战：模拟登陆GitHub
```php
$ql = QueryList::getInstance();
//手动设置cookie
$jar = new \GuzzleHttp\Cookie\CookieJar();

//获取到登录表单
$form = $ql->get('https://github.com/login',[],[
    'cookies' => $jar
])->find('form');

//填写GitHub用户名和密码
$form->find('input[name=login]')->val('your github username or email');
$form->find('input[name=password]')->val('your github password');

//序列化表单数据
$fromData = $form->serializeArray();
$postData = [];
foreach ($fromData as $item) {
    $postData[$item['name']] = $item['value'];
}

//提交登录表单
$actionUrl = 'https://github.com'.$form->attr('action');
$ql->post($actionUrl,$postData,[
    'cookies' => $jar
]);

//判断登录是否成功
// echo $ql->getHtml();
$userName = $ql->find('.header-nav-current-user>.css-truncate-target')->text();
if($userName)
{
    echo '登录成功!欢迎你:'.$userName;
}else{
    echo '登录失败!';
}
```

输出:
```php
登录成功!欢迎你:jae-jae
```

