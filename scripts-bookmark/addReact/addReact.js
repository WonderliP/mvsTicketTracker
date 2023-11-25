javascript:(function () {
  console.log('start');
  const root = document.createElement('div');
  root.id = 'root';
  document.body.prepend(root);

  function loadScript(options) {
    const { type, innerHTML, src, attributes } = options || {};
    const script = document.createElement('script');
    if (src) {
      script.src = src;
    }
    if (innerHTML) {
      script.innerHTML = innerHTML;
    }
    if (type) {
      script.type = type;
    }
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        script.setAttribute(key, attributes[key]);
      });
    }
    script.async = false;
    document.body.appendChild(script);
  }

  loadScript({ src:'http://127.0.0.1:8080/static/js/main.js' });
})();
