import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CountryComponent } from './country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data.service';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountryComponent,HttpClientTestingModule, BrowserAnimationsModule],
      providers: [DataService],
    });
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the Country component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit method', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call ngOnInit method to fetch api data', () => {
    spyOn(dataService, 'fetchData').and.callThrough();
    component.ngOnInit();
    expect(dataService.fetchData).toHaveBeenCalled();
  });

});
