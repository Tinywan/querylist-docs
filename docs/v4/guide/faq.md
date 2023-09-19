# 常见问题FAQ

> {info} QueryList存在多个版本，不同版本之间用法是不兼容的，看文档之前请先确认你看的文档版本号与你正在使用的QueryList版本号是否是对应的，据以往经验很多用户使用报错都是因为这个问题，可以通过文档右上角来切换文档版本号。

---

- [Document with ID '...' isn't loaded](#anchor1)
- [DOMDocument::loadHTML():...](#anchor2)

## 安装问题

安装相关的问题查看[安装](installation#FAQ)章节。

## 其它问题

<a name="anchor1">
## Document with ID '...' isn't loaded. Use phpQuery::newDocument($html) or phpQuery::newDocumentFile($file) first.

此类错误一般是因为脚本中涉及大量的QueryList对象调用，而又没有及时释放资源的内存占用，导致内存溢出引起的，解决方法就是尽量重用同一个QueryList对象并及时释放资源的内存占用：

- 错误示范
  
  ```php
  foreach ($urls as $url) {
    QueryList::get($url)->rules([
      //....
    ])->query()->getData();
  }
  ```

- 正确做法
  
  ```php
  $ql = QueryList::rules([
      //....
    ]);
  foreach ($urls as $url) {
     $ql->get($url)->query()->getData();
     // 释放资源，销毁内存占用
     QueryList::destructDocuments();
  }
  ```
  或者这样：
  
  ```php
  foreach($urls as $url){
      $ql = QueryList::rule([
              // ...
            ]);
      $data = $ql->get($url)->queryData();
  
      //....
  
      // 销毁当前QueryList对象
      $ql->destruct();
  }
  ```
  

<a name="anchor2">
## DOMDocument::loadHTML(): htmlParseEntityRef: expecting ';'

这是`DOMDocument`类`loadHTML`方法产生的警告信息，当DOM解析的页面HTML格式是非标准化格式时会产生，可以在代码中加入下列代码来屏蔽输出此类警告信息:

```php
libxml_use_internal_errors(true);
```
