import{i as u,a as r,s as g,b as p,c as y,d as b}from"./motionflow-setup-BOlMvzsr.js";const a=()=>{u(),r(),g(),p(),y();const t=document.getElementById("transmission-form"),e=document.getElementById("form-feedback");t&&e&&t.addEventListener("submit",s=>{s.preventDefault(),b.playSuccess();const n=document.getElementById("input-name").value,i=document.getElementById("input-email").value,m=document.getElementById("input-phone")?document.getElementById("input-phone").value:"",o=document.getElementById("input-objective").value,c=document.getElementById("input-message").value;e.style.display="block",e.style.background="rgba(16, 185, 129, 0.1)",e.style.border="1px solid rgba(16, 185, 129, 0.3)",e.style.color="#10B981",e.innerHTML=`✓ Thank you, ${n}! Preparing message for <strong>jashwanthraj0310@gmail.com</strong>. Opening your email client to dispatch...`;const d=encodeURIComponent(`[Inquiry] ${o} - ${n}`),l=encodeURIComponent(`Name: ${n}
Email: ${i}
Phone: ${m||"N/A"}
Topic: ${o}

Message:
${c}`);setTimeout(()=>{window.location.href=`mailto:jashwanthraj0310@gmail.com?subject=${d}&body=${l}`},800),t.reset()})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a):a();
