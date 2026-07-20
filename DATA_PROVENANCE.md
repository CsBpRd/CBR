# 风暴志 · Typhoon Atlas 数据来源与法律合规备忘录

> 生成日期：2026-07-20  
> 本文件用于记录本应用（风暴志 · Typhoon Atlas）实际接入的全部数据来源、官方授权条款原文链接及合规使用方式，可作为数据使用合法性的内部举证材料。本文件不构成法律意见；如涉及诉讼，请咨询持牌律师。

---

## 一、本应用实际接入的数据源清单

| 序号 | 数据用途 | 提供方 | 接入协议 / 原文 URL | 官方授权条款 | 使用合规性说明 |
|---|---|---|---|---|---|
| 1 | 台风路径实况与历史数据 | 浙江省水利厅 · 防汛台风网 | REST API · HTTP GET JSON  <br>`https://typhoon.slt.zj.gov.cn/Api/TyphoonList/{year}`  <br>`https://typhoon.slt.zj.gov.cn/Api/TyphoonInfo/{tfid}` | 浙江省政府主动公开的政务数据，适用《浙江省公共数据开放与安全管理暂行办法》（浙江省人民政府令第 381 号，2020 年 8 月 1 日起施行）。官方文本见中国政府网转载：https://www.gov.cn/zhengce/2021-12/21/content_5719109.htm | 本应用仅读取公开 API 展示台风路径，未爬取非公开页面、未破解鉴权、未超出公开访问范围。 |
| 2 | 实时天气（温度/湿度/体感/气压/风速风向/天气现象） | Open-Meteo | REST API · HTTP GET JSON  <br>`https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&timezone=Asia/Shanghai` | Open-Meteo License: https://open-meteo.com/en/license  <br>Open-Meteo Terms: https://open-meteo.com/en/terms | 免费 API 用于非商业用途，每日调用量远低于 10 000 次上限；页面已按 CC BY 4.0 要求标注来源。 |
| 3 | 7日逐时/逐日预报 | Open-Meteo | REST API · HTTP GET JSON  <br>`https://api.open-meteo.com/v1/forecast?...&daily=...&forecast_days=7` | 同上 | 同上。 |
| 4 | ECMWF IFS 数值预报 | Open-Meteo（转接 ECMWF 开放数据） | REST API · HTTP GET JSON  <br>`https://api.open-meteo.com/v1/forecast?...&models=ecmwf_ifs025&forecast_days=7` | Open-Meteo License 与 ECMWF Open Data Licence: https://www.ecmwf.int/en/forecasts/datasets/open-data | 使用 Open-Meteo 免费非商业接口，且按要求在页面中标注 ECMWF / Open-Meteo 来源。 |
| 5 | AI 集合预报（ICON Seamless） | Open-Meteo（转接 DWD ICON Seamless） | REST API · HTTP GET JSON  <br>`https://ensemble-api.open-meteo.com/v1/ensemble?latitude={lat}&longitude={lon}&models=icon_seamless&hourly=...&timezone=Asia/Shanghai` | Open-Meteo License 与 DWD CC-BY 许可 | 使用 Open-Meteo 免费非商业接口，按要求标注来源。 |
| 6 | 地名/城市搜索 | Open-Meteo Geocoding API | REST API · HTTP GET JSON  <br>`https://geocoding-api.open-meteo.com/v1/search?name={name}&count=6&language=zh&format=json` | Open-Meteo License | 同上。 |
| 7 | 向日葵卫星云图 | 日本气象厅（JMA）Himawari-8/9 | REST JSON 清单 + XYZ 瓦片 PNG  <br>`https://www.jma.go.jp/bosai/himawari/data/satimg/targetTimes_fd.json`  <br>`https://www.jma.go.jp/bosai/himawari/data/satimg/{basetime}/{validtime}/{z}/{x}/{y}.png` | JMA Website Terms of Use: https://www.jma.go.jp/jma/en/copyright.html | JMA 网站内容适用日本政府「公共数据许可证 v1.0」，兼容 CC BY 4.0；本应用仅引用原始瓦片并在页面标注来源。 |
| 8 | NASA MODIS 卫星影像 | NASA EOSDIS GIBS | OGC WMS · HTTP GET PNG  <br>`https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS={layer}&CRS=EPSG:4326&FORMAT=image/png` | NASA Data Use and Citation Guidance: https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/data-use-guidance | NASA 主导任务数据默认以 CC0 发布，无版权限制；本应用以事实性方式展示，未暗示 NASA 背书，已标注来源。 |
| 9 | 地图底图 | CARTO（数据来自 OpenStreetMap 贡献者） | XYZ 瓦片（Leaflet TileLayer）PNG  <br>`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`  <br>`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png` | CARTO Attribution: https://carto.com/attribution/  <br>OpenStreetMap ODbL 1.0: https://opendatacommons.org/licenses/odbl/1-0/ | CARTO 公共底图通过 XYZ 瓦片使用，页面保留 CARTO 与 OpenStreetMap 署名；OSM 数据在 ODbL 下允许共享与展示。 |

---

## 二、官方授权条款核心原文摘录

### 2.1 Open-Meteo（条目 2–6）

**官方页面**：https://open-meteo.com/en/license（访问日期 2026-07-20）

> "API data are offered under Attribution 4.0 International (CC BY 4.0). You are free to share: copy and redistribute the material in any medium or format and adapt: remix, transform, and build upon the material. Attribution: You must give appropriate credit, provide a link to the license, and indicate if changes were made."

**官方页面**：https://open-meteo.com/en/terms（访问日期 2026-07-20）

> "By using the Free API for non-commercial use you agree to following terms: Less than 10'000 API calls per day, 5'000 per hour and 600 per minute. You may only use the free API services for non-commercial purposes. You accept to the CC-BY 4.0 licence."

> "Non-commercial use is defined as elaborated by creative commons. … Using our service for private or non-profit websites or apps that do not have subscriptions or advertising … Incorporating our service into educational content."

**合规要点**：
- 本应用未设置订阅或广告，符合 Open-Meteo 对非商业使用的示例定义；
- 本应用为公益性气象信息展示，单日调用量远低于 10 000 次；
- 数据来源页已给出 Open-Meteo 链接与 CC BY 4.0 许可说明。

### 2.2 NASA EOSDIS / GIBS（条目 8）

**官方页面**：https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/data-use-guidance（访问日期 2026-07-20）

> "Unless the content is marked with a use restriction or license, data provided from a NASA-led mission are licensed as Creative Commons Zero (CC0). While there are no restrictions on the use of these data, data users are very strongly urged to cite the data used in their work products."

> "NASA material may not be used to suggest or imply endorsement by NASA or by any NASA employee of a commercial product, service, or activity, or used in any manner that might mislead."

> "NASA material is not protected by copyright within the United States, unless noted. If copyrighted, permission should be obtained from the copyright owner prior to use. If not copyrighted, NASA material may be reproduced and distributed without further permission from NASA."

**合规要点**：
- GIBS 属于 NASA EOSDIS 公开影像服务，未标记额外限制；
- 本应用以事实性方式展示卫星影像，未暗示 NASA 背书；
- 页面已标注 NASA 为数据来源。

### 2.3 日本气象厅 JMA（条目 7）

**官方页面**：https://www.jma.go.jp/jma/en/copyright.html（访问日期 2026-07-20）

> "Information made available on the Japan Meteorological Agency website (hereinafter referred to as "Content") may be used in accordance with the terms and conditions of use stipulated in Public Data License (Version 1.0), unless otherwise indicated by a specific rights notice."

> "The user must cite the source when using the Content. Sources should be cited in the following manner: Source: Japan Meteorological Agency website (URL of relevant page)"

> "The Terms of Use are compatible with the Creative Commons Attribution License 4.0 (hereinafter referred to as the CC License). This means that Content based on the Terms of Use may be used under the CC License in lieu of the Terms of Use."

**合规要点**：
- Himawari 数据通过 JMA 公开瓦片服务获取，适用 Public Data License v1.0 / CC BY 4.0；
- 本应用已标注来源为日本气象厅 Himawari-8/9。

### 2.4 OpenStreetMap / CARTO 底图（条目 9）

**官方页面**：https://opendatacommons.org/licenses/odbl/1-0/（访问日期 2026-07-20）

> "Subject to the terms and conditions of this License, the Licensor grants to You a worldwide, royalty-free, non-exclusive, terminable … license to Use the Database for the duration of any applicable copyright and Database Rights. These rights explicitly include commercial use, and do not exclude any field of endeavour."

**官方页面**：https://carto.com/attribution/（访问日期 2026-07-20）

> "When customers use these services, they must provide attribution to both CARTO and any appropriate provider. Proper attribution is required for every CARTO plan."

**合规要点**：
- CARTO 底图数据底层为 OpenStreetMap，OSM 以 ODbL 1.0 发布，允许公开展示；
- 本应用保留地图右下角或页面中的 CARTO / OpenStreetMap 署名。

### 2.5 浙江省水利厅台风数据（条目 1）

**政策依据**：《浙江省公共数据开放与安全管理暂行办法》（浙江省人民政府令第 381 号，2020 年 8 月 1 日起施行）  
官方文本（中国政府网转载）：https://www.gov.cn/zhengce/2021-12/21/content_5719109.htm

> **第六条** 公共数据开放应当遵循依法开放的原则，法律、法规、规章以及国家规定要求开放或者规定可以开放的，应当开放；未明确开放的，应当安全有序开放；禁止开放的，不得开放。
>
> **第七条** 公共数据开放主体应当根据本地区经济社会发展情况，重点和优先开放下列公共数据：……（二）自然资源、生态环境、交通出行、**气象**等数据；……
>
> **第八条** 突发自然灾害、事故灾难、公共卫生事件和社会安全事件，造成或者可能造成严重社会危害、直接影响社会公众切身利益的，负责处置突发事件的各级人民政府及其有关部门应当依法及时、准确开放相关公共数据，并根据公众需要动态更新。
>
> **第二十条** 公共数据开放主体可以通过下列方式开放公共数据：……（二）**接口调用数据**；……
>
> **第二十七条** 除法律、法规、规章另有规定外，公共数据开放主体应当免费开放下列公共数据：（一）**无条件开放的数据**；……

**合规要点**：
- 浙江省水利厅官网台风路径系统（https://typhoon.slt.zj.gov.cn/）以政府主动公开方式提供台风路径信息，属于《办法》第六条、第七条、第八条规定的可开放公共数据；
- 本应用通过其公开 API（接口调用，符合第二十条）读取数据，且该数据属于无条件开放类，应免费开放（第二十七条）；
- 未访问非公开接口、未突破访问限制、未用于违法违规用途；
- 页面已标注数据来源为浙江省水利厅。

---

## 三、本应用的数据使用原则

1. **仅使用公开接口**：所有数据均通过提供方公开的 REST API、WMS、XYZ 瓦片等标准协议获取，未使用爬虫抓取、未逆向、未绕过鉴权。
2. **无后端代理**：数据由用户浏览器前端直接请求源站，本应用服务器不缓存、不转售、不改写原始数据。
3. **非商业公益性使用**：本应用为气象爱好者公益展示工具，无订阅、无广告、无商业盈利。
4. **按要求署名**：数据来源页对每个数据源均标注提供方、获取方式、许可协议及官方条款链接。
5. **尊重限制**：各接口调用频率均在免费/公开限额内，未对任何数据源造成过度负载。

---

## 四、责任边界与免责声明

- 本文件仅记录本应用的数据来源与官方授权条款，**不构成法律意见**。
- 若任何数据提供方认为本应用的使用方式违反其条款，可通过页面提供的联系方式要求移除，本应用将及时处理。
- 本应用不对第三方数据的内容准确性、实时性或可用性承担责任；用户应以官方机构发布信息为准。

---

## 五、条款快照与可核验性

为便于举证，建议在每次重大发布前使用以下方式固定条款原文：

1. **Internet Archive Wayback Machine**：将上述官方条款 URL 提交存档（https://web.archive.org/save）。
2. **本地 PDF 快照**：使用浏览器「打印为 PDF」保存上述官方条款页面，命名格式 `YYYY-MM-DD_{provider}_terms.pdf`。
3. **Git 版本锁定**：本备忘录随应用代码一起提交到 Git，提交哈希可作为时间戳证据。

---

## 六、维护责任

- 维护人：本项目开发者
- 复核周期：每季度或在任一数据源条款变更时立即复核
- 变更记录：见 Git 提交历史（`DATA_PROVENANCE.md` 与 `public/typhoon-atlas/assets/ResourcesPage-BguFfHTi.js`）
