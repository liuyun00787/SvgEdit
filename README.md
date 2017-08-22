SVG编辑器。

## 何时使用

## API

### Broadcaster && Viewer 共同API

```jsx

import { Broadcaster, Viewer } from svgreact;

```

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| className    | 类名 | string          | 无           |
| width    | 宽度 | number          | 500           |
| height    | 高度 | number          | 500           |
| items    | 笔画 | array          | 无           |
| selectItem    | 当前选择笔画 | object          | 无           |
| mouseInfo    | 鼠标信息 | object          | 无           |
| wBToolsInfo    | 白板工具信息 | object          | 无           |

### Broadcaster 私有API
| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| onWbToolsChange    | 白板工具回调 | function          | 无           |
| onMouseChange    | 鼠标回调 | function          | 无           |
| onDrawChange    | 笔画回调 | function          | 无           |
| onDeleteChange    | 清除回调 | function          | 无           |


