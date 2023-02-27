import { MenuItem, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { Component, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HelperService } from './shared/services/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from './shared/models/task-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public display = false;
  public addMemberMode = false;
  public dismissibleMask = true;
  public form: FormGroup;
  public members: UserInterface[];
  public isSubmitted = false;
  items: MenuItem[] = [];
  backgroundColor$ = new BehaviorSubject('purple');

  constructor(
    private primengConfig: PrimeNGConfig,
    private helperService: HelperService,
    private fb: FormBuilder
  ) {
    this.generateForm();
  }

  ngOnInit() {
    this.getBackgroundColor();
    this.helperService
      .getMembers()
      .pipe(
        tap(members => {
          this.helperService.members.next(members);
          this.members = members;
        })
      )
      .subscribe();
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Change Background',
        items: [
          {
            styleClass: 'black color',
            title: 'black',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'rose-red color',
            title: '#800020',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'pink color',
            title: '#DE3163',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'pastel-red color',
            title: ' #FAA0A0',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'purple color',
            title: ' #630330',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'wine-red color',
            title: ' #722F37',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'marisa color',
            title: ' #986868',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'green-blue color',
            title: ' #5496a8',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'green color',
            title: ' #5b8e8a',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'yellow color',
            title: ' #e7ce6e',
            command: $event => this.changeBackground($event),
          },
          {
            styleClass: 'orange color',
            title: ' #daa44d',
            command: $event => this.changeBackground($event),
          },
        ],
      },
      {
        label: 'Members',
        icon: PrimeIcons.PLUS,
        command: event => (this.addMemberMode = true),
      },
    ];
  }

  generateForm() {
    this.form = this.fb.group({
      memberName: ['', Validators.required],
      memberSurname: ['', Validators.required],
    });
  }
  onAddMember() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const member = {
        name: this.form.get('memberName').value,
        surname: this.form.get('memberSurname').value,
        id: this.helperService.uniqueID(),
        color: this.helperService.getDarkColor(),
      };
      this.helperService
        .addMember(member)
        .pipe(
          tap(() => {
            this.form.reset();
            this.addMemberMode = false;
            this.helperService.members.next([...this.members, member]);
          })
        )
        .subscribe();
    }
  }
  changeBackground(event) {
    const color = event.item.title;
    this.helperService.setBackgroundColor(color).subscribe();
    this.backgroundColor$.next(color);
  }

  getBackgroundColor() {
    this.helperService
      .getBackgroundColor()
      .pipe(
        tap((colors: { color: string }) =>
          this.backgroundColor$.next(colors.color)
        )
      )
      .subscribe();
  }
}
