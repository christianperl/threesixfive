import {
  Component,
  OnInit,
} from '@angular/core';
import {PlanService} from '../../services/plan/plan.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import moment from 'moment';
import {MessageService} from 'primeng/api';
import {LumenService} from '../../services/lumen/lumen.service';


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
  ],
  providers: [MessageService]
})

export class PlanComponent implements OnInit {
  en: any;
  weekMeals;
  firstTime;
  clickedDate;
  key = this.service.actualView;
  actualDate = new Date();
  dateValue;
  weekNum = Number.parseInt(moment().format('w'));
  week;
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

  constructor(private service: PlanService, private messageService: MessageService, private lumen: LumenService) {
  }

  showToast() {
    this.messageService.add({
      key: 'myKey1',
      severity: 'info',
      summary: 'Up here is your Navigation',
      detail: 'Check out your Profile or Groceries!',
      sticky: true
    });
    this.messageService.add({
      key: 'myKey2',
      severity: 'info',
      summary: 'Weekplan',
      detail: 'Here you see your plan! Click on a Day for a more detailed view.',
      sticky: true
    });
    this.messageService.add({
      key: 'myKey3',
      severity: 'info',
      summary: 'Details',
      detail: 'Click on a day for more details',
      sticky: true
    });
    this.messageService.add({
      key: 'myKey4',
      severity: 'info',
      summary: 'Details',
      detail: 'Click on a day for more details',
      sticky: true
    });
  }

  ngOnInit() {
    if (this.firstTime) {
      this.showToast();
    }
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ],
      dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/mm/yy'
    };
    if (JSON.parse(localStorage.getItem('currentUser')).hasOwnProperty('init-reg')) {
      this.firstTime = true;
    } else {
      this.firstTime = false;
    }
    const b = moment().format('dddd');
    const a = this.days[b];
    const woche = [];
    for (let i = 0; i < 7; i++) {
      woche.push(moment().add(i - a, 'days').format('YYYY-MM-DD'));
    }
    this.week = woche;
    this.weekMeals = null;
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
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
    const monday = moment().subtract(a, 'days').format('MMM Do YY');
    const woche = [];
    for (let i = 0; i < 7; i++) {
      woche.push(moment().add(i - a, 'days'));
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
    this.weekMeals = null;
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
      }
    );
  }

  lastWeek() {
    this.weekNum--;
    this.weekMeals = null;
    this.lumen.fetchWeek(2019, this.weekNum).subscribe(
      week => {
        this.weekMeals = week;
      },
      error => {
        this.weekMeals = false;
      }
    );
  }
}
