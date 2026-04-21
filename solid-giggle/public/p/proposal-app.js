(function(){
var P=new URLSearchParams(location.search),token=P.get("id");
if(!token)return err("No Proposal ID","Check the link you received and try again.");
fetch("/api/proposals/"+token).then(function(r){if(!r.ok)throw new Error(r.status==404?"expired":"error");return r.json()}).then(render).catch(function(e){e.message==="expired"?err("This Proposal Has Expired","The link is no longer active. Please contact us for a new proposal link."):err("Something Went Wrong","We couldn't load this proposal. Try again or contact us.")});

function err(t,m){document.getElementById("app").innerHTML='<div class="ep"><div style="font-size:48px;margin-bottom:20px">📄</div><h1>'+t+'</h1><p>'+m+'</p></div>';}
function E(s){if(!s)return"";var d=document.createElement("div");d.textContent=s;return d.innerHTML;}
function fd(iso){if(!iso)return"";try{return new Date(iso).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}catch(e){return iso}}

var PROGS={gsa_submission:{name:"GSA Contract Agreement",sub:"Offer Preparation & Submission Support",pos:"A structured and effective process to create, submit, and obtain your GSA MAS Contract for qualified firms. This structure is designed for compliance, responsiveness, and acceptance of your GSA MAS proposal. Starting with SIN selection & requirement audits, our team leads every step of the way until negotiations end and your GSA is awarded. ",pillars:[{i:"📋",t:"Readiness Assessment",b:"Eliminate guesswork. Establish your position.",d:"Targeted evaluation of your documentation, pricing, and market alignment to identify gaps, reduce risk, and define a clear, executable path to submission."},{i:"📄",t:"Documentation & Technical Narrative",b:"Build it right. Learn from experts.",d:"Structured preparation of required submission materials, including technical narratives, pricing support, sales practices documentation, and other core proposal components required for GSA review."},{i:"💲",t:"Pricing Strategy",b:"Competitive. Defensible. Compliant.",d:"Development of a pricing structure aligned with your commercial practices and positioned to withstand GSA scrutiny during review, clarification, and negotiation."},{i:"✅",t:"Submission Coordination",b:"Submit with confidence.",d:"End-to-end coordination of the submission with organized documentation, milestone tracking, and disciplined progress management."},{i:"🚀",t:"Post-Submission Leadership",b:"Respond fast. Protect momentum.",d:"We lead all post-submission response activity, acting on GSA clarification requests within 24–48 hours to meet tight deadlines, maintain forward movement, and reduce rejection risk."},{i:"🔄",t:"Negotiation Support",b:"Hold your position. Close with strength.",d:"Strategic support through the negotiation phase, including pricing rationale, documentation reinforcement, and response guidance to help move the offer toward award."}],timeline:"roadmap",phases:[{ph:"Phase 1",t:"Readiness & Strategy",dur:"Weeks 1-2",items:["Competitor Analysis","SIN Selection","Compliance check","Pricing Strategy"],pct:20},{ph:"Phase 2",t:"Documentation & Technical Build",dur:"Weeks 3-4",items:["Technical narrative","Documentation gathering","Past Performance validation","Compliance Verification"],pct:50},{ph:"Phase 3",t:"Pricing & Review",dur:"Weeks 5-6",items:["GSA Price Proposal","Pricing Terms","Internal QC Review","Client Review & Approval"],pct:80},{ph:"Phase 4",t:"Submission & Support",dur:"Weeks 7-10+",items:["eOffer submission","Confirmation tracking","Clarification management","GSA Negotiations"],pct:100}],recurring:["Advisory meetings during submission process","Email and phone support for questions","Progress updates at each milestone","Coordination with your internal team"],scope:["One complete offer submission package","Up to two rounds of clarification response support","One pricing structure review and recommendation"],deliverables:["GSA Readiness Assessment & Competitor Analysis","Complete GSA MAS offer package","Pricing narrative and supporting documentation","Technical Proposal Narrative","Submission confirmation and tracking"]},
annual_management:{name:"GSA Annual Management Program",sub:"Year-Round Contract Management & Compliance",pos:"A comprehensive year-round program that manages, maintains, and optimizes your existing GSA Multiple Award Schedule contract. We begin with a formal engagement kickoff — including Authorized Negotiator setup and a full contract health audit — then execute all required modifications, catalog management, compliance reporting, and strategic advisory throughout the engagement to keep your contract active, compliant, and positioned for growth.",pillars:[{i:"📦",t:"Catalog Management",b:"Build and maintain your GSA vehicle",d:"Annual catalog development, ongoing updates, pricing adjustments, and compliance-driven optimization to keep your GSA contract current, competitive, and accurate throughout the engagement."},{i:"🔧",t:"Modification Management",b:"Every required change, handled",d:"Full preparation and submission of all contract modifications — SIN additions, pricing updates, service changes, and administrative corrections — managed through the eMod portal with milestone tracking and status monitoring."},{i:"📊",t:"Compliance & Reporting",b:"Stay compliant. Never miss a deadline.",d:"ISS sales reporting, SAM.gov maintenance, proactive compliance monitoring, option year renewal management, and annual GSA review coordination. No lapses, no missed obligations."},{i:"💡",t:"Strategic Advisory",b:"Expert guidance when it matters",d:"Scheduled advisory sessions covering contract strategy, market positioning, pricing analysis, and operational planning — tailored to your goals and current GSA contract environment."},{i:"🛒",t:"eBuy & Advantage",b:"Maximize your GSA marketplace presence",d:"Active guidance on eBuy RFQ responses, GSA Advantage listing optimization, opportunity identification, and competitive positioning within the federal marketplace."},{i:"🎓",t:"Training & Support",b:"Your team, always ready",d:"Ongoing training sessions, new staff onboarding, system guidance, and operational support to ensure your team maintains the knowledge and capability needed for long-term GSA contract success."}],timeline:"roadmap",rmTitle:"Engagement Roadmap",rmSub:"A structured 12-month engagement built around your contract. Each phase sequences from the last — from kickoff through annual renewal.",phases:[{ph:"Phase 1",t:"Initiation & Foundation",dur:"Months 1–3",items:["Engagement kickoff & Authorized Negotiator setup","Contract health audit & document review","Catalog baseline review & alignment","First modification submitted"],pct:25},{ph:"Phase 2",t:"Active Modifications",dur:"Months 4–6",items:["Modification submissions & milestone tracking","Advisory calls & strategic planning","eBuy & Advantage engagement","Catalog updates & compliance monitoring"],pct:50},{ph:"Phase 3",t:"Optimization & Training",dur:"Months 7–9",items:["Training sessions & team onboarding","Mid-engagement review & ISS reporting","Catalog refresh & optimization","Compliance review & GSA audit preparation"],pct:75},{ph:"Phase 4",t:"Review & Renewal",dur:"Months 10–12",items:["Annual review & contract health assessment","Option year & renewal planning","Year-end ISS reporting","Contract continuation roadmap"],pct:100}],gantt:[],months:[],mdata:[],recurring:["Monthly advisory support and direct email/phone access","Quarterly compliance reviews and ISS sales reporting guidance","Catalog accuracy monitoring and ongoing update support","SAM.gov registration and administrative maintenance","Modification preparation, eMod submission, and status tracking","Training sessions and system maintenance as scheduled"],scope:["Up to [MODS] major contract modifications","Up to [TRAINING] training or onboarding sessions","[CALLS] scheduled advisory call(s) per month"],deliverables:["Engagement kickoff report and contract health assessment","Modification packages (up to [MODS] per year)","Catalog update and audit documentation","Compliance and ISS reporting status reports","Advisory meeting recaps and action items","Training materials and session documentation","Option year and 5-year renewal planning documents"]},
gsa_modification:{name:"GSA Modification Program",sub:"Targeted Contract Change Support",pos:"A structured modification support program for contractors requiring compliant, well-documented changes to their GSA contract, pricing, offerings, or administrative contract data.",pillars:[{i:"🎯",t:"Scope Definition",b:"Clear change parameters",d:"Detailed assessment of required modifications and development of a structured change plan with defined deliverables."},{i:"📝",t:"Documentation Prep",b:"Complete and compliant packages",d:"Preparation of all required modification documents including pricing updates, narratives, and supporting evidence."},{i:"🔍",t:"Compliance Verification",b:"No surprises at review",d:"Pre-submission compliance review to confirm all modification elements meet current GSA requirements."},{i:"📤",t:"Submission Management",b:"Tracked and organized",d:"Coordinated submission through eMod with milestone tracking and status monitoring through approval."},{i:"🔄",t:"Correction Handling",b:"Fast turnaround on feedback",d:"Responsive support for any contracting officer feedback, correction requests, or additional documentation needs."}],timeline:"workflow",steps:[{n:1,t:"Assessment",d:"Review current contract and define modification scope",dur:"3-5 days"},{n:2,t:"Documentation",d:"Prepare all required modification documents",dur:"5-10 days"},{n:3,t:"Internal Review",d:"QC check and client approval of package",dur:"2-3 days"},{n:4,t:"Submission",d:"Submit through eMod with confirmation tracking",dur:"1-2 days"},{n:5,t:"Review Period",d:"Monitor status and handle any CO feedback",dur:"Varies"},{n:6,t:"Approval & Verification",d:"Confirm approval and verify contract updates",dur:"1-3 days"}],recurring:["Support communications during modification review period","Status monitoring and progress updates","Coordination with client team as needed"],scope:["[X] modification submission package(s)","Up to [X] rounds of correction/clarification support","One pre-modification compliance assessment"],deliverables:["Modification scope assessment","Complete eMod submission package(s)","Supporting documentation and narratives","Submission confirmation and tracking","Post-approval verification"]},
new_contractor_fcp:{name:"GSA New Contractor FCP Program",sub:"Post-Award Activation & Onboarding",pos:"A post-award activation program designed to help newly awarded contractors complete catalog baseline requirements, understand GSA systems, and establish a workable operating rhythm early.",pillars:[{i:"🏗️",t:"Baseline Setup",b:"Get your catalog live",d:"Complete FCP catalog baseline upload support including product/service data formatting, SIP preparation, and Advantage publishing."},{i:"📚",t:"Systems Onboarding",b:"Understand your tools",d:"Guided orientation to GSA systems including Advantage, eBuy, ISS, and contractor reporting requirements."},{i:"📐",t:"Catalog Quality",b:"Accurate from day one",d:"Data quality review and optimization to ensure your catalog entries meet GSA formatting and content standards."},{i:"🎓",t:"Training & Guidance",b:"Your team gets confident",d:"Hands-on training sessions covering catalog management, order processing expectations, and compliance basics."},{i:"📅",t:"Activation Planning",b:"Clear 90-day roadmap",d:"Structured 30/60/90-day plan to move from award to operational readiness with defined milestones."}],timeline:"activation",acts:[{per:"Days 1-30",t:"Foundation",s:"Setup & orientation",items:["Contract review and orientation","Catalog data collection","SIP formatting and prep","Systems access and setup"],pct:33},{per:"Days 31-60",t:"Build & Upload",s:"Go live on Advantage",items:["Baseline catalog upload","Quality review and corrections","Advantage publishing","Training session 1"],pct:66},{per:"Days 61-90",t:"Activate & Stabilize",s:"Operational readiness",items:["Catalog verification","Operational readiness check","Training session 2","Transition planning"],pct:100}],recurring:["Ongoing support during 90-day activation window","Email and phone access for questions","Check-in calls at 30, 60, and 90-day marks"],scope:["One complete catalog baseline upload","Up to [X] training sessions","One catalog quality review and correction cycle"],deliverables:["FCP baseline catalog package","Systems orientation guide","Catalog quality report","30/60/90-day activation roadmap","Training session materials and recaps"]}};

function render(p){
var signed=p.status==="signed",prog=PROGS[p.programType]||PROGS.annual_management;
var exp=new Date(p.expiresAt),now=new Date(),diff=exp-now,hrs=Math.max(0,Math.floor(diff/36e5)),mins=Math.max(0,Math.floor((diff%36e5)/6e4)),dead=diff<=0&&!signed;
var mods=p.majorMods||"2",hasDisc=p.discountDisplay&&p.discountDisplay.length>0;
var dp=hasDisc?p.finalPrice:p.price;
var scope=prog.scope.map(function(s){return s.replace(/\[MODS\]/g,p.majorMods||"2").replace(/\[TRAINING\]/g,p.trainingSessions||"2").replace(/\[CALLS\]/g,p.callsPerMonth||"1").replace(/\[REPORTING\]/g,p.reportingCadence||"Quarterly").replace(/\[X\]/g,mods)});
var h="";

// Expiry + toolbar
if(!signed)h+='<div class="xb nb'+(dead?" dead":"")+'">'+( dead?"This proposal has expired. Please contact us for a new link.":"This proposal link expires in "+hrs+"h "+mins+"m")+"</div>";
h+='<div class="tb nb"><div style="display:flex;align-items:center;gap:12px"><span style="font-size:14px;font-weight:700;color:#1a2744">Service Proposal</span>'+(signed?'<span style="background:#e8f5e9;color:#2e7d32;font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px">SIGNED</span>':"")+'</div><div style="display:flex;gap:10px">'+(!signed&&!dead?'<button onclick="toggleEdit()" id="editbtn" class="ba bo nb" style="padding:8px 16px;font-size:13px">✏ Edit</button>':'')+'<button onclick="window.print()" class="ba bo nb" style="padding:8px 16px;font-size:13px">Print</button>'+(signed?'<button onclick="dlPDF()" class="ba nb" style="padding:8px 16px;font-size:13px;border:none;background:#4a7cff;color:#fff">PDF</button>':"")+"</div></div>";
h+='<div id="pc">';

// B1 Cover
h+='<div class="cover"><div class="orb o1"></div><div class="orb o2"></div><div class="ci"><div class="badge">'+E(prog.sub)+"</div><h1>"+E(prog.name)+' — Service Proposal</h1><div class="sub2">Prepared for <strong>'+E(p.clientName)+'</strong></div><div class="meta"><div class="mi"><label>Prepared By</label><span>'+E(p.providerCompany)+'</span></div><div class="mi"><label>Date</label><span>'+fd(p.createdAt)+'</span></div><div class="mi"><label>CAGE Code</label><span>'+E(p.cageCode)+'</span></div><div class="mi"><label>Program</label><span>'+E(prog.name)+"</span></div></div></div></div>";

// B2 Exec Summary
h+='<div class="dv"></div><div class="bl"><div class="sec"><div class="sl">Executive Summary</div><h2>Your Path Forward</h2><p>'+E(p.clientName)+" is at a point where structured, professional GSA support is no longer optional. This requires a disciplined approach to documentation, compliance, and strategic execution.</p><p>The "+E(prog.name)+" provides "+E(p.clientName)+" with a defined engagement structure, dedicated external support, and a clear operating framework that eliminates guesswork.</p></div></div>";

// B4 Package
h+='<div class="dv"></div><div class="sec"><div class="sl">Recommended Package</div><h2>'+E(prog.name)+"</h2><p>"+E(prog.pos)+'</p><div class="pp"><div class="ico">✦</div><div><div style="font-size:20px;font-weight:800;color:#1a2744">'+E(prog.name)+'</div><div style="font-size:14px;color:#3a4560;margin-top:2px">'+E(p.termLength)+" · "+E(dp)+"</div></div></div></div>";

// B5 Pillars
h+='<div class="dv"></div><div class="bl"><div class="sec"><div class="sl">Service Pillars</div><h2>What This Program Covers</h2><div class="pgrid">';
prog.pillars.forEach(function(pl){h+='<div class="pcard"><div class="pi">'+pl.i+'</div><div class="pt">'+E(pl.t)+'</div><div class="pb">'+E(pl.b)+'</div><div class="pd">'+E(pl.d)+"</div></div>"});
h+="</div></div></div>";

// B6 Scope
h+='<div class="dv"></div><div class="sec"><div class="sl">Scope & Deliverables</div><h2>What\'s Included</h2><div class="scg"><div class="scol"><h4 style="color:#4a7cff">Core Engagement</h4>';
prog.recurring.forEach(function(s){h+='<div class="si"><span style="color:#4a7cff;font-weight:700">✓</span><span>'+E(s)+"</span></div>"});
h+='</div><div class="scol"><h4 style="color:#7c5cff">Core Engagement Scope</h4>';
scope.forEach(function(s){h+='<div class="si"><span style="color:#7c5cff;font-weight:700">⬥</span><span>'+E(s)+"</span></div>"});
h+='</div><div class="scol"><h4 style="color:#2e6b4f">Tangible Deliverables</h4>';
prog.deliverables.forEach(function(s){h+='<div class="si"><span style="color:#2e6b4f;font-weight:700">◆</span><span>'+E(s)+"</span></div>"});
h+="</div></div></div>";

// B7 Timeline
h+='<div class="dv"></div><div class="bl"><div class="sec"><div class="sl">Timeline & Service Map</div>';
if(prog.timeline==="engagement"){
  var numMods=Math.min(Math.max(parseInt(p.majorMods)||2,1),11);
  var numTrn=Math.min(Math.max(parseInt(p.trainingSessions)||2,1),12);
  var numAdv=Math.min(Math.max(Math.round(parseFloat(p.callsPerMonth||1)*12),1),12);
  var cad=(p.reportingCadence||"Quarterly").toLowerCase();
  var numCmp=cad.indexOf("month")>=0?12:cad.indexOf("semi")>=0?2:cad.indexOf("annual")>=0||cad.indexOf("year")>=0?1:4;
  var eBuyOn=(p.eBuySupport||"yes")==="yes";
  function sm(n,s){s=s||0;var a=[0,0,0,0,0,0,0,0,0,0,0,0];for(var j=0;j<n;j++){var x=s+(n>1?Math.round(j*(11-s)/(n-1)):0);a[Math.min(11,x)]=1;}return a;}
  var rows=[
    {l:"Catalog Mgmt",      i:"📦",c:"#4a7cff",m:[1,0,0,1,0,0,1,0,0,1,0,0]},
    {l:"Modifications",     i:"🔧",c:"#3358d4",m:sm(numMods,1)},
    {l:"Compliance",        i:"📊",c:"#5a85ff",m:sm(numCmp,2)},
    {l:"Advisory",          i:"💡",c:"#7c5cff",m:sm(numAdv,0)},
    {l:"eBuy & Advantage",  i:"🛒",c:"#4a7cff",m:eBuyOn?sm(2,4):[0,0,0,0,0,0,0,0,0,0,0,0]},
    {l:"Training & Support",i:"🎓",c:"#ff6b6b",m:sm(numTrn,1)}
  ];
  var LW=170; var CW=52;
  h+='<h2>Contract Engagement Timeline</h2>';
  h+='<p style="margin-bottom:24px;color:#8896b0;font-size:14px">Month 1 is engagement start. Hover any marker for scheduled activities.</p>';
  h+='<div style="overflow-x:auto;-webkit-overflow-scrolling:touch">';
  h+='<div style="min-width:'+(LW+CW*12)+'px">';
  // Month header row
  h+='<div style="display:flex;align-items:center;padding-bottom:12px;border-bottom:2px solid #f0f1f5;margin-bottom:6px">';
  h+='<div style="width:'+LW+'px;flex-shrink:0"></div>';
  for(var mi=1;mi<=12;mi++){
    var m1=mi===1;
    h+='<div style="width:'+CW+'px;flex-shrink:0;text-align:center">';
    h+='<div style="'+(m1?'width:36px;height:36px;background:#ff9800;color:#fff;border-radius:50%;font-size:13px;font-weight:800;box-shadow:0 4px 12px rgba(255,152,0,.3)':'font-size:13px;font-weight:700;color:#b0b8cc;padding:8px 0')+';display:flex;align-items:center;justify-content:center;margin:0 auto">'+mi+'</div>';
    h+='</div>';
  }
  h+='</div>';
  // Service rows
  rows.forEach(function(row,ri){
    var mc=0;
    h+='<div style="display:flex;align-items:center;padding:10px 0;'+(ri<rows.length-1?'border-bottom:1px solid #f4f5f9':'')+'">';
    h+='<div style="width:'+LW+'px;flex-shrink:0;display:flex;align-items:center;gap:10px">';
    h+='<span style="font-size:18px;line-height:1;opacity:.85">'+row.i+'</span>';
    h+='<span style="font-size:13px;font-weight:600;color:#1a2744">'+E(row.l)+'</span>';
    h+='</div>';
    for(var ci=0;ci<12;ci++){
      var isInit=(row.l==="Modifications"&&ci===0);
      var active=row.m[ci]||isInit;
      var tid="et-"+ri+"-"+ci;
      if(active&&row.l==="Modifications"&&!isInit)mc++;
      var bg=isInit?"#ff9800":row.c;
      var lbl=isInit?"K":row.l==="Modifications"?String(mc):"";
      h+='<div style="width:'+CW+'px;flex-shrink:0;text-align:center;position:relative" onmouseenter="eH(\''+tid+'\',1)" onmouseleave="eH(\''+tid+'\',0)">';
      if(active){
        h+='<div style="width:36px;height:36px;border-radius:50%;background:'+bg+';margin:0 auto;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;box-shadow:0 3px 10px rgba(0,0,0,.12)">'+lbl+'</div>';
        h+='<div id="'+tid+'" style="display:none;position:absolute;z-index:100;bottom:44px;left:50%;transform:translateX(-50%);background:#1a2744;color:#fff;border-radius:10px;padding:10px 14px;min-width:170px;max-width:230px;font-size:11px;line-height:1.7;box-shadow:0 8px 24px rgba(0,0,0,.2);pointer-events:none;text-align:left;white-space:normal">';
        h+='<div style="font-size:10px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.1em;margin-bottom:5px;font-weight:700">'+(isInit?"Month 1 — Kickoff":"Month "+(ci+1)+" — "+E(row.l))+'</div>';
        h+=(isInit?"Engagement kickoff · AN setup · Document audit · Catalog review":prog.mdata[ci].join(" · "));
        h+='<div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #1a2744"></div>';
        h+='</div>';
      } else {
        h+='<div style="width:8px;height:8px;border-radius:50%;background:#eaecf2;margin:14px auto"></div>';
      }
      h+='</div>';
    }
    h+='</div>';
  });
  h+='</div></div>';
}else if(prog.timeline==="roadmap"){
  h+='<h2>'+(prog.rmTitle||"Submission Roadmap")+'</h2><p>'+(prog.rmSub||"Hover each phase to explore milestones. Timelines conditioned on client responsiveness.")+'</p><div class="rm"><div class="ln"></div>';
  var phases=p.customPhases?p.customPhases.map(function(cp,i){var d=prog.phases[i]||{};return{ph:d.ph,t:cp.t||d.t,dur:cp.dur||d.dur,items:cp.items&&cp.items.length?cp.items:d.items,pct:d.pct};}):prog.phases;
  phases.forEach(function(ph,i){h+='<div class="rm-item"><div class="rm-dot">'+(i+1)+'</div><div class="rm-card"><div style="font-size:17px;font-weight:700;color:#1a2744">'+E(ph.t)+'</div><div style="font-size:12px;color:#8896b0;margin-top:2px">'+E(ph.ph)+" · "+E(ph.dur)+'</div><div class="rm-tags">';ph.items.forEach(function(it){h+='<span class="rm-tag">'+E(it)+"</span>"});h+='</div><div class="rm-bar"><div class="rm-fill" style="width:'+ph.pct+'%"></div></div></div></div>'});
  h+="</div>";
}else if(prog.timeline==="workflow"){
  h+='<h2>Modification Workflow</h2><p>Hover to walk through each step of the process.</p><div class="wf"><div class="ln"></div>';
  prog.steps.forEach(function(st){h+='<div class="wf-item"><div class="wf-num">'+st.n+'</div><div class="wf-card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"><div><div style="font-size:17px;font-weight:700;color:#1a2744">'+E(st.t)+'</div><div style="font-size:14px;color:#3a4560;margin-top:3px">'+E(st.d)+'</div></div><div class="wf-dur">'+E(st.dur)+"</div></div></div></div>"});
  h+="</div>";
}else if(prog.timeline==="activation"){
  h+='<h2>90-Day Activation Timeline</h2><p>Hover each card for full detail on each phase.</p><div class="act">';
  prog.acts.forEach(function(a){h+='<div class="actc"><div class="atop"></div><div style="font-size:12px;font-weight:700;color:#4a7cff;letter-spacing:.06em;text-transform:uppercase;margin:4px 0">'+E(a.per)+'</div><div style="font-size:20px;font-weight:800;color:#1a2744;margin-bottom:4px">'+E(a.t)+'</div><div style="font-size:13px;color:#8896b0;margin-bottom:18px">'+E(a.s)+"</div>";a.items.forEach(function(it){h+='<div class="ai"><div class="acheck">✓</div><span style="font-size:13px;color:#3a4560">'+E(it)+"</span></div>"});h+='<div style="margin-top:20px;display:flex;align-items:center;gap:12px"><div style="position:relative;width:40px;height:40px"><svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#eef0f6" stroke-width="4"/><circle cx="20" cy="20" r="16" fill="none" stroke="#4a7cff" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+a.pct+" "+(100-a.pct)+'" stroke-dashoffset="25"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#1a2744">'+a.pct+'%</div></div><div style="font-size:12px;color:#8896b0">Activation progress</div></div></div>'});
  h+="</div>";
}
h+="</div></div>";

// B8 Pricing
h+='<div class="dv"></div><div class="sec"><div class="sl">Investment</div><h2>Pricing & Service Terms</h2><div style="border-radius:18px;border:1px solid #e8ecf2;overflow:hidden;margin-top:24px"><table class="st"><thead><tr><th>Description</th><th>Details</th></tr></thead><tbody><tr><td>Service Program</td><td>'+E(prog.name)+"</td></tr><tr><td>Service Term</td><td>"+E(p.termLength)+"</td></tr><tr><td>Program Fee</td><td>"+E(p.price)+"</td></tr>";
if(hasDisc)h+='<tr class="disc-row"><td>'+E(p.discountLabel||"Discount")+"</td><td>"+E(p.discountDisplay)+'</td></tr><tr class="total-row"><td>Total Due</td><td>'+E(p.finalPrice)+"</td></tr>";
h+="<tr><td>Payment Terms</td><td>"+E(p.paymentTerms)+'</td></tr></tbody></table></div><div class="vp"><h4>Why This Investment Makes Sense</h4><p>This program replaces the cost and risk of managing GSA operations without dedicated expertise. '+E(p.clientName)+" gets structured support, defined deliverables, and professional execution — less confusion, fewer missed obligations, and faster turnaround.</p></div></div>";

// B9 Why us
h+='<div class="dv"></div><div class="bl"><div class="sec"><div class="sl">Why '+E(p.providerCompany)+'</div><h2>What Makes Us Different</h2><div class="wug">';
[{i:"📊",t:"10+ Years of GSA Experience",d:"Deep operational knowledge of GSA systems, requirements, and contracting practices. We live inside these systems daily — no learning curve, just immediate expertise."},{i:"🎯",t:"Practical GSA Approach",d:"We focus on what actually works. No complexity for complexity's sake. Straightforward strategies and proven methods designed to move your contract forward fast."},{i:"🔄",t:"Always Up to Date",d:"Regulatory changes, policy updates, and GSA requirements. We monitor these so you don't have to. Your compliance stays current without your team's extra effort."},{i:"🤝",t:"Transparency & Routine Communication",d:"Regular scheduled meetings, clear status updates, and honest conversations. We adapt to your needs and keep you informed every step of the way."}].forEach(function(w){h+='<div class="wuc"><div style="font-size:24px;margin-bottom:10px">'+w.i+'</div><div style="font-size:16px;font-weight:700;color:#1a2744;margin-bottom:6px">'+E(w.t)+'</div><div style="font-size:14px;line-height:1.65">'+E(w.d)+"</div></div>"});
h+="</div></div></div>";

// B10 Terms + Sig
h+='<div class="dv"></div><div class="sec"><div class="sl">Terms & Conditions</div><h2>Legal Agreement</h2>';
h+='<div class="tc"><h3>1. Acceptance of Terms</h3><p>By executing this proposal, Client acknowledges that it has read, understood, and agrees to be bound by all terms and conditions herein. Acceptance constitutes a binding contract between '+E(p.clientName)+" and "+E(p.providerCompany)+'.</p></div>';
h+='<div class="tc"><h3>2. Scope of Services</h3><p>Provider agrees to deliver the '+E(prog.name)+' as described in this proposal. Services shall be performed in a professional and timely manner according to industry standards and all applicable federal regulations, including FAR (Federal Acquisition Regulation) requirements.</p></div>';
h+='<div class="tc"><h3>3. Service Term</h3><p>This engagement covers '+E(p.termLength)+" beginning on the date of execution. Either party may terminate with thirty (30) days written notice. Upon early termination, Client shall pay for all Services rendered through the termination date.</p></div>";
h+='<div class="tc"><h3>4. Payment Terms & Conditions</h3><p>Client shall pay Provider the total fee of '+E(dp)+' '+E((p.paymentTerms||"").toLowerCase())+". Invoices are due within thirty (30) days of receipt. Late payments shall accrue interest at 1.5% per month or the maximum rate allowed by law. Disputed invoice amounts must be reported within fifteen (15) days of receipt.</p></div>";
h+='<div class="tc"><h3>5. Client Responsibilities</h3><p>Client shall provide timely access to all necessary documentation, credentials, systems, and personnel. Client is responsible for maintaining accurate SAM.gov registration and providing feedback on deliverables within agreed timeframes. Delays in Client response may extend project timelines proportionately.</p></div>';
h+='<div class="tc"><h3>6. Provider Responsibilities</h3><p>Provider shall perform all services with reasonable care, skill, and diligence to accomplish the milestones outlined in this agreement. Provider is responsible for maintaining confidentiality of Client information, adhering to GSA requirements, and providing deliverables as outlined in this proposal. Provider shall not subcontract any portion of the work without Client prior written consent.</p></div>';
h+='<div class="tc"><h3>7. Data Security & Confidentiality</h3><p>Provider shall implement reasonable security measures to protect Client proprietary information and sensitive data. Provider shall not disclose confidential information to third parties without Client prior written consent, except as required by law. This obligation survives termination for two (2) years.</p></div>';
h+='<div class="tc"><h3>8. Intellectual Property</h3><p>Client shall own all work product, deliverables, and materials created specifically for Client under this Agreement. Provider retains ownership of pre-existing methodologies, tools, templates, and processes developed prior to or outside the scope of this engagement.</p></div>';
h+='<div class="tc"><h3>9. Limitation of Liability</h3><p>Provider\'s total liability is limited to fees paid by Client in the twelve (12) months preceding the claim, or '+E(dp)+', whichever is less. PROVIDER SHALL NOT BE LIABLE FOR INDIRECT, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, EVEN IF ADVISED OF SUCH POSSIBILITY.</p></div>';
h+='<div class="tc"><h3>10. Independent Contractor</h3><p>Provider is an independent contractor. Neither party is an agent or partner of the other. Client shall not provide employee benefits. Provider is solely responsible for all taxes, insurance, and legal obligations.</p></div>';
h+='<div class="tc"><h3>11. Entire Agreement & Modifications</h3><p>This proposal and executed signature page constitute the entire agreement. No modification or amendment is valid unless in writing and signed by authorized representatives of both parties. Any change to Scope of Work requires a written change order specifying the modification, timeline impact, and fee adjustment.</p></div>';
h+='<div class="tc"><h3>12. Termination for Convenience</h3><p>Client may terminate without cause by providing thirty (30) days written notice. Client shall pay for all Services performed through the termination date plus reasonable wind-down costs.</p></div>';
h+='<div class="tc"><h3>13. Governing Law & Dispute Resolution</h3><p>This Agreement is governed by and construed in accordance with the laws of the State of Colorado, without regard to conflict of law principles. Any disputes shall be resolved through good faith negotiation, mediation, or binding arbitration as mutually agreed.</p></div>';
h+='<div class="tc"><h3>14. Severability</h3><p>If any provision is found invalid or unenforceable, it shall be severed, and remaining provisions shall continue in full force and effect. The parties agree to negotiate replacement language achieving the original intent.</p></div>';
h+='<div class="ab"><strong>By signing below, the authorized representative of '+E(p.clientName)+" confirms: (a) acceptance of all terms and conditions above; (b) authorization to enter into this binding agreement on behalf of "+E(p.clientName)+'; (c) acceptance of the '+E(prog.name)+'; and (d) authorization for '+E(p.providerCompany)+" to commence work immediately upon execution. This proposal remains open for thirty (30) days from the date above.</strong></div>";

// Sigs
h+='<div class="sl" style="margin-top:32px">Signatures</div><div class="sg">';
h+='<div class="sb"><div style="position:absolute;top:0;left:0;right:0;height:4px;background:#4a7cff"></div><div style="font-size:11px;font-weight:700;color:#4a7cff;letter-spacing:.12em;text-transform:uppercase;margin:8px 0 20px">Client — '+E(p.contactName)+(p.contactTitle?", "+E(p.contactTitle):"")+'</div><div style="position:relative;margin-bottom:12px"><canvas id="sc" class="sc'+(signed?" done":"")+'" width="600" height="240"></canvas>'+(!signed&&!dead?'<div id="sph" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;color:#b0b8cc;font-size:14px">Sign here</div>':"")+(signed?'<div style="position:absolute;top:8px;right:8px;background:#4a7cff;color:#fff;font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px">SIGNED ✓</div>':"")+"</div>";
if(!signed&&!dead)h+='<div class="sbtns" id="sbt"><button class="bcl" onclick="clrS()">Clear</button><button class="bcf" id="bcf" disabled onclick="cfmS()">Confirm Signature</button></div>';
h+='<div style="font-size:16px;font-weight:700;color:#1a2744;margin-top:8px">'+E(p.contactName||"[Name]")+'</div><div style="font-size:13px;color:#3a4560;margin-top:2px">'+E(p.contactTitle||"[Title]")+", "+E(p.clientName)+'</div><div style="margin-top:20px;border-bottom:1px solid #e8ecf2;padding-bottom:8px"></div><div style="font-size:11px;color:#8896b0;margin-top:6px;font-weight:600">'+(signed?fd(p.signedAt):"Date")+"</div></div>";
h+='<div class="sb"><div style="position:absolute;top:0;left:0;right:0;height:4px;background:#1a2744"></div><div style="font-size:11px;font-weight:700;color:#1a2744;letter-spacing:.12em;text-transform:uppercase;margin:8px 0 20px">Provider — '+E(p.providerSigner)+(p.providerTitle?", "+E(p.providerTitle):"")+'</div><div style="position:relative;margin-bottom:12px"><canvas id="sp" class="sc done" width="600" height="240"></canvas><div style="position:absolute;top:8px;right:8px;background:#1a2744;color:#fff;font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px">PRE-SIGNED</div></div><div style="font-size:16px;font-weight:700;color:#1a2744;margin-top:8px">'+E(p.providerSigner||"[Name]")+'</div><div style="font-size:13px;color:#3a4560;margin-top:2px">'+E(p.providerTitle||"[Title]")+", "+E(p.providerCompany)+'</div><div style="margin-top:20px;border-bottom:1px solid #e8ecf2;padding-bottom:8px"></div><div style="font-size:11px;color:#8896b0;margin-top:6px;font-weight:600">'+fd(p.createdAt)+"</div></div></div>";

if(!signed&&!dead)h+='<div style="text-align:center;margin:32px 0" class="nb" id="fa" style2="display:none"><button class="bf" id="bfn" onclick="fin()">Finalize Agreement</button><div style="font-size:12px;color:#8896b0;margin-top:10px">Your signature has been captured. Click to lock.</div></div>';

if(signed){
  h+='<div class="ps"><div style="font-size:24px">✅</div><h3>Agreement Signed</h3><p>Executed on '+fd(p.signedAt)+'.</p><div class="psb nb"><button onclick="dlPDF()" class="ba bo">⬇ Download PDF</button><button onclick="window.print()" class="ba bo">🖨 Print</button>';
  if(p.squareLink)h+='<a href="'+E(p.squareLink)+'" target="_blank" class="ba bsq">💳 Pay with Square</a>';
  h+="</div></div>";
  if(p.squareLink)h+='<div style="margin-top:16px" class="nb"><div class="sqsec"><div style="font-size:22px;font-weight:800;color:#1a2744">Complete Your Payment</div><div style="font-size:15px;color:#3a4560">Secure checkout powered by Square</div><div class="sqprice">'+E(dp)+'</div><a href="'+E(p.squareLink)+'" target="_blank" class="sqbtn">💳 Pay with Square</a><div class="sqmeta"><span>🔒 256-bit encryption</span><span>🛡 PCI compliant</span><span>✅ Instant confirmation</span></div></div></div>';
}
h+='</div><div class="ft">'+E(p.providerCompany)+" · Confidential · "+fd(p.createdAt)+" · Ref: "+E(p.cageCode)+"</div></div>";

document.getElementById("app").innerHTML=h;

// Init canvases
var sp=document.getElementById("sp");if(sp){var x=sp.getContext("2d");sp.width=sp.offsetWidth*2;sp.height=sp.offsetHeight*2;x.scale(2,2);x.strokeStyle="#1a2744";x.lineWidth=2;x.beginPath();x.moveTo(20,80);x.quadraticCurveTo(80,30,160,70);x.quadraticCurveTo(200,90,240,60);x.stroke();}
if(signed&&p.clientSignature){var cv=document.getElementById("sc");if(cv){var cx=cv.getContext("2d");var im=new Image();im.onload=function(){cv.width=cv.offsetWidth*2;cv.height=cv.offsetHeight*2;cx.drawImage(im,0,0,cv.width,cv.height)};im.src=p.clientSignature}}
if(!signed&&!dead){setupSig();var fa=document.getElementById("fa");if(fa)fa.style.display="none";}
window._tok=token;window._p=p;
}

// Engagement timeline tooltip
window.eH=function(id,on){var t=document.getElementById(id);if(t)t.style.display=on?"block":"none"};

// Inline editing toggle
window.toggleEdit=function(){
  var on=!window._editOn;window._editOn=on;
  var btn=document.getElementById("editbtn");
  if(btn){btn.textContent=on?"🔒 Lock":"✏ Edit";btn.style.background=on?"#fff3cd":"";}
  var els=document.querySelectorAll("#pc h1,#pc h2,#pc h3,#pc h4,#pc p,#pc .pos-text,#pc .vp p,#pc .pcard .pd,#pc .pcard .pb,#pc .si span:last-child");
  els.forEach(function(el){
    el.contentEditable=on?"true":"false";
    el.style.outline=on?"1px dashed rgba(74,124,255,.5)":"";
    el.style.borderRadius=on?"3px":"";
    el.style.minHeight=on?"1em":"";
  });
  if(on){var b=document.createElement("div");b.id="edit-notice";b.className="nb";b.style.cssText="position:fixed;bottom:20px;right:20px;background:#1a2744;color:#fff;padding:10px 16px;border-radius:10px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)";b.textContent="✏ Edit mode — click any text to modify. Changes print/PDF but are not saved.";document.body.appendChild(b);}
  else{var n=document.getElementById("edit-notice");if(n)n.remove();}
};

// Gantt hover (legacy)
window.gH=function(r,c,on){var b=document.getElementById("gb-"+r+"-"+c),t=document.getElementById("gt-"+r+"-"+c);if(b){if(on){b.classList.add("active");b.style.boxShadow="0 2px 8px rgba(0,0,0,.15)"}else{b.classList.remove("active");b.style.boxShadow="none"}}if(t)t.style.display=on?"block":"none"};

// Signature
var drw=false,hasC=false,cfmd=false;
function setupSig(){var cv=document.getElementById("sc");if(!cv)return;var ctx=cv.getContext("2d");var dpr=window.devicePixelRatio||1;var W=600,H=200;cv.width=W*dpr;cv.height=H*dpr;cv.style.width="100%";cv.style.height="100px";ctx.scale(dpr,dpr);ctx.strokeStyle="#1a2744";ctx.lineWidth=2;ctx.lineCap="round";ctx.lineJoin="round";function gp(e){var r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top}}
cv.onmousedown=function(e){if(cfmd)return;drw=true;hasC=true;var p=gp(e);ctx.beginPath();ctx.moveTo(p.x,p.y);var ph=document.getElementById("sph");if(ph)ph.remove();document.getElementById("bcf").disabled=false};cv.onmousemove=function(e){if(!drw||cfmd)return;ctx.lineTo(gp(e).x,gp(e).y);ctx.stroke()};cv.onmouseup=cv.onmouseleave=function(){drw=false};
cv.ontouchstart=function(e){e.preventDefault();if(cfmd)return;drw=true;hasC=true;var p=gp(e);ctx.beginPath();ctx.moveTo(p.x,p.y);var ph=document.getElementById("sph");if(ph)ph.remove();document.getElementById("bcf").disabled=false};cv.ontouchmove=function(e){e.preventDefault();if(!drw||cfmd)return;ctx.lineTo(gp(e).x,gp(e).y);ctx.stroke()};cv.ontouchend=function(){drw=false}}
window.clrS=function(){if(cfmd)return;var cv=document.getElementById("sc");cv.getContext("2d").clearRect(0,0,600,200);hasC=false;document.getElementById("bcf").disabled=true};
window.cfmS=function(){if(!hasC)return;cfmd=true;document.getElementById("sc").classList.add("done");document.getElementById("sbt").style.display="none";var fa=document.getElementById("fa");if(fa)fa.style.display="block"};
window.showPayOverlay=function(url){var dp=window._p?(window._p.finalPrice||window._p.price||""):"";var ov=document.createElement("div");ov.id="pay-ov";ov.style.cssText="position:fixed;inset:0;background:rgba(10,20,50,.88);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px";ov.innerHTML='<div style="background:#fff;border-radius:20px;padding:40px 36px;max-width:480px;width:100%;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.3)"><div style="font-size:56px;margin-bottom:16px">✅</div><div style="font-size:26px;font-weight:800;color:#1a2744;margin-bottom:8px">Agreement Signed!</div><div style="font-size:15px;color:#5a6a8a;margin-bottom:28px;line-height:1.5">Your agreement is executed. Complete your payment to get started.</div>'+(dp?'<div style="font-size:22px;font-weight:700;color:#1a2744;margin-bottom:20px">'+E(dp)+'</div>':'')+'<a href="'+E(url)+'" target="_blank" onclick="setTimeout(function(){location.reload()},800)" style="display:block;padding:18px;background:linear-gradient(135deg,#006aff,#0052cc);color:#fff;border-radius:14px;font-size:17px;font-weight:700;text-decoration:none;margin-bottom:14px;box-shadow:0 6px 24px rgba(0,106,255,.35)">💳 Pay Now'+(dp?' — '+E(dp):'')+'</a><button onclick="location.reload()" style="background:none;border:none;color:#8896b0;font-size:13px;cursor:pointer;font-family:inherit;text-decoration:underline">I\'ll pay later — view signed agreement</button></div>';document.body.appendChild(ov);};
window.fin=async function(){var btn=document.getElementById("bfn");btn.disabled=true;btn.textContent="Signing...";var sig=document.getElementById("sc").toDataURL("image/png");try{var res=await fetch("/api/proposals/"+window._tok,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clientSignature:sig})});if(!res.ok){var e=await res.json();alert(e.error||"Error");btn.disabled=false;btn.textContent="Finalize Agreement";return}var sq=window._p&&window._p.squareLink;if(sq){showPayOverlay(sq);}else{location.reload();}}catch(e){alert("Network error.");btn.disabled=false;btn.textContent="Finalize Agreement"}};
window.dlPDF=function(){var el=document.getElementById("pc"),nb=document.querySelectorAll(".nb");nb.forEach(function(x){x.style.display="none"});var p=window._p;html2pdf().set({margin:[.4,.4,.4,.4],filename:"GSA_Proposal_"+(p.cageCode||"draft")+"_"+(p.clientName||"client").replace(/[^a-zA-Z0-9]/g,"_")+".pdf",image:{type:"jpeg",quality:.95},html2canvas:{scale:2,useCORS:true,scrollY:0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"},pagebreak:{mode:["css","legacy"]}}).from(el).save().then(function(){nb.forEach(function(x){x.style.display=""})})};
})();
