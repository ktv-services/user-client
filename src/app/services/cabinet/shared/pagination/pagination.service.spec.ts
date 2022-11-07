import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PaginationService,
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PaginationService);
  });

  it('should get current page', () => {
    const currentPage = 2;
    service.currentPage = currentPage;
    expect(service.currentPage).toBe(currentPage);
  });

  it('should get page size', () => {
    const pageSize = 20;
    service.pageSize = pageSize;
    expect(service.pageSize).toBe(pageSize);
  });

  it('should get page data source', () => {
    const dataSource = 'data source';
    service.dataSource = dataSource;
    expect(service.dataSource).toBe(dataSource);
  });

});
