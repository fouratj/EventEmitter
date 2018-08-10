class EventEmitter {
  constructor() {
    this.state = {};
  }

  addListener(type, handler) {
    if (!this.state[type]) {
      this.state[type] = [handler];
    } else {
      this.state[type].push(handler);
    }
  }

  emit(type, msg) {
    this.state[type].forEach(handler => {
      handler(msg);
    });
  }

  removeListener(type, fn) {
    const handlers = this.state[type].filter(handler => handler !== fn);
    this.state[type] = handlers;
  }
}

const emitter = new EventEmitter();

const handler1 = event => {
  console.log('Hello from handler 1', event);
};

const handler2 = event => {
  console.log('Hello from handler 2', event);
};

emitter.addListener('OnClick', handler1);
emitter.addListener('OnClick', handler2);

emitter.emit('OnClick', { message: 'Hello World' });

// Stdout
// 'Hello from handler 1 { message: \'Hello World\''
// 'Hello from handler 2 { message: \'Hello World\''

emitter.removeListener('OnClick', handler1);
emitter.emit('OnClick', { message: 'Hello World' });

// Stdout
// 'Hello from handler 2 { message: \'Hello World\''
