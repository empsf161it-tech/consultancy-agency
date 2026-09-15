/**
 * VANGUARD STRATEGY PARTNERS — CLIENT ADVISORY PORTAL JS
 * Handles tab switching, workstream filters, metric simulations, and deliverable interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initWorkstreamFilters();
  initMetricToggle();
});

function initDashboardTabs() {
  const tabButtons = document.querySelectorAll('.dash-nav-item');
  const tabPanes = document.querySelectorAll('.dash-pane');

  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

function initWorkstreamFilters() {
  const filterBtns = document.querySelectorAll('.workstream-filter-btn');
  const workstreamRows = document.querySelectorAll('.workstream-item');

  if (!filterBtns.length || !workstreamRows.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterStatus = btn.getAttribute('data-status');

      workstreamRows.forEach(row => {
        const rowStatus = row.getAttribute('data-status');
        if (filterStatus === 'all' || rowStatus === filterStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

function initMetricToggle() {
  const periodSelector = document.getElementById('metricPeriodSelect');
  if (!periodSelector) return;

  const metricValues = {
    ytd: {
      valAdvised: '$4.2B',
      engagements: '8 Active',
      ebitdaImpact: '+28.4%',
      riskScore: 'Low (0.12)'
    },
    all: {
      valAdvised: '$14.8B',
      engagements: '42 Total',
      ebitdaImpact: '+32.1%',
      riskScore: 'Optimal (0.09)'
    }
  };

  periodSelector.addEventListener('change', (e) => {
    const selected = e.target.value;
    const data = metricValues[selected] || metricValues.ytd;

    const valElem = document.getElementById('kpiValAdvised');
    const engElem = document.getElementById('kpiEngagements');
    const ebitdaElem = document.getElementById('kpiEbitda');
    const riskElem = document.getElementById('kpiRisk');

    if (valElem) valElem.textContent = data.valAdvised;
    if (engElem) engElem.textContent = data.engagements;
    if (ebitdaElem) ebitdaElem.textContent = data.ebitdaImpact;
    if (riskElem) riskElem.textContent = data.riskScore;
  });
}
