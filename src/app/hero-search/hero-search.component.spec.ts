import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let searchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{ path: '', component: HeroSearchComponent }]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [HeroSearchComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;

    searchSpy = spyOn(TestBed.get(HeroService), 'searchHeroes').and.returnValue(getMockHeroes());

    fixture.detectChanges();
  });

  it('should search and return heroes', fakeAsync(()  => {
    component.search('bob');
    tick(500);
    fixture.detectChanges();

    expect(searchSpy).toHaveBeenCalledWith('bob');
    const heroes = fixture.debugElement.queryAll(By.css('a'));
    expect(heroes.length).toBe(5);
  }));

  function getMockHeroes(): Observable<Hero[]> {
    return of([
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
      { id: 3, name: 'Hero 3' },
      { id: 4, name: 'Hero 4' },
      { id: 5, name: 'Hero 5' }
    ]);
  }
});
