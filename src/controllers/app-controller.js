import "moment/locale/es";
import "moment/locale/fr";
import "moment/locale/pt";

import AppController from "dbl-components/lib/js/app-controller";

import rootSchema from "../schemas/root-schema.json";
import componentFormDefinition from "../schemas/definitions/component-form.json";

const props = {
  schema: rootSchema,
  routes: [],
  definitions: [
    componentFormDefinition
  ],
  controllers: {},
  lang: "es",
  dictionary: {}
}

const appCtrl = new AppController(props);

export default appCtrl;