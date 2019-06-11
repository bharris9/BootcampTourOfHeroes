import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { By } from '@angular/platform-browser';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;
  let addSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([{ path: '', component: HeroesComponent }]), HttpClientTestingModule],
      declarations: [HeroesComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: ActivatedRoute,
          useValue: { params: of([{ id: 17 }]) }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHeroes').and.returnValue(getMockHeroes());
    addSpy = spyOn(heroService, 'addHero').and.returnValue(of({ id: 1, name: 'test' }));
    deleteSpy = spyOn(heroService, 'deleteHero').and.returnValue(of(new Hero));

    fixture.detectChanges();
  });

  it('should display hero list', () => {
    const heroes = fixture.debugElement.queryAll(By.css('li a'));
    expect(heroes.length).toBe(5);
  });

  it('should add hero when name is populated', () => {
    component.add('test');
    fixture.detectChanges();

    const heroes = fixture.debugElement.queryAll(By.css('li a'));
    expect(heroes.length).toBe(6);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });

  it('should NOT add hero when name is NOT populated', () => {
    component.add('');
    fixture.detectChanges();

    const heroes = fixture.debugElement.queryAll(By.css('li a'));
    expect(heroes.length).toBe(5);
    expect(addSpy).toHaveBeenCalledTimes(0);
  });

  it('should delete hero', () => {
    component.delete(component.heroes[0]);
    fixture.detectChanges();

    const heroes = fixture.debugElement.queryAll(By.css('li a'));
    expect(heroes.length).toBe(4);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

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
