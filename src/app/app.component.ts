import { Component } from '@angular/core';
import { User } from './interfaces/user';
import { GraphService } from './services/graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apollo-graph-web';
  activeCreate: boolean = false;
  activeConsult: boolean = false;
  result: any = null;

  constructor(
    private _graphService: GraphService
  ) { }

  viewConsultForm(): void {
    this.activeCreate = false;
    this.activeConsult = !this.activeConsult;
  }

  saveData(email: string, password: string): void {
    const user: User = {
      email,
      password
    }

    this._graphService.create(user).subscribe((res: User) => {
      const { id, email } = res;
      this.result = `id: ${id} | email: ${email}`;
    });
  }

  consultData(id: number): void {
    this._graphService.find(Number(id)).subscribe(res => {
      this.result = res ? `email: ${res.email}` : 'not found';
    });
  }
}
