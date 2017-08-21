import dva from 'dva';
import W from 'global/window';
import router from './router';
import { hashHistory, createMemoryHistory } from 'dva/router';

import './index.css';

// 1. Initialize
let app;
try {
  if (window) {
    app = dva({
      history: hashHistory,
    });
  } else {
    app = dva({
      history: createMemoryHistory(),
    });
  }
} catch (e) {
  app = dva({
    history: createMemoryHistory(),
  });
}

app.model(require('./models/init'));

app.model(require('./models/socket'));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(router);
// 5. Start
try {
  if (window) {
    app.start('#root');
  } else {
    W.__APP__ = app;
    W.__ROUTER__ = router;
  }
} catch (e) {
  W.__APP__ = app;
  W.__ROUTER__ = router;
}

export default { app, router };
