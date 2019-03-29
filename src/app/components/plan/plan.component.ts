import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,} from '@angular/core';
import {PlanService} from '../../services/plan/plan.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import moment from 'moment';
import {LumenService} from '../../services/lumen/lumen.service';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
import {ChangeDetectorStatus} from '@angular/core/src/change_detection/constants';


@Component({
  selector: 'app-plan',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  animations: [
    trigger('enterTrigger', [
      state('fadeIn', style({
        opacity: '1',
        // transform: 'translateY(50%)'
      })),
      transition('void => *', [style({opacity: '0'}), animate('1000ms')])
    ])
  ]
})

export class PlanComponent implements OnInit {
  en: any;
  clickedDate;
  key = this.service.actualView;
  actualDate = new Date();
  dateValue;
  week;
  weekMeals;
  weekNum = Number.parseInt(moment().format('w'));
  days =
    {
      'Monday': 0,
      'Tuesday': 1,
      'Wednesday': 2,
      'Thursday': 3,
      'Friday': 4,
      'Saturday': 5,
      'Sunday': 6
    };
  iterator = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  constructor(private service: PlanService, private lumen: LumenService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ],
      dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December' ],
      monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/mm/yy'
    };
    const b = moment().format('dddd');
    const a = this.days[b];
    const monday = moment().subtract(a, 'days').format('YYYY-MM-DD');
    const woche = [];
    for (let i = 0; i < 7; i++) {
      woche.push(moment().add(i - a, 'days').format('YYYY-MM-DD'));
    }
    this.week = woche;
    this.weekMeals = [];
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
        this.ref.detectChanges();
      }
    );
  }

  calenderIsClicked() {
    this.service.dayIsClicked(this.dateValue);
    this.clickedDate = this.service.clickedDate;
    this.service.viewDay();
    this.key = this.service.actualView;
  }
  viewMonth() {
    this.service.viewMonth();
    this.key = this.service.actualView;
  }
  viewWeek() {
    this.service.viewWeek();
    this.key = this.service.actualView;
    this.getWeek();
  }

  getWeek() {
    const b = moment().format('dddd');
    const a = this.days[b];
    const woche = [];
    for (let i = 0; i < 7; i++) {
      woche.push(moment().add(i - a, 'days').format('YYYY-MM-DD'));
    }
    this.week = woche;
  }

  showDate(date) {
    this.service.dayIsClicked(date);
    this.clickedDate = this.service.clickedDate;
    this.service.viewDay();
    this.key = this.service.actualView;
  }

  nextWeek() {
    this.weekNum++;
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
      }
    );
  }

  lastWeek() {
    this.weekNum--;
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
      }
    );
  }
}
