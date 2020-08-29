import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GoalSchema } from '../schema/goal-schema';
import { HabitSchema } from '../schema/habit-schema';
import { JournalSchema } from '../schema/journal-schema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl : string = "http://127.0.0.1:8000/";
  constructor
    (
      private http: HttpClient,
      // private baseUrl: Constants["baseUrl"],
  ) {

  };

  addHabit(user: string, title: string, description: string, time: number, frequency: number) {
    return this.http.post<string>(this.baseUrl + "habit", {
      user,
      title,
      description,
      time,
      frequency
    });
  }

  getHabit(user : string) {
    return this.http.get<HabitSchema[]>(this.baseUrl + "habit/" + user);
  }

  addJournal(habitId : string, frequency : number, time : number) {
    return this.http.post<boolean>(this.baseUrl + "journal", {
      habitId,
      frequency,
      time
    });
  }

  getJournal(habitId : string) {
    return this.http.get<JournalSchema[]>(this.baseUrl + "journal/" + habitId);
  }

  addGoal(habitId : string, frequency : number, time : number) {
    return this.http.post<boolean>(this.baseUrl + "goal", {
      habitId,
      frequency,
      time
    });
  }

  getGoal(habitId : string) {
    return this.http.get<GoalSchema>(this.baseUrl + "goal/" + habitId);
  }
}
