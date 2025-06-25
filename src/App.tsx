import { useState } from 'react';

function App() {
  const [files, setFiles] = useState<string[]>([]);

  const openFolder = async () => {
    const result = await window.api.openFolder();
    if (result) setFiles(result);
  };

  return (
    <div>
      <h1>Electron + React + TS</h1>
      <button onClick={openFolder}>Открыть папку</button>
      <ul>
        {files.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
