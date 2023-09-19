# 全局配置

使用QueryList全局配置，避免重复操作。

---

QueryList的`config()`方法可用于全局配置QueryList。

使用场景：比如在项目中全局注册QueryList插件，这样在项目中任何位置都可以直接使用这些插件，避免重复注册操作。

## 示例

在项目的启动文件中全局注册一些QueryList插件和扩展一些功能,以`Laravel`框架为例，在`AppServiceProvider.php`文件的`boot()`方法中全局配置QueryList：

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use QL\QueryList;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // 全局注册插件
        QueryList::config()->use(My\MyPlugin::class,$arg1,$arg2,$arg3)
            ->use([
                 My\MyPlugin1::class,
                 My\MyPlugin2::class,
                 Other\OtherPlugin::class
            ]);

        //全局注册一个自定义的编码转换方法
        QueryList::config()->bind('myEncode',function($outputEncoding,$inputEncoding){
            $html = iconv($inputEncoding,$outputEncoding.'//IGNORE',$this->getHtml());
            $this->setHtml($html);
            return $this;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```

之后就可以在项目的任何位置使用QueryList时都可以直接使用这些已注册的扩展功能了：

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use QL\QueryList;

class IndexController extends Controller
{
    public function index()
    {
    	$data = QueryList::get('...')->myPlugin1('...')->rules('...')->queryData();

		$data = QueryList::get('https://top.etao.com')->myEncode('UTF-8','GBK')->find('a')->texts();
    }
}
```

