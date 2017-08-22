SVG编辑器。

## 何时使用
```
npm install -S svgreact 
```
## API
```jsx

import { Broadcaster, Viewer } from svgreact;

```

### Broadcaster && Viewer 共同API

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| className    | 类名 | string          | 无           |
| width    | 宽度 | number          | 500           |
| height    | 高度 | number          | 500           |
| items    | 笔画 (当为使用`Broadcaster`组件时，初始化才会render) | array          | 无           |
| selectItem    | 当前选择笔画 (当为使用`Broadcaster`组件时，初始化才会render) | object          | 无           |
| mouseInfo    | 鼠标信息 (当为使用`Broadcaster`组件时，初始化才会render) | object          | 无           |
| wBToolsInfo    | 白板工具信息 (当为使用`Broadcaster`组件时，初始化才会render) | object          | 无           |

### Broadcaster 私有API
| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| onWbToolsChange    | 白板工具回调 | function(obj`配置信息`)          | 无           |
| onMouseChange    | 鼠标回调 | function(obj`配置信息`)          | 无           |
| onDrawChange    | 笔画回调 | function(obj`配置信息`)          | 无           |
| onDeleteChange    | 清除回调 | function(obj`配置信息`)          | 无           |

## 开发

1. clone 代码
```
git clone https://github.com/hexiao-o/SvgEdit.git
```
2. 安装依赖和启动服务
```
cd SvgEdit && npm install && cd example && npm install && npm run start
```
3. 打开网页
```
open http://localhost:3000
```

