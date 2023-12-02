import { useEffect, useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(function () {
    async function getOffices() {
      const res = await fetch(
        'https://eq.hsc.gov.ua/site/step2?chdate=2023-11-25&question_id=56&id_es=',
        {
          credentials: 'include',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
          },
          referrer: 'https://eq.hsc.gov.ua/site/step1?value=56&subid=13',
          method: 'GET',
          mode: 'cors',
        }
      );
      const data = await res.text();
    }
    getOffices();
  }, []);

  function handleCloseModal() {
    setIsOpen(is => !is);
  }

  return (
    <div className="app">
      {isOpen && <Modal onCloseModal={handleCloseModal} />}
    </div>
  );
}

function Modal({ onCloseModal }) {
  return (
    <div className="modal">
      <Form />
      <ButtonClose onCloseModal={onCloseModal} />
    </div>
  );
}

function Form() {
  return (
    <form className="form">
      <label>
        Choose the office:
        <select name="Offices">
          <option value="Office 1">Office 1</option>
          <option value="Office 2">Office 2</option>
          <option value="Office 3">Office 3</option>
        </select>
      </label>
      <label>
        Choose the date:
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <label>
        Do you want to take a practical test on a school vehicle?
        <select>
          <option value="Yes">✅ Yes</option>
          <option value="No">❌ No</option>
        </select>
      </label>
    </form>
  );
}

function ButtonClose({ onCloseModal }) {
  return (
    <button className="btn-close" onClick={onCloseModal}>
      X
    </button>
  );
}

// function findMarkers(html) {
//   const regex = /markersx\s*=\s*(\[.*?\])/;
//   const match = html.match(regex);

//   if (match) {
//     try {
//       const markersxArray = JSON.parse(match[1]);
//       return markersxArray;
//     } catch (error) {
//       console.error('Error parsing markersx array:', error);
//       return null;
//     }
//   } else {
//     console.error('markersx array not found in the HTML markup.');
//     return null;
//   }
// }

export default App;
