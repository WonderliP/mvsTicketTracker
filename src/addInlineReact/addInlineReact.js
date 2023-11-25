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

  loadScript({ src:'https://unpkg.com/@babel/standalone/babel.min.js' });
  loadScript({ src:'https://unpkg.com/react@18/umd/react.development.js' });
  loadScript({ src:'https://unpkg.com/react-dom@18/umd/react-dom.development.js' });
  loadScript({
    type:'text/babel',
    attributes: {
      'data-presets': 'react',
      'data-plugins': 'transform-react-jsx'
    },
    innerHTML: `
      console.log('inline react');
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
        <App />
        </React.StrictMode>
        );
        
        function App() {
          return <h1>Hello, React!</h1>
        }
    `
  });

  /* https://stackoverflow.com/a/53684447 */
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        if (document.querySelectorAll('head script').length === 0) {
            window.dispatchEvent(new Event('DOMContentLoaded'));
        }
    }
  }
})();
