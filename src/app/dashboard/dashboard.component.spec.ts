import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{ path: '', component: DashboardComponent }]),
        HttpClientTestingModule
      ],
      declarations: [ DashboardComponent, HeroSearchComponent ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    heroService = TestBed.get(HeroService);
  });

  it('should display four heroes', () => {
    spyOn(heroService, 'getHeroes').and.returnValue(getMockHeroes());
    fixture.detectChanges();

    const heroes = fixture.debugElement.queryAll(By.css('div.hero'));
    expect(heroes.length).toBe(4);
  });

  function getMockHeroes(): Observable<Hero[]> {
    return of([
      {id: 1, name: 'Hero 1'},
      {id: 2, name: 'Hero 2'},
      {id: 3, name: 'Hero 3'},
      {id: 4, name: 'Hero 4'},
      {id: 5, name: 'Hero 5'}
    ]);
  }
});
