import{i as l,a as u,s as r,b as g,c as p,d as y}from"./motionflow-setup-M0aqF1R1.js";document.addEventListener("DOMContentLoaded",()=>{l(),u(),r(),g(),p();const t=document.getElementById("transmission-form"),e=document.getElementById("form-feedback");t&&e&&t.addEventListener("submit",a=>{a.preventDefault(),y.playSuccess();const n=document.getElementById("input-name").value,s=document.getElementById("input-email").value,i=document.getElementById("input-phone")?document.getElementById("input-phone").value:"",o=document.getElementById("input-objective").value,m=document.getElementById("input-message").value;e.style.display="block",e.style.background="rgba(16, 185, 129, 0.1)",e.style.border="1px solid rgba(16, 185, 129, 0.3)",e.style.color="#10B981",e.innerHTML=`✓ Thank you, ${n}! Preparing message for <strong>jashwanthraj0310@gmail.com</strong>. Opening your email client to dispatch...`;const c=encodeURIComponent(`[Inquiry] ${o} - ${n}`),d=encodeURIComponent(`Name: ${n}
Email: ${s}
Phone: ${i||"N/A"}
Topic: ${o}

Message:
${m}`);setTimeout(()=>{window.location.href=`mailto:jashwanthraj0310@gmail.com?subject=${c}&body=${d}`},800),t.reset()})});
