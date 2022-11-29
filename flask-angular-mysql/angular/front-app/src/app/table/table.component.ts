import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FlaskApiService } from '../flask-api.service';
import { MatTableModule } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['PROC', 'PID', 'CPU', 'MEM'];
  data: any;
  cpu: any;
  mem: any;
  procs: any;

  constructor(
    private flaskApi: FlaskApiService,
    private MatTableModule: MatTableModule,
    private _liveAnnouncer: LiveAnnouncer,
    private http: HttpClient
  ) {}

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  ngOnInit(): void {
    this.flaskApi.getProcsData().subscribe((data) => {
      this.data = data;
      this.flaskApi.postProcsData(this.data).subscribe((something) => {
        console.log('something');
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}