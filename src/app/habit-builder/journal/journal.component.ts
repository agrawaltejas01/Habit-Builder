import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/store/service/api.service';
import { JournalSchema } from 'src/store/schema/journal-schema';
import { GoalSchema } from 'src/store/schema/goal-schema';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {

  @Input() habitId: string;

  journal: JournalSchema[] = [];
  weeklyJournal: JournalSchema[] = [];
  goal: GoalSchema = null;

  currentDay: number = (new Date()).getDay();
  currentTime: number = 0;
  currentFrequency: number = 0;
  newTimeGoal: number = 0;
  newFrequencyGoal: number = 1;

  completedTime: number = 0;
  completedFrequency: number = 0;

  timeGoal: boolean = false;
  frequencyGoal: boolean = false;

  entryAdded: boolean = false;
  showForm: boolean = false;


  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getJournal();
    this.getGoal();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  getJournal() {
    this.api.getJournal(this.habitId).subscribe((data) => {
      this.journal = data;

      // Initialize weeklyJournal
      for (let index = 0; index < 7; index++) {
        this.weeklyJournal[index] = null;
      }

      // Update generated entry
      this.journal.forEach((entry) => {

        this.completedFrequency += entry.frequency;
        this.completedTime += entry.time;

        let date = entry.date;
        const day = (new Date(date)).getDay();
        this.weeklyJournal[day] = entry;
      })
    });

  }

  checkProgress() {
    if (this.goal.time <= this.completedTime)
      this.timeGoal = true;

    else
      this.timeGoal = false;

    if (this.goal.frequency <= this.completedFrequency)
      this.frequencyGoal = true;

    else
      this.frequencyGoal = false;
  }

  getGoal() {
    this.api.getGoal(this.habitId).subscribe((data: GoalSchema) => {
      this.goal = data;

      // Check progress
      this.checkProgress();
    })
  }

  addJournal() {
    this.api.addJournal(this.habitId, this.currentFrequency, this.currentTime).subscribe((result) => {
      if (result) {

        // Update Journal entry 
        let journalEntry: JournalSchema = {
          date: new Date(),
          time: this.currentTime,
          frequency: this.currentFrequency
        };

        // Add in weekly Journal
        this.weeklyJournal[this.currentDay] = journalEntry;

        // Update completed 
        this.completedFrequency += this.currentFrequency;
        this.currentTime += this.currentTime;

        // Check progress
        this.checkProgress();

        // Close button
        this.entryAdded = true;
      }
    })
  }

  addGoal() {

    this.api.addGoal(this.habitId, this.newFrequencyGoal, this.newTimeGoal).subscribe((data) => {
      if (data) {

        // Update goal
        this.goal.date = new Date();
        this.goal.frequency = this.newFrequencyGoal;
        this.goal.time = this.newTimeGoal;

        // Modify Progress
        this.checkProgress();

        // Close form and initialize 
        this.showForm = false;
        this.newFrequencyGoal = 0;
        this.newTimeGoal = 0;
      }
    })
  }
}
