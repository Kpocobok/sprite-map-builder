import { useState, type ReactNode } from 'react';
import { Container } from './styles';

const Home = (): ReactNode => {
  const [files, setFiles] = useState<string[]>([]);

  const openFolder = async (): Promise<void> => {
    const result = await window.api.openFolder();
    if (result) setFiles(result);
  };

  return (
    <Container>
      <h1>Electron + React + TS</h1>
      <button onClick={openFolder}>Открыть папку</button>
      <ul>
        {files.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Home;
