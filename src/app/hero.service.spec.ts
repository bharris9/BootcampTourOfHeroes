import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let service: HeroService;
  let messageService: MessageService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    service = TestBed.get(HeroService);
    messageService = TestBed.get(MessageService);
    http = TestBed.get(HttpTestingController);
  });

  it('should handle service error', done => {
    const msgSpy = spyOn(messageService, 'add');
    service.getHeroes().subscribe(res => {
      expect(res.length).toBe(0);
      expect(msgSpy).toHaveBeenCalledWith('HeroService: getHeroes failed: Http failure response for api/heroes: 500 ');
      done();
    });

    const req = http
      .expectOne(`api/heroes`)
      .error(new ErrorEvent('Test Error', { error: 500 }), { status: 500, statusText: '' });
    http.verify();
  });

  it('should get all heroes', done => {
    service.getHeroes().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res[0].id).toBe(1);
      expect(res[0].name).toBe('Hero 1');
      expect(res[1].id).toBe(2);
      expect(res[1].name).toBe('Hero 2');
      done();
    });

    const req = http.expectOne(`api/heroes`);
    req.flush([{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }]);
    http.verify();
  });

  it('should get a hero', done => {
    service.getHero(1).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.name).toBe('Hero 1');
      done();
    });

    const req = http.expectOne(`api/heroes/1`);
    req.flush({ id: 1, name: 'Hero 1' });
    http.verify();
  });

  it('should update a hero', done => {
    const updatedHero = { id: 1, name: 'Updated Hero' };
    service.updateHero(updatedHero).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.name).toBe('Hero 1');
      done();
    });

    const req = http.expectOne(`api/heroes`);
    req.flush({ id: 1, name: 'Hero 1' });
    http.verify();
  });

  it('should add a hero', done => {
    const addedHero = { id: 1, name: 'Added Hero' };
    service.addHero(addedHero).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.name).toBe('Hero 1');
      done();
    });

    const req = http.expectOne(`api/heroes`);
    req.flush({ id: 1, name: 'Hero 1' });
    http.verify();
  });

  it('should delete a hero', done => {
    const deletedHero = { id: 1, name: 'Added Hero' };
    service.deleteHero(deletedHero).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.name).toBe('Hero 1');
      done();
    });

    const req = http.expectOne(`api/heroes/1`);
    req.flush({ id: 1, name: 'Hero 1' });
    http.verify();
  });

  it('should search heroes', done => {
    service.searchHeroes('bob').subscribe(res => {
      expect(res.length).toBe(2);
      expect(res[0].id).toBe(1);
      expect(res[0].name).toBe('Hero 1');
      expect(res[1].id).toBe(2);
      expect(res[1].name).toBe('Hero 2');
      done();
    });

    const req = http.expectOne(`api/heroes/?name=bob`);
    req.flush([{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }]);
    http.verify();
  });

  it('should handle empty search term', done => {
    service.searchHeroes('').subscribe(res => {
      expect(res.length).toBe(0);
      done();
    });

    // const req = http.expectOne(`api/heroes/?name=bob`);
    // req.flush([{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }]);
    http.verify();
  });
});
