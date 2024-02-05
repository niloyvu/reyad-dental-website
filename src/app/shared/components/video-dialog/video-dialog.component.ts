import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss'
})
export class VideoDialogComponent {

  videoUrl: any = null;
  
  constructor(
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) video: any,
  ) {
    const videoUrl = video?.replace('watch?v=', 'embed/');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
