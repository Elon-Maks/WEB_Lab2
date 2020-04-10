
export default class TimerView{
    constructor(TimerModel){
        this.TimerModel=TimerModel;
    };


    render(){
        return(`
        <table class="table-dark col-7 center">
            <tr>
                <td colspan="2" class="text-center">Таймер</td>
            </tr>
            <tr>
                <td colspan="1" class="text-center">Назва</td>
                <td colspan="1" ><input type="text" 
                class="form-control form-control-sm" id="name" value="${this.TimerModel.getName()}"></input></td>
            </tr>
            <tr>
                <td colspan="2" id="timer-field"></td>
            </tr>
            <tr>
                <td colspan="2" class="text-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary" id="start">
                    ${this.TimerModel.checkRunning()?'Пауза':(this.TimerModel.getTime()>0 ?'Продовжити':'Старт')}</button>
                    <button type="button" class="btn btn-secondary" id="stop">Стоп</button>
                </div>
                </td>
                
            </tr>
            <tr>
                <td colspan="2" class="text-center"><button type="button" class="btn btn-light" id="report">Генерувати звіт</button></td>
            </tr>
        </table>
        `);
    }
    renderTimer(){
        return(`
        <p class="text-center"> ${Math.floor(this.TimerModel.getTime()/3600)} г :  ${Math.floor((this.TimerModel.getTime()%3600)/60)} хв :  ${this.TimerModel.getTime()%60} с </p>
        `);
    }
}