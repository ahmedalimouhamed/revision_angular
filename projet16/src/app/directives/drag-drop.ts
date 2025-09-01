import { Directive, ElementRef, HostListener, Output, Input, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appDragDrop]',
  standalone: true
})
export class DragDrop implements OnDestroy {
  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<void>();
  @Input() appDragDrop: boolean = true;

  private isDragging = false;
  private initialX = 0;
  private initialY = 0;
  private xOffset = 0;
  private yOffset = 0;
  private initialLeft = 0;
  private initialTop = 0;

  constructor(private el: ElementRef) {
    this.cleanup = this.cleanup.bind(this);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (!this.appDragDrop) return;
    
    // Empêcher la sélection de texte pendant le drag
    event.preventDefault();
    
    this.isDragging = true;
    
    // Sauvegarder la position initiale de la souris
    this.initialX = event.clientX;
    this.initialY = event.clientY;
    
    // Sauvegarder la position actuelle de l'élément
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialLeft = rect.left;
    this.initialTop = rect.top;
    
    // Appliquer les styles nécessaires
    this.el.nativeElement.classList.add('draggable');
    this.el.nativeElement.style.cursor = 'grabbing';
    this.el.nativeElement.style.position = 'fixed';
    this.el.nativeElement.style.zIndex = '1000';
    this.el.nativeElement.style.willChange = 'transform';
    
    // Écouter les événements sur le document
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.cleanup);
    
    this.dragStart.emit();
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;
    
    // Calculer le déplacement
    const dx = event.clientX - this.initialX;
    const dy = event.clientY - this.initialY;
    
    // Mettre à jour la position
    this.el.nativeElement.style.left = `${this.initialLeft + dx}px`;
    this.el.nativeElement.style.top = `${this.initialTop + dy}px`;
  }

  private cleanup() {
    if (this.isDragging) {
      this.isDragging = false;
      this.dragEnd.emit();
    }
    
    // Nettoyer les styles
    this.el.nativeElement.classList.remove('draggable');
    this.el.nativeElement.style.cursor = '';
    this.el.nativeElement.style.position = '';
    this.el.nativeElement.style.zIndex = '';
    this.el.nativeElement.style.willChange = '';
    this.el.nativeElement.style.left = '';
    this.el.nativeElement.style.top = '';
    
    // Supprimer les écouteurs d'événements
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.cleanup);
  }

  ngOnDestroy() {
    // Nettoyage pour éviter les fuites de mémoire
    this.cleanup();
  }
}
