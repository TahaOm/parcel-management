import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  event?: Event;
  plotList: any = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  filterData: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _postService: PostService
  ) {}

  ngOnInit() {
    this._postService.getAll().subscribe(
      (data) => {
        this.plotList = data.features;
        console.log(this.plotList);
      },
      (error) => console.log(error)
    );
  }

  onChange(event: Event) {
    this.event = event;
    this.ngOnInit();
  }

  loadPolygon(id: number) {
    let filter = this.plotList.filter((item: { id: number }) => item.id === id);
    this.filterData = filter;
  }
}
