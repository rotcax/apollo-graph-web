import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subscriber, Observer } from 'rxjs';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private apollo: Apollo
  ) { }

  public create(data: User): Observable<User> {
    return Observable.create((sub: Subscriber<User>) => {
      this.apollo.mutate({
        mutation: gql`
          mutation Register($data: UserInput!) {
            createUser(data: $data) {
              id,
              email
            }
          }
        `,
        variables: { data }
      })
      .subscribe((value: ApolloQueryResult<any>) => {
        const created: User = value.data.createUser
        sub.next(created)
        sub.complete()
      })
    })
  }

  public find(id: number): Observable<User | null> {
    return Observable.create((sub: Subscriber<User | null>) => {
      this.apollo.query({
        query: gql`
          query Find($id: Float!) {
            user(id: $id) {
              email
            }
          }
        `,
        variables: { id }
      })
      .subscribe((value: ApolloQueryResult<any>) => {
        const found: User | null = value.data.user      
        sub.next(found)
        sub.complete()
      })
    })
  }
}
