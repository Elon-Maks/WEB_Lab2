

function Day(log,day){
    let result='';
    let sum=0;
    log.map((timer)=>{
        if (timer.date.getDate()===day.getDate()&&timer.date.getMonth()===day.getMonth()&&timer.date.getFullYear()===day.getFullYear()){
            sum+=timer.time;
            result+=`<tr>
            <td>${timer.name}</td>
            <td> ${Math.floor(timer.time/3600)} г :  ${Math.floor((timer.time%3600)/60)} хв :  ${timer.time%60} с </td>
            </tr>`;}
    });
    return [result,sum];
}

function Week(log,day){
    let result='';
    let sum=[];
    let total=0;
    log.map((timer)=>{
        if (timer.date.getMonth()===day.getMonth()&&timer.date.getFullYear()===day.getFullYear()&&(day.getDate()-timer.date.getDate()<7)){
            for (i=0;i<sum.length;i++)
            {
                if (sum[i].date===timer.date.getDate())
                {
                    sum[i].time+=timer.time;
                    total+=timer.time;
                    return;
                }
            }
            sum.push({date:timer.date.getDate(),time:timer.time});
            total+=timer.time;
            }
    });
    sum.map((oneday)=>{
        result+=`<tr>
        <td>${oneday.date}.${day.getMonth()+1}.${day.getFullYear()}</td>
        <td> ${Math.floor(oneday.time/3600)} г :  ${Math.floor((oneday.time%3600)/60)} хв :  ${oneday.time%60} с </td>
        </tr>`;
    });
    return [result,total];
}

function Month(log,day){
    let result='';
    let sum=[];
    let total=0;
    log.map((timer)=>{
        if (timer.date.getMonth()===day.getMonth()&&timer.date.getFullYear()===day.getFullYear()){
            for (i=0;i<sum.length;i++)
            {
                if (sum[i].date===timer.date.getDate())
                {
                    sum[i].time+=timer.time;
                    total+=timer.time;
                    return;
                }
            }
            sum.push({date:timer.date.getDate(),time:timer.time});
            total+=timer.time;
            }
    });
    sum.map((oneday)=>{
        result+=`<tr>
        <td>${oneday.date}.${day.getMonth()+1}.${day.getFullYear()}</td>
        <td> ${Math.floor(oneday.time/3600)} г :  ${Math.floor((oneday.time%3600)/60)} хв :  ${oneday.time%60} с </td>
        </tr>`;
    });
    return [result,total];
}

onmessage=function(e){
    let day=Day(e.data[0],e.data[1]);
    let week=Week(e.data[0],e.data[1]);
    let mounth=Month(e.data[0],e.data[1]);
    this.postMessage(`
        <div class="row">
        <table class="col-7 table-striped table-bordered">
        <tr><td colspan="2">За цей день</td></tr>
        <tr><td>Назва</td><td>Час</td></tr>
            ${day[0]}
        <tr><td>Всього</td><td> ${Math.floor(day[1]/3600)} г :  ${Math.floor((day[1]%3600)/60)} хв :  ${day[1]%60} с </td></tr>
        </table>
        </div>
        <br>
        <div class="row">
        <table class="col-7 table-striped table-bordered">
        <tr><td colspan="2">За попередній тиждень</td></tr>
        <tr><td>Дата</td><td>Час</td></tr>
            ${week[0]}
        <tr><td>Всього</td><td> ${Math.floor(week[1]/3600)} г :  ${Math.floor((week[1]%3600)/60)} хв :  ${week[1]%60} с </td></tr>
        </table>
        </div>
        <br>
        <div class="row">
        <table class="col-7 table-striped table-bordered">
        <tr><td colspan="2">За цей місяць</td></tr>
        <tr><td>Дата</td><td>Час</td></tr>
            ${mounth[0]}
        <tr><td>Всього</td><td> ${Math.floor(mounth[1]/3600)} г :  ${Math.floor((mounth[1]%3600)/60)} хв :  ${mounth[1]%60} с </td></tr>
        </table>
        </div>
   `);
}