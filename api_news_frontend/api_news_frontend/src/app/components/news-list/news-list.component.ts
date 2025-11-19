import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CategoryService } from '../../core/services/category.service';
import { StateService } from '../../core/services/state.service';
import { News } from '../../interfaces/news.interface';
import { Category } from '../../core/models/category.model';
import { State } from '../../core/models/state.model';

@Component({
  standalone: true,
  selector: 'app-news-list',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <div class="app-container">
        <!-- Encabezado -->
        <section class="section-header">
          <div class="header-accent"></div>
          <h1 class="header-title">Noticias</h1>
          <p class="header-subtitle">Últimas publicaciones</p>
        </section>

        <!-- Filtros -->
        <section class="filters-section" *ngIf="categories.length > 0 || states.length > 0">
          <div class="filter-group">
            <label for="category-filter" class="filter-label">Categoría</label>
            <select 
              id="category-filter" 
              (change)="onCategoryChange($event)" 
              class="filter-input"
            >
              <option value="">Todas</option>
              <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.nombre }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="state-filter" class="filter-label">Estado</label>
            <select 
              id="state-filter" 
              (change)="onStateChange($event)" 
              class="filter-input"
            >
              <option value="">Todos</option>
              <option *ngFor="let state of states" [value]="state.id">{{ state.nombre }}</option>
            </select>
          </div>
        </section>

        <!-- Contenido -->
        <section class="news-section">
          <div *ngIf="loading" class="loading-state">
            <div class="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p class="loading-text">Cargando noticias...</p>
          </div>

          <div *ngIf="error && !loading" class="alert error">
            <span class="alert-icon">!</span>
            <div class="alert-message">Error al cargar noticias</div>
          </div>

          <div *ngIf="news.length === 0 && !loading && !error" class="empty-state">
            <svg class="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <p class="empty-text">Sin resultados</p>
          </div>

          <section class="news-grid" *ngIf="news.length > 0 && !loading">
            <article 
              *ngFor="let item of news; let i = index" 
              class="news-card"
              [style.--index]="i"
            >
              <div class="news-card-image-wrapper">
                <img 
                  *ngIf="item.imagen" 
                  [src]="item.imagen" 
                  [alt]="item.titulo"
                  class="news-card-image"
                  loading="lazy"
                />
                <div *ngIf="!item.imagen" class="news-card-placeholder">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="7" y1="8" x2="17" y2="8"/>
                    <line x1="7" y1="12" x2="17" y2="12"/>
                    <line x1="7" y1="16" x2="13" y2="16"/>
                  </svg>
                </div>
              </div>
              <div class="news-card-content">
                <div class="news-card-header">
                  <span class="news-card-category" *ngIf="getCategoryName(item.categoria_id)">
                    {{ getCategoryName(item.categoria_id) }}
                  </span>
                  <span class="news-card-date">{{ item.fecha_publicacion | date: 'dd/MM' }}</span>
                </div>
                <h3 class="news-card-title">{{ item.titulo }}</h3>
                <p class="news-card-description">{{ item.descripcion }}</p>
                <div class="news-card-footer">
                  <span class="news-card-state" *ngIf="getStateName(item.estado_id)">
                    {{ getStateName(item.estado_id) }}
                  </span>
                  <button class="btn small primary" [routerLink]="['/news', item.id]">
                    Leer más →
                  </button>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        min-height: calc(100vh - 80px);
        background: var(--color-bg-primary);
        padding: var(--spacing-xl) 0;
      }

      .app-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-lg);
      }

      /* SECCIÓN DE ENCABEZADO */
      .section-header {
        text-align: center;
        margin-bottom: var(--spacing-3xl);
        animation: slideInUp var(--transition-base);
      }

      .header-icon {
        font-size: 3rem;
        display: inline-block;
        margin-bottom: var(--spacing-md);
        animation: bounce var(--transition-base);
      }

      .header-title {
        font-size: clamp(1.75rem, 5vw, 2.5rem);
        font-weight: 700;
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
        letter-spacing: -0.02em;
      }

      .header-subtitle {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        margin: 0;
        font-weight: 400;
      }

      /* SECCIÓN DE FILTROS */
      .filters-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-2xl);
        background: var(--color-bg-card);
        padding: var(--spacing-lg);
        border-radius: var(--border-radius-xl);
        border: 1px solid var(--color-border);
        box-shadow: var(--shadow-sm);
        animation: slideInUp var(--transition-base);
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      .filter-label {
        font-weight: 600;
        font-size: 0.95rem;
        color: #ecf0f1;
        letter-spacing: 0.3px;
      }

      .filter-input {
        padding: 0.75rem 1rem;
        border: 2px solid #34495e;
        border-radius: 6px;
        background: #ecf0f1;
        color: #1a1a1a;
        font-size: 1rem;
        cursor: pointer;
        transition: all var(--transition-base);
        font-weight: 500;
        font-family: inherit;
        height: auto;
        min-height: 44px;
        line-height: 1.5;
      }

      .filter-input:hover {
        border-color: #3498db;
        box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
      }

      .filter-input:focus {
        outline: none;
        border-color: #3498db;
        background: white;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
      }

      .filter-input option {
        background: #ecf0f1;
        color: #1a1a1a;
        padding: 0.5rem;
      }

      .filter-input option[value=""] {
        color: #1a1a1a;
        font-weight: 600;
      }

      /* ESTADOS DE CARGA */
      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-lg);
        padding: var(--spacing-3xl) var(--spacing-lg);
        text-align: center;
      }

      .loader {
        display: flex;
        gap: var(--spacing-sm);
        align-items: center;
        justify-content: center;
      }

      .loader span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color-accent-primary);
        animation: softPulse var(--transition-base);
      }

      .loader span:nth-child(2) {
        animation-delay: 100ms;
      }

      .loader span:nth-child(3) {
        animation-delay: 200ms;
      }

      .loading-text {
        color: var(--color-text-secondary);
        font-size: 1rem;
        margin: 0;
      }

      .empty-state {
        text-align: center;
        padding: var(--spacing-3xl) var(--spacing-lg);
        color: var(--color-text-secondary);
      }

      .empty-icon {
        font-size: 4rem;
        display: inline-block;
        margin-bottom: var(--spacing-md);
        opacity: 0.5;
      }

      .empty-text {
        font-size: 1.1rem;
        margin: 0;
      }

      /* GRID DE NOTICIAS */
      .news-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--spacing-xl);
        margin-top: var(--spacing-lg);
      }

      .news-card {
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        transition: all var(--transition-base);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        animation: slideInUp var(--transition-base);
        animation-delay: calc(var(--index) * 50ms);
      }

      .news-card:hover {
        box-shadow: var(--shadow-xl);
        border-color: var(--color-accent-primary);
        transform: translateY(-8px);
      }

      /* IMAGEN DE LA NOTICIA */
      .news-card-image-wrapper {
        width: 100%;
        height: 180px;
        background: var(--color-bg-secondary);
        overflow: hidden;
        position: relative;
      }

      .news-card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all var(--transition-base);
      }

      .news-card:hover .news-card-image {
        transform: scale(1.05);
        filter: brightness(1.05);
      }

      .news-card-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: var(--color-text-tertiary);
        opacity: 0.3;
      }

      /* CONTENIDO DE LA NOTICIA */
      .news-card-content {
        padding: var(--spacing-lg);
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .news-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-md);
      }

      .news-card-category {
        display: inline-block;
        background: var(--color-accent-primary);
        color: var(--color-text-white);
        padding: 0.3rem 0.8rem;
        border-radius: var(--border-radius-sm);
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all var(--transition-fast);
      }

      .news-card:hover .news-card-category {
        background: var(--color-accent-primary-hover);
        transform: scale(1.05);
      }

      .news-card-date {
        font-size: 0.8rem;
        color: var(--color-text-tertiary);
        font-weight: 500;
      }

      .news-card-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 var(--spacing-md) 0;
        color: var(--color-text-primary);
        line-height: 1.4;
        transition: all var(--transition-fast);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-card:hover .news-card-title {
        color: var(--color-accent-primary);
      }

      .news-card-description {
        font-size: 0.95rem;
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin: 0 0 var(--spacing-lg) 0;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .news-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border-light);
      }

      .news-card-state {
        display: inline-flex;
        align-items: center;
        font-size: 0.8rem;
        padding: 0.3rem 0.8rem;
        background: var(--color-bg-secondary);
        border-radius: var(--border-radius-sm);
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      /* RESPONSIVE */
      @media (max-width: 768px) {
        .header-title {
          font-size: 1.75rem;
        }

        .filters-section {
          grid-template-columns: 1fr;
          gap: var(--spacing-md);
        }

        .news-grid {
          grid-template-columns: 1fr;
          gap: var(--spacing-lg);
        }
      }

      @media (max-width: 480px) {
        .page-container {
          padding: var(--spacing-lg) 0;
        }

        .section-header {
          margin-bottom: var(--spacing-2xl);
        }

        .header-icon {
          font-size: 2.5rem;
        }

        .header-title {
          font-size: 1.5rem;
        }

        .news-card-content {
          padding: var(--spacing-md);
        }

        .news-card-title {
          font-size: 1.1rem;
        }
      }
    `,
  ],
})
export class NewsListComponent implements OnInit {
  news: News[] = [];
  categories: Category[] = [];
  states: State[] = [];
  loading = false;
  error = false;

  private selectedCategoryId: number | null = null;
  private selectedStateId: number | null = null;

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadStates();
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.error = false;

    if (this.selectedCategoryId !== null && !isNaN(this.selectedCategoryId)) {
      this.newsService.getByCategory(this.selectedCategoryId).subscribe({
        next: (data) => {
          this.news = data || [];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    } else if (this.selectedStateId !== null && !isNaN(this.selectedStateId)) {
      this.newsService.getByState(this.selectedStateId).subscribe({
        next: (data) => {
          this.news = data || [];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    } else {
      this.newsService.getAll().subscribe({
        next: (data) => {
          this.news = data || [];
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data || [];
      },
      error: () => {
        console.error('Error cargando categorías');
      },
    });
  }

  loadStates() {
    this.stateService.getAll().subscribe({
      next: (data) => {
        this.states = data || [];
      },
      error: () => {
        console.error('Error cargando estados');
      },
    });
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const parsed = value ? parseInt(value, 10) : null;
    this.selectedCategoryId = (parsed && !isNaN(parsed)) ? parsed : null;
    this.selectedStateId = null;
    console.log('Category changed to:', this.selectedCategoryId, 'Type:', typeof this.selectedCategoryId);
    this.fetch();
  }

  onStateChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const parsed = value ? parseInt(value, 10) : null;
    this.selectedStateId = (parsed && !isNaN(parsed)) ? parsed : null;
    this.selectedCategoryId = null;
    console.log('State changed to:', this.selectedStateId, 'Type:', typeof this.selectedStateId);
    this.fetch();
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.nombre : '';
  }

  getStateName(stateId: number): string {
    const state = this.states.find((s) => s.id === stateId);
    return state ? state.nombre : '';
  }
}
