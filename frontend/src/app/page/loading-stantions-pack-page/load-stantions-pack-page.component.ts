import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaService } from 'src/app/shared/services/media';

@Component({
  selector: 'app-load-stantions-pack-page',
  templateUrl: './load-stantions-pack-page.component.html',
  styleUrls: ['./load-stantions-pack-page.component.scss']
})
export class LoadStantionsPackPageComponent {
  constructor(private router: Router, private activRout: ActivatedRoute,public media: MediaService){}

}
