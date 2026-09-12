import { icons } from '../components/icons.ts';
import { fetchJobApplications, updateJobApplicationStatus, deleteJobApplication } from '../utils/api.ts';
import type { JobApplication } from '../utils/api.ts';

const STATUS_OPTIONS: { id: JobApplication['status']; label: string }[] = [
  { id: 'new', label: 'جدید' },
  { id: 'reviewed', label: 'بررسی‌شده' },
  { id: 'contacted', label: 'تماس گرفته شده' },
  { id: 'hired', label: 'استخدام شده' },
  { id: 'rejected', label: 'رد شده' },
];

const STATUS_LABELS: Record<string, string> = Object.fromEntries(STATUS_OPTIONS.map((s) => [s.id, s.label]));

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderStatusOptions(current: string): string {
  return STATUS_OPTIONS.map((s) => `<option value="${s.id}" ${s.id === current ? 'selected' : ''}>${s.label}</option>`).join('');
}

function renderRow(a: JobApplication): string {
  return `
    <div class="testimonial-row" data-application-row="${a.id}">
      <div class="testimonial-row-avatar"><span class="icon">${icons.briefcase}</span></div>
      <div class="testimonial-row-body">
        <div class="testimonial-row-head">
          <strong>${escapeHtml(a.fullName)}</strong>
          <span class="article-status-badge article-status-${a.status}">${STATUS_LABELS[a.status] ?? a.status}</span>
        </div>
        <div class="job-application-meta">
          <span>${escapeHtml(a.positionLabel)}</span>
          <a href="tel:${a.phone}" dir="ltr">${a.phone}</a>
          ${a.city ? `<span>${escapeHtml(a.city)}</span>` : ''}
          ${a.hasVehicle === true ? `<span>دارای وسیله نقلیه${a.vehicleType ? ` (${escapeHtml(a.vehicleType)})` : ''}</span>` : ''}
          ${a.hasVehicle === false ? `<span>بدون وسیله نقلیه</span>` : ''}
          <span>${new Date(a.createdAt).toLocaleDateString('fa-IR')}</span>
        </div>
        ${a.message ? `<p class="testimonial-row-text">${escapeHtml(a.message)}</p>` : ''}
      </div>
      <div class="staff-table-actions">
        <select class="pipeline-status-select" data-status-select-id="${a.id}">
          ${renderStatusOptions(a.status)}
        </select>
        <button type="button" class="btn btn-ghost btn-sm" data-delete-application="${a.id}">حذف</button>
      </div>
    </div>
  `;
}

export function renderJobApplicationsView(): string {
  return `
    <div class="view-header">
      <h1>فرصت‌های شغلی</h1>
    </div>
    <p class="error-text" id="job-applications-error" hidden></p>
    <div class="testimonial-list" id="job-applications-list"></div>
  `;
}

export function initJobApplicationsView(): void {
  const errorEl = document.getElementById('job-applications-error');
  const list = document.getElementById('job-applications-list');
  if (!errorEl || !list) return;

  let items: JobApplication[] = [];

  async function load(): Promise<void> {
    errorEl!.hidden = true;
    try {
      items = await fetchJobApplications();
      list!.innerHTML = items.length ? items.map(renderRow).join('') : '<p class="pipeline-empty">هنوز درخواست همکاری‌ای ثبت نشده است.</p>';
      wireRowActions();
    } catch (err) {
      errorEl!.hidden = false;
      errorEl!.textContent = err instanceof Error ? err.message : 'خطایی پیش آمد.';
    }
  }

  function wireRowActions(): void {
    list!.querySelectorAll<HTMLSelectElement>('[data-status-select-id]').forEach((select) => {
      select.addEventListener('change', async () => {
        const id = Number(select.dataset.statusSelectId);
        select.disabled = true;
        try {
          await updateJobApplicationStatus(id, select.value as JobApplication['status']);
          await load();
        } catch (err) {
          errorEl!.hidden = false;
          errorEl!.textContent = err instanceof Error ? err.message : 'به‌روزرسانی وضعیت ناموفق بود.';
          select.disabled = false;
        }
      });
    });

    list!.querySelectorAll<HTMLButtonElement>('[data-delete-application]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!window.confirm('این درخواست برای همیشه حذف شود؟')) return;
        btn.disabled = true;
        try {
          await deleteJobApplication(Number(btn.dataset.deleteApplication));
          await load();
        } catch (err) {
          errorEl!.hidden = false;
          errorEl!.textContent = err instanceof Error ? err.message : 'حذف ناموفق بود.';
          btn.disabled = false;
        }
      });
    });
  }

  void load();
}
