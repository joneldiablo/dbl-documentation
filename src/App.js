import React, { useState } from "react";

import { BrowserRouterSchema } from "dbl-components/lib/js/react-router-schema/react-router-schema";
import info from "dbl-components/tmp/components-info.json";

import appCtrl from "./controllers/app-controller";



function App() {

  const [, fullUpdate] = useState(null);
  appCtrl.setUpdate(fullUpdate);

  console.log(info);

  const props = {
    routes: appCtrl.rootSchema,
    test: false
  }
  return (
    <BrowserRouterSchema {...props} />
  );
}

export default App;
