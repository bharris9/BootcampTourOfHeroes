import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { click } from '../testing/testing-click-helper';
import { HeroDetailComponent } from './hero-detail.component';

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

    spyOn(heroService, 'getHero').and.returnValue(getMockHero());

    fixture.detectChanges();
  });

  it('should display hero details', () => {
    fixture.whenStable().then(() => {
      const heroTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(heroTitle.textContent).toContain('TEST HERO Details');

      const heroId = fixture.debugElement.query(By.css('#heroId')).nativeElement;
      expect(heroId.textContent).toContain('id: 17');

      const heroName = fixture.debugElement.query(By.css('#heroName')).nativeElement;
      expect(heroName.value).toBe('Test Hero');
    });
  });

  it('should go back', () => {
    const locBack = spyOn(loc, 'back');
    const goBackButton = fixture.debugElement.query(By.css('#goBack')).nativeElement;
    click(goBackButton);
    fixture.detectChanges();

    expect(locBack).toHaveBeenCalled();
  });

  it('should save updated hero' , () => {
    const locBack = spyOn(loc, 'back');
    const saveSpy = spyOn(heroService, 'updateHero').and.returnValue(getMockHero());
    const saveButton = fixture.debugElement.query(By.css('#save')).nativeElement;
    click(saveButton);
    fixture.detectChanges();

    expect(saveSpy).toHaveBeenCalled();
    expect(locBack).toHaveBeenCalled();
  });

  function getMockHero(): Observable<Hero> {
    return of(<Hero>{
      id: 17,
      name: 'Test Hero'
    });
  }
});
