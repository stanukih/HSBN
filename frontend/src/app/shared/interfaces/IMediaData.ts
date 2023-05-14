import { SafeUrl } from "@angular/platform-browser"

interface downloadedFile {
    id: string,
    url: SafeUrl | null,
    mimetype:string
  }
export{downloadedFile}