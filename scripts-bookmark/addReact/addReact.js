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

  function loadLink(options) {
    const { href, rel } = options || {};
    const link = document.createElement('link');
    if (href) {
      link.href = href;
    }
    if (rel) {
      link.rel = rel;
    }
    document.body.appendChild(link);
  }

  loadScript({ src:'http://127.0.0.1:8080/static/js/main.js' });
  loadLink({ href:'http://127.0.0.1:8080/static/css/main.css', rel: 'stylesheet' });
})();
