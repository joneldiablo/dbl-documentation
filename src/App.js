import components from "dbl-components/src/js/components";
import info from "dbl-components/tmp/components-info.json";

function App() {
  const docs = Object.entries(components).map(([key, C]) => [key, C]);
  console.log(components);
  console.log("------");
  console.log(info);
  return (
    <>Hola mundo!!!</>
  );
}

export default App;
