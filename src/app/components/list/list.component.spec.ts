import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ListComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create List Component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnChanges method', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();
    expect(component.ngOnChanges).toHaveBeenCalled();
  });

  it('should not filter items when searchText is empty', () => {
    component.listItems = [
      {
        id: '1d94a565-23c3-4e36-acdf-8e4af7b0349c',
        name: 'Cameroon',
        flag: 'http://dummyimage.com/50x50.png/dddddd/000000',
        code: 'CM',
        someWeirdServerFieldNameWithCount: 966,
      },
    ];
    component.searchText = '';
    component.filterItems();
    expect(component.filteredItems).toEqual(component.listItems);
  });

  it('should update displayItems after filtering', () => {
    component.listItems = [
      {
        id: '1d94a565-23c3-4e36-acdf-8e4af7b0349c',
        name: 'Cameroon',
        flag: 'http://dummyimage.com/50x50.png/dddddd/000000',
        code: 'CM',
        someWeirdServerFieldNameWithCount: 966,
      },
      {
        id: '4d1bb10b-c950-468b-9a55-2c495cc0f17d',
        name: 'Norway',
        flag: 'http://dummyimage.com/50x50.png/5fa2dd/ffffff',
        code: 'NO',
        someWeirdServerFieldNameWithCount: null,
      },
    ];
    component.searchText = 'Cameroon';
    component.filterItems();
    expect(component.displayItems).toEqual([
      {
        id: '1d94a565-23c3-4e36-acdf-8e4af7b0349c',
        name: 'Cameroon',
        flag: 'http://dummyimage.com/50x50.png/dddddd/000000',
        code: 'CM',
        someWeirdServerFieldNameWithCount: 966,
      },
    ]);
  });

  it('should call routeToItemDetails', () => {
    const mockSelectionList = {
      selectedOptions: {
        selected: [
          {
            value: {
              id: '1d94a565-23c3-4e36-acdf-8e4af7b0349c',
              name: 'Cameroon',
              flag: 'http://dummyimage.com/50x50.png/dddddd/000000',
              code: 'CM',
              someWeirdServerFieldNameWithCount: 966,
            },
          },
        ],
      },
    };
    spyOn(component, 'routeToItemDetails');
    component.getSelectedValue(mockSelectionList);
    expect(component.routeToItemDetails).toHaveBeenCalled();
  });
});
