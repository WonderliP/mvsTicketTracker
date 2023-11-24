(function () {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.prepend(root);

  const babel = document.createElement('script');
  babel.src = 'https://unpkg.com/@babel/standalone/babel.min.js';

  babel.onload = function () {
    const react = document.createElement('script');
    react.src = 'https://unpkg.com/react@18/umd/react.development.js';

    react.onload = function () {
      const reactDOM = document.createElement('script');
      reactDOM.src =
        'https://unpkg.com/react-dom@18/umd/react-dom.development.js';

      reactDOM.onload = function () {
        const myScript = document.createElement('script');
        myScript.type = 'text/babel';
        myScript.setAttribute('data-presets', 'react');
        myScript.setAttribute('data-plugins', 'transform-react-jsx');
        myScript.innerHTML = `
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(
            <React.StrictMode>
            <App />
            </React.StrictMode>
            );
            
            function App() {
              return <h1>Hello, React!</h1>
            }
        `;
        document.body.append(myScript);
      };
      document.body.append(reactDOM);
    };
    document.body.append(react);
  };
  document.body.append(babel);
})();
