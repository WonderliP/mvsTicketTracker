import express from 'express'
import fetch, {
  Headers
} from 'node-fetch'
const app = express();
const port = 3000;

// node version should be >= 16

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// replace this value from your session
const COOKIE_VALUE = "";

// Define a single endpoint
app.get('/api/hello', async (req, res) => {
  try {
    // Make a fetch request to an example API (you can replace this URL with your desired API)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8");
    myHeaders.append("Accept-Language", "en-US,en;q=0.5");
    myHeaders.append("Accept-Encoding", "gzip, deflate, br");
    myHeaders.append("Referer", "https://eq.hsc.gov.ua/site/step_pe?");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Cookie", COOKIE_VALUE);
    myHeaders.append("Upgrade-Insecure-Requests", "1");
    myHeaders.append("Sec-Fetch-Dest", "document");
    myHeaders.append("Sec-Fetch-Mode", "navigate");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Sec-Fetch-User", "?1");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const text = await fetch("https://eq.hsc.gov.ua/site/step1?value=56&subid=13", requestOptions)
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
