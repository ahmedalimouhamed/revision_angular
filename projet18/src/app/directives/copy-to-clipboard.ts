import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCopyToClipboard]'
})
export class CopyToClipboard {

  @Input() appCopyToClipboard: string = '';
  @Input() copyText: string = 'Copié !';

  private timeoutId: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick(){
    if(!this.appCopyToClipboard) return;

    navigator.clipboard.writeText(this.appCopyToClipboard).then(() => {
      this.showFeedback();
    }).catch(err => {
      console.error('Erreur lors de la copie : ', err);
    })
  }

  private showFeedback(){
    const originalText = this.el.nativeElement.textContent;
    this.renderer.setProperty(this.el.nativeElement, 'textContent', this.copyText);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#4caf50');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');

    if(this.timeoutId){
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', originalText);
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }, 2000);
  }

}
