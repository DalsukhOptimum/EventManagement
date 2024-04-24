import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe'
})
export class MyPipePipe implements PipeTransform {


  transform(value: string): string {
    let d = new Date().getTime();
    console.log("val", value);
    value = value.split('-').reverse().join('-') + "T00:00:00";
    let EventDate = new Date(value);
    console.log("at", EventDate);
    let msEvent = EventDate.getTime();
    let diff = Math.floor(msEvent - d);
    if (diff <= 0) {
      return "ongoing";
    }

    let second = Math.floor(diff / 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60);
    let day = Math.floor(hour / 24);

    let finalHour = hour - day * 24;
    let finalMinute = minute - hour * 60;
    let finalSecond = second - minute * 60;

    let ans = "";
    if (day == 0) {
      ans = finalHour + "H " + finalMinute + "M "+finalSecond +"S";
    }

    else if (day == 0 && hour == 0) {
      ans = day + "D " + finalHour + "H " + finalMinute + "M " +finalSecond +"S";
    }
    else if (day == 0 && hour == 0 && minute == 0) {
      ans = finalSecond + "S";
    }

    else {
      ans = day + "D " + finalHour + "H " + finalMinute + "M "+finalSecond +"S";
    }


    return ans;
  }

}
