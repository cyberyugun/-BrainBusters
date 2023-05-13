import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { PopupComponent } from '../popup/popup.component';
import { SurveyData } from 'src/app/helper/domain/survey.model';


@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})

export class TableComponent implements OnInit,OnChanges {
  faPenToSquare = faPenToSquare;
  faGlass = faMagnifyingGlass;
  @Input() headerType: any;
  @Input() displayedcolumns: any;
  @Input() headerTitle: any;
  @Input() width: any;
  @Input() idTable: any;
  @Input() count: number = 0;
  @Output() LinkAction: EventEmitter<SurveyData> = new EventEmitter<SurveyData>();
  @Output() actionDelete: EventEmitter<SurveyData> = new EventEmitter<SurveyData>();
  @Output() actionEdit: EventEmitter<SurveyData> = new EventEmitter<SurveyData>();
  @Output() actionPreview: EventEmitter<SurveyData> = new EventEmitter<SurveyData>();
  pageNum: number = 1;
  @Input() page: number = 1;
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  styleElement!: HTMLStyleElement;
  typeSorting:string = '';
  @Input() hidesort: Array<boolean> = [];
  @ViewChild('paginator') paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @Input()
  get datasource(): Array<any> {
    return this.data;
  }
  set datasource(value: Array<any>) {
    this.data = value;
    this.dataSource = new MatTableDataSource<Element>(this.data);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1);
  }

  @Output() goToTop = new EventEmitter<any>();

  sort: string = "";
  indexheader: number = 0;
  data: any;
  databackup: any;
  displayedColumns: any;
  dataSource: any;
  hover: boolean = false;
  index = 0;

  constructor(private dialog: MatDialog) {}
  selection = new SelectionModel<any>(true, []);
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['page']) {
        this.pageNum = changes['page'].currentValue;
        this.sortingPage(this.typeSorting);
      }
      if (changes['datasource']) {
        if (changes['datasource'].previousValue) {
          this.sortingPage(this.typeSorting);
        }
        if (changes['datasource'].currentValue) {
          const dataSource = changes['datasource'].currentValue;
          this.dataSource = new MatTableDataSource<Element>(dataSource);
        }
        this.databackup = JSON.parse(JSON.stringify(this.data));
      }
    }
  }

  ngOnInit() {
    this.displayedColumns = this.displayedcolumns;
  }

  sorting(type: string) {
    this.indexheader = this.displayedColumns.indexOf(type);
    if (this.typeSorting !== type) {
      this.sort = "";
    }
    if (this.sort === "") {
      this.sortByProperty(this.data, type);
      this.sort = "asc";
      this.dataSource = new MatTableDataSource<Element>(this.data);
    } else if (this.sort === "asc") {
      this.sortByProperty(this.data, type, "DESC");
      this.sort = "desc";
      this.dataSource = new MatTableDataSource<Element>(this.data);
    } else if (this.sort === "desc") {
      this.sort = "";
      this.dataSource = new MatTableDataSource<Element>(this.databackup);
    }
    this.typeSorting = type;
    this.dataSource.paginator = this.paginator;
  }

  sortingPage(type: string) {
    this.indexheader = this.displayedColumns?.indexOf(type);
    if (this.sort === "") {
      this.dataSource = new MatTableDataSource<Element>(this.databackup);
    } else if (this.sort === "asc") {
      this.sortByProperty(this.data, type);
      this.dataSource = new MatTableDataSource<Element>(this.data);
    } else if (this.sort === "desc") {
      this.sortByProperty(this.data, type, "DESC");
      this.dataSource = new MatTableDataSource<Element>(this.data);
    }
  }

  sortByProperty(arr: any, property: any, order = "ASC") {
    let prop: string | any[] = [];
    let props: string;
    if (typeof arr[0][property] !== "object") {
      props = property;
    } else {
      props = property + ".value";
    }
    prop = props.split(".");
    const len = prop.length;

    arr.sort(function (a: any, b: any) {
      let i = 0;
      while (i < len) {
        a = a[prop[i]];
        b = b[prop[i]];
        i++;
      }
      let sorting = 0;
      if (order === "DESC") {
        if (a < b) {
          sorting = 1;
        } else {
          if (a > b) {
            sorting = -1;
          } else {
            sorting = 0;
          }
        }
      } else {
        if (a < b) {
          sorting = -1;
        } else {
          if (a > b) {
            sorting = 1;
          } else {
            sorting = 0;
          }
        }
      }
      return sorting;
    });
    return arr;
  }

  linkAction(event: any) {
    this.LinkAction.next(event);
  }

  openPopup(data: SurveyData) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '626px',
      data: {
        title: 'What will you do?'
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'delete') {
        this.actionDelete.next(data);
      } else if (res === 'edit') {
        this.actionEdit.next(data);
      }
    });
  }

  preview(data: SurveyData) {
    this.actionPreview.next(data);
  }
}
