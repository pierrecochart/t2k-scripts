// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
(function() {
  const deadline = new Date('2027-01-31T23:59:59');
  function update() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) {
      document.getElementById('cnt-days').textContent = '0';
      document.getElementById('cnt-months').textContent = '0';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30.44);
    document.getElementById('cnt-days').textContent = days.toLocaleString();
    document.getElementById('cnt-months').textContent = months;
  }
  update();
  setInterval(update, 60000);
})();


// ── COMPREHENSIVE EXCHANGE DATABASE ─────────────────────────────────────────
// Source: Openreach published stop-sell tranches 1–23
// Fields: [name, district, code, stopSellDate, status]
// status: 'closed' | 'active' | 'announced'
const EXCHANGES = [
  // ── PILOT / PHYSICALLY CLOSED ──────────────────────────────────────────
  ["Deddington","Oxfordshire","SCDED","2025-11-01","closed"],
  ["Kenton Road","Harrow, London","LDKEN","2026-11-02","announced"],
  ["Ballyclare","Co. Antrim","NIBA","2026-11-02","announced"],
  // ── PHASE 1 EXIT (work started 2026) ───────────────────────────────────
  ["Staines","Surrey","LDSTAI","2028-04-01","announced"],
  ["Thames Ditton","Surrey","LDTHD","2028-04-01","announced"],
  ["Baynard","City of London","LDBAYN","2028-04-01","announced"],
  ["Wraysbury","Berkshire","LDWRAY","2028-04-01","announced"],
  ["Nazeing","Essex","ENAZE","2028-04-01","announced"],
  ["Langford","Bedfordshire","EMLAN","2028-04-01","announced"],
  ["Allestree Park","Derby","EMALLE","2021-10-13","active"],
  ["Beacon","Aylesbury Vale","EMBEAC","2028-04-01","announced"],
  ["Childwall","Liverpool","NWCHIL","2028-04-01","announced"],
  ["Lundin Links","Fife","ESLUN","2028-04-01","announced"],
  ["Carrickfergus","Co. Antrim","NICAR","2028-04-01","announced"],
  ["Glengormley","Co. Antrim","NIGL","2022-11-01","active"],
  // ── TRANCHE 1 (Oct 2021) ───────────────────────────────────────────────
  ["Abbeyhill","City of Edinburgh","ESABB","2021-10-13","active"],
  ["Achnasheen","Highland","NSASN","2021-10-13","active"],
  ["Altnaharra","Highland","NSALT","2021-10-13","active"],
  ["Alva","Clackmannanshire","ESALV","2022-08-02","active"],
  ["Bathgate","West Lothian","ESBAT","2022-02-08","active"],
  ["Bellshill","North Lanarkshire","ESBEL","2022-02-08","active"],
  ["Bonnyrigg","Midlothian","ESBON","2022-02-08","active"],
  ["Broxburn","West Lothian","ESBRO","2022-02-08","active"],
  ["Burnside","South Lanarkshire","ESBUR","2022-02-08","active"],
  ["Cambuslang","South Lanarkshire","ESCAM","2022-02-08","active"],
  ["Clydebank","West Dunbartonshire","ESCLY","2022-02-08","active"],
  ["Coatbridge","North Lanarkshire","ESCOA","2022-02-08","active"],
  ["Dalkeith","Midlothian","ESDAL","2022-02-08","active"],
  ["Dumbarton","West Dunbartonshire","ESDUN","2022-02-08","active"],
  ["Dunfermline","Fife","ESDFM","2022-02-08","active"],
  ["East Kilbride","South Lanarkshire","ESEKIL","2022-02-08","active"],
  ["Fauldhouse","West Lothian","ESFAU","2022-02-08","active"],
  ["Giffnock","East Renfrewshire","ESGIF","2022-02-08","active"],
  ["Greenock","Inverclyde","ESGRE","2022-02-08","active"],
  ["Haddington","East Lothian","ESHAD","2022-02-08","active"],
  ["Hamilton","South Lanarkshire","ESHAM","2022-02-08","active"],
  ["Johnstone","Renfrewshire","ESJOH","2022-02-08","active"],
  ["Kilmarnock","East Ayrshire","WSKILM","2022-02-08","active"],
  ["Kilwinning","North Ayrshire","WSKIL","2022-02-08","active"],
  ["Kirkintilloch","East Dunbartonshire","ESKIR","2022-02-08","active"],
  ["Larkhill","South Lanarkshire","ESLAR","2022-02-08","active"],
  ["Linlithgow","West Lothian","ESLIN","2022-02-08","active"],
  ["Livingston","West Lothian","ESLIV","2022-02-08","active"],
  ["Motherwell","North Lanarkshire","ESMOT","2022-02-08","active"],
  ["Musselburgh","East Lothian","ESMUS","2022-02-08","active"],
  ["Newton Mearns","East Renfrewshire","ESNEW","2022-08-02","active"],
  ["Paisley","Renfrewshire","ESPAI","2022-02-08","active"],
  ["Penicuik","Midlothian","ESPEN","2022-02-08","active"],
  ["Polmont","Falkirk","ESPOL","2022-02-08","active"],
  ["Port Glasgow","Inverclyde","ESPOR","2022-02-08","active"],
  ["Renfrew","Renfrewshire","ESREN","2022-08-02","active"],
  ["Rutherglen","South Lanarkshire","ESRUT","2022-02-08","active"],
  ["Shotts","North Lanarkshire","ESSHO","2022-02-08","active"],
  ["Tranent","East Lothian","ESTRA","2022-02-08","active"],
  ["Wishaw","North Lanarkshire","ESWIS","2022-02-08","active"],
  // ── TRANCHE 2 (Apr 2022) ───────────────────────────────────────────────
  ["Aberdare","Rhondda Cynon Taf","SWAA","2022-08-02","active"],
  ["Aberdeen Balgownie","Aberdeen","NSBLG","2023-02-08","active"],
  ["Aghalee","Lisburn and Castlereagh","NIAL","2022-11-01","active"],
  ["Ahoghill","Mid and East Antrim","NIAH","2022-11-01","active"],
  ["Aldridge","Walsall","CMALD","2023-02-08","active"],
  ["Alfreton","Derbyshire","EMALFRE","2023-02-08","active"],
  ["Allesley","Coventry","CMALL","2023-02-08","active"],
  ["Alvaston","Derby","EMALVAS","2022-08-02","active"],
  ["Annalong","Newry, Mourne and Down","NIAA","2022-11-01","active"],
  ["Anstruther","Fife","ESANS","2022-08-02","active"],
  ["Antrim","Co. Antrim","NIAN","2022-11-01","active"],
  ["Arbroath","Angus","ESARB","2022-08-02","active"],
  ["Armagh","Co. Armagh","NIAM","2022-11-01","active"],
  ["Arnold","Nottingham","EMAR","2023-02-08","active"],
  ["Atherstone","Warwickshire","CMATHER","2023-02-08","active"],
  ["Ayr","South Ayrshire","WSAYR","2022-08-02","active"],
  ["Ballyclare","Co. Antrim","NIBA","2022-11-01","active"],
  ["Ballygowan","Co. Down","NIBGO","2022-11-01","active"],
  ["Ballymena","Co. Antrim","NIBM","2022-11-01","active"],
  ["Ballymoney","Co. Antrim","NIBMY","2022-11-01","active"],
  ["Banbridge","Co. Down","NIBRI","2022-11-01","active"],
  ["Bangor Co Down","Co. Down","NIBN","2022-11-01","active"],
  ["Barnsley","South Yorkshire","YMBAR","2022-08-02","active"],
  ["Barrow-in-Furness","Cumbria","NWBAR","2022-08-02","active"],
  ["Basildon","Essex","ENBA","2022-08-02","active"],
  ["Basingstoke","Hampshire","SCBAS","2022-08-02","active"],
  ["Bath","Somerset","SCBAT","2022-08-02","active"],
  ["Beaconsfield","Buckinghamshire","LDBEAC","2023-02-08","active"],
  ["Bearsden","East Dunbartonshire","ESBEA","2022-08-02","active"],
  ["Belfast Central","Belfast","NIBEC","2022-11-01","active"],
  ["Belfast East","Belfast","NIBEE","2022-11-01","active"],
  ["Belfast North","Belfast","NIBEN","2022-11-01","active"],
  ["Belfast South","Belfast","NIBES","2022-11-01","active"],
  ["Belfast West","Belfast","NIBEW","2022-11-01","active"],
  ["Berrywood","Northampton","EMBERRY","2023-02-08","active"],
  ["Birmingham Central","Birmingham","CMBIC","2022-08-02","active"],
  ["Birmingham Saltley","Birmingham","CMBISAL","2023-02-08","active"],
  ["Birmingham South","Birmingham","CMBIS","2022-08-02","active"],
  ["Blackburn","Lancashire","NWBLB","2022-08-02","active"],
  ["Blackpool","Lancashire","NWBLP","2022-08-02","active"],
  ["Blyth","Northumberland","NMBLY","2022-08-02","active"],
  ["Bolton","Lancashire","NWBOL","2022-08-02","active"],
  ["Bournemouth","Bournemouth","SCBOU","2022-08-02","active"],
  ["Bradford Central","West Yorkshire","YMBRA","2022-08-02","active"],
  ["Bridgend","Vale of Glamorgan","SWBRG","2022-08-02","active"],
  ["Brighton","East Sussex","SCBRI","2022-08-02","active"],
  ["Bristol Central","Bristol","SCBRC","2022-08-02","active"],
  ["Bromley","London","LDBRO","2022-08-02","active"],
  ["Burnley","Lancashire","NWBUR","2022-08-02","active"],
  ["Bury","Greater Manchester","NWBUY","2022-08-02","active"],
  ["Cambridge","Cambridgeshire","ENCAM","2022-08-02","active"],
  ["Cardiff Central","Cardiff","SWCAC","2022-08-02","active"],
  ["Carlisle","Cumbria","NMCAR","2022-08-02","active"],
  ["Carrickfergus","Co. Antrim","NICAR","2022-11-01","active"],
  ["Castlereagh","Belfast","NICAST","2022-11-01","active"],
  ["Chelmsford","Essex","ENCHE","2022-08-02","active"],
  ["Cheltenham","Gloucestershire","SCCHL","2022-08-02","active"],
  ["Chester","Cheshire","NWCHE","2022-08-02","active"],
  ["Chesterfield","Derbyshire","EMCHEF","2022-08-02","active"],
  ["Christchurch","Dorset","SCCHR","2022-08-02","active"],
  ["Cleethorpes","Lincolnshire","YMCLE","2022-08-02","active"],
  ["Clitheroe","Lancashire","NWCLI","2022-08-02","active"],
  ["Colchester","Essex","ENCOL","2022-08-02","active"],
  ["Coleraine","Co. Londonderry","NICOL","2022-04-29","active"],
  ["Consett","County Durham","NMCON","2022-08-02","active"],
  ["Cookstown","Co. Tyrone","NICOO","2022-11-01","active"],
  ["Coventry","Coventry","CMCOV","2022-08-02","active"],
  ["Crawley","West Sussex","SCCRA","2022-08-02","active"],
  ["Crewe","Cheshire","NWCRE","2022-08-02","active"],
  ["Darlington","County Durham","NMDAR","2022-08-02","active"],
  ["Derry/Londonderry","Co. Londonderry","NIDERR","2022-11-01","active"],
  ["Derby Central","Derby","EMDER","2022-08-02","active"],
  ["Dewsbury","West Yorkshire","YMDEW","2022-08-02","active"],
  ["Doncaster","South Yorkshire","YMDON","2022-08-02","active"],
  ["Dorchester","Dorset","SCDOR","2022-08-02","active"],
  ["Downpatrick","Co. Down","NIDOW","2022-11-01","active"],
  ["Dromore","Co. Down","NIDRO","2022-11-01","active"],
  ["Dudley","West Midlands","CMDUL","2022-08-02","active"],
  ["Dumfries","Dumfries and Galloway","WSDUF","2022-08-02","active"],
  ["Dundee","Dundee","ESDUN","2022-08-02","active"],
  ["Dunganno","Co. Tyrone","NIDUN","2022-11-01","active"],
  ["Durham","County Durham","NMDUM","2022-08-02","active"],
  ["Eastbourne","East Sussex","SCEAS","2022-08-02","active"],
  ["Eastleigh","Hampshire","SCEAT","2022-08-02","active"],
  ["Edinburgh Central","City of Edinburgh","ESEC","2022-02-08","active"],
  ["Ellesmere Port","Cheshire","NWELP","2022-04-29","active"],
  ["Enniskillen","Co. Fermanagh","NIENNI","2022-11-01","active"],
  ["Enfield","London","LDENF","2022-08-02","active"],
  ["Exeter","Devon","SCEXE","2022-08-02","active"],
  ["Fareham","Hampshire","SCFAR","2022-08-02","active"],
  ["Farnborough","Hampshire","SCFAN","2022-08-02","active"],
  ["Farnham","Surrey","SCFAM","2022-08-02","active"],
  ["Farnworth","Greater Manchester","NWFAR","2022-08-02","active"],
  ["Ferndown","Dorset","SCFED","2022-08-02","active"],
  ["Fleetwood","Lancashire","NWFLE","2022-08-02","active"],
  ["Folkestone","Kent","SCFOL","2022-08-02","active"],
  ["Gateshead","Tyne and Wear","NMGAT","2022-08-02","active"],
  ["Gillingham","Kent","SCGIL","2022-08-02","active"],
  ["Glasgow Central","Glasgow","ESGC","2022-02-08","active"],
  ["Gloucester","Gloucestershire","SCGLO","2022-08-02","active"],
  ["Gosport","Hampshire","SCGOS","2022-08-02","active"],
  ["Grimsby","Lincolnshire","YMGRI","2022-08-02","active"],
  ["Guildford","Surrey","SCGUI","2022-08-02","active"],
  ["Halifax","West Yorkshire","YMHAL","2022-08-02","active"],
  ["Harlow","Essex","ENHAR","2022-08-02","active"],
  ["Harrogate","North Yorkshire","YMHRG","2022-08-02","active"],
  ["Hartlepool","County Durham","NMHAT","2022-08-02","active"],
  ["Hastings","East Sussex","SCHAS","2022-08-02","active"],
  ["Havant","Hampshire","SCHAV","2022-08-02","active"],
  ["Hayes","Greater London","LDHAYES","2022-04-29","active"],
  ["Hereford","Herefordshire","CMHERE","2022-08-02","active"],
  ["Heywood","Greater Manchester","NWHEY","2022-08-02","active"],
  ["High Wycombe","Buckinghamshire","SCHIW","2022-08-02","active"],
  ["Horsham","West Sussex","SCHOR","2022-08-02","active"],
  ["Huddersfield","West Yorkshire","YMHUD","2022-08-02","active"],
  ["Hull Central","Kingston upon Hull","YMHUC","2022-08-02","active"],
  ["Ilkeston","Derbyshire","EMILK","2023-02-08","active"],
  ["Inverness","Highland","NSINV","2022-08-02","active"],
  ["Ipswich","Suffolk","ENIPS","2022-08-02","active"],
  ["Keighley","West Yorkshire","YMKEI","2022-08-02","active"],
  ["Kelso","Scottish Borders","ESKEL","2022-04-29","active"],
  ["Kettering","Northamptonshire","EMKET","2022-08-02","active"],
  ["Kidderminster","Worcestershire","CMKID","2022-08-02","active"],
  ["Kilmarnock","East Ayrshire","WSKILM","2022-02-08","active"],
  ["Kings Lynn","Norfolk","ENKLY","2022-08-02","active"],
  ["Kingston upon Thames","London","LDKIN","2022-08-02","active"],
  ["Kirkcaldy","Fife","ESKIR","2022-08-02","active"],
  ["Larne","Co. Antrim","NILA","2022-11-01","active"],
  ["Leeds Central","West Yorkshire","YMLEC","2022-08-02","active"],
  ["Leicester Central","Leicester","EMLEIC","2022-08-02","active"],
  ["Leigh","Greater Manchester","NWLEI","2022-08-02","active"],
  ["Limavady","Co. Londonderry","NILIM","2022-11-01","active"],
  ["Lincoln","Lincolnshire","EMLIN","2022-08-02","active"],
  ["Lisburn","Co. Antrim","NILIS","2022-11-01","active"],
  ["Llanelli","Carmarthenshire","SWLLE","2022-08-02","active"],
  ["London Central","London","LDLOC","2022-02-08","active"],
  ["London East","London","LDLOE","2022-08-02","active"],
  ["London North","London","LDLON","2022-08-02","active"],
  ["London South","London","LDLOS","2022-08-02","active"],
  ["London West","London","LDLOW","2022-08-02","active"],
  ["Londonderry","Co. Londonderry","NILONDON","2022-11-01","active"],
  ["Loughborough","Leicestershire","EMLOU","2022-08-02","active"],
  ["Lowestoft","Suffolk","ENLOWES","2022-08-02","active"],
  ["Luton","Bedfordshire","EMLU","2022-08-02","active"],
  ["Macclesfield","Cheshire","NWMAC","2022-08-02","active"],
  ["Magherafelt","Co. Londonderry","NIMAG","2022-11-01","active"],
  ["Maidstone","Kent","SCMAI","2022-08-02","active"],
  ["Manchester Central","Greater Manchester","NWMAC","2022-08-02","active"],
  ["Mansfield","Nottinghamshire","EMMAN","2022-08-02","active"],
  ["Medway","Kent","SCMED","2022-08-02","active"],
  ["Middlesbrough","North Yorkshire","NMMID","2022-08-02","active"],
  ["Mildenhall","Suffolk","ENMIL","2023-05-26","active"],
  ["Milton Keynes","Buckinghamshire","EMMIL","2022-08-02","active"],
  ["Morecambe","Lancashire","NWMOR","2022-08-02","active"],
  ["Morley","West Yorkshire","YMMOR","2022-08-02","active"],
  ["Motherwell","North Lanarkshire","ESMOT","2022-02-08","active"],
  ["Newcastle Central","Tyne and Wear","NMNEC","2022-08-02","active"],
  ["Newcastle under Lyme","Staffordshire","CMNL","2022-08-02","active"],
  ["Newry","Co. Down","NINEW","2022-11-01","active"],
  ["Newtownabbey","Co. Antrim","NINEWA","2022-11-01","active"],
  ["Newtownards","Co. Down","NINAB","2022-11-01","active"],
  ["Northampton","Northamptonshire","EMNORT","2022-08-02","active"],
  ["Norwich","Norfolk","ENNOR","2022-08-02","active"],
  ["Nottingham","Nottinghamshire","EMNOT","2022-08-02","active"],
  ["Nuneaton","Warwickshire","CMNUN","2022-08-02","active"],
  ["Oldham","Greater Manchester","NWOLD","2022-08-02","active"],
  ["Omagh","Co. Tyrone","NIOM","2022-11-01","active"],
  ["Oxford","Oxfordshire","SCOX","2022-08-02","active"],
  ["Peterborough","Cambridgeshire","EMPE","2022-08-02","active"],
  ["Plymouth","Devon","SCPLY","2022-08-02","active"],
  ["Poole","Dorset","SCPOO","2022-08-02","active"],
  ["Portsmouth","Hampshire","SCPOR","2022-08-02","active"],
  ["Preston","Lancashire","NWPRE","2022-08-02","active"],
  ["Reading","Berkshire","SCREA","2022-08-02","active"],
  ["Redditch","Worcestershire","CMRED","2022-08-02","active"],
  ["Rochdale","Greater Manchester","NWROC","2022-08-02","active"],
  ["Rotherham","South Yorkshire","YMROT","2022-08-02","active"],
  ["Rowlands Gill","Gateshead","NMROW","2022-08-02","active"],
  ["Rugby","Warwickshire","CMRUG","2022-08-02","active"],
  ["Runcorn","Cheshire","NWRUN","2022-08-02","active"],
  ["Ruthin","Denbighshire","NWRUT","2022-08-02","active"],
  ["Saintfield","Co. Down","NISAI","2022-11-01","active"],
  ["Salford","Greater Manchester","NWSAL","2022-08-02","active"],
  ["Salisbury","Wiltshire","SCSAL","2023-05-26","active"],
  ["Scarborough","North Yorkshire","YMSC","2022-08-02","active"],
  ["Scunthorpe","Lincolnshire","YMSC","2022-08-02","active"],
  ["Sheffield Central","South Yorkshire","YMSHC","2022-08-02","active"],
  ["Shrewsbury","Shropshire","CMSHR","2022-08-02","active"],
  ["Slough","Berkshire","LDSLO","2022-08-02","active"],
  ["Solihull","West Midlands","CMSO","2022-08-02","active"],
  ["Southampton","Hampshire","SCSOU","2022-08-02","active"],
  ["Southend-on-Sea","Essex","ENSOU","2022-08-02","active"],
  ["Southport","Merseyside","NWSOP","2022-08-02","active"],
  ["St Helens","Merseyside","NWSTH","2022-08-02","active"],
  ["Stafford","Staffordshire","CMSTAF","2022-08-02","active"],
  ["Stevenage","Hertfordshire","ENSTE","2022-08-02","active"],
  ["Stirling","Stirling","ESSTIRF","2022-08-02","active"],
  ["Stockport","Greater Manchester","NWSTO","2022-08-02","active"],
  ["Stoke-on-Trent","Staffordshire","CMSTO","2022-08-02","active"],
  ["Stroud","Gloucestershire","SCSTR","2022-08-02","active"],
  ["Sunderland","Tyne and Wear","NMSUN","2022-08-02","active"],
  ["Sutton Coldfield","Birmingham","CMSUT","2022-08-02","active"],
  ["Swansea","Swansea","SWSWA","2022-08-02","active"],
  ["Swindon","Wiltshire","SCSWI","2022-08-02","active"],
  ["Telford","Shropshire","CMTEL","2022-08-02","active"],
  ["Torquay","Devon","SCTOR","2022-08-02","active"],
  ["Totton","Hampshire","SCTOT","2022-08-02","active"],
  ["Truro","Cornwall","SCTR","2022-08-02","active"],
  ["Wakefield","West Yorkshire","YMWAK","2022-08-02","active"],
  ["Walsall","West Midlands","CMWAL","2022-08-02","active"],
  ["Warrington","Cheshire","NWWAR","2022-08-02","active"],
  ["Waterlooville","Hampshire","SCWATV","2022-08-02","active"],
  ["Watford","Hertfordshire","ENWAT","2022-08-02","active"],
  ["Weymouth","Dorset","SCWEY","2022-08-02","active"],
  ["Wigan","Greater Manchester","NWWIG","2022-08-02","active"],
  ["Winchester","Hampshire","SCWIN","2022-08-02","active"],
  ["Wolverhampton","West Midlands","CMWOL","2022-08-02","active"],
  ["Worcester","Worcestershire","CMWOR","2022-08-02","active"],
  ["Worksop","Nottinghamshire","EMWOK","2022-08-02","active"],
  ["Worthing","West Sussex","SCWOR","2022-08-02","active"],
  ["Wrexham","Wrexham","NWWREX","2025-11-06","active"],
  ["Yeovil","Somerset","SCYEO","2022-08-02","active"],
  ["York","North Yorkshire","YMYOR","2022-08-02","active"],
  // ── LATER TRANCHES (selected key additions) ─────────────────────────────
  ["Abingdon","Oxfordshire","SCABI","2023-02-08","active"],
  ["Andover","Hampshire","SCAND","2023-02-08","active"],
  ["Barnstaple","Devon","SCBARS","2023-02-08","active"],
  ["Birkenhead","Merseyside","NWBIR","2023-02-08","active"],
  ["Blackwood","Caerphilly","SWBLA","2023-02-08","active"],
  ["Bognor Regis","West Sussex","SCBOG","2023-02-08","active"],
  ["Boston","Lincolnshire","EMBOS","2023-02-08","active"],
  ["Bournemouth East","Bournemouth","SCBOUE","2023-02-08","active"],
  ["Bradford South","West Yorkshire","YMBRAS","2023-02-08","active"],
  ["Brentwood","Essex","ENBREN","2023-02-08","active"],
  ["Bridgwater","Somerset","SCBRW","2023-02-08","active"],
  ["Bromsgrove","Worcestershire","CMBRO","2023-02-08","active"],
  ["Burnham","Berkshire","SCBURN","2023-02-08","active"],
  ["Burton upon Trent","Staffordshire","CMBUT","2023-02-08","active"],
  ["Bury St Edmunds","Suffolk","ENBS","2023-02-08","active"],
  ["Caerphilly","Caerphilly","SWCAE","2023-02-08","active"],
  ["Canterbury","Kent","SCCAN","2023-02-08","active"],
  ["Chesham","Buckinghamshire","SCHES","2023-02-08","active"],
  ["Chichester","West Sussex","SCCHI","2023-02-08","active"],
  ["Chippenham","Wiltshire","SCCHIP","2023-02-08","active"],
  ["Cirencester","Gloucestershire","SCCIR","2023-02-08","active"],
  ["Clacton-on-Sea","Essex","ENCLA","2023-02-08","active"],
  ["Cramlington","Northumberland","NMCRA","2023-02-08","active"],
  ["Cwmbran","Torfaen","SWCWM","2023-02-08","active"],
  ["Daventry","Northamptonshire","EMDAV","2023-02-08","active"],
  ["Droitwich","Worcestershire","CMDROI","2023-02-08","active"],
  ["Dunstable","Bedfordshire","EMDUN","2023-02-08","active"],
  ["East Grinstead","West Sussex","SCEG","2023-02-08","active"],
  ["Eastwood","Nottinghamshire","EMEAST","2023-02-08","active"],
  ["Evesham","Worcestershire","CMEVE","2023-02-08","active"],
  ["Exmouth","Devon","SCEXM","2023-02-08","active"],
  ["Frome","Somerset","SCFRO","2023-02-08","active"],
  ["Gainsborough","Lincolnshire","EMGAI","2023-02-08","active"],
  ["Grantham","Lincolnshire","EMGRA","2023-02-08","active"],
  ["Gravesend","Kent","SCGRA","2023-02-08","active"],
  ["Great Yarmouth","Norfolk","ENGY","2023-02-08","active"],
  ["Grimsby East","Lincolnshire","YMGRIE","2023-02-08","active"],
  ["Halesowen","West Midlands","CMHAL","2023-02-08","active"],
  ["Harlow North","Essex","ENHARN","2023-02-08","active"],
  ["Harrow","London","LDHAR","2023-02-08","active"],
  ["Haywards Heath","West Sussex","SCHAY","2023-02-08","active"],
  ["Hemel Hempstead","Hertfordshire","ENHEM","2023-02-08","active"],
  ["Hereford South","Herefordshire","CMHERS","2023-02-08","active"],
  ["Hexham","Northumberland","NMHEX","2023-02-08","active"],
  ["Hinckley","Leicestershire","EMHIN","2023-02-08","active"],
  ["Hitchin","Hertfordshire","ENHIT","2023-02-08","active"],
  ["Holyhead","Anglesey","NWHOL","2023-02-08","active"],
  ["Honiton","Devon","SCHON","2023-02-08","active"],
  ["Ilford","London","LDILF","2023-02-08","active"],
  ["Kingswood","Bristol","SCKINGSW","2023-02-08","active"],
  ["Knottingley","West Yorkshire","YMKNO","2023-02-08","active"],
  ["Lancaster","Lancashire","NWLAN","2023-02-08","active"],
  ["Leamington Spa","Warwickshire","CMLEA","2023-02-08","active"],
  ["Leatherhead","Surrey","SCLEATH","2023-02-08","active"],
  ["Letchworth","Hertfordshire","ENLET","2023-02-08","active"],
  ["Lichfield","Staffordshire","CMLIC","2023-02-08","active"],
  ["Liverpool Central","Merseyside","NWLIC","2023-02-08","active"],
  ["Llandudno","Conwy","NWLLAN","2023-02-08","active"],
  ["Loughton","Essex","ENLOU","2023-02-08","active"],
  ["Lymington","Hampshire","SCLYM","2023-02-08","active"],
  ["Maidenhead","Berkshire","SCMAID","2023-02-08","active"],
  ["Merthyr Tydfil","Merthyr Tydfil","SWMER","2023-02-08","active"],
  ["Morecambe South","Lancashire","NWMORS","2023-02-08","active"],
  ["Newark","Nottinghamshire","EMNEW","2023-02-08","active"],
  ["Newbury","Berkshire","SCNEW","2023-02-08","active"],
  ["Newport","Newport","SWNEW","2023-02-08","active"],
  ["Newtownabbey","Co. Antrim","NINEWA","2023-02-08","active"],
  ["Newton Abbot","Devon","SCNAB","2023-02-08","active"],
  ["Northwich","Cheshire","NWNOR","2023-02-08","active"],
  ["Paignton","Devon","SCPAI","2023-02-08","active"],
  ["Penrith","Cumbria","NMPEN","2023-02-08","active"],
  ["Penzance","Cornwall","SCPEN","2023-02-08","active"],
  ["Pershore","Worcestershire","CMPERS","2023-02-08","active"],
  ["Perth","Perth and Kinross","ESPER","2023-02-08","active"],
  ["Peterlee","County Durham","NMPET","2023-02-08","active"],
  ["Pontypool","Torfaen","SWPON","2023-02-08","active"],
  ["Pontypridd","Rhondda Cynon Taf","SWPONT","2023-02-08","active"],
  ["Portadown","Co. Armagh","NIPOR","2022-11-01","active"],
  ["Redcar","North Yorkshire","NMRED","2023-02-08","active"],
  ["Redhill","Surrey","SCREDH","2023-02-08","active"],
  ["Reigate","Surrey","SCREIG","2023-02-08","active"],
  ["Rhyl","Denbighshire","NWRHY","2023-02-08","active"],
  ["Ringwood","Hampshire","SCRIN","2023-02-08","active"],
  ["Ripon","North Yorkshire","YMRIP","2023-02-08","active"],
  ["Romsey","Hampshire","SCROM","2023-02-08","active"],
  ["Ross-on-Wye","Herefordshire","CMROS","2023-02-08","active"],
  ["Saltash","Cornwall","SCSAL","2023-02-08","active"],
  ["Selby","North Yorkshire","YMSEL","2023-02-08","active"],
  ["Sevenoaks","Kent","SCSEV","2023-02-08","active"],
  ["Skipton","North Yorkshire","YMSKI","2023-02-08","active"],
  ["Sleaford","Lincolnshire","EMSLE","2023-02-08","active"],
  ["Spalding","Lincolnshire","EMSPA","2023-02-08","active"],
  ["St Albans","Hertfordshire","ENSTAL","2023-02-08","active"],
  ["Stamford","Lincolnshire","EMSTA","2023-02-08","active"],
  ["Stroud South","Gloucestershire","SCSTRS","2023-02-08","active"],
  ["Tamworth","Staffordshire","CMTAM","2023-02-08","active"],
  ["Taunton","Somerset","SCTAU","2023-02-08","active"],
  ["Tiverton","Devon","SCTIV","2023-02-08","active"],
  ["Tunbridge Wells","Kent","SCTUN","2023-02-08","active"],
  ["Twickenham","London","LDTWI","2023-02-08","active"],
  ["Uckfield","East Sussex","SCUCK","2023-02-08","active"],
  ["Warminster","Wiltshire","SCWARM","2023-02-08","active"],
  ["Warwick","Warwickshire","CMWAR","2023-02-08","active"],
  ["Wellingborough","Northamptonshire","EMWEL","2023-02-08","active"],
  ["Welwyn Garden City","Hertfordshire","ENWGC","2023-02-08","active"],
  ["Whitehaven","Cumbria","NMWHI","2023-02-08","active"],
  ["Whitstable","Kent","SCWHI","2023-02-08","active"],
  ["Wisbech","Cambridgeshire","ENWIS","2023-02-08","active"],
  ["Witney","Oxfordshire","SCWIT","2023-02-08","active"],
  ["Woking","Surrey","SCWOK","2023-02-08","active"],
  ["Wokingham","Berkshire","SCWOK","2023-02-08","active"],
  ["Woodbridge","Suffolk","ENWOO","2023-02-08","active"],
  ["Workington","Cumbria","NMWRK","2023-02-08","active"],
  ["Wymondham","Norfolk","ENWYM","2023-02-08","active"],
  ["Yate","South Gloucestershire","SCYAT","2023-02-08","active"],
  ["Aberdeen Central","Aberdeen","NSABC","2023-08-29","active"],
  ["Abergavenny","Monmouthshire","SWABE","2023-08-29","active"],
  ["Aberystwyth","Ceredigion","SWABR","2023-08-29","active"],
  ["Aylesbury","Buckinghamshire","SCAYL","2023-08-29","active"],
  ["Bangor Gwynedd","Gwynedd","NWBAN","2023-08-29","active"],
  ["Bicester","Oxfordshire","SCBIC","2023-08-29","active"],
  ["Bodmin","Cornwall","SCBOD","2023-08-29","active"],
  ["Brecon","Powys","SWBRE","2023-08-29","active"],
  ["Bridgnorth","Shropshire","CMBRIG","2023-08-29","active"],
  ["Bridgwater","Somerset","SCBRW","2023-08-29","active"],
  ["Bridport","Dorset","SCBRP","2023-08-29","active"],
  ["Buxton","Derbyshire","EMBUX","2023-08-29","active"],
  ["Caernarfon","Gwynedd","NWCARN","2023-08-29","active"],
  ["Carmarthen","Carmarthenshire","SWCAR","2023-08-29","active"],
  ["Chard","Somerset","SCCHA","2023-08-29","active"],
  ["Colwyn Bay","Conwy","NWCOL","2023-08-29","active"],
  ["Crediton","Devon","SCCRED","2023-08-29","active"],
  ["Devizes","Wiltshire","SCDEV","2023-08-29","active"],
  ["Dover","Kent","SCDOV","2023-08-29","active"],
  ["Driffield","East Riding","YMDRIF","2023-08-29","active"],
  ["Dudley South","West Midlands","CMDULS","2023-08-29","active"],
  ["Dundee North","Dundee","ESDUN","2023-08-29","active"],
  ["Faversham","Kent","SCFAV","2023-08-29","active"],
  ["Glastonbury","Somerset","SCGLAS","2023-08-29","active"],
  ["Goole","East Riding","YMGOO","2023-08-29","active"],
  ["Harwich","Essex","ENHARW","2023-08-29","active"],
  ["Huntingdon","Cambridgeshire","ENHUN","2023-08-29","active"],
  ["Kendal","Cumbria","NMKEN","2023-08-29","active"],
  ["Ledbury","Herefordshire","CMLED","2023-08-29","active"],
  ["Leominster","Herefordshire","CMLEO","2023-08-29","active"],
  ["Ludlow","Shropshire","CMLUD","2023-08-29","active"],
  ["Lymington South","Hampshire","SCLYS","2023-08-29","active"],
  ["Malvern","Worcestershire","CMMAL","2023-08-29","active"],
  ["Market Harborough","Leicestershire","EMMAH","2023-08-29","active"],
  ["Marlborough","Wiltshire","SCMAR","2023-08-29","active"],
  ["Minehead","Somerset","SCMIN","2023-08-29","active"],
  ["Monmouth","Monmouthshire","SWMON","2023-08-29","active"],
  ["Neath","Neath Port Talbot","SWNEA","2023-08-29","active"],
  ["Newmarket","Suffolk","ENNEWM","2023-08-29","active"],
  ["Oswestry","Shropshire","CMOS","2023-08-29","active"],
  ["Porthmadog","Gwynedd","NWPORM","2023-08-29","active"],
  ["Pwllheli","Gwynedd","NWPWL","2023-08-29","active"],
  ["Ryde","Isle of Wight","SCRY","2023-08-29","active"],
  ["Shaftesbury","Dorset","SCSHAF","2023-08-29","active"],
  ["Shepton Mallet","Somerset","SCSHE","2023-08-29","active"],
  ["Sittingbourne","Kent","SCSIT","2023-08-29","active"],
  ["Swanage","Dorset","SCSWAN","2023-08-29","active"],
  ["Tewkesbury","Gloucestershire","SCTEW","2023-08-29","active"],
  ["Thetford","Norfolk","ENTHET","2023-08-29","active"],
  ["Tonbridge","Kent","SCTON","2023-08-29","active"],
  ["Wareham","Dorset","SCWARE","2023-08-29","active"],
  ["Welshpool","Powys","NWWEL","2023-08-29","active"],
  ["Wincanton","Somerset","SCWINC","2023-08-29","active"],
  ["Winchester South","Hampshire","SCWINS","2023-08-29","active"],
  ["Wrexham South","Wrexham","NWWREXS","2023-08-29","active"],
];


const POSTCODE_TO_EXCHANGE = {
  // London
  "E1":"London East","E2":"London East","E3":"London East","E4":"London East",
  "E5":"London East","E6":"London East","E7":"London East","E8":"London East",
  "E9":"London East","E10":"London East","E11":"London East","E12":"London East",
  "E13":"London East","E14":"London East","E15":"London East","E16":"London East",
  "E17":"London East","E18":"London East","EC1":"London Central","EC2":"London Central",
  "EC3":"London Central","EC4":"Baynard","WC1":"London Central","WC2":"London Central",
  "W1":"London Central","W2":"London Central","W3":"London Central","W4":"London Central",
  "W5":"London Central","W6":"London Central","W7":"London Central","W8":"London Central",
  "W9":"London Central","W10":"London Central","W11":"London Central","W12":"London Central",
  "W13":"London Central","W14":"London Central","SW1":"London Central","SW2":"London South",
  "SW3":"London Central","SW4":"London South","SW5":"London Central","SW6":"London Central",
  "SW7":"London Central","SW8":"London South","SW9":"London South","SW10":"London Central",
  "SW11":"London South","SW12":"London South","SW13":"London Central","SW14":"London Central",
  "SW15":"London South","SW16":"London South","SW17":"London South","SW18":"London South",
  "SW19":"London South","SW20":"London South","SE1":"London South","SE2":"London South",
  "SE3":"London South","SE4":"London South","SE5":"London South","SE6":"London South",
  "SE7":"London South","SE8":"London South","SE9":"London South","SE10":"London South",
  "SE11":"London South","SE12":"London South","SE13":"London South","SE14":"London South",
  "SE15":"London South","SE16":"London South","SE17":"London South","SE18":"London South",
  "SE19":"London South","SE20":"London South","SE21":"London South","SE22":"London South",
  "SE23":"London South","SE24":"London South","SE25":"London South","SE26":"London South",
  "SE27":"London South","SE28":"London South","N1":"London North","N2":"London North",
  "N3":"London North","N4":"London North","N5":"London North","N6":"London North",
  "N7":"London North","N8":"London North","N9":"London North","N10":"London North",
  "N11":"London North","N12":"London North","N13":"London North","N14":"London North",
  "N15":"London North","N16":"London North","N17":"London North","N18":"London North",
  "N19":"London North","N20":"London North","N21":"London North","N22":"London North",
  "NW1":"London North","NW2":"London North","NW3":"London North","NW4":"London North",
  "NW5":"London North","NW6":"London North","NW7":"London North","NW8":"London North",
  "NW9":"London North","NW10":"London North","NW11":"London North","NW12":"London North",
  "NW13":"London North","NW14":"London North",
  "HA1":"Harrow","HA2":"Harrow","HA3":"Kenton Road","HA4":"London North",
  "HA5":"London North","HA6":"London North","HA7":"London North","HA8":"London North",
  "HA9":"London North","UB1":"Hayes","UB2":"Hayes","UB3":"Hayes","UB4":"Hayes",
  "UB5":"Hayes","UB6":"Hayes","UB7":"Hayes","UB8":"Hayes","UB9":"Hayes","UB10":"Hayes",
  "UB11":"Hayes","IG1":"Ilford","IG2":"Ilford","IG3":"Ilford","IG4":"Ilford",
  "IG5":"Ilford","IG6":"Ilford","IG7":"Loughton","IG8":"Loughton","IG9":"Loughton",
  "IG10":"Loughton","IG11":"Ilford","RM1":"Romford","RM2":"Romford","RM3":"Romford",
  "RM4":"Romford","RM5":"Romford","RM6":"Romford","RM7":"Romford","RM8":"Romford",
  "RM9":"Romford","RM10":"Romford","RM11":"Romford","RM12":"Romford","RM13":"Romford",
  "RM14":"Romford","RM15":"Romford","RM16":"Romford","RM17":"Gravesend","RM18":"Gravesend",
  "RM19":"Gravesend","RM20":"Gravesend","DA1":"Dartford","DA2":"Dartford","DA3":"Gravesend",
  "DA4":"Sevenoaks","DA5":"Bromley","DA6":"Bromley","DA7":"Bromley","DA8":"Bromley",
  "DA9":"Gravesend","DA10":"Gravesend","DA11":"Gravesend","DA12":"Gravesend","DA13":"Gravesend",
  "DA14":"Bromley","DA15":"Bromley","DA16":"Bromley","DA17":"Bromley","DA18":"Bromley",
  "BR1":"Bromley","BR2":"Bromley","BR3":"Bromley","BR4":"Bromley","BR5":"Bromley",
  "BR6":"Orpington","BR7":"Bromley","BR8":"Bromley","CR0":"Croydon","CR2":"Croydon",
  "CR3":"Redhill","CR4":"Croydon","CR5":"Redhill","CR6":"Redhill","CR7":"Croydon",
  "CR8":"Croydon","CR9":"Croydon","SM1":"Sutton","SM2":"Sutton","SM3":"Sutton",
  "SM4":"Sutton","SM5":"Sutton","SM6":"Sutton","SM7":"Sutton","KT1":"Kingston upon Thames",
  "KT2":"Kingston upon Thames","KT3":"Kingston upon Thames","KT4":"Kingston upon Thames",
  "KT5":"Kingston upon Thames","KT6":"Kingston upon Thames","KT7":"Thames Ditton",
  "KT8":"Kingston upon Thames","KT9":"Kingston upon Thames","KT10":"Thames Ditton",
  "KT11":"Leatherhead","KT12":"Weybridge","KT13":"Weybridge","KT14":"Weybridge",
  "KT15":"Weybridge","KT16":"Staines","KT17":"Sutton","KT18":"Leatherhead",
  "KT19":"Leatherhead","KT20":"Leatherhead","KT21":"Leatherhead","KT22":"Leatherhead",
  "KT23":"Leatherhead","KT24":"Leatherhead","TW1":"Twickenham","TW2":"Twickenham",
  "TW3":"Twickenham","TW4":"Twickenham","TW5":"Twickenham","TW6":"Twickenham",
  "TW7":"Twickenham","TW8":"Twickenham","TW9":"Twickenham","TW10":"Twickenham",
  "TW11":"Twickenham","TW12":"Twickenham","TW13":"Twickenham","TW14":"Twickenham",
  "TW15":"Staines","TW16":"Staines","TW17":"Staines","TW18":"Staines","TW19":"Wraysbury",
  "TW20":"Staines","EN1":"Enfield","EN2":"Enfield","EN3":"Enfield","EN4":"Enfield",
  "EN5":"Enfield","EN6":"Enfield","EN7":"Enfield","EN8":"Enfield","EN9":"Nazeing",
  "EN10":"Enfield","EN11":"Enfield",
  // South East
  "BN1":"Brighton","BN2":"Brighton","BN3":"Brighton","BN41":"Brighton",
  "BN43":"Brighton","BN44":"Brighton","BN5":"Brighton","BN6":"Brighton",
  "BN7":"Brighton","BN8":"Brighton","BN9":"Brighton","BN10":"Eastbourne",
  "BN11":"Worthing","BN12":"Worthing","BN13":"Worthing","BN14":"Worthing",
  "BN15":"Worthing","BN16":"Worthing","BN17":"Worthing","BN18":"Worthing",
  "BN20":"Eastbourne","BN21":"Eastbourne","BN22":"Eastbourne","BN23":"Eastbourne",
  "BN24":"Eastbourne","BN25":"Eastbourne","BN26":"Eastbourne","BN27":"Hastings",
  "BN45":"Brighton","RH1":"Redhill","RH2":"Reigate","RH3":"Reigate","RH4":"Dorking",
  "RH5":"Dorking","RH6":"Crawley","RH7":"East Grinstead","RH8":"Sevenoaks",
  "RH9":"Redhill","RH10":"Crawley","RH11":"Crawley","RH12":"Horsham","RH13":"Horsham",
  "RH14":"Horsham","RH15":"Haywards Heath","RH16":"Haywards Heath","RH17":"Haywards Heath",
  "RH18":"East Grinstead","RH19":"East Grinstead","RH20":"Horsham",
  "GU1":"Guildford","GU2":"Guildford","GU3":"Guildford","GU4":"Guildford",
  "GU5":"Guildford","GU6":"Guildford","GU7":"Guildford","GU8":"Guildford",
  "GU9":"Farnham","GU10":"Farnham","GU11":"Farnborough","GU12":"Farnborough",
  "GU13":"Farnborough","GU14":"Farnborough","GU15":"Camberley","GU16":"Camberley",
  "GU17":"Farnborough","GU18":"Staines","GU19":"Guildford","GU20":"Guildford",
  "GU21":"Woking","GU22":"Woking","GU23":"Woking","GU24":"Woking","GU25":"Staines",
  "GU26":"Haslemere","GU27":"Haslemere","GU28":"Haslemere","GU29":"Haslemere",
  "GU30":"Haslemere","GU31":"Petersfield","GU32":"Petersfield","GU33":"Petersfield",
  "GU34":"Alton","GU35":"Alton","GU46":"Farnborough","GU47":"Camberley",
  "GU51":"Farnborough","GU52":"Farnborough",
  "ME1":"Medway","ME2":"Medway","ME3":"Medway","ME4":"Medway","ME5":"Medway",
  "ME6":"Medway","ME7":"Medway","ME8":"Medway","ME9":"Sittingbourne",
  "ME10":"Sittingbourne","ME11":"Sittingbourne","ME12":"Sittingbourne",
  "ME13":"Faversham","ME14":"Maidstone","ME15":"Maidstone","ME16":"Maidstone",
  "ME17":"Maidstone","ME18":"Maidstone","ME19":"Maidstone","ME20":"Maidstone",
  "CT1":"Canterbury","CT2":"Canterbury","CT3":"Canterbury","CT4":"Canterbury",
  "CT5":"Whitstable","CT6":"Whitstable","CT7":"Thanet","CT8":"Thanet",
  "CT9":"Thanet","CT10":"Thanet","CT11":"Thanet","CT12":"Thanet","CT13":"Dover",
  "CT14":"Dover","CT15":"Dover","CT16":"Dover","CT17":"Dover","CT18":"Folkestone",
  "CT19":"Folkestone","CT20":"Folkestone","CT21":"Folkestone","TN1":"Tunbridge Wells",
  "TN2":"Tunbridge Wells","TN3":"Tunbridge Wells","TN4":"Tunbridge Wells",
  "TN5":"Tunbridge Wells","TN6":"Uckfield","TN7":"East Grinstead",
  "TN8":"Sevenoaks","TN9":"Tonbridge","TN10":"Tonbridge","TN11":"Tonbridge",
  "TN12":"Tonbridge","TN13":"Sevenoaks","TN14":"Sevenoaks","TN15":"Sevenoaks",
  "TN16":"Sevenoaks","TN17":"Cranbrook","TN18":"Cranbrook","TN19":"Hastings",
  "TN20":"Hastings","TN21":"Hastings","TN22":"Uckfield","TN23":"Ashford",
  "TN24":"Ashford","TN25":"Ashford","TN26":"Ashford","TN27":"Maidstone",
  "TN28":"Folkestone","TN29":"Folkestone","TN30":"Hastings","TN31":"Hastings",
  "TN32":"Hastings","TN33":"Hastings","TN34":"Hastings","TN35":"Hastings",
  "TN36":"Hastings","TN37":"Hastings","TN38":"Hastings","TN39":"Hastings","TN40":"Hastings",
  // Hampshire & Dorset (detailed - key for this audience)
  "BH1":"Bournemouth","BH2":"Bournemouth","BH3":"Bournemouth","BH4":"Bournemouth",
  "BH5":"Bournemouth","BH6":"Bournemouth","BH7":"Bournemouth","BH8":"Bournemouth",
  "BH9":"Bournemouth","BH10":"Bournemouth","BH11":"Bournemouth","BH12":"Poole",
  "BH13":"Poole","BH14":"Poole","BH15":"Poole","BH16":"Poole","BH17":"Poole",
  "BH18":"Poole","BH19":"Swanage","BH20":"Wareham","BH21":"Ferndown","BH22":"Ferndown",
  "BH23":"Christchurch","BH24":"Ringwood","BH25":"Ringwood","BH31":"Ferndown",
  "SO14":"Southampton","SO15":"Southampton","SO16":"Southampton","SO17":"Southampton",
  "SO18":"Southampton","SO19":"Southampton","SO30":"Eastleigh","SO31":"Southampton",
  "SO32":"Southampton","SO40":"Totton","SO41":"Lymington","SO42":"Southampton",
  "SO43":"Southampton","SO45":"Southampton","SO50":"Eastleigh","SO51":"Romsey",
  "SO52":"Romsey","SO53":"Eastleigh","PO1":"Portsmouth","PO2":"Portsmouth",
  "PO3":"Portsmouth","PO4":"Portsmouth","PO5":"Portsmouth","PO6":"Portsmouth",
  "PO7":"Waterlooville","PO8":"Waterlooville","PO9":"Havant","PO10":"Havant",
  "PO11":"Gosport","PO12":"Gosport","PO13":"Gosport","PO14":"Fareham",
  "PO15":"Fareham","PO16":"Fareham","PO17":"Fareham","PO18":"Chichester",
  "PO19":"Chichester","PO20":"Chichester","PO21":"Bognor Regis","PO22":"Bognor Regis",
  "SP1":"Salisbury","SP2":"Salisbury","SP3":"Salisbury","SP4":"Salisbury",
  "SP5":"Salisbury","SP6":"Ringwood","SP7":"Shaftesbury","SP8":"Shaftesbury",
  "SP9":"Andover","SP10":"Andover","SP11":"Andover","RG21":"Basingstoke",
  "RG22":"Basingstoke","RG23":"Basingstoke","RG24":"Basingstoke","RG25":"Basingstoke",
  "RG26":"Basingstoke","RG27":"Farnborough","RG28":"Basingstoke","RG29":"Farnborough",
  "SO20":"Andover","SO21":"Winchester","SO22":"Winchester","SO23":"Winchester",
  "SO24":"Winchester","GU11":"Farnborough","GU14":"Farnborough",
  "DT1":"Dorchester","DT2":"Dorchester","DT3":"Weymouth","DT4":"Weymouth",
  "DT5":"Weymouth","DT6":"Bridport","DT7":"Bridport","DT8":"Dorchester",
  "DT9":"Yeovil","DT10":"Dorchester","DT11":"Blandford",
  "BA1":"Bath","BA2":"Bath","BA3":"Bath","BA4":"Bath","BA5":"Bath","BA6":"Bath",
  "BA7":"Bath","BA8":"Bath","BA9":"Bath","BA10":"Bath","BA11":"Frome",
  "BA12":"Warminster","BA13":"Devizes","BA14":"Devizes","BA15":"Bath","BA16":"Glastonbury",
  "BA20":"Yeovil","BA21":"Yeovil","BA22":"Yeovil",
  // South West
  "BS1":"Bristol Central","BS2":"Bristol Central","BS3":"Bristol Central",
  "BS4":"Bristol Central","BS5":"Bristol Central","BS6":"Bristol Central",
  "BS7":"Bristol Central","BS8":"Bristol Central","BS9":"Bristol Central",
  "BS10":"Bristol Central","BS11":"Bristol Central","BS13":"Bristol Central",
  "BS14":"Bristol Central","BS15":"Kingswood","BS16":"Kingswood","BS20":"Bristol Central",
  "BS21":"Bristol Central","BS22":"Weston-super-Mare","BS23":"Weston-super-Mare",
  "BS24":"Weston-super-Mare","BS25":"Weston-super-Mare","BS26":"Bridgwater",
  "BS27":"Bridgwater","BS28":"Bridgwater","BS29":"Weston-super-Mare","BS30":"Kingswood",
  "BS31":"Bristol Central","BS32":"Bristol Central","BS34":"Bristol Central",
  "BS35":"Bristol Central","BS36":"Bristol Central","BS37":"Yate",
  "BS39":"Bath","BS40":"Bristol Central","BS41":"Bristol Central","BS48":"Bristol Central",
  "BS49":"Weston-super-Mare","GL1":"Gloucester","GL2":"Gloucester","GL3":"Gloucester",
  "GL4":"Gloucester","GL5":"Stroud","GL6":"Stroud","GL7":"Cirencester",
  "GL8":"Cirencester","GL9":"Cirencester","GL10":"Stroud","GL11":"Dursley",
  "GL12":"Dursley","GL13":"Dursley","GL14":"Gloucester","GL15":"Lydney",
  "GL16":"Lydney","GL17":"Gloucester","GL18":"Gloucester","GL19":"Gloucester",
  "GL20":"Tewkesbury","GL50":"Cheltenham","GL51":"Cheltenham","GL52":"Cheltenham",
  "GL53":"Cheltenham","GL54":"Cheltenham","GL55":"Evesham","GL56":"Evesham",
  "EX1":"Exeter","EX2":"Exeter","EX3":"Exmouth","EX4":"Exeter","EX5":"Exeter",
  "EX6":"Exeter","EX7":"Newton Abbot","EX8":"Exmouth","EX9":"Budleigh Salterton",
  "EX10":"Exmouth","EX11":"Honiton","EX12":"Honiton","EX13":"Axminster",
  "EX14":"Honiton","EX15":"Tiverton","EX16":"Tiverton","EX17":"Crediton",
  "EX18":"Barnstaple","EX19":"Barnstaple","EX20":"Okehampton","EX21":"Barnstaple",
  "EX22":"Bude","EX23":"Bude","EX24":"Exmouth","EX31":"Barnstaple","EX32":"Barnstaple",
  "EX33":"Barnstaple","EX34":"Ilfracombe","EX35":"Lynton","EX36":"South Molton",
  "EX37":"Barnstaple","EX38":"Torrington","EX39":"Bideford",
  "PL1":"Plymouth","PL2":"Plymouth","PL3":"Plymouth","PL4":"Plymouth","PL5":"Plymouth",
  "PL6":"Plymouth","PL7":"Plymouth","PL8":"Plymouth","PL9":"Plymouth","PL10":"Plymouth",
  "PL11":"Plymouth","PL12":"Plymouth","PL13":"Plymouth","PL14":"Plymouth","PL15":"Launceston",
  "PL16":"Launceston","PL17":"Plymouth","PL18":"Plymouth","PL19":"Tavistock",
  "PL20":"Tavistock","PL21":"Plymouth","PL22":"Bodmin","PL23":"Bodmin","PL24":"St Austell",
  "PL25":"St Austell","PL26":"St Austell","PL27":"Bodmin","PL28":"Bodmin","PL29":"Bodmin",
  "PL30":"Bodmin","PL31":"Bodmin","PL32":"Camelford","PL33":"Camelford","PL34":"Camelford",
  "PL35":"Camelford","TQ1":"Torquay","TQ2":"Torquay","TQ3":"Torquay","TQ4":"Paignton",
  "TQ5":"Paignton","TQ6":"Dartmouth","TQ7":"Kingsbridge","TQ8":"Kingsbridge",
  "TQ9":"Newton Abbot","TQ10":"Newton Abbot","TQ11":"Newton Abbot","TQ12":"Newton Abbot",
  "TQ13":"Newton Abbot","TQ14":"Newton Abbot","TR1":"Truro","TR2":"Truro",
  "TR3":"Truro","TR4":"Truro","TR5":"Truro","TR6":"Truro","TR7":"Newquay",
  "TR8":"Newquay","TR9":"Newquay","TR10":"Falmouth","TR11":"Falmouth","TR12":"Falmouth",
  "TR13":"Helston","TR14":"Camborne","TR15":"Redruth","TR16":"Redruth","TR17":"Penzance",
  "TR18":"Penzance","TR19":"Penzance","TR20":"Penzance","TR26":"Penzance","TR27":"Penzance",
  // South West / Wiltshire / Somerset
  "SN1":"Swindon","SN2":"Swindon","SN3":"Swindon","SN4":"Swindon","SN5":"Swindon",
  "SN6":"Swindon","SN7":"Swindon","SN8":"Marlborough","SN9":"Devizes","SN10":"Devizes",
  "SN11":"Chippenham","SN12":"Chippenham","SN13":"Chippenham","SN14":"Chippenham",
  "SN15":"Chippenham","SN16":"Malmesbury","SN25":"Swindon","SN26":"Swindon",
  "TA1":"Taunton","TA2":"Taunton","TA3":"Taunton","TA4":"Taunton","TA5":"Bridgwater",
  "TA6":"Bridgwater","TA7":"Bridgwater","TA8":"Bridgwater","TA9":"Bridgwater",
  "TA10":"Taunton","TA11":"Glastonbury","TA12":"Yeovil","TA13":"Yeovil","TA14":"Yeovil",
  "TA15":"Yeovil","TA16":"Yeovil","TA17":"Yeovil","TA18":"Chard","TA19":"Chard",
  "TA20":"Chard","TA21":"Taunton","TA22":"Minehead","TA23":"Minehead","TA24":"Minehead",
  // Home Counties / Oxfordshire / Berkshire / Bucks
  "OX1":"Oxford","OX2":"Oxford","OX3":"Oxford","OX4":"Oxford","OX5":"Bicester",
  "OX6":"Bicester","OX7":"Chipping Norton","OX8":"Witney","OX9":"Thame","OX10":"Oxford",
  "OX11":"Abingdon","OX12":"Abingdon","OX13":"Abingdon","OX14":"Abingdon","OX15":"Deddington",
  "OX16":"Banbury","OX17":"Banbury","OX18":"Witney","OX20":"Oxford","OX25":"Bicester",
  "OX26":"Bicester","OX27":"Bicester","OX28":"Witney","OX29":"Witney","OX33":"Oxford",
  "OX39":"Thame","OX44":"Oxford","OX49":"Henley-on-Thames",
  "RG1":"Reading","RG2":"Reading","RG4":"Reading","RG5":"Reading","RG6":"Reading",
  "RG7":"Basingstoke","RG8":"Reading","RG9":"Henley-on-Thames","RG10":"Maidenhead",
  "RG11":"Reading","RG12":"Bracknell","RG14":"Newbury","RG17":"Newbury","RG18":"Newbury",
  "RG19":"Newbury","RG20":"Newbury","RG30":"Reading","RG31":"Reading","RG40":"Wokingham",
  "RG41":"Wokingham","RG42":"Bracknell","RG45":"Camberley",
  "SL1":"Slough","SL2":"Slough","SL3":"Slough","SL4":"Slough","SL5":"Staines",
  "SL6":"Maidenhead","SL7":"Maidenhead","SL8":"Maidenhead","SL9":"Slough",
  "HP1":"Hemel Hempstead","HP2":"Hemel Hempstead","HP3":"Hemel Hempstead",
  "HP4":"Hemel Hempstead","HP5":"Chesham","HP6":"Chesham","HP7":"Chesham",
  "HP8":"Chesham","HP9":"Beaconsfield","HP10":"Beaconsfield","HP11":"High Wycombe",
  "HP12":"High Wycombe","HP13":"High Wycombe","HP14":"High Wycombe","HP15":"High Wycombe",
  "HP16":"Chesham","HP17":"Aylesbury","HP18":"Aylesbury","HP19":"Aylesbury",
  "HP20":"Aylesbury","HP21":"Aylesbury","HP22":"Aylesbury","HP23":"Hemel Hempstead",
  "HP27":"High Wycombe","MK1":"Milton Keynes","MK2":"Milton Keynes","MK3":"Milton Keynes",
  "MK4":"Milton Keynes","MK5":"Milton Keynes","MK6":"Milton Keynes","MK7":"Milton Keynes",
  "MK8":"Milton Keynes","MK9":"Milton Keynes","MK10":"Milton Keynes","MK11":"Milton Keynes",
  "MK12":"Milton Keynes","MK13":"Milton Keynes","MK14":"Milton Keynes","MK15":"Milton Keynes",
  "MK16":"Milton Keynes","MK17":"Milton Keynes","MK18":"Aylesbury","MK19":"Milton Keynes",
  "MK40":"Bedford","MK41":"Bedford","MK42":"Bedford","MK43":"Bedford","MK44":"Bedford",
  "MK45":"Luton","LU1":"Luton","LU2":"Luton","LU3":"Luton","LU4":"Luton",
  "LU5":"Dunstable","LU6":"Dunstable","LU7":"Luton","AL1":"St Albans","AL2":"St Albans",
  "AL3":"St Albans","AL4":"St Albans","AL5":"St Albans","AL6":"Stevenage",
  "AL7":"Welwyn Garden City","AL8":"Welwyn Garden City","AL9":"Welwyn Garden City",
  "AL10":"Welwyn Garden City","SG1":"Stevenage","SG2":"Stevenage","SG3":"Stevenage",
  "SG4":"Hitchin","SG5":"Hitchin","SG6":"Letchworth","SG7":"Letchworth","SG8":"Royston",
  "SG9":"Stevenage","SG10":"Bishops Stortford","SG11":"Bishops Stortford",
  "SG12":"Ware","SG13":"Ware","SG14":"Ware","HP4":"Hemel Hempstead",
  "WD1":"Watford","WD2":"Watford","WD3":"Watford","WD4":"Watford","WD5":"Watford",
  "WD6":"Watford","WD7":"Watford","WD17":"Watford","WD18":"Watford","WD19":"Watford",
  "WD23":"Watford","WD24":"Watford","WD25":"Watford",
  "EN1":"Enfield","EN2":"Enfield","EN3":"Enfield","EN4":"Enfield","EN5":"Enfield",
  "EN6":"Enfield","EN7":"Enfield","EN8":"Enfield","EN9":"Nazeing","EN10":"Enfield",
  "EN11":"Enfield",
  // East of England
  "CB1":"Cambridge","CB2":"Cambridge","CB3":"Cambridge","CB4":"Cambridge",
  "CB5":"Cambridge","CB6":"Ely","CB7":"Ely","CB8":"Newmarket","CB9":"Haverhill",
  "CB10":"Saffron Walden","CB11":"Saffron Walden","CB21":"Cambridge","CB22":"Cambridge",
  "CB23":"Cambridge","CB24":"Cambridge","CB25":"Ely",
  "CO1":"Colchester","CO2":"Colchester","CO3":"Colchester","CO4":"Colchester",
  "CO5":"Colchester","CO6":"Colchester","CO7":"Colchester","CO8":"Sudbury",
  "CO9":"Sudbury","CO10":"Sudbury","CO11":"Harwich","CO12":"Harwich","CO13":"Clacton-on-Sea",
  "CO14":"Clacton-on-Sea","CO15":"Clacton-on-Sea","CO16":"Clacton-on-Sea",
  "CM1":"Chelmsford","CM2":"Chelmsford","CM3":"Chelmsford","CM4":"Chelmsford",
  "CM5":"Chelmsford","CM6":"Harlow","CM7":"Braintree","CM8":"Braintree",
  "CM9":"Maldon","CM11":"Basildon","CM12":"Basildon","CM13":"Brentwood",
  "CM14":"Brentwood","CM15":"Brentwood","CM16":"Harlow","CM17":"Harlow",
  "CM18":"Harlow","CM19":"Harlow North","CM20":"Harlow","CM21":"Bishops Stortford",
  "CM22":"Bishops Stortford","CM23":"Bishops Stortford","CM24":"Stansted",
  "IP1":"Ipswich","IP2":"Ipswich","IP3":"Ipswich","IP4":"Ipswich","IP5":"Ipswich",
  "IP6":"Ipswich","IP7":"Ipswich","IP8":"Ipswich","IP9":"Ipswich","IP10":"Ipswich",
  "IP11":"Felixstowe","IP12":"Woodbridge","IP13":"Saxmundham","IP14":"Stowmarket",
  "IP15":"Saxmundham","IP16":"Saxmundham","IP17":"Saxmundham","IP18":"Lowestoft",
  "IP19":"Bungay","IP20":"Diss","IP21":"Diss","IP22":"Diss","IP23":"Diss",
  "IP24":"Thetford","IP25":"Dereham","IP26":"Kings Lynn","IP27":"Thetford",
  "IP28":"Mildenhall","IP29":"Bury St Edmunds","IP30":"Bury St Edmunds",
  "IP31":"Bury St Edmunds","IP32":"Bury St Edmunds","IP33":"Bury St Edmunds",
  "NR1":"Norwich","NR2":"Norwich","NR3":"Norwich","NR4":"Norwich","NR5":"Norwich",
  "NR6":"Norwich","NR7":"Norwich","NR8":"Norwich","NR9":"Norwich","NR10":"Norwich",
  "NR11":"Cromer","NR12":"Great Yarmouth","NR13":"Great Yarmouth","NR14":"Norwich",
  "NR15":"Norwich","NR16":"Norwich","NR17":"Wymondham","NR18":"Wymondham",
  "NR19":"Dereham","NR20":"Dereham","NR21":"Fakenham","NR22":"Fakenham",
  "NR23":"Fakenham","NR24":"Cromer","NR25":"Cromer","NR26":"Cromer","NR27":"Cromer",
  "NR28":"North Walsham","NR29":"Great Yarmouth","NR30":"Great Yarmouth",
  "NR31":"Great Yarmouth","NR32":"Lowestoft","NR33":"Lowestoft","NR34":"Bungay",
  "NR35":"Bungay","PE1":"Peterborough","PE2":"Peterborough","PE3":"Peterborough",
  "PE4":"Peterborough","PE5":"Peterborough","PE6":"Peterborough","PE7":"Peterborough",
  "PE8":"Peterborough","PE9":"Stamford","PE10":"Spalding","PE11":"Spalding",
  "PE12":"Spalding","PE13":"Wisbech","PE14":"Wisbech","PE15":"Wisbech",
  "PE16":"Ely","PE17":"Huntingdon","PE18":"Huntingdon","PE19":"Huntingdon",
  "PE20":"Boston","PE21":"Boston","PE22":"Boston","PE23":"Boston","PE24":"Skegness",
  "PE25":"Skegness","PE26":"Huntingdon","PE27":"Huntingdon","PE28":"Huntingdon",
  "PE29":"Huntingdon","PE30":"Kings Lynn","PE31":"Kings Lynn","PE32":"Kings Lynn",
  "PE33":"Kings Lynn","PE34":"Kings Lynn","PE35":"Kings Lynn","PE36":"Hunstanton",
  "PE37":"Swaffham","PE38":"Downham Market",
  // East Midlands
  "NG1":"Nottingham","NG2":"Nottingham","NG3":"Nottingham","NG4":"Nottingham",
  "NG5":"Nottingham","NG6":"Nottingham","NG7":"Nottingham","NG8":"Nottingham",
  "NG9":"Beeston","NG10":"Ilkeston","NG11":"Nottingham","NG12":"Nottingham",
  "NG13":"Nottingham","NG14":"Nottingham","NG15":"Hucknall","NG16":"Eastwood",
  "NG17":"Mansfield","NG18":"Mansfield","NG19":"Mansfield","NG20":"Mansfield",
  "NG21":"Mansfield","NG22":"Newark","NG23":"Newark","NG24":"Newark","NG25":"Nottingham",
  "NG31":"Grantham","NG32":"Grantham","NG33":"Grantham","NG34":"Sleaford",
  "DE1":"Derby Central","DE3":"Derby Central","DE4":"Matlock","DE5":"Ripley",
  "DE6":"Ashbourne","DE7":"Ilkeston","DE11":"Burton upon Trent","DE12":"Burton upon Trent",
  "DE13":"Burton upon Trent","DE14":"Burton upon Trent","DE15":"Burton upon Trent",
  "DE21":"Derby Central","DE22":"Allestree Park","DE23":"Derby Central","DE24":"Derby Central",
  "DE45":"Bakewell","DE55":"Alfreton","DE56":"Belper","DE65":"Derby Central",
  "DE72":"Derby Central","DE73":"Derby Central","DE74":"Derby Central","DE75":"Ripley",
  "LE1":"Leicester Central","LE2":"Leicester Central","LE3":"Leicester Central",
  "LE4":"Leicester Central","LE5":"Leicester Central","LE6":"Leicester Central",
  "LE7":"Leicester Central","LE8":"Leicester Central","LE9":"Hinckley",
  "LE10":"Hinckley","LE11":"Loughborough","LE12":"Loughborough","LE13":"Melton Mowbray",
  "LE14":"Melton Mowbray","LE15":"Oakham","LE16":"Market Harborough",
  "LE17":"Rugby","LE18":"Wigston","LE19":"Enderby","LE65":"Derby Central",
  "LN1":"Lincoln","LN2":"Lincoln","LN3":"Lincoln","LN4":"Lincoln","LN5":"Lincoln",
  "LN6":"Lincoln","LN7":"Grimsby","LN8":"Market Rasen","LN9":"Horncastle",
  "LN10":"Horncastle","LN11":"Louth","LN12":"Mablethorpe","LN13":"Louth",
  "NN1":"Northampton","NN2":"Northampton","NN3":"Northampton","NN4":"Northampton",
  "NN5":"Northampton","NN6":"Northampton","NN7":"Northampton","NN8":"Wellingborough",
  "NN9":"Wellingborough","NN10":"Wellingborough","NN11":"Daventry","NN12":"Towcester",
  "NN13":"Banbury","NN14":"Kettering","NN15":"Kettering","NN16":"Kettering",
  "NN17":"Corby","NN18":"Corby","NN29":"Wellingborough",
  "CV1":"Coventry","CV2":"Walsgrave","CV3":"Coventry","CV4":"Coventry",
  "CV5":"Allesley","CV6":"Coventry","CV7":"Coventry","CV8":"Leamington Spa",
  "CV9":"Atherstone","CV10":"Nuneaton","CV11":"Nuneaton","CV12":"Nuneaton",
  "CV13":"Hinckley","CV21":"Rugby","CV22":"Rugby","CV23":"Rugby","CV31":"Leamington Spa",
  "CV32":"Leamington Spa","CV33":"Leamington Spa","CV34":"Warwick","CV35":"Warwick",
  "CV36":"Warwick","CV37":"Stratford-upon-Avon","CV47":"Leamington Spa",
  // West Midlands
  "B1":"Birmingham Central","B2":"Birmingham Central","B3":"Birmingham Central",
  "B4":"Birmingham Central","B5":"Birmingham Central","B6":"Birmingham Saltley",
  "B7":"Birmingham Saltley","B8":"Birmingham Saltley","B9":"Birmingham Central",
  "B10":"Birmingham Central","B11":"Birmingham Central","B12":"Birmingham Central",
  "B13":"Birmingham Central","B14":"Birmingham Central","B15":"Birmingham Central",
  "B16":"Birmingham Central","B17":"Birmingham Central","B18":"Birmingham Central",
  "B19":"Birmingham Central","B20":"Birmingham Central","B21":"Birmingham Central",
  "B23":"Sutton Coldfield","B24":"Sutton Coldfield","B25":"Birmingham Central",
  "B26":"Birmingham Central","B27":"Solihull","B28":"Birmingham South",
  "B29":"Birmingham South","B30":"Birmingham South","B31":"Birmingham South",
  "B32":"Birmingham South","B33":"Birmingham Central","B34":"Birmingham Central",
  "B35":"Sutton Coldfield","B36":"Sutton Coldfield","B37":"Solihull","B38":"Redditch",
  "B42":"Sutton Coldfield","B43":"Sutton Coldfield","B44":"Sutton Coldfield",
  "B45":"Redditch","B46":"Coleshill","B47":"Redditch","B48":"Redditch",
  "B60":"Bromsgrove","B61":"Bromsgrove","B62":"Halesowen","B63":"Halesowen",
  "B64":"Dudley","B65":"Dudley","B66":"Walsall","B67":"Walsall","B68":"Dudley",
  "B69":"Dudley","B70":"Walsall","B71":"Walsall","B72":"Sutton Coldfield",
  "B73":"Sutton Coldfield","B74":"Sutton Coldfield","B75":"Sutton Coldfield",
  "B76":"Sutton Coldfield","B77":"Tamworth","B78":"Tamworth","B79":"Tamworth",
  "B80":"Redditch","B90":"Solihull","B91":"Solihull","B92":"Solihull",
  "B93":"Solihull","B94":"Solihull","B95":"Stratford-upon-Avon","B96":"Redditch",
  "B97":"Redditch","B98":"Redditch","DY1":"Dudley","DY2":"Dudley","DY3":"Dudley",
  "DY4":"Dudley","DY5":"Dudley","DY6":"Kidderminster","DY7":"Kidderminster",
  "DY8":"Stourbridge","DY9":"Stourbridge","DY10":"Kidderminster","DY11":"Kidderminster",
  "DY12":"Kidderminster","DY13":"Kidderminster","DY14":"Kidderminster",
  "WR1":"Worcester","WR2":"Worcester","WR3":"Worcester","WR4":"Worcester",
  "WR5":"Worcester","WR6":"Worcester","WR7":"Worcester","WR8":"Worcester",
  "WR9":"Droitwich","WR10":"Pershore","WR11":"Evesham","WR12":"Evesham",
  "WR13":"Malvern","WR14":"Malvern","WS1":"Walsall","WS2":"Walsall","WS3":"Walsall",
  "WS4":"Walsall","WS5":"Walsall","WS6":"Walsall","WS7":"Lichfield","WS8":"Walsall",
  "WS9":"Walsall","WS10":"Walsall","WS11":"Cannock","WS12":"Cannock","WS13":"Lichfield",
  "WS14":"Lichfield","WS15":"Rugeley","WV1":"Wolverhampton","WV2":"Wolverhampton",
  "WV3":"Wolverhampton","WV4":"Wolverhampton","WV5":"Wolverhampton","WV6":"Wolverhampton",
  "WV7":"Wolverhampton","WV8":"Wolverhampton","WV9":"Wolverhampton","WV10":"Wolverhampton",
  "WV11":"Wolverhampton","WV12":"Wolverhampton","WV13":"Wolverhampton","WV14":"Wolverhampton",
  "WV15":"Bridgnorth","WV16":"Bridgnorth","ST1":"Stoke-on-Trent","ST2":"Stoke-on-Trent",
  "ST3":"Stoke-on-Trent","ST4":"Stoke-on-Trent","ST5":"Newcastle under Lyme",
  "ST6":"Stoke-on-Trent","ST7":"Stoke-on-Trent","ST8":"Stoke-on-Trent","ST9":"Stoke-on-Trent",
  "ST10":"Cheadle","ST11":"Stoke-on-Trent","ST12":"Stoke-on-Trent","ST13":"Leek",
  "ST14":"Uttoxeter","ST15":"Stafford","ST16":"Stafford","ST17":"Stafford",
  "ST18":"Stafford","ST19":"Stafford","ST20":"Stafford","ST21":"Stafford",
  "TF1":"Telford","TF2":"Telford","TF3":"Telford","TF4":"Telford","TF5":"Telford",
  "TF6":"Telford","TF7":"Telford","TF8":"Telford","TF9":"Market Drayton",
  "TF10":"Newport Shropshire","TF11":"Telford","TF12":"Telford","TF13":"Telford",
  "SY1":"Shrewsbury","SY2":"Shrewsbury","SY3":"Shrewsbury","SY4":"Shrewsbury",
  "SY5":"Shrewsbury","SY6":"Church Stretton","SY7":"Ludlow","SY8":"Ludlow",
  "SY9":"Bishops Castle","SY10":"Oswestry","SY11":"Oswestry","SY12":"Oswestry",
  "SY13":"Whitchurch","SY14":"Whitchurch","SY15":"Welshpool","SY16":"Welshpool",
  "SY17":"Welshpool","SY18":"Aberystwyth","SY19":"Machynlleth","SY20":"Machynlleth",
  "SY21":"Welshpool","SY22":"Oswestry","SY23":"Aberystwyth","SY24":"Aberystwyth",
  "SY25":"Aberystwyth",
  // North West
  "M1":"Manchester Central","M2":"Manchester Central","M3":"Manchester Central",
  "M4":"Manchester Central","M5":"Salford","M6":"Salford","M7":"Salford",
  "M8":"Salford","M9":"Salford","M11":"Manchester Central","M12":"Manchester Central",
  "M13":"Manchester Central","M14":"Manchester Central","M15":"Manchester Central",
  "M16":"Manchester Central","M17":"Manchester Central","M18":"Manchester Central",
  "M19":"Manchester Central","M20":"Manchester Central","M21":"Manchester Central",
  "M22":"Manchester Central","M23":"Manchester Central","M24":"Heywood",
  "M25":"Salford","M26":"Bury","M27":"Salford","M28":"Salford","M29":"Leigh",
  "M30":"Salford","M31":"Warrington","M32":"Stockport","M33":"Stockport",
  "M34":"Stockport","M35":"Oldham","M38":"Bolton","M40":"Manchester Central",
  "M41":"Manchester Central","M43":"Droylsden","M44":"Warrington","M45":"Bury",
  "M46":"Wigan","M50":"Salford","M60":"Manchester Central","M90":"Manchester Central",
  "OL1":"Oldham","OL2":"Oldham","OL3":"Oldham","OL4":"Oldham","OL5":"Macclesfield",
  "OL6":"Stockport","OL7":"Stockport","OL8":"Oldham","OL9":"Oldham","OL10":"Heywood",
  "OL11":"Rochdale","OL12":"Rochdale","OL13":"Burnley","OL14":"Halifax","OL15":"Rochdale",
  "OL16":"Rochdale","SK1":"Stockport","SK2":"Stockport","SK3":"Stockport","SK4":"Stockport",
  "SK5":"Stockport","SK6":"Stockport","SK7":"Stockport","SK8":"Stockport","SK9":"Macclesfield",
  "SK10":"Macclesfield","SK11":"Macclesfield","SK12":"Macclesfield","SK13":"Glossop",
  "SK14":"Hyde","SK15":"Stockport","SK16":"Stockport","SK17":"Buxton","SK22":"New Mills",
  "SK23":"Buxton",
  "BL1":"Bolton","BL2":"Bolton","BL3":"Bolton","BL4":"Farnworth","BL5":"Wigan",
  "BL6":"Bolton","BL7":"Bolton","BL8":"Bury","BL9":"Bury","BL11":"Burnley",
  "WN1":"Wigan","WN2":"Wigan","WN3":"Wigan","WN4":"Wigan","WN5":"Wigan",
  "WN6":"Wigan","WN7":"Leigh","WN8":"Skelmersdale",
  "BB1":"Blackburn","BB2":"Blackburn","BB3":"Blackburn","BB4":"Burnley",
  "BB5":"Burnley","BB6":"Burnley","BB7":"Burnley","BB8":"Burnley","BB9":"Burnley",
  "BB10":"Burnley","BB11":"Burnley","BB12":"Burnley","BB18":"Skipton","BB94":"Clitheroe",
  "FY1":"Blackpool","FY2":"Blackpool","FY3":"Blackpool","FY4":"Blackpool","FY5":"Fleetwood",
  "FY6":"Fleetwood","FY7":"Fleetwood","FY8":"Lytham St Annes",
  "LA1":"Lancaster","LA2":"Lancaster","LA3":"Morecambe","LA4":"Morecambe",
  "LA5":"Carnforth","LA6":"Carnforth","LA7":"Kendal","LA8":"Kendal","LA9":"Kendal",
  "LA10":"Kendal","LA11":"Barrow-in-Furness","LA12":"Barrow-in-Furness","LA13":"Barrow-in-Furness",
  "LA14":"Barrow-in-Furness","LA15":"Barrow-in-Furness","LA16":"Barrow-in-Furness",
  "LA17":"Barrow-in-Furness","LA18":"Barrow-in-Furness","LA19":"Barrow-in-Furness",
  "LA20":"Barrow-in-Furness","LA21":"Windermere","LA22":"Windermere","LA23":"Windermere",
  "PR1":"Preston","PR2":"Fulwood","PR3":"Preston","PR4":"Preston","PR5":"Bamber Bridge",
  "PR6":"Chorley","PR7":"Chorley","PR8":"Southport","PR9":"Southport","PR25":"Leyland",
  "PR26":"Leyland","WA1":"Warrington","WA2":"Warrington","WA3":"Warrington",
  "WA4":"Runcorn","WA5":"Warrington","WA6":"Runcorn","WA7":"Runcorn","WA8":"Widnes",
  "WA9":"St Helens","WA10":"St Helens","WA11":"St Helens","WA12":"St Helens",
  "WA13":"Warrington","WA14":"Altrincham","WA15":"Stockport","WA16":"Knutsford",
  "CH1":"Chester","CH2":"Chester","CH3":"Chester","CH4":"Chester","CH5":"Chester",
  "CH6":"Chester","CH7":"Mold","CH8":"Rhyl","CH41":"Birkenhead","CH42":"Birkenhead",
  "CH43":"Birkenhead","CH44":"Birkenhead","CH45":"Birkenhead","CH46":"Birkenhead",
  "CH47":"Birkenhead","CH48":"Birkenhead","CH49":"Birkenhead","CH60":"Birkenhead",
  "CH61":"Birkenhead","CH62":"Birkenhead","CH63":"Birkenhead","CH64":"Birkenhead",
  "CH65":"Ellesmere Port","CH66":"Ellesmere Port",
  "L1":"Liverpool Central","L2":"Liverpool Central","L3":"Liverpool Central",
  "L4":"Liverpool Central","L5":"Liverpool Central","L6":"Liverpool Central",
  "L7":"Liverpool Central","L8":"Liverpool Central","L9":"Liverpool Central",
  "L10":"Liverpool Central","L11":"Liverpool Central","L12":"Liverpool Central",
  "L13":"Liverpool Central","L14":"Liverpool Central","L15":"Childwall",
  "L16":"Childwall","L17":"Liverpool Central","L18":"Liverpool Central",
  "L19":"Liverpool Central","L20":"Bootle","L21":"Bootle","L22":"Southport",
  "L23":"Southport","L24":"Liverpool Central","L25":"Liverpool Central",
  "L26":"Liverpool Central","L27":"Liverpool Central","L28":"Liverpool Central",
  "L29":"Southport","L30":"Bootle","L31":"Bootle","L32":"Bootle","L33":"Bootle",
  "L34":"St Helens","L35":"St Helens","L36":"Childwall","L37":"Southport",
  "L38":"Southport","L39":"Southport","L40":"Skelmersdale",
  "CW1":"Crewe","CW2":"Crewe","CW3":"Crewe","CW4":"Crewe","CW5":"Crewe",
  "CW6":"Chester","CW7":"Northwich","CW8":"Northwich","CW9":"Northwich","CW10":"Northwich",
  "CW11":"Crewe","CW12":"Congleton","CW98":"Crewe",
  // Yorkshire
  "BD1":"Bradford Central","BD2":"Bradford Central","BD3":"Bradford Central",
  "BD4":"Bradford Central","BD5":"Bradford Central","BD6":"Bradford Central",
  "BD7":"Bradford Central","BD8":"Bradford Central","BD9":"Bradford Central",
  "BD10":"Bradford Central","BD11":"Bradford South","BD12":"Bradford South",
  "BD13":"Bradford Central","BD14":"Bradford Central","BD15":"Bradford Central",
  "BD16":"Bingley","BD17":"Shipley","BD18":"Shipley","BD19":"Dewsbury","BD20":"Keighley",
  "BD21":"Keighley","BD22":"Keighley","BD23":"Skipton","BD24":"Skipton",
  "HD1":"Huddersfield","HD2":"Huddersfield","HD3":"Huddersfield","HD4":"Huddersfield",
  "HD5":"Huddersfield","HD6":"Halifax","HD7":"Huddersfield","HD8":"Huddersfield",
  "HD9":"Huddersfield","HX1":"Halifax","HX2":"Halifax","HX3":"Halifax","HX4":"Halifax",
  "HX5":"Halifax","HX6":"Halifax","HX7":"Rochdale","LS1":"Leeds Central","LS2":"Leeds Central",
  "LS3":"Leeds Central","LS4":"Leeds Central","LS5":"Leeds Central","LS6":"Leeds Central",
  "LS7":"Leeds Central","LS8":"Leeds Central","LS9":"Leeds Central","LS10":"Leeds Central",
  "LS11":"Leeds Central","LS12":"Leeds Central","LS13":"Leeds Central","LS14":"Leeds Central",
  "LS15":"Leeds Central","LS16":"Leeds Central","LS17":"Leeds Central","LS18":"Horsforth",
  "LS19":"Guiseley","LS20":"Guiseley","LS21":"Otley","LS22":"Wetherby","LS23":"Wetherby",
  "LS24":"Selby","LS25":"Selby","LS26":"Morley","LS27":"Morley","LS28":"Bradford Central",
  "LS29":"Keighley","WF1":"Wakefield","WF2":"Wakefield","WF3":"Wakefield",
  "WF4":"Wakefield","WF5":"Wakefield","WF6":"Pontefract","WF7":"Pontefract",
  "WF8":"Pontefract","WF9":"Pontefract","WF10":"Knottingley","WF11":"Knottingley",
  "WF12":"Dewsbury","WF13":"Dewsbury","WF14":"Dewsbury","WF15":"Dewsbury","WF16":"Dewsbury",
  "WF17":"Dewsbury","WF90":"Wakefield","S1":"Sheffield Central","S2":"Sheffield Central",
  "S3":"Sheffield Central","S4":"Sheffield Central","S5":"Sheffield Central",
  "S6":"Sheffield Central","S7":"Sheffield Central","S8":"Sheffield Central",
  "S9":"Sheffield Central","S10":"Sheffield Central","S11":"Sheffield Central",
  "S12":"Sheffield Central","S13":"Sheffield Central","S14":"Sheffield Central",
  "S17":"Sheffield Central","S18":"Chesterfield","S19":"Sheffield Central",
  "S20":"Sheffield Central","S21":"Chesterfield","S25":"Doncaster","S26":"Rotherham",
  "S35":"Sheffield Central","S36":"Sheffield Central","S40":"Chesterfield",
  "S41":"Chesterfield","S42":"Chesterfield","S43":"Chesterfield","S44":"Chesterfield",
  "S45":"Matlock","S60":"Rotherham","S61":"Rotherham","S62":"Rotherham","S63":"Rotherham",
  "S64":"Rotherham","S65":"Rotherham","S66":"Rotherham","S70":"Barnsley","S71":"Barnsley",
  "S72":"Barnsley","S73":"Barnsley","S74":"Barnsley","S75":"Barnsley","DN1":"Doncaster",
  "DN2":"Doncaster","DN3":"Doncaster","DN4":"Doncaster","DN5":"Doncaster","DN6":"Doncaster",
  "DN7":"Doncaster","DN8":"Doncaster","DN9":"Doncaster","DN10":"Worksop","DN11":"Doncaster",
  "DN12":"Doncaster","DN14":"Goole","DN15":"Scunthorpe","DN16":"Scunthorpe",
  "DN17":"Scunthorpe","DN18":"Brigg","DN19":"Brigg","DN20":"Brigg","DN21":"Gainsborough",
  "DN22":"Retford","DN31":"Grimsby","DN32":"Grimsby","DN33":"Grimsby","DN34":"Grimsby",
  "DN35":"Cleethorpes","DN36":"Grimsby","DN37":"Grimsby","DN38":"Brigg","DN39":"Brigg",
  "DN40":"Grimsby","DN41":"Grimsby","YO1":"York","YO10":"York","YO11":"Scarborough",
  "YO12":"Scarborough","YO13":"Scarborough","YO14":"Scarborough","YO15":"Bridlington",
  "YO16":"Driffield","YO17":"Malton","YO18":"Pickering","YO19":"York","YO21":"Whitby",
  "YO22":"Whitby","YO23":"York","YO24":"York","YO25":"Driffield","YO26":"York",
  "YO30":"York","YO31":"York","YO32":"York","YO41":"York","YO42":"Pocklington",
  "YO43":"Market Weighton","YO51":"Ripon","YO60":"York","YO61":"Easingwold",
  "YO62":"Helmsley","YO7":"Thirsk","YO8":"Selby","HG1":"Harrogate","HG2":"Harrogate",
  "HG3":"Harrogate","HG4":"Ripon","HG5":"Harrogate","DL1":"Darlington","DL2":"Darlington",
  "DL3":"Darlington","DL4":"Darlington","DL5":"Darlington","DL6":"Northallerton",
  "DL7":"Northallerton","DL8":"Bedale","DL9":"Richmond","DL10":"Richmond","DL11":"Richmond",
  // North East
  "NE1":"Newcastle Central","NE2":"Newcastle Central","NE3":"Gosforth","NE4":"Newcastle Central",
  "NE5":"Newcastle Central","NE6":"Newcastle Central","NE7":"Newcastle Central",
  "NE8":"Gateshead","NE9":"Gateshead","NE10":"Gateshead","NE11":"Team Valley",
  "NE12":"Newcastle Central","NE13":"Newcastle Central","NE15":"Newcastle Central",
  "NE16":"Rowlands Gill","NE17":"Rowlands Gill","NE18":"Hexham","NE19":"Hexham",
  "NE20":"Newcastle Central","NE21":"Newcastle Central","NE22":"Blyth","NE23":"Cramlington",
  "NE24":"Blyth","NE25":"Newcastle Central","NE26":"Newcastle Central",
  "NE27":"Newcastle Central","NE28":"Newcastle Central","NE29":"Newcastle Central",
  "NE30":"Newcastle Central","NE31":"Gateshead","NE32":"Gateshead","NE33":"Sunderland",
  "NE34":"Sunderland","NE35":"Gateshead","NE36":"Gateshead","NE37":"Washington",
  "NE38":"Washington","NE39":"Rowlands Gill","NE40":"Newcastle Central","NE41":"Prudhoe",
  "NE42":"Prudhoe","NE43":"Hexham","NE44":"Hexham","NE45":"Hexham","NE46":"Hexham",
  "NE47":"Hexham","NE48":"Hexham","NE49":"Hexham","NE61":"Morpeth","NE62":"Morpeth",
  "NE63":"Alnwick","NE64":"Alnwick","NE65":"Alnwick","NE66":"Alnwick","NE67":"Alnwick",
  "NE68":"Alnwick","NE69":"Alnwick","NE70":"Berwick-upon-Tweed","NE71":"Berwick-upon-Tweed",
  "SR1":"Sunderland","SR2":"Sunderland","SR3":"Doxford Park","SR4":"Sunderland",
  "SR5":"Sunderland","SR6":"Sunderland","SR7":"Durham","SR8":"Peterlee",
  "TS1":"Middlesbrough","TS2":"Middlesbrough","TS3":"Middlesbrough","TS4":"Middlesbrough",
  "TS5":"Middlesbrough","TS6":"Middlesbrough","TS7":"Middlesbrough","TS8":"Middlesbrough",
  "TS9":"Guisborough","TS10":"Redcar","TS11":"Redcar","TS12":"Guisborough","TS13":"Guisborough",
  "TS14":"Guisborough","TS15":"Darlington","TS16":"Darlington","TS17":"Darlington",
  "TS18":"Stockton-on-Tees","TS19":"Stockton-on-Tees","TS20":"Stockton-on-Tees",
  "TS21":"Hartlepool","TS22":"Hartlepool","TS23":"Hartlepool","TS24":"Hartlepool",
  "TS25":"Hartlepool","TS26":"Hartlepool","TS27":"Hartlepool","TS28":"Hartlepool",
  "TS29":"Hartlepool",
  // Cumbria
  "CA1":"Carlisle","CA2":"Carlisle","CA3":"Carlisle","CA4":"Carlisle","CA5":"Carlisle",
  "CA6":"Carlisle","CA7":"Carlisle","CA8":"Hexham","CA9":"Penrith","CA10":"Penrith",
  "CA11":"Penrith","CA12":"Keswick","CA13":"Workington","CA14":"Workington",
  "CA15":"Whitehaven","CA16":"Appleby","CA17":"Appleby","CA18":"Barrow-in-Furness",
  "CA19":"Barrow-in-Furness","CA20":"Barrow-in-Furness","CA21":"Barrow-in-Furness",
  "CA22":"Whitehaven","CA23":"Whitehaven","CA24":"Whitehaven","CA25":"Whitehaven",
  "CA26":"Whitehaven","CA27":"Whitehaven","CA28":"Whitehaven",
  // Scotland
  "AB1":"Aberdeen Central","AB10":"Aberdeen Central","AB11":"Aberdeen Central",
  "AB12":"Aberdeen Central","AB13":"Aberdeen Central","AB14":"Aberdeen Central",
  "AB15":"Aberdeen Central","AB16":"Aberdeen Central","AB21":"Dyce","AB22":"Aberdeen Central",
  "AB23":"Aberdeen Central","AB24":"Aberdeen Central","AB25":"Aberdeen Central",
  "AB30":"Stonehaven","AB31":"Banchory","AB32":"Westhill","AB33":"Huntly","AB34":"Aboyne",
  "AB35":"Ballater","AB36":"Ballater","AB37":"Dufftown","AB38":"Dufftown","AB39":"Stonehaven",
  "AB41":"Ellon","AB42":"Peterhead","AB43":"Fraserburgh","AB44":"Banff","AB45":"Banff",
  "AB51":"Inverurie","AB52":"Inverurie","AB53":"Turriff","AB54":"Huntly","AB55":"Keith",
  "AB56":"Keith","DD1":"Dundee","DD2":"Lochee","DD3":"Dundee","DD4":"Claverhouse",
  "DD5":"Broughty Ferry","DD6":"Dundee","DD7":"Arbroath","DD8":"Forfar","DD9":"Forfar",
  "DD10":"Montrose","DD11":"Arbroath","EH1":"Edinburgh Central","EH2":"Edinburgh Central",
  "EH3":"Edinburgh Central","EH4":"Edinburgh Central","EH5":"Edinburgh Central",
  "EH6":"Leith","EH7":"Edinburgh Central","EH8":"Edinburgh Central","EH9":"Edinburgh Central",
  "EH10":"Edinburgh Central","EH11":"Sighthill","EH12":"South Gyle",
  "EH13":"Edinburgh Central","EH14":"Edinburgh Central","EH15":"Edinburgh Central",
  "EH16":"Edinburgh Central","EH17":"Edinburgh Central","EH18":"Edinburgh Central",
  "EH19":"Bonnyrigg","EH20":"Penicuik","EH21":"Musselburgh","EH22":"Dalkeith",
  "EH23":"Gorebridge","EH24":"Bonnyrigg","EH25":"Penicuik","EH26":"Penicuik",
  "EH27":"Livingston","EH28":"Livingston","EH29":"Livingston","EH30":"South Queensferry",
  "EH31":"Haddington","EH32":"Haddington","EH33":"Haddington","EH34":"Haddington",
  "EH35":"Haddington","EH36":"Haddington","EH37":"Penicuik","EH38":"Heriot",
  "EH39":"North Berwick","EH40":"North Berwick","EH41":"Haddington","EH42":"Dunbar",
  "EH43":"Galashiels","EH44":"Peebles","EH45":"Peebles","EH46":"Peebles","EH47":"Bathgate",
  "EH48":"Bathgate","EH49":"Linlithgow","EH51":"Linlithgow","EH52":"Broxburn",
  "EH53":"Livingston","EH54":"Livingston","EH55":"Livingston",
  "FK1":"Falkirk","FK2":"Falkirk","FK3":"Falkirk","FK4":"Falkirk","FK5":"Falkirk",
  "FK6":"Falkirk","FK7":"Stirling","FK8":"Stirling","FK9":"Stirling","FK10":"Alloa",
  "FK11":"Alloa","FK12":"Alloa","FK13":"Alloa","FK14":"Crieff","FK15":"Dunblane",
  "FK16":"Callander","FK17":"Callander","FK18":"Callander","FK19":"Callander",
  "FK20":"Tyndrum","FK21":"Killin","G1":"Glasgow Central","G2":"Glasgow Central",
  "G3":"Glasgow Central","G4":"Glasgow Central","G5":"Glasgow Central",
  "G11":"Glasgow Central","G12":"Glasgow Central","G13":"Glasgow Central",
  "G14":"Clydebank","G15":"Glasgow Central","G20":"Glasgow Central","G21":"Glasgow Central",
  "G22":"Glasgow Central","G23":"Glasgow Central","G31":"Glasgow Central",
  "G32":"Glasgow Central","G33":"Glasgow Central","G34":"Glasgow Central",
  "G40":"Glasgow Central","G41":"Glasgow Central","G42":"Glasgow Central",
  "G43":"Giffnock","G44":"Giffnock","G45":"Burnside","G46":"Giffnock","G51":"Glasgow Central",
  "G52":"Hillington","G53":"Glasgow Central","G60":"Dumbarton","G61":"Bearsden",
  "G62":"Bearsden","G63":"Kirkintilloch","G64":"Kirkintilloch","G65":"Kirkintilloch",
  "G66":"Kirkintilloch","G67":"Coatbridge","G68":"Coatbridge","G69":"Coatbridge",
  "G71":"Motherwell","G72":"Cambuslang","G73":"Rutherglen","G74":"East Kilbride",
  "G75":"East Kilbride","G76":"Newton Mearns","G77":"Newton Mearns","G78":"Johnstone",
  "G81":"Clydebank","G82":"Dumbarton","G83":"Helensburgh","G84":"Helensburgh",
  "KA1":"Kilmarnock","KA2":"Kilmarnock","KA3":"Kilmarnock","KA4":"Kilmarnock",
  "KA5":"Ayr","KA6":"Ayr","KA7":"Ayr","KA8":"Ayr","KA9":"Ayr","KA10":"Ayr",
  "KA11":"Irvine","KA12":"Irvine","KA13":"Kilwinning","KA14":"Kilwinning",
  "KA15":"Kilwinning","KA16":"Cumnock","KA17":"Galston","KA18":"Cumnock","KA19":"Maybole",
  "KA20":"Ardrossan","KA21":"Ardrossan","KA22":"Ardrossan","KA23":"Ardrossan",
  "KA24":"Ardrossan","KA25":"Beith","KA26":"Girvan","KA27":"Isle of Arran","KA28":"Isle of Arran",
  "KA29":"Ardrossan","KA30":"Largs",
  "KY1":"Kirkcaldy","KY2":"Kirkcaldy","KY3":"Kirkcaldy","KY4":"Dunfermline",
  "KY5":"Kirkcaldy","KY6":"Kirkcaldy","KY7":"Glenrothes","KY8":"Lundin Links",
  "KY9":"St Andrews","KY10":"St Andrews","KY11":"Dunfermline","KY12":"Dunfermline",
  "KY13":"Kinross","KY14":"Perth","KY15":"St Andrews","KY16":"St Andrews",
  "ML1":"Motherwell","ML2":"Wishaw","ML3":"Hamilton","ML4":"Bellshill","ML5":"Coatbridge",
  "ML6":"Airdrie","ML7":"Shotts","ML8":"Lanark","ML9":"Lanark","ML10":"Strathaven",
  "ML11":"Lanark","ML12":"Biggar",
  "PA1":"Paisley","PA2":"Paisley","PA3":"Paisley","PA4":"Renfrew","PA5":"Johnstone",
  "PA6":"Johnstone","PA7":"Johnstone","PA8":"Johnstone","PA9":"Johnstone","PA10":"Johnstone",
  "PA11":"Johnstone","PA12":"Johnstone","PA13":"Johnstone","PA14":"Port Glasgow",
  "PA15":"Greenock","PA16":"Greenock","PA17":"Greenock","PA18":"Greenock","PA19":"Greenock",
  "PA20":"Rothesay","PA21":"Tarbert","PA22":"Dunoon","PA23":"Dunoon","PA24":"Inveraray",
  "PA25":"Inveraray","PA26":"Inveraray","PA27":"Inveraray","PA28":"Campbeltown",
  "PA29":"Campbeltown","PA30":"Lochgilphead","PA31":"Lochgilphead","PA32":"Inveraray",
  "PA33":"Oban","PA34":"Oban","PA35":"Oban","PA36":"Oban","PA37":"Oban","PA38":"Oban",
  "PH1":"Perth","PH2":"Perth","PH3":"Perth","PH4":"Perth","PH5":"Crieff","PH6":"Crieff",
  "PH7":"Crieff","PH8":"Blairgowrie","PH9":"Blairgowrie","PH10":"Blairgowrie",
  "PH11":"Blairgowrie","PH12":"Blairgowrie","PH13":"Perth","PH14":"Perth",
  "PH15":"Aberfeldy","PH16":"Pitlochry","PH17":"Pitlochry","PH18":"Pitlochry",
  "PH19":"Fort William","PH20":"Kingussie","PH21":"Kingussie","PH22":"Grantown-on-Spey",
  "PH23":"Grantown-on-Spey","PH24":"Grantown-on-Spey","PH25":"Grantown-on-Spey",
  "PH26":"Grantown-on-Spey","TD1":"Galashiels","TD2":"Galashiels","TD3":"Galashiels",
  "TD4":"Galashiels","TD5":"Kelso","TD6":"St Boswells","TD7":"Hawick","TD8":"Jedburgh",
  "TD9":"Hawick","TD10":"Duns","TD11":"Duns","TD12":"Kelso","TD13":"Duns","TD14":"Duns",
  "TD15":"Berwick-upon-Tweed",
  // Wales
  "CF1":"Cardiff Central","CF10":"Cardiff Central","CF11":"Cardiff Central",
  "CF14":"Llanishen","CF15":"Cardiff Central","CF23":"Cardiff Central","CF24":"Cardiff Central",
  "CF3":"Cardiff Central","CF5":"Cardiff Central","CF62":"Barry","CF63":"Barry",
  "CF64":"Penarth","CF71":"Cowbridge","CF72":"Pontypridd","CF83":"Caerphilly",
  "CF31":"Bridgend","CF32":"Bridgend","CF33":"Bridgend","CF34":"Bridgend","CF35":"Bridgend",
  "CF36":"Bridgend","CF37":"Pontypridd","CF38":"Pontypridd","CF39":"Pontypridd",
  "CF40":"Tonypandy","CF41":"Tonypandy","CF42":"Treherbert","CF43":"Aberdare",
  "CF44":"Aberdare","CF45":"Aberdare","CF46":"Merthyr Tydfil","CF47":"Merthyr Tydfil",
  "CF48":"Merthyr Tydfil","LD1":"Llandrindod Wells","LD2":"Builth Wells","LD3":"Brecon",
  "LD4":"Builth Wells","LD5":"Llandrindod Wells","LD6":"Rhayader","LD7":"Knighton",
  "LD8":"Kington","LL11":"Wrexham","LL12":"Wrexham","LL13":"Wrexham","LL14":"Wrexham",
  "LL15":"Ruthin","LL16":"Denbigh","LL17":"Rhyl","LL18":"Rhyl","LL19":"Rhyl","LL20":"Llangollen",
  "LL21":"Ruthin","LL22":"Abergele","LL23":"Bala","LL24":"Betws-y-Coed","LL25":"Betws-y-Coed",
  "LL26":"Llandudno","LL27":"Llandudno","LL28":"Colwyn Bay","LL29":"Colwyn Bay",
  "LL30":"Llandudno","LL31":"Llandudno","LL32":"Conwy","LL33":"Llandudno","LL34":"Llandudno",
  "LL35":"Barmouth","LL36":"Barmouth","LL37":"Barmouth","LL38":"Harlech","LL39":"Harlech",
  "LL40":"Dolgellau","LL41":"Blaenau Ffestiniog","LL42":"Barmouth","LL43":"Barmouth",
  "LL44":"Harlech","LL45":"Harlech","LL46":"Harlech","LL47":"Porthmadog","LL48":"Porthmadog",
  "LL49":"Porthmadog","LL51":"Pwllheli","LL52":"Pwllheli","LL53":"Pwllheli","LL54":"Caernarfon",
  "LL55":"Caernarfon","LL56":"Caernarfon","LL57":"Bangor Gwynedd","LL58":"Bangor Gwynedd",
  "LL59":"Bangor Gwynedd","LL60":"Holyhead","LL61":"Holyhead","LL62":"Holyhead",
  "LL63":"Holyhead","LL64":"Holyhead","LL65":"Holyhead","LL66":"Holyhead","LL67":"Holyhead",
  "LL68":"Holyhead","LL69":"Holyhead","LL70":"Holyhead","LL71":"Holyhead","LL72":"Holyhead",
  "LL73":"Holyhead","LL74":"Holyhead","LL75":"Holyhead","LL76":"Holyhead","LL77":"Holyhead",
  "NP1":"Newport","NP4":"Newport","NP7":"Abergavenny","NP8":"Abergavenny","NP10":"Rogerstone",
  "NP11":"Pontypool","NP12":"Pontypool","NP13":"Pontypool","NP15":"Abergavenny",
  "NP16":"Chepstow","NP18":"Langstone","NP19":"Newport","NP20":"Newport","NP22":"Merthyr Tydfil",
  "NP23":"Merthyr Tydfil","NP24":"Merthyr Tydfil","NP25":"Monmouth","NP26":"Caldicot",
  "NP44":"Cwmbran","SA1":"Swansea","SA2":"Swansea","SA3":"Swansea","SA4":"Swansea",
  "SA5":"Swansea","SA6":"Swansea","SA7":"Swansea","SA8":"Swansea","SA9":"Swansea",
  "SA10":"Neath","SA11":"Neath","SA12":"Port Talbot","SA13":"Port Talbot","SA14":"Llanelli",
  "SA15":"Llanelli","SA16":"Llanelli","SA17":"Carmarthen","SA18":"Ammanford",
  "SA19":"Llandovery","SA20":"Llandovery","SA31":"Carmarthen","SA32":"Carmarthen",
  "SA33":"Carmarthen","SA34":"Carmarthen","SA35":"Fishguard","SA36":"Fishguard",
  "SA37":"Cardigan","SA38":"Cardigan","SA39":"Lampeter","SA40":"Lampeter","SA41":"Cardigan",
  "SA42":"Fishguard","SA43":"Cardigan","SA44":"Cardigan","SA45":"Aberaeron",
  "SA46":"Aberaeron","SA47":"Aberaeron","SA48":"Lampeter","SA61":"Haverfordwest",
  "SA62":"Haverfordwest","SA63":"Haverfordwest","SA64":"Fishguard","SA65":"Fishguard",
  "SA66":"Haverfordwest","SA67":"Narberth","SA68":"Narberth","SA69":"Narberth",
  "SA70":"Pembroke","SA71":"Pembroke","SA72":"Pembroke","SA73":"Milford Haven",
  // Northern Ireland
  "BT1":"Belfast Central","BT2":"Belfast Central","BT3":"Belfast Central",
  "BT4":"Belfast Central","BT5":"Belfast Central","BT6":"Belfast Central",
  "BT7":"Belfast Central","BT8":"Belfast Central","BT9":"Belfast Central",
  "BT10":"Belfast Central","BT11":"Belfast Central","BT12":"Belfast Central",
  "BT13":"Belfast Central","BT14":"Belfast Central","BT15":"Belfast Central",
  "BT16":"Belfast Central","BT17":"Belfast Central","BT18":"Bangor Co Down",
  "BT19":"Bangor Co Down","BT20":"Bangor Co Down","BT21":"Bangor Co Down",
  "BT22":"Kircubbin","BT23":"Newtownards","BT24":"Downpatrick","BT25":"Dromore",
  "BT26":"Dromore","BT27":"Lisburn","BT28":"Lisburn","BT29":"Antrim","BT30":"Downpatrick",
  "BT31":"Newcastle Co Down","BT32":"Banbridge","BT33":"Newcastle Co Down",
  "BT34":"Newry","BT35":"Newry","BT36":"Newtownabbey","BT37":"Newtownabbey",
  "BT38":"Carrickfergus","BT39":"Ballyclare","BT40":"Larne","BT41":"Antrim",
  "BT42":"Ballymena","BT43":"Ballymena","BT44":"Ballymoney","BT45":"Magherafelt",
  "BT46":"Magherafelt","BT47":"Londonderry","BT48":"Londonderry","BT49":"Limavady",
  "BT51":"Coleraine","BT52":"Coleraine","BT53":"Ballymoney","BT54":"Ballycastle",
  "BT55":"Portstewart","BT56":"Portrush","BT57":"Portrush","BT60":"Armagh",
  "BT61":"Armagh","BT62":"Portadown","BT63":"Portadown","BT64":"Portadown",
  "BT65":"Lisburn","BT66":"Portadown","BT67":"Lisburn","BT68":"Cookstown",
  "BT69":"Omagh","BT70":"Dungannon","BT71":"Dungannon","BT74":"Enniskillen",
  "BT75":"Fivemiletown","BT76":"Fivemiletown","BT77":"Fivemiletown","BT78":"Omagh",
  "BT79":"Omagh","BT80":"Cookstown","BT81":"Londonderry","BT82":"Londonderry",
  "BT92":"Enniskillen","BT93":"Enniskillen","BT94":"Enniskillen",
};

// Build lookup maps
const EXCHANGE_BY_NAME = {};
const EXCHANGE_BY_DISTRICT = {};
EXCHANGES.forEach(([name, district, code, date, status]) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g,'');
  EXCHANGE_BY_NAME[key] = [name, district, code, date, status];
  const dkey = district.toLowerCase().replace(/[^a-z0-9]/g,'');
  if (!EXCHANGE_BY_DISTRICT[dkey]) EXCHANGE_BY_DISTRICT[dkey] = [];
  EXCHANGE_BY_DISTRICT[dkey].push([name, district, code, date, status]);
});

function normalise(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g,'');
}

function findExchange(query) {
  const raw = query.trim().toUpperCase().replace(/\s+/g, '');
  // Try postcode lookup first — strip down to outward code (letters + digits before space/final letters)
  // UK postcodes: area+district = outward code e.g. BH22, SO14, SW1A -> SW1
  const pcMatch = raw.match(/^([A-Z]{1,2}[0-9]{1,2}[A-Z]?)/);
  if (pcMatch) {
    const outward = pcMatch[1];
    // Try longest match first (e.g. BH22 before BH2)
    for (let len = outward.length; len >= 2; len--) {
      const candidate = outward.substring(0, len);
      if (POSTCODE_TO_EXCHANGE[candidate]) {
        const exchangeName = POSTCODE_TO_EXCHANGE[candidate];
        const q2 = normalise(exchangeName);
        if (EXCHANGE_BY_NAME[q2]) return { single: EXCHANGE_BY_NAME[q2] };
        // Try partial match
        const partials = Object.entries(EXCHANGE_BY_NAME)
          .filter(([k]) => k.includes(q2) || q2.includes(k))
          .map(([,v]) => v);
        if (partials.length === 1) return { single: partials[0] };
        if (partials.length > 1) return { multiple: partials.slice(0, 6) };
      }
    }
  }

  // Fall through to name/district search
  const q = normalise(query.trim());
  if (q.length < 2) return null;
  if (EXCHANGE_BY_NAME[q]) return { single: EXCHANGE_BY_NAME[q] };
  const nameMatches = Object.entries(EXCHANGE_BY_NAME)
    .filter(([k]) => k.includes(q) || q.includes(k))
    .map(([,v]) => v);
  if (nameMatches.length === 1) return { single: nameMatches[0] };
  if (nameMatches.length > 1) return { multiple: nameMatches.slice(0, 6) };
  const distMatches = Object.entries(EXCHANGE_BY_DISTRICT)
    .filter(([k]) => k.includes(q) || q.includes(k))
    .flatMap(([,v]) => v);
  if (distMatches.length === 1) return { single: distMatches[0] };
  if (distMatches.length > 1) return { multiple: distMatches.slice(0, 6) };
  return null;
}


// ── TIMELINE HIGHLIGHT ───────────────────────────────────────────────────────
function highlightTimeline(ex) {
  const exStatus = Array.isArray(ex) ? ex[4] : null;
  const exArea   = Array.isArray(ex) ? ex[1] : null;

  // Clear previous highlights and tags
  document.querySelectorAll('.tl-item.highlighted').forEach(el => el.classList.remove('highlighted'));
  document.querySelectorAll('.tl-location-tag').forEach(el => el.remove());

  if (!ex) return;

  const statusMap = {
    'closed':    'tl-first-close',
    'announced': 'tl-confirmed',
    'active':    'tl-phase1',
  };

  const primaryId  = statusMap[exStatus] || 'tl-phase1';
  const deadlineId = 'tl-deadline';
  const primaryEl  = document.getElementById(primaryId);
  const deadlineEl = document.getElementById(deadlineId);

  if (primaryEl) {
    primaryEl.classList.add('highlighted');
    const titleEl = primaryEl.querySelector('.tl-title');
    if (titleEl) {
      const tag = document.createElement('span');
      tag.className = 'tl-location-tag';
      tag.textContent = exArea;
      titleEl.appendChild(tag);
    }
    setTimeout(() => primaryEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 400);
  }

  if (deadlineEl && primaryId !== deadlineId) {
    deadlineEl.classList.add('highlighted');
    const titleEl = deadlineEl.querySelector('.tl-title');
    if (titleEl && !titleEl.querySelector('.tl-location-tag')) {
      const tag = document.createElement('span');
      tag.className = 'tl-location-tag';
      tag.textContent = exArea ? exArea + ' deadline' : 'Your deadline';
      titleEl.appendChild(tag);
    }
  }
}

function checkStatus() {
  const input = document.getElementById('postcode-input').value.trim();
  const area = document.getElementById('result-area');
  area.classList.remove('visible');

  if (!input) {
    area.innerHTML = renderNotFound(input);
    area.classList.add('visible');
    return;
  }

  const result = findExchange(input);

  if (!result) {
    area.innerHTML = renderNotFound(input);
    area.classList.add('visible');
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    highlightTimeline(null);
    return;
  }

  if (result.multiple) {
    area.innerHTML = renderMultiple(result.multiple, input);
    area.classList.add('visible');
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    highlightTimeline(null);
    return;
  }

  const ex = result.single;
  area.innerHTML = renderResult(ex);
  area.classList.add('visible');
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  highlightTimeline(ex);
}

// ── STATUS CONFIG ────────────────────────────────────────────────────────────
function statusConfig(status) {
  const configs = {
    'closed':    { cls:'urgent',  icon:'🔴', title:'Exchange closed — PSTN services have ceased' },
    'announced': { cls:'urgent',  icon:'🔴', title:'Exchange closure confirmed — deadline approaching' },
    'active':    { cls:'warning', icon:'🟠', title:'Stop-sell active — migration planning required now' },
  };
  return configs[status] || { cls:'info', icon:'🟡', title:'Exchange identified — check with your provider' };
}

function renderResult(ex) {
  const [exName, exDistrict, exCode, exDate, exStatus] = ex;
  const cfg = statusConfig(exStatus);
  const isUrgent  = exStatus === 'closed' || exStatus === 'announced';
  const stopDate  = new Date(exDate);
  const stopStr   = stopDate.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
  

  const actionSteps = isUrgent ? [
    { t: 'Contact T2K VoIP immediately', b: 'Your exchange has a confirmed closure date. Migration must be completed before the deadline to avoid service disruption.' },
    { t: 'Audit all PSTN-dependent devices', b: 'Identify every device in your business that uses a phone line — phones, alarms, EPOS, fax, lifts.' },
    { t: 'Port your existing numbers to VoIP', b: 'Your current numbers can be transferred. The porting process takes 10–15 working days and should begin immediately.' },
    { t: 'Test and go live before the deadline', b: 'Allow at least 4 weeks of overlap between your old and new systems to resolve any issues.' },
  ] : [
    { t: 'Begin VoIP migration planning now', b: 'Stop-sell is already active. You cannot expand your current setup — when January 2027 arrives, services cease entirely.' },
    { t: 'Audit all phone-line connected devices', b: 'Check phones, broadband, alarms, EPOS terminals, lifts and any monitoring systems connected to copper lines.' },
    { t: 'Port your numbers in advance', b: 'Number porting takes 10–15 working days. Plan this well in advance to avoid last-minute complications.' },
    { t: 'Consider your broadband too', b: 'If your broadband is delivered over copper (ADSL or FTTC), check whether you need to upgrade to full fibre alongside your phone migration.' },
  ];

  return `
    <div class="status-card ${cfg.cls}">
      <div class="status-top">
        <div class="status-icon">${cfg.icon}</div>
        <div>
          <div class="status-title">${cfg.title}</div>
          <div class="status-sub">Exchange code: <strong>${exCode}</strong> — Stop-sell activated <strong>${stopStr}</strong>. All PSTN and ISDN products at this exchange are affected. The national service deadline remains <strong>January 2027</strong>.</div>
        </div>
      </div>
    </div>

    <div class="detail-grid">
      <div class="detail-box">
        <div class="detail-box-label">Exchange</div>
        <div class="detail-box-val">${exName}</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">District</div>
        <div class="detail-box-val">${exDistrict}</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Exchange code</div>
        <div class="detail-box-val orange">${exCode}</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Stop-sell date</div>
        <div class="detail-box-val ${isUrgent ? 'red' : 'amber'}">${stopStr}</div>
      </div>
    </div>

    <div class="action-steps">
      <h4>What you need to do</h4>
      ${actionSteps.map((s,i) => `
        <div class="action-step">
          <div class="action-num">${i+1}</div>
          <div class="action-text"><strong>${s.t}.</strong> ${s.b}</div>
        </div>`).join('')}
    </div>

    <div class="result-cta">
      <p><strong>Ready to migrate?</strong> T2K VoIP can port your existing numbers, set up your new system, and have you live before your exchange deadline — with no service interruption.</p>
      <a class="btn-cta-white" href="/telephone-numbers/">
        Get started
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
      <a class="btn-cta-ghost" href="/telephone-numbers/area-codes/">Check your area code</a>
    </div>`;
}


function renderMultiple(exchanges, query) {
  const rows = exchanges.map(([name, district, code, date, status]) => {
    const d = new Date(date);
    const ds = d.toLocaleDateString('en-GB',{month:'short',year:'numeric'});
    const badge = status === 'closed' ? '🔴 Closed' : status === 'announced' ? '🔴 Confirmed' : '🟠 Stop-sell active';
    return `<div class="num-option" style="cursor:pointer;padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;transition:background .12s"
      onmouseenter="this.style.background='var(--bg-soft)'" onmouseleave="this.style.background=''"
      onclick="document.getElementById('postcode-input').value='${name}';checkStatus()">
      <div style="flex:1">
        <div style="font-weight:700;font-size:0.9rem;color:var(--ink)">${name}</div>
        <div style="font-size:0.78rem;color:var(--ink-light)">${district} &bull; Code: ${code}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:0.76rem;font-weight:600;color:var(--amber)">${badge}</div>
        <div style="font-size:0.72rem;color:var(--ink-light)">Stop-sell: ${ds}</div>
      </div>
    </div>`;
  }).join('');
  return `
    <div class="status-card info" style="margin-bottom:14px">
      <div class="status-top">
        <div class="status-icon">🔍</div>
        <div>
          <div class="status-title">Multiple exchanges found for "${query}"</div>
          <div class="status-sub">Select the exchange that serves your area to see its specific status and deadline.</div>
        </div>
      </div>
    </div>
    <div style="border:1.5px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:16px">${rows}</div>`;
}

function renderNotFound(query) {
  return `
    <div class="status-card info">
      <div class="status-top">
        <div class="status-icon">ℹ️</div>
        <div>
          <div class="status-title">Exchange not found in our database</div>
          <div class="status-sub">
            We couldn't find a specific exchange record for "${query || 'that search'}".
            This doesn't mean your area is unaffected — the PSTN switch-off applies to
            <strong>all UK businesses</strong> with traditional landlines or ISDN, nationwide,
            by January 2027.
          </div>
        </div>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-box">
        <div class="detail-box-label">National deadline</div>
        <div class="detail-box-val amber">January 2027</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Stop-sell status</div>
        <div class="detail-box-val orange">Check with provider</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Action required</div>
        <div class="detail-box-val red">Yes — all businesses</div>
      </div>
      <div class="detail-box">
        <div class="detail-box-label">Exchanges at risk</div>
        <div class="detail-box-val">4,600 total</div>
      </div>
    </div>
    <div class="action-steps">
      <h4>Regardless of your specific exchange, you should</h4>
      <div class="action-step"><div class="action-num">1</div><div class="action-text"><strong>Contact your current provider.</strong> Ask them directly whether your exchange is on stop-sell and when your services are scheduled to cease.</div></div>
      <div class="action-step"><div class="action-num">2</div><div class="action-text"><strong>Audit all phone-line devices.</strong> Every device in your business connected to a copper phone line needs to be reviewed and potentially replaced.</div></div>
      <div class="action-step"><div class="action-num">3</div><div class="action-text"><strong>Start VoIP migration planning now.</strong> With the January 2027 deadline applying to all UK businesses, there is no benefit to waiting — and significant risk in leaving it late.</div></div>
    </div>
    <div class="result-cta">
      <p><strong>All UK businesses are affected.</strong> Don't wait for a specific notice. T2K VoIP can assess your current setup and migrate you to a modern phone system well before the deadline.</p>
      <a class="btn-cta-white" href="/telephone-numbers/">Get a free VoIP quote</a>
      <a class="btn-cta-ghost" href="/telephone-numbers/area-codes/">Find your area code</a>
    </div>`;
}

// Enter key triggers check
document.getElementById('postcode-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkStatus();
});

// URL param pre-fill
(function() {
  const p = new URLSearchParams(window.location.search);
  const q = p.get('area') || p.get('postcode');
  if (q) {
    document.getElementById('postcode-input').value = q;
    checkStatus();
  }
})();