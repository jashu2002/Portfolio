import{i as b,a as v,s as I,b as E,c as f,d as B}from"./motionflow-setup-DxB5VUwx.js";const l=()=>{b(),v(),I(),E(),f();const o=new URLSearchParams(window.location.search).get("service"),c=document.getElementById("client-project-type");if(o&&c){const t={website:"Website Development",mobile:"Mobile Application Development",webapp:"Web Application Development",ai:"AI & Automation",ecommerce:"E-Commerce Development",backend:"Backend & REST API",ml:"Machine Learning / Computer Vision"}[o.toLowerCase()];t&&(c.value=t)}const n=document.getElementById("project-inquiry-form"),e=document.getElementById("form-feedback");n&&e&&n.addEventListener("submit",a=>{a.preventDefault(),B.playSuccess();const t=document.getElementById("client-name").value,r=document.getElementById("client-email").value,i=document.getElementById("client-company")?document.getElementById("client-company").value:"",s=document.getElementById("client-reference")?document.getElementById("client-reference").value:"",m=document.getElementById("client-project-type").value,d=document.getElementById("client-budget").value,u=document.getElementById("client-timeline").value,p=document.getElementById("client-message").value;e.style.display="block",e.style.background="rgba(16, 185, 129, 0.1)",e.style.border="1px solid rgba(16, 185, 129, 0.35)",e.style.color="#10B981",e.innerHTML=`✓ Thank you, ${t}! Your project inquiry has been prepared for <strong>jashwanthraj0310@gmail.com</strong>. Opening your email client to dispatch...`;const y=encodeURIComponent(`[Project Inquiry] ${m} - ${t} (${i||"Individual"})`),g=encodeURIComponent(`Name: ${t}
Email: ${r}
Company: ${i||"N/A"}
Reference URL: ${s||"N/A"}
Project Type: ${m}
Budget: ${d}
Target Timeline: ${u}

Project Description:
${p}
`);setTimeout(()=>{window.location.href=`mailto:jashwanthraj0310@gmail.com?subject=${y}&body=${g}`},800),n.reset()})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l();
