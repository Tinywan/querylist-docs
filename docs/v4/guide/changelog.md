
# Changelog



## 4.2.5
### Added
- `rules` 新增属性:
    - `attr()`: 获取标签属性值
    - `attrs()`: 获取多个标签属性值

## 4.2.0

> 注意：本次更新存在少量不向下兼容的地方,本次更新的重点是解决内存溢出问题

### Added
- `rules` 新增属性:
    - `texts`:  获取多个元素的文本
    - `htmls`: 获取多个元素的HTML
    - `htmlOuter`:  获取元素的外部HTML
   - `htmlOuters`: 获取多个元素的外部HTML
- `destructDocuments()`：释放所有文档
- `Elements`类新增`htmlOuters()`方法

### Changed
- `destruct()`:  将销毁当前QueryList对象
- `range`: 当未设置`range`时，返回的数据结构发生类变化
- `Elements::each()`:  回调函数参数发生变化，并返回`false`时会终止该函数

## 4.1.0
### Added
- `postJson()`: 发送POST Json请求
- `multiGet()`: 并发GET请求
- `multiPost()`: 并发POST请求
- `pipe()`: 数据流管道方法
- 新增HTTP Cache

### Changed
- 静态调用不再是单列模式



## 4.0.4

### Added

- 新增`queryData()`方法

## 4.0.0

### Changed

- 完全重写整个底层
- 完全composer化，不再支持手动安装
- PHP版本必须大于PHP7
- 更加模块化，更容易扩展
- 内置了强大的http插件和编码转换插件
- 拥有几乎所有与jQuery操作DOM完全相同的API
