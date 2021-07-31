import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
declare class AdminPortal {
    private static instance;
    static get Instance(): AdminPortal;
    currentScreen: any;
    constructor();
    init(): void;
}
export { AdminPortal };
