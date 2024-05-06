import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe'
})
export class MyPipePipe implements PipeTransform {


  //transformining time to milisecond and then converting it to the second,minute,hour and days

  transform(value: string): string {
    let d = new Date().getTime();
    value = value.split('-').reverse().join('-') + "T00:00:00";
    let EventDate = new Date(value);
    let msEvent = EventDate.getTime();
    let diff = Math.floor(msEvent - d);
    //if difference is in zero or min us means event is right now ongoing
    if (diff <= 0) {
      return "ongoing";
    }

    let second = Math.floor(diff / 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60);
    let day = Math.floor(hour / 24);
    let Month = Math.floor(day/30);

    let Finalday = day - Month*30 ;
    let finalHour = hour - day * 24;
    let finalMinute = minute - hour * 60;
    let finalSecond = second - minute * 60;
    

    //checking some conditions that minute,second or  hour is zero or not and if it is zero so don't showing them
    let ans = "";
    if (day == 0) {
      ans = finalHour + "Hrs " + finalMinute + "Minutes "+finalSecond +"Seconds";
    }

    else if (day == 0 && hour == 0) {
      ans = Finalday + "Days " + finalHour + "Hrs " + finalMinute + "Minuts " +finalSecond +"Second";
    }
    else if (day == 0 && hour == 0 && minute == 0) {
      ans = finalSecond + "Seconds";
    }
   
    
    else {
      ans = Finalday + " Days " + finalHour + " Hrs " + finalMinute + " Minuts "+finalSecond +" Seconds";
    }

    if(Month != 0)
      {
        ans = Month+ " Months "+ Finalday + " Days " + finalHour + " Hrs " + finalMinute + " Minuts "+finalSecond +" Seconds";
      }


    return ans;
  }

}
