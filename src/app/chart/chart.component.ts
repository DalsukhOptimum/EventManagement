import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { APICallService } from '../api-call.service';
import { ChartModel } from '../Models/ChartModel';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  EventData:any;
  Flag = false;
  ans: ChartModel[] = [];

  ngOnInit(): void {
    console.log("i am here");
  this.ok();


  }
  constructor(private service: APICallService) { }
  Message!: string;
  color!:string ;
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  getRandomColor() {
   let letters = '0123456789ABCDEF';
    this.color = '#';
    for (var i = 0; i < 6; i++) {
      // this.color += Math.floor(Math.random() * 10);
      this.color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color ;
  }

  ok() {
    let obj = {
      Flag: "Monthwise"
    }
    this.service.showEventOrActivity(obj).subscribe(
      {
        next: (data: any) => {
          if (data.ID == 1) {
            console.log("this is ok")
            this.EventData = data.ArrayOfResponse;
            console.log(this.EventData);
            this.EventData = this.EventData.map((el: any) => {
              return {
                Month: el.Month,
                HeightOfChart: (el.count) * 60 + "px",
                Eventcnt:el.count

              }

            })
            for (let i = 0; i < 12; i++) {
              let tempans = "1px";
              let cnt = 0 ;
              const found = this.EventData.find((element: any) => element.Month == i + 1);
              if (found) {
                tempans = found.HeightOfChart
                cnt = found.Eventcnt
              }
              this.ans[i] = {
                Month: i + 1,
                HeightOfChart: tempans,
                Eventcnt:cnt

              }
            }
            this.Flag = true;
          }
          else if (data.ID == 0) {
            console.log("this is not ok")
            this.EventData = [];
            this.Message = data.Message;
          }
          else {
            console.log("this is why")
            this.Message = "something went wrong";
            ;
          }
        },
        Error: (err: Error) => {
          window.alert("ENTER VALID credetails");

        }

      });
  }
}
