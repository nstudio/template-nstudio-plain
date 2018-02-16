export function debounce(fn, delay) {
  let timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    // tslint:disable-next-line:only-arrow-functions
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
