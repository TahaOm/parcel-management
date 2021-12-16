import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { PostService } from 'src/app/services/post.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css'],
})
export class MapboxComponent implements OnInit {
  event?: Event;
  plotList: any = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  filterData1: any;
  constructor(
    private _postService: PostService,
    private breakpointObserver: BreakpointObserver
  ) {}
  @ViewChild('screen', { static: true }) screen: any;
  @Output() refresh = new EventEmitter<Event>();
  @Input('filterData')
  set filterData(filterData: string) {
    this.mapDraw = filterData;
    this.ngOnInit();
  }

  imgBase64 = '';
  mapDraw: any;
  mapData: any;
  coordinates: any;
  geo: any;

  ngOnInit(): void {
    this._postService.getAll().subscribe(
      (data) => {
        this.plotList = data.features;
        console.log(this.plotList);
      },
      (error) => console.log(error)
    );

    let drawFeatureID = '';
    let newDrawFeature = false;
    const map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoidGFoYW9tIiwiYSI6ImNreDZmZDlkejA1NHIybm1ueDB2eXR3bjAifQ.kjM3QfH3e28v1KCrTtYKjQ',
      container: 'map', // container ID
      style: 'mapbox://styles/tahaom/ckx6gdb8x0y0815nx3tl7nua6', // style URL
      center: [-7.445, 33.385], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    let Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'draw_polygon',
    });

    map.addControl(Draw);
    map.addControl(new mapboxgl.FullscreenControl());
    map.on('load', () => {
      this.mapData = map.getCanvas().toDataURL();
      // console.log(this.mapDraw[0]);
      map.addSource('trace', { type: 'geojson', data: this.mapDraw[0] });
      map.addLayer({
        id: 'trace',
        type: 'line',
        source: 'trace',
        paint: {
          'line-color': 'black',
          'line-opacity': 1,
          'line-width': 5,
        },
      });
    });

    map.on('draw.create', () => {
      newDrawFeature = true;
      const data = Draw.getAll();
      this.coordinates = data.features[0].geometry;
      this.mapData = map.getCanvas().toDataURL();
    });

    map.on('click', function (e) {
      if (!newDrawFeature) {
        var drawFeatureAtPoint = Draw.getFeatureIdsAt(e.point);
        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : '';
      }
      newDrawFeature = false;
    });
  }

  capture(event: Event) {
    this.imgBase64 = this.mapData;
    this.save(event);
  }

  clean() {
    this.mapDraw = '';
    this.ngOnInit();
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  namee: string = '';

  save(event: Event) {
    let name = (<HTMLInputElement>document.getElementById('name')).value;
    const file = this.DataURIToBlob(this.imgBase64);
    const formData = new FormData();
    formData.append('image', file, 'image.png');
    formData.append('name', name);
    formData.append('geofence', JSON.stringify(this.coordinates));
    this._postService.create(formData).subscribe(
      (data) => {
        // console.log(data);
        this.refresh.emit(event);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange(event: Event) {
    this.event = event;
    this.ngOnInit();
  }

  loadPolygon(id: number) {
    if (this.mapDraw == '') {
      let filter = this.plotList.filter(
        (item: { id: number }) => item.id === id
      );
      console.log(id);
      this.mapDraw = filter;
    } else {
      this.clean();
      let filter = this.plotList.filter(
        (item: { id: number }) => item.id === id
      );
      console.log(id);
      this.mapDraw = filter;
    }
  }
}
