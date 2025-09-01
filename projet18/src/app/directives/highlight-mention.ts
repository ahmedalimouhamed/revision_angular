import { Directive, ElementRef, Input, Output, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightMention]'
})
export class HighlightMention implements OnInit {

  @Input() appHighlightMention: string = '';
  @Input() mentionColor: string = '#3f51b5';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void{
    this.highlightMentions();
  }

  private highlightMentions(){
    const content = this.appHighlightMention;
    
    if(!content) return;

    const mentionRegex = /(@[\w\s]+)/g;
    const parts = content.split(mentionRegex);

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');

    parts.forEach(part => {
      if(part.startsWith('@')){
        const span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'mention');
        this.renderer.setStyle(span, 'color', this.mentionColor);
        this.renderer.setStyle(span, 'font-weight', 'bold');
        this.renderer.appendChild(span, this.renderer.createText(part));
        this.renderer.appendChild(this.el.nativeElement, span);
      }else{
        this.renderer.appendChild(this.el.nativeElement, this.renderer.createText(part));
      }
    })
  }

}
