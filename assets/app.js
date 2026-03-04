/**
 * JOY 長照服務品質管理系統 - Prototype Utilities
 * - data source: /assets/data.json (mock)
 * - no build tools required; can be edited directly in VS Code
 */

async function loadData(){
  const res = await fetch("./assets/data.json", {cache:"no-store"});
  if(!res.ok) throw new Error("Cannot load mock data.json");
  return await res.json();
}

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function setSelectOptions(selectEl, options, placeholder="全部"){
  selectEl.innerHTML = "";
  const opt0 = document.createElement("option");
  opt0.value = "";
  opt0.textContent = placeholder;
  selectEl.appendChild(opt0);

  for(const v of options){
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    selectEl.appendChild(opt);
  }
}

function getQueryParam(name){
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function formatDateTime(dateStr, timeStr){
  return `${dateStr}  ${timeStr}`;
}

function includesLike(hay, needle){
  if(needle == null || needle === "") return true;
  return String(hay ?? "").toLowerCase().includes(String(needle).toLowerCase());
}

function inDateRange(dateStr, startStr, endStr){
  // date strings like "114/07/01" (ROC)
  // For prototype, compare lexicographically after zero-padding already present.
  if(!startStr && !endStr) return true;
  const d = dateStr || "";
  if(startStr && d < startStr) return false;
  if(endStr && d > endStr) return false;
  return true;
}


function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

window.JOY = { loadData, $, $all, setSelectOptions, getQueryParam, formatDateTime, includesLike, inDateRange, escapeHtml };



function inDateRangeISO(dateISO, startISO, endISO){
  // ISO string compare works when formatted YYYY-MM-DD
  if(!startISO && !endISO) return true;
  const d = dateISO || "";
  if(startISO && d < startISO) return false;
  if(endISO && d > endISO) return false;
  return true;
}

function safeGetVillages(data, town){
  const m = data.villagesByTown || {};
  return m[town] || [];
}

window.JOY.inDateRangeISO = inDateRangeISO;
window.JOY.safeGetVillages = safeGetVillages;
