export const useSetTimeout = () => {
  function debounce(fn: Function, delay: number) {
    let timer: any;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, args);
      }, delay);
    };
  }

  function throttle(fn: Function, delay: number) {
    let timer: any;
    return function (...args: any[]) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.call(this, args);
          timer = null;
        });
      }
    };
  }

  return {
    debounce,
    throttle
  };
};
