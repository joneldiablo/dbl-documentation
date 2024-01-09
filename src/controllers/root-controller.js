import Controller from "dbl-components/lib/js/controller";

export default class RootController extends Controller {
  static jsClass = 'RootController';

  constructor(props) {
    super(props);
    console.log('Hola mundo soy el root conbtroller!!!!');
  }

}