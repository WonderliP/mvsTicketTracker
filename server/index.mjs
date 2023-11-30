import express from 'express';
import fetch, { Headers } from 'node-fetch';
const app = express();
const port = 3000;

// node version should be >= 16

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// replace this value from your session
const COOKIE_VALUE =
  '_ga=GA1.3.1289099717.1700822633; _ga_3GVV2WPF7F=GS1.3.1700822633.1.0.1700822633.0.0.0; WEBCHSID2=vd30jb8rjoe2rb1bdhb9qg9oa3; _identity=7272985e31cb7b84df34fae71ef3552d47b7002d276f601719e2003621c6cc7ea%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A20%3A%22%5B1407282%2Cnull%2C28800%5D%22%3B%7D; _csrf=798c03d50da720d41868c14bde2bababe9ebc9cc4922f210c7acee590e3a8e0ca%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22A0Hk6GvLu0ZRcPEaevfjEgj2mglhLIjJ%22%3B%7D';
// Define a single endpoint
app.get('/api/hello', async (req, res) => {
  try {
    // Make a fetch request to an example API (you can replace this URL with your desired API)
    var myHeaders = new Headers();
    myHeaders.append(
      'Accept',
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    );
    myHeaders.append('Accept-Language', 'en-US,en;q=0.5');
    myHeaders.append('Accept-Encoding', 'gzip, deflate, br');
    myHeaders.append('Referer', 'https://eq.hsc.gov.ua/site/step_pe?');
    myHeaders.append('Connection', 'keep-alive');
    myHeaders.append('Cookie', COOKIE_VALUE);
    myHeaders.append('Upgrade-Insecure-Requests', '1');
    myHeaders.append('Sec-Fetch-Dest', 'document');
    myHeaders.append('Sec-Fetch-Mode', 'navigate');
    myHeaders.append('Sec-Fetch-Site', 'same-origin');
    myHeaders.append('Sec-Fetch-User', '?1');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const text = await fetch(
      'https://eq.hsc.gov.ua/site/step1?value=56&subid=13',
      requestOptions
    )
      .then(response => response.text())
      .catch(error => console.log('error', error));

    res.json({ message: 'Hello, world!', text });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
