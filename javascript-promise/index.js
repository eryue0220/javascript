const state = {
  pending: 0,
  resolve: 1,
  reject: 2
};

function PromisePolyfill(func) {
  const handlers = [];
  let currentState = state.pending;
  let value;

  function resolve(newValue) {
    value = newValue;
    currentState = state.resolve;
    setTimeout(() => {
      handlers.forEach(handler => handle(handler));
    });
  }

  function reject(err) {
    value = err;
    currentState = state.reject;
  }

  function handle(handler) {
    if (currentState === state.pending) {
      handlers.push(handler);
      return;
    }

    handler.resolve(handler.onFullFill(value))
  }

  this.then = (onFullFill, onReject) =>
    new PromisePolyfill((resolve, reject) => handle({ resolve, onFullFill }))

  func(resolve, reject);
}

var p = new PromisePolyfill((resolve, reject) => {
  resolve('同步操作')
})

p.then(console.log)
