import merge from "deepmerge";
import * as shvl from "shvl";

export default function (options, storage, key) {
  options = options || {};
  storage = options.storage || (window && window.localStorage);
  key = options.key || "vuex";

  function canWriteStorage(storage) {
    try {
      storage.setItem("@@", 1);
      storage.removeItem("@@");
      return true;
    } catch (e) { }

    return false;
  }

  /**
   * 拿取数据
   *  
   * @param {*} key 键
   * @param {*} storage 存储方式
   * @param {*} value 
   * @returns 对象数据
   */
  function getState(key, storage, value) {
    try {
      return (value = storage.getItem(key)) && typeof value !== "undefined"
        ? JSON.parse(value)
        : undefined;
    } catch (err) { }

    return undefined;
  }

  function filter() {
    return true;
  }

  function setState(key, state, storage) {
    return storage.setItem(key, JSON.stringify(state));
  }

  function reducer(state, paths) {
    return paths.length === 0
      ? state
      : paths.reduce(function (substate, path) {
        return shvl.set(substate, path, shvl.get(state, path));
      }, {});
  }

  /* 
   * subscribe(handler: Function): Function
   *
   * 订阅 store 的 mutation。handler 会在每个 mutation 完成后调用，
   * 接收 mutation 和经过 mutation 后的状态作为参数
   * 
   * (mutation, state) => {
   *   console.log(mutation.type)
   * console.log(mutation.payload)
   *  }
   */
  function subscriber(store) {
    return function (handler) {
      return store.subscribe(handler);
    };
  }

  if (!canWriteStorage(storage)) {
    throw new Error("Invalid storage instance given");
  }


  /*
   * 这个可以看做是两步
   * 1、在 options 中查找 getState 方法 没有则返回 getState
   *  const getStateFunction = shvl.get(options, "getState", getState)
   * 2、调用  getStateFunction 传参
   *  getStateFunction(key, storage)
   */
  const savedState = shvl.get(options, "getState", getState)(key, storage);


  return function (store) {
    // 进行数据检测
    if (typeof savedState === "object" && savedState !== null) {
      store.replaceState(
        // 对象合并
        merge(store.state, savedState, {//配置对象合并参数
          arrayMerge:
            options.arrayMerger ||
            function (store, saved) {
              return saved;
            },
          clone: false
        })
      );
      // 
      (options.rehydrated || function () { })(store);
    }

    //  调用 每次 mutation 的钩子
    (options.subscriber || subscriber)(store)(function (mutation, state) {
      if ((options.filter || filter)(mutation)) {
        (options.setState || setState)(
          key,
          (options.reducer || reducer)(state, options.paths || []),
          storage
        );
      }
    });
  };
}
