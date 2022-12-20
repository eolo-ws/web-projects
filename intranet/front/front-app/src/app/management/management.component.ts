import { OnInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetService } from '../get.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  form!: FormGroup;
  displayedColumns: string[] = ['id', 'username', 'level'];
  data: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private MatTableModule: MatTableModule,
    private _liveAnnouncer: LiveAnnouncer,
    private getService: GetService
  ) { }
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      level: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.getService.getUserData().subscribe((data) => {
      console.log(data);
      this.data = data
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  onCreate() {
    console.log('a');

  }
  onDelete() {
    console.log('a');

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  hide = true;
  create = true;
}
