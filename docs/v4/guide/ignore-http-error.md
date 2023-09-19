# 忽略HTTP错误

QueryList遵循将业务与错误分离的原则, HTTP请求传输过程中如果出现的错误，QueryList将会抛出异常。

---

QueryList的HTTP客户端基于`GuzzleHttp`,它提供了丰富的HTTP异常类型，用户可以自行设计根据不同的异常类型做不同的处理。

如果你觉得麻烦，并不想每次都去处理HTTP异常，选择直接忽略，让程序继续运行下去，做法可以参考下面方式：

对内置的`get()`进行封装：

```php
use QL\QueryList;
use GuzzleHttp\Exception\RequestException;

$ql = QueryList::getInstance();
//注册一个myGet方法到QueryList对象
$ql->bind('myGet',function ($url,$args = null,$otherArgs = []){
    try{
        $this->get($url,$args,$otherArgs);
    }catch(RequestException $e){
        $this->setHtml('');
        // print_r($e->getRequest());
        echo "Http Error \r\n";
    }
    return $this;
});
```

注册的`myGet()`方法用法与内置的`get()`方法完全相同，唯一区别就是遇到HTTP错误不会抛出异常让程序终止运行。

```php
$ql->myGet('https://www.sfasd34234324.com')->find('...')->....;
```