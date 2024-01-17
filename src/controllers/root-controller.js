import Controller from "dbl-components/lib/js/controller";
import resolveRefs from "dbl-components/lib/js/functions/resolve-refs";
import components from "dbl-components/lib/js/components";

import appCtrl from "./app-controller";

export default class RootController extends Controller {
  static jsClass = 'RootController';

  constructor(props) {
    super(props);
    this.data = appCtrl.get('info');
    this.defs = appCtrl.getRootDefinitions();
  }

  componentDidMount() {
    this.setState({
      componentsDescription: this.buildInfo()
    }, () => {
      super.componentDidMount();
    });
  }

  searchType(key, type, prop) {
    switch (type) {
      case 'number':
        return 0;
      case 'string':
      case 'node':
        return '==test string==';
      case 'bool':
      case 'boolean':
        return false;
      case 'elementType':
        return 'div';
      case 'enum':
        return '';
      case 'array':
        return [];
      case 'arrayOf':
      case 'object':
        return {};
      case 'func':
        return (...args) => console.log(key, type, ...args)
      case 'union':
        return this.searchType(key, prop.type.value[0].name, prop);
      case 'any':
      case 'shape':
      case undefined:
      default:
        console.log(key, prop.type.name, prop);
        return;
    }
  }

  buildInfo() {
    const list = new Set();
    const build = this.data.filter(c => !['NavLink', 'Table', 'TableContainer', 'CardContainer', 'GridSwitchContainer', 'TabsContainer'].includes(c.jsClass))
      .map(c => resolveRefs(this.defs.componentDescription, {
        data: {
          "_nameComponent": [
            c.jsClass,
            "component"
          ],
          "_nameComponentContainer": [
            c.jsClass,
            "componentContainer"
          ],
          "_nameComponentDescription": [
            c.jsClass,
            "componentDescription"
          ],
          "_nameGridDescription": [
            c.jsClass,
            "gridDescription"
          ],
          "_namePropsFieldsContainer": [
            c.jsClass,
            "propsFieldsContainer"
          ],
          "component": c.jsClass,
          "propFieldNames": Object.keys(c.props),
          "propFields": Object.entries(c.props).reduce((acum, [key, prop]) => {
            if (!components[c.jsClass]) return acum;
            acum[key] = {
              name: key,
              component: 'Field',
              label: key,
              default: components[c.jsClass].defaultProps[key]
            }
            return acum;
          }, {}),
          "properties": Object.entries(c.props).reduce((acum, [key, prop]) => {
            let value;
            list.add(key);
            if (c.jsClass === 'NavLink') console.log(key, prop);
            if (!components[c.jsClass]) return acum;
            if (components[c.jsClass].defaultProps[key] !== undefined) return acum;
            if (!prop.required) return acum;
            else if (key === 'name') value = 'TEST';
            else if (key === '_props') value = {};
            else if (key === 'children') value = [];
            else if (c.jsClass === 'NavLink' && key === 'to') value = '/';
            else {
              console.log(c.jsClass);
              value = this.searchType(key, prop.type.name, prop);
              console.log('==========');
            }

            acum[key] = value;
            return acum;
          }, {})
        }
      }));
    console.log(Array.from(list));
    return build;
  }

  mutations(name, props) {

    switch (name) {
      case 'componentsContainer': {
        return {
          content: this.state.componentsDescription
        }
      }

      default:
        break;
    }
  }

}