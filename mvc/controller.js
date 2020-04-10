export default class TimerController{
    constructor(TimerModel,TimerView){
        this.TimerModel=TimerModel;
        this.TimerView=TimerView;
        this.target=document.querySelector("#timer");
        this.autoUpdate= null;
        this.updateAll();
        this.reportWorker=new Worker("./mvc/report.js");
        this.reportWorker.onmessage=function(e){
            document.querySelector("#report-field").innerHTML=e.data;
        };
        }

    start(){
        if (!this.TimerModel.checkRunning()){
            this.autoUpdate=setInterval(()=>this.updateTimer(),1000);
            this.TimerModel.run();
        }
        else{
            clearInterval(this.autoUpdate);
            this.TimerModel.stop();
        }
        this.updateAll();
    }

    stop(){
        if (this.TimerModel.checkRunning()||this.TimerModel.getTime()>0)
        if (confirm("Завершити задачу та перезавантажти таймер?")){
            clearInterval(this.autoUpdate);
            this.TimerModel.reset();
            this.updateAll();
        }
    }

    updateAll(){
        this.target.innerHTML=this.TimerView.render();
        this.timerTarget=document.querySelector("#timer-field");
        this.timerTarget.innerHTML=this.TimerView.renderTimer();
        document.querySelector('#start').addEventListener('click', ()=>this.start());
        document.querySelector('#stop').addEventListener('click', ()=>this.stop());
        document.querySelector('#report').addEventListener('click', ()=>this.createReport());
        document.querySelector('#name').addEventListener('blur', ()=>this.rename());
    }

    updateTimer(){
        this.TimerModel.update();
        this.timerTarget.innerHTML=this.TimerView.renderTimer();
    }

    createReport(){
        this.reportWorker.postMessage([this.TimerModel.getLog(),new Date()]);
    }

    rename(){
        this.TimerModel.setName(document.querySelector('#name').value);
    }

}