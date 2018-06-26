import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let loc: Location;
  let heroService: HeroService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: '', component: HeroDetailComponent }])
      ],
      declarations: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of([{ id: 17 }]) }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    loc = TestBed.get(Location);
    heroService = TestBed.get(HeroService);

    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(heroService, 'getHero').and.returnValue(getMockHero());
    expect(component).toBeTruthy();
  });

  function getMockHero(): Observable<Hero> {
    return of(<Hero>{
      id: 17,
      name: 'Test Hero'
    });
  }
});
