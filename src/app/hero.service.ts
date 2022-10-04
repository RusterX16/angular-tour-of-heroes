import { HttpClient, HttpHeaders } from "@angular/common/http";
import { identifierName } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Hero } from "./hero";
import { InMemoryDataService } from "./in-memory-data.service";
import { MessageService } from "./message.service";
import { HEROES } from "./mock-heroes";

@Injectable({
  providedIn: "root",
})
export class HeroService {
  private heroesUrl = "api/heroes";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private genId(heroes: Hero[]): number {
    return heroes[heroes.length - 1].id + 1;
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    // return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    //   tap((x) =>
    //     x.length
    //       ? this.log(`found heroes matching "${term}"`)
    //       : this.log(`no heroes matching "${term}"`)
    //   ),
    //   catchError(this.handleError<Hero[]>("searchHeroes", []))
    // );
    let matches: Hero[] = [];

    HEROES.forEach(hero => {
      if (hero.name === term) {
        matches.push(hero);
        this.log(`found heroes matching "${term}"`);
      }
    });
    if (!matches.length) {
      this.log(`no heroes matching "${term}"`);
    }
    return of(matches);
  }

  addHero(hero: Hero): Observable<Hero> {
    // return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    //   tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    //   catchError(this.handleError<Hero>("addHero"))
    // );
    hero.id = this.genId(HEROES);
    return of(hero);
  }

  deleteHero(id: number): Observable<Hero> {
    // const url = `${this.heroesUrl}/${id}`;

    // return this.http.delete<Hero>(url, this.httpOptions).pipe(
    //   tab(_ => this.log(`delete hero id=${id}`)),
    //   catchError(this.handleError<Hero>('deleteHero'))
    // );
    const hero = HEROES.find((h) => h.id === id)!;
    return of(hero);
  }

  updateHero(hero: Hero): Observable<any> {
    // return this.http
    //   .put(this.heroesUrl, hero, this.httpOptions)
    //   .pipe(
    //     tap(
    //       (_) => this.log(`updated hero id=${hero.id}`),
    //       catchError(this.handleError<any>(`updateHero`))
    //     )
    //   );
    return of(hero);
  }

  getHeroes(): Observable<Hero[]> {
    // return this.http.get<Hero[]>(this.heroesUrl).pipe(
    //   tap((_) => this.log("fetched heroes")),
    //   catchError(this.handleError<Hero[]>("getHeroes", []))
    // );
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // const url = `${this.heroesUrl}/${id}`;
    // return this.http.get<Hero>(url).pipe(
    //   tap((_) => this.log(`fetched hero id=${id}`)),
    //   catchError(this.handleError<Hero>(`getHero id=${id}`))
    // );
    return of(HEROES.find((h) => h.id === id)!);
  }
}
function tab(
  arg0: (_: any) => void
): import("rxjs").OperatorFunction<Hero, Hero> {
  throw new Error("Function not implemented.");
}
