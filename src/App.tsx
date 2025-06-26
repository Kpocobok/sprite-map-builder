import { useState, type ReactNode } from 'react';
import { Container } from './styles';
import BaseLayout from './layouts/base';
import './assets/styles/fonts.css';
import './assets/styles/base-style.css';

const App = (): ReactNode => {
  const [files, setFiles] = useState<string[]>([]);

  const openFolder = async (): Promise<void> => {
    const result = await window.api.openFolder();
    if (result) setFiles(result);
  };

  return (
    <Container>
      <BaseLayout>
        <h1>Electron + React + TS</h1>
        <button onClick={openFolder}>Открыть папку</button>
        <ul>
          {files.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </BaseLayout>
    </Container>
  );
};

export default App;
