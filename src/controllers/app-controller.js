import "moment/locale/es";
import "moment/locale/fr";
import "moment/locale/pt";

import AppController from "dbl-components/lib/js/app-controller";

import RootController from "./root-controller";

import rootSchema from "../schemas/root-schema.json";
import componentDescriptionDef from "../schemas/definitions/component-description.json";

import info from "dbl-components/tmp/components-info.json";

const props = {
  schema: rootSchema,
  routes: [],
  definitions: [
    componentDescriptionDef
  ],
  controllers: {
    RootController
  },
  lang: "es",
  dictionary: {}
}

const appCtrl = new AppController(props);
appCtrl.set('info', info);

export default appCtrl;