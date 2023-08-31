import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentComponent } from './payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from 'src/app/services/data.service';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaymentComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [DataService],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the Payment Component', () => {
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

  it('should call addPaymentsCount method', () => {
    spyOn(component, 'addPaymentsCount').and.callThrough();
    component.addPaymentsCount();
    expect(component.addPaymentsCount).toHaveBeenCalled();
  });
});
