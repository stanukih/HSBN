import { HttpClient} from "@angular/common/http"
import { Observable} from "rxjs"
import { Injectable } from "@angular/core"


@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {
  }
  loadingFileFree(): Observable<any>{
    return this.http.post<any>("/api/travels/loading_file_free",null)
  }

  addFile(file: File, puth:string): Observable<any> {
    const fileName = file.name;
    const formData = new FormData();
    formData.append("filedata", file);
    return this.http.post<any>("/api/"+puth, formData)
  }
}
