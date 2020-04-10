class Timer {
    constructor(name){
        this.name =name;
        this.time = 0;
        this.running=false;
        this.date=new Date();
    }
    
}

export default class TimerModel{
    constructor(){
        this.timer = new Timer("default");
        this.log=[];
    }

    getName(){
        return this.timer.name;
    }

    getTime(){
        return this.timer.time;
    }

    update(){
        this.timer.time++;
    }
    checkRunning(){
        return this.timer.running;
    }
    run(){
        this.timer.running=true;
    }
    stop(){
        this.timer.running=false;
    }
    reset(){
        this.log.push(this.timer);
        this.timer=new Timer(this.timer.name);
    }
    getLog(){
        return this.log;
    }
    setName(name){
        this.timer.name=name;
    }
    generateDataForPreviousDays(day_count){
        let now=new Date();
        for (let i=0;i<=day_count;i++){
            let t1=new Timer("Задача 1");
            t1.date=new Date(now.getFullYear(),now.getMonth(),now.getDate()-day_count+i);
            t1.time=Math.floor(Math.random()*10000)+1000;
            let t2=new Timer("Задача 2");
            t2.date=new Date(now.getFullYear(),now.getMonth(),now.getDate()-day_count+i);
            t2.time=Math.floor(Math.random()*10000)+1000;
            this.log.push(t1);
            this.log.push(t2);
            }
    }
} 