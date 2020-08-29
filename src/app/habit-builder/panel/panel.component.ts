import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../store/service/api.service';
import { HabitSchema } from 'src/store/schema/habit-schema';
import { JournalSchema } from 'src/store/schema/journal-schema';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  habitList: HabitSchema[] = [];
  journalList: JournalSchema[] = [];
  user: string = "Tejas";
  addHabitForm: FormGroup;
  formError: string = "";
  generatedId: string = "";

  creatingHabit: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {
    this.creatingHabit = false;
  }

  ngOnInit(): void {
    this.getHabits();
    this.resetForm();

  }

  toggleCreateHabit() {
    this.creatingHabit = !this.creatingHabit;
  }

  getHabits() {
    this.api.getHabit(this.user).subscribe((data: HabitSchema[]) => {
      console.log(data);
      this.habitList = data;

    });
  }

  resetForm() {
    this.addHabitForm = this.formBuilder.group(
      {
        title: "",
        description: "",
        time: 0,
        frequency: 7
      }
    )
  }

  addHabit() {

    this.formError = "";

    // Validating title
    if (this.addHabitForm.value.title == "") {
      this.formError = "Title is required";
      return;
    }

    // Validating Description
    if (this.addHabitForm.value.description == "") {
      this.formError = "Description is required";
      return;
    }

    let title = this.addHabitForm.value.title;
    let description = this.addHabitForm.value.description;
    let time = this.addHabitForm.value.time;
    let frequency = this.addHabitForm.value.frequency;

    this.api.addHabit(this.user, title, description, time, frequency)
      .subscribe((id: string) => {
        this.generatedId = id;

        // Append in HabitList
        if (this.generatedId) {
          let newHabit: HabitSchema = { id: this.generatedId, title: title, description: description }
          this.habitList.push(newHabit);

          // Close Create Habit Form
          this.creatingHabit = false;

          // reset form for next time
          this.resetForm();
        }
      });
  }

}

