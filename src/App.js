import { useEffect, useState } from 'react';

const initialOffices = [
  {
    id_offices: 104,
    offices_name: 'Сервісний центр МВС № 5943',
    offices_addr:
      '42700, \u043c. \u041e\u0445\u0442\u0438\u0440\u043a\u0430, \u0432\u0443\u043b. \u041a\u0438\u0457\u0432\u0441\u044c\u043a\u0430, 164\u0412',
    lang: '50.31312318957503',
    long: '34.87187628105959',
    cnt: 0,
    icnt: 0,
    sts: 4,
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState({});

  useEffect(function () {
    async function getOffices() {
      const res = await fetch(
        'https://eq.hsc.gov.ua/site/step2?chdate=2023-11-25&question_id=56&id_es='
      );
      const data = await res.text();
      setOffices(findMarkers(data));
    }
    getOffices();
  }, []);

  return (
    <div className="app">
      {isOpen && (
        <Modal
          offices={offices}
          selectedOffice={selectedOffice}
          onSelectedOffice={setSelectedOffice}
        />
      )}
    </div>
  );
}

function Modal({ offices, selectedOffice, onSelectedOffice }) {
  return (
    <div className="modal">
      <Form
        offices={offices}
        selectedOffice={selectedOffice}
        onSelectedOffice={onSelectedOffice}
      />
    </div>
  );
}

function Form({ offices, selectedOffice, onSelectedOffice }) {
  return (
    <form className="form">
      <label>
        Choose the office:
        <select
          name="Offices"
          value={selectedOffice}
          onChange={e => onSelectedOffice(e.target.value)}
        >
          {offices.map(office => (
            <option value={office.id_offices} key={office.id_offices}>
              {office.offices_name}
            </option>
          ))}
        </select>
      </label>
      {/* <label>
        Choose the date:
        <select value="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <label>
        Do you want to take a practical test on a school vehicle?
        <select value="">
          <option value="Yes">✅ Yes</option>
          <option value="No">❌ No</option>
        </select>
      </label> */}
    </form>
  );
}

function findMarkers(html) {
  const regex = /markersx\s*=\s*(\[.*?\])/;
  const match = html.match(regex);

  if (match) {
    try {
      const markersxArray = JSON.parse(match[1]);
      return markersxArray;
    } catch (error) {
      console.error('Error parsing markersx array:', error);
      return null;
    }
  } else {
    console.error('markersx array not found in the HTML markup.');
    return null;
  }
}

export default App;
