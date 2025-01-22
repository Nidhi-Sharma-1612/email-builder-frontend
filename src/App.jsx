import { useState } from "react";
import Layout from "./components/Layout/Layout";

const App = () => {
  const [settings, setSettings] = useState({
    title: "",
    content: "",
    footer: "",
    image: null,
  });

  return (
    <>
      <Layout settings={settings} onSettingsChange={setSettings} />
    </>
  );
};

export default App;
