import TimerView from './mvc/view.js';
import TimerController from './mvc/controller.js';
import TimerModel from './mvc/model.js';

let tmodel= new TimerModel;
tmodel.generateDataForPreviousDays(35); //додавання випадкових данних за попередні дні для перевірки працездатності
let tview= new TimerView(tmodel);
let tcontroller= new TimerController(tmodel,tview);