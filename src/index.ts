import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import './css/style.css';
import { TokenValidation } from './screens/TokenValidation';

class AdminPortal{
    //Singleton Instance
    private static instance: AdminPortal = new AdminPortal();

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public currentScreen:any;
    constructor(){
        this.init();
    }
    init(){
        this.currentScreen = new TokenValidation();
    }
}
const portal = AdminPortal.Instance;

export { AdminPortal };