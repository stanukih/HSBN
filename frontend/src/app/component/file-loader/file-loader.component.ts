import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Idata } from '../../../../../shared/interfaces/IMessage';
import { MediaService } from '../../shared/services/media';


@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
})
export class FileLoaderComponent {
  //@HostBinding() mediaData?: Idata[]
  @Input() pathToLoad!: string

  fileName = '';
  status: 'load' | 'success' | 'error' | '' = ''
  errorLoad: any;

  constructor(private http: HttpClient, private media: MediaService) { }

  onFileSelected(event: any) {
    this.status = "load"
    this.media.loadingFileFree().subscribe((data) => {
      if (data.status === "Success") {
        this.media.addFile(event.target.files[0], this.pathToLoad).subscribe(
          (data) => {
            this.status = "success"
          },
          (error) => {
            this.status = "error"
            this.errorLoad = error
          }
        )
      }
      else {
        this.status = "error"
        this.errorLoad = data.message
      }
    },
      (error) => {
        this.status = "error"
        this.errorLoad = error
      })

  }
}
