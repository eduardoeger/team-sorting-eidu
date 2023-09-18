import {
  Component,
  ContentChildren,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TeamPlayerComponent } from './team-player-component/team-player.component';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  players = [
    'José',
    'Pucci',
    'Tiago',
    'Valdecir',
    'Eidu',
    'Leo',
    'Eldrio',
    'Gabriel DiCaprio',
    'Rod',
    'Renan Gostoso',
    'Jorge',
  ];

  team1: string[] = [];
  team2: string[] = [];

  @ViewChildren(TeamPlayerComponent)
  teamPlayers!: QueryList<TeamPlayerComponent>;

  constructor() {
    this.reload(this.players);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getReserva(team: number) {
    if (team == 1) return this.team1[this.team1.length - 1];
    return this.team2[this.team2.length - 1];
  }

  getField(team: number) {
    if (team == 1) return this.team1.slice(0, this.team1.length - 1);
    return this.team2.slice(0, this.team2.length - 1);
  }

  getTotalRating(team: number): number | undefined {
    if (!this.teamPlayers) return;

    let ratings = this.teamPlayers
      .filter((player) => player.team == team)
      .map((player) => player.rating);

    return ratings.reduce((total, currentNumber) => total + currentNumber, 0);
  }

  randomSort(arr: string[]): string[] {
    const set = new Set<string>(arr);
    const uniqueArr = Array.from(set);
    for (let i = uniqueArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueArr[i], uniqueArr[j]] = [uniqueArr[j], uniqueArr[i]];
    }
    return uniqueArr;
  }

  reload(source: string[]) {
    this.team1 = source.slice(0, this.players.length / 2);
    this.team2 = source.slice(this.players.length / 2, this.players.length);
  }

  sort() {
    let sorted = this.randomSort(this.players);
    this.reload(sorted);
  }
}
