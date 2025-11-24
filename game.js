// 导入 D3.js
import * as d3 from 'd3';
// 引入 Highcharts 世界地图 GeoJSON 数据
import worldGeoJson from '@highcharts/map-collection/custom/world.geo.json';
import europeGeoJson from '@highcharts/map-collection/custom/europe.geo.json';
import chinaGeoJsonLocal from '@highcharts/map-collection/countries/cn/cn-all.geo.json';

// 统一地图描边颜色（可在 vite.config.js 的 __MAP_STROKE__ 配置）
const MAP_STROKE = typeof __MAP_STROKE__ !== 'undefined' ? __MAP_STROKE__ : '#334155';

// 抽象地图模板（简化形状，统一上北下南）
const abstractWorldPositions = [
    { name: '俄罗斯', x: 520, y: 400, width: 200, height: 140 },
    { name: '加拿大', x: 80, y: 420, width: 200, height: 100 },
    { name: '美国', x: 120, y: 300, width: 180, height: 100 },
    { name: '巴西', x: 200, y: 140, width: 130, height: 120 },
    { name: '阿根廷', x: 220, y: 20, width: 90, height: 80 },
    { name: '中国', x: 520, y: 260, width: 150, height: 100 },
    { name: '印度', x: 500, y: 160, width: 90, height: 80 },
    { name: '澳大利亚', x: 620, y: 60, width: 140, height: 90 },
    { name: '印度尼西亚', x: 540, y: 90, width: 120, height: 40 },
    { name: '日本', x: 700, y: 240, width: 50, height: 60 },
    { name: '英国', x: 380, y: 310, width: 40, height: 50 },
    { name: '德国', x: 420, y: 280, width: 60, height: 50 },
    { name: '法国', x: 380, y: 250, width: 60, height: 50 },
    { name: '西班牙', x: 360, y: 210, width: 60, height: 50 },
    { name: '意大利', x: 420, y: 230, width: 50, height: 40 },
    { name: '土耳其', x: 470, y: 240, width: 70, height: 40 },
    { name: '沙特阿拉伯', x: 490, y: 200, width: 80, height: 50 },
    { name: '伊朗', x: 500, y: 220, width: 70, height: 40 },
    { name: '韩国', x: 670, y: 240, width: 40, height: 40 },
    { name: '墨西哥', x: 110, y: 240, width: 100, height: 60 },
    { name: '南非', x: 330, y: 60, width: 90, height: 60 },
    { name: '埃及', x: 420, y: 180, width: 50, height: 40 },
    { name: '尼日利亚', x: 380, y: 140, width: 60, height: 40 },
    { name: '巴基斯坦', x: 470, y: 200, width: 60, height: 40 },
    { name: '阿尔及利亚', x: 370, y: 190, width: 70, height: 40 },
    { name: '委内瑞拉', x: 170, y: 200, width: 60, height: 40 },
    { name: '哥伦比亚', x: 180, y: 170, width: 60, height: 40 }
];

const abstractEuropePositions = [
    { name: '英国', x: 120, y: 260, width: 40, height: 50 },
    { name: '爱尔兰', x: 80, y: 260, width: 30, height: 40 },
    { name: '法国', x: 150, y: 200, width: 70, height: 70 },
    { name: '西班牙', x: 120, y: 140, width: 70, height: 70 },
    { name: '葡萄牙', x: 90, y: 150, width: 30, height: 50 },
    { name: '德国', x: 230, y: 240, width: 60, height: 60 },
    { name: '意大利', x: 230, y: 170, width: 60, height: 70 },
    { name: '瑞士', x: 210, y: 220, width: 30, height: 30 },
    { name: '奥地利', x: 240, y: 210, width: 40, height: 30 },
    { name: '荷兰', x: 210, y: 260, width: 30, height: 30 },
    { name: '比利时', x: 200, y: 240, width: 30, height: 30 },
    { name: '丹麦', x: 240, y: 280, width: 30, height: 30 },
    { name: '挪威', x: 260, y: 330, width: 60, height: 90 },
    { name: '瑞典', x: 320, y: 320, width: 60, height: 100 },
    { name: '芬兰', x: 380, y: 330, width: 50, height: 90 },
    { name: '波兰', x: 300, y: 240, width: 60, height: 60 },
    { name: '捷克', x: 280, y: 230, width: 40, height: 30 },
    { name: '斯洛伐克', x: 300, y: 210, width: 40, height: 30 },
    { name: '匈牙利', x: 310, y: 190, width: 40, height: 30 },
    { name: '罗马尼亚', x: 340, y: 190, width: 60, height: 50 },
    { name: '保加利亚', x: 360, y: 160, width: 60, height: 40 },
    { name: '希腊', x: 340, y: 120, width: 50, height: 40 },
    { name: '土耳其', x: 420, y: 150, width: 90, height: 50 },
    { name: '乌克兰', x: 380, y: 220, width: 70, height: 60 },
    { name: '白俄罗斯', x: 360, y: 250, width: 60, height: 50 },
    { name: '立陶宛', x: 350, y: 280, width: 40, height: 40 },
    { name: '拉脱维亚', x: 360, y: 300, width: 40, height: 30 },
    { name: '爱沙尼亚', x: 360, y: 330, width: 40, height: 30 },
    { name: '葡萄牙', x: 90, y: 150, width: 30, height: 50 }
];

// 将 d3 暴露到全局，以便在 HTML 中也能使用
window.d3 = d3;

// 游戏数据
const gameData = {
    china: {
        provinces: [
            '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
            '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
            '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
            '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾'
        ]
    },
    world: {
        countries: []
    },
    europe: {
        countries: []
    }
};

// 游戏状态
let gameState = {
    mode: 'china',
    mapStyle: 'real', // 'abstract' 或 'real'
    worldFilter: typeof __WORLD_FILTER__ !== 'undefined' ? __WORLD_FILTER__ : 'area', // 'area' | 'gdp'
    worldTopN: typeof __WORLD_TOPN__ !== 'undefined' ? __WORLD_TOPN__ : 10,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    currentQuestion: null,
    selectedAnswer: null,
    answeredRegions: new Set(),
    svg: null,
    d3Svg: null,
    d3Path: null,
    chinaGeoJson: null,
    worldContinentOverlay: null
};

const languageMap = {
    zh: {
        mapSelect: '地图选择',
        mapChina: '中国省份',
        mapWorld: '世界地图',
        mapEurope: '欧洲地图',
        language: '语言',
        style: '地图风格',
        abstract: '抽象版',
        real: '实际地图',
        worldRange: '世界范围',
        areaTop: '面积Top20',
        gdpTop: '经济Top20',
        submit: '提交答案',
        score: '得分:',
        correctLabel: '正确:',
        wrongLabel: '错误:',
        accuracyLabel: '正确率:',
        loading: '正在加载地图...',
        loadFail: '地图加载失败',
        correctMsg: '✓ 回答正确！',
        wrongMsg: '✗ 回答错误！正确答案是：'
    },
    en: {
        mapSelect: 'Map Select',
        mapChina: 'China Provinces',
        mapWorld: 'World Map',
        mapEurope: 'Europe Map',
        language: 'Language',
        style: 'Map Style',
        abstract: 'Abstract',
        real: 'Real',
        worldRange: 'World Range',
        areaTop: 'Area Top20',
        gdpTop: 'GDP Top20',
        submit: 'Submit',
        score: 'Score:',
        correctLabel: 'Correct:',
        wrongLabel: 'Wrong:',
        accuracyLabel: 'Accuracy:',
        loading: 'Loading map...',
        loadFail: 'Map load failed',
        correctMsg: '✓ Correct!',
        wrongMsg: '✗ Wrong! Correct answer: '
    },
    jp: {
        mapSelect: '地図選択',
        mapChina: '中国省',
        mapWorld: '世界地図',
        mapEurope: '欧州地図',
        language: '言語',
        style: '地図スタイル',
        abstract: '抽象',
        real: '実写',
        worldRange: '世界範囲',
        areaTop: '面積Top20',
        gdpTop: '経済Top20',
        submit: '回答を送信',
        score: '得点:',
        correctLabel: '正解:',
        wrongLabel: '不正解:',
        accuracyLabel: '正確率:',
        loading: '地図を読み込み中...',
        loadFail: '地図読み込み失敗',
        correctMsg: '✓ 正解！',
        wrongMsg: '✗ 不正解！ 正解：'
    }
};

let currentLanguage = 'zh';

function t(key) {
    const pack = languageMap[currentLanguage] || languageMap.zh;
    return pack[key] || '';
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function setDisabled(id, value) {
    const el = document.getElementById(id);
    if (el) el.disabled = value;
}

function applyLanguage() {
    setText('label-map-select', t('mapSelect'));
    setText('opt-map-china', t('mapChina'));
    setText('opt-map-world', t('mapWorld'));
    setText('opt-map-europe', t('mapEurope'));
    setText('label-language', t('language'));
    setText('label-style', t('style'));
    setText('btn-abstract', t('abstract'));
    setText('btn-real', t('real'));
    setText('label-world-range', t('worldRange'));
    setText('btn-area', t('areaTop'));
    setText('btn-gdp', t('gdpTop'));
    setText('submit-btn', t('submit'));
    setText('label-score', t('score'));
    setText('label-correct', t('correctLabel'));
    setText('label-wrong', t('wrongLabel'));
    setText('label-accuracy', t('accuracyLabel'));
}

// 初始化游戏
function initGame() {
    // 绑定地图选择
    const mapSelect = document.getElementById('map-select');
    if (mapSelect) {
        mapSelect.addEventListener('change', (e) => {
            switchMode(e.target.value);
        });
    }

    // 绑定地图风格选择器
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchMapStyle(e.target.dataset.style);
        });
    });

    // 世界范围固定配置（不提供 UI 切换）

    // （已移除TopN选择器）

    const submitBtnInit = document.getElementById('submit-btn');
    if (submitBtnInit) submitBtnInit.addEventListener('click', submitAnswer);
    
    // 设置统一描边颜色变量到 CSS
    document.documentElement.style.setProperty('--map-stroke', MAP_STROKE);

    // 语言设置
    const savedLang = localStorage.getItem('map_language');
    const langSelect = document.getElementById('language-select');
    if (savedLang && languageMap[savedLang]) {
        currentLanguage = savedLang;
        if (langSelect) langSelect.value = savedLang;
    }
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (languageMap[val]) {
                currentLanguage = val;
                localStorage.setItem('map_language', val);
                applyLanguage();
                // 切换语言后刷新页面以确保所有文本/选项更新
                location.reload();
            }
        });
    }
    applyLanguage();
    
    // 设置初始模式（读取本地存储），默认中国
    const savedMode = localStorage.getItem('map_mode');
    const allowedModes = ['china', 'world', 'europe'];
    const initialMode = allowedModes.includes(savedMode) ? savedMode : 'china';
    gameState.mode = initialMode;
    if (mapSelect) mapSelect.value = initialMode;
    
    // 进入初始模式
    switchMode(initialMode);
}

// 切换模式
function switchMode(mode) {
    localStorage.setItem('map_mode', mode);
    gameState.mode = mode;
    gameState.answeredRegions.clear();
    gameState.score = 0;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    
    // 更新选择器状态
    const mapSelect = document.getElementById('map-select');
    if (mapSelect) {
        mapSelect.value = mode;
    }
    
    // 显示/隐藏地图风格选择器（中国/世界/欧洲模式显示）
    const styleSelector = document.getElementById('map-style-selector');
    const worldFilterSelector = document.getElementById('world-filter-selector');
    if (mode === 'china' || mode === 'world' || mode === 'europe') {
        styleSelector.style.display = 'flex';
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === gameState.mapStyle);
        });
    } else {
        styleSelector.style.display = 'none';
    }
    // 世界范围由配置控制，不展示 UI
    if (worldFilterSelector) worldFilterSelector.style.display = 'none';
    
    // 更新统计
    updateStats();
    const feedbackEl = document.getElementById('feedback');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback';
    }
    setDisabled('submit-btn', true);
    setText('current-province', '');
    
    // 清理 D3 实例
    if (gameState.d3Svg) {
        gameState.d3Svg = null;
        gameState.d3Path = null;
    }
    
    // 加载新地图
    loadMap(mode);
}

// 切换地图风格
function switchMapStyle(style) {
    if (gameState.mapStyle === style) return;
    
    gameState.mapStyle = style;
    gameState.answeredRegions.clear();
    gameState.score = 0;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    updateStats();
        setText('feedback', '');
        const fbEl2 = document.getElementById('feedback');
        if (fbEl2) fbEl2.className = 'feedback';
        setDisabled('submit-btn', true);
        setText('current-province', '');
    
    // 更新按钮状态
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === style);
    });
    
    // 清理 D3 实例
    if (gameState.d3Svg) {
        gameState.d3Svg = null;
        gameState.d3Path = null;
    }
    
    // 重新加载地图
    loadMap(gameState.mode);
}

// 切换世界国家筛选（面积Top20 / 经济Top20）
function switchWorldFilter(filter) {
    if (filter !== 'area' && filter !== 'gdp') return;
    if (gameState.worldFilter === filter) return;
    gameState.worldFilter = filter;
    gameState.answeredRegions.clear();
    gameState.score = 0;
    gameState.correctCount = 0;
    gameState.wrongCount = 0;
    updateStats();
    setText('feedback', '');
    const fbEl3 = document.getElementById('feedback');
    if (fbEl3) fbEl3.className = 'feedback';
    setDisabled('submit-btn', true);
    setText('current-province', '');
    
    document.querySelectorAll('.world-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    if (gameState.d3Svg) {
        gameState.d3Svg = null;
        gameState.d3Path = null;
    }
    
    if (gameState.mode === 'world') {
        loadMap(gameState.mode);
    }
}

// 加载地图
async function loadMap(mode) {
    const container = document.getElementById('map-container');
    container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">${t('loading')}</div>`;
    gameState.svg = null;
    gameState.d3Svg = null;
    gameState.d3Path = null;
    gameState.currentQuestion = null;
    gameState.selectedAnswer = null;
    
    try {
    if (mode === 'china') {
        if (gameState.mapStyle === 'real') {
            // 使用 D3.js 实际地图
            await loadChinaMapReal(container);
        } else {
            // 使用抽象版 SVG 地图
                const svgContent = await loadChinaMap();
                container.innerHTML = svgContent;
                gameState.svg = container.querySelector('svg');
                if (gameState.svg) {
                    setupMapInteractions();
                    generateQuestion();
                }
            }
        } else if (mode === 'world') {
            if (gameState.mapStyle === 'real') {
                // 使用 Highcharts 世界地图 GeoJSON + D3 渲染
                await loadWorldMapReal(container);
            } else {
                // 抽象版世界地图
                await loadWorldMapAbstract(container);
            }
        } else if (mode === 'europe') {
            if (gameState.mapStyle === 'real') {
                await loadEuropeMapReal(container);
            } else {
                await loadEuropeMapAbstract(container);
            }
        }
    } catch (error) {
        console.error('加载地图失败:', error);
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}</div>`;
    }
}

// 加载中国地图 GeoJSON
async function loadChinaGeoJson() {
    if (gameState.chinaGeoJson) return gameState.chinaGeoJson;
    
    // 优先使用本地 GeoJSON，避免网络依赖
    if (chinaGeoJsonLocal) {
        gameState.chinaGeoJson = chinaGeoJsonLocal;
        return gameState.chinaGeoJson;
    }

    // 兜底：尝试远程加载
    try {
        const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
        if (!response.ok) throw new Error('地图数据加载失败');
        gameState.chinaGeoJson = await response.json();
        return gameState.chinaGeoJson;
    } catch (error) {
        if (window.chinaGeoJson) {
            gameState.chinaGeoJson = window.chinaGeoJson;
            return gameState.chinaGeoJson;
        }
        throw error;
    }
}

// 加载中国地图（抽象版）
async function loadChinaMap() {
    // 抽象地图统一上北下南：采用 viewBox 并翻转坐标
    return `
        <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <g id="china-map" transform="scale(1,-1) translate(0,-600)">
                <rect class="map-region" data-name="北京" x="200" y="150" width="50" height="50" />
                <rect class="map-region" data-name="上海" x="500" y="350" width="50" height="50" />
                <rect class="map-region" data-name="广东" x="450" y="450" width="100" height="50" />
                <rect class="map-region" data-name="四川" x="300" y="300" width="100" height="100" />
                <rect class="map-region" data-name="新疆" x="100" y="200" width="150" height="150" />
                <rect class="map-region" data-name="西藏" x="220" y="220" width="120" height="120" />
                <rect class="map-region" data-name="内蒙古" x="150" y="100" width="200" height="80" />
                <rect class="map-region" data-name="黑龙江" x="420" y="60" width="120" height="90" />
                <rect class="map-region" data-name="云南" x="300" y="380" width="120" height="90" />
                <rect class="map-region" data-name="山东" x="450" y="200" width="100" height="80" />
            </g>
        </svg>
    `;
}

// 省份名称映射（从地图 GeoJSON 名称到游戏数据名称）
const provinceNameMap = {
    // 英文名称映射（Highcharts 中国地图）
    'Beijing': '北京',
    'Tianjin': '天津',
    'Hebei': '河北',
    'Shanxi': '山西',
    'Inner Mongolia': '内蒙古',
    'Liaoning': '辽宁',
    'Jilin': '吉林',
    'Heilongjiang': '黑龙江',
    'Shanghai': '上海',
    'Jiangsu': '江苏',
    'Zhejiang': '浙江',
    'Anhui': '安徽',
    'Fujian': '福建',
    'Jiangxi': '江西',
    'Shandong': '山东',
    'Henan': '河南',
    'Hubei': '湖北',
    'Hunan': '湖南',
    'Guangdong': '广东',
    'Guangxi': '广西',
    'Hainan': '海南',
    'Chongqing': '重庆',
    'Sichuan': '四川',
    'Guizhou': '贵州',
    'Yunnan': '云南',
    'Tibet': '西藏',
    'Shaanxi': '陕西',
    'Gansu': '甘肃',
    'Qinghai': '青海',
    'Ningxia': '宁夏',
    'Xinjiang': '新疆',
    'Hong Kong': '香港',
    'Macau': '澳门',
    'Taiwan': '台湾',
    '北京': '北京',
    '天津': '天津',
    '河北': '河北',
    '山西': '山西',
    '内蒙古自治区': '内蒙古',
    '内蒙古': '内蒙古',
    '辽宁': '辽宁',
    '吉林': '吉林',
    '黑龙江': '黑龙江',
    '上海': '上海',
    '江苏': '江苏',
    '浙江': '浙江',
    '安徽': '安徽',
    '福建': '福建',
    '江西': '江西',
    '山东': '山东',
    '河南': '河南',
    '湖北': '湖北',
    '湖南': '湖南',
    '广东': '广东',
    '广西壮族自治区': '广西',
    '广西': '广西',
    '海南': '海南',
    '重庆': '重庆',
    '四川': '四川',
    '贵州': '贵州',
    '云南': '云南',
    '西藏自治区': '西藏',
    '西藏': '西藏',
    '陕西': '陕西',
    '甘肃': '甘肃',
    '青海': '青海',
    '宁夏回族自治区': '宁夏',
    '宁夏': '宁夏',
    '新疆维吾尔自治区': '新疆',
    '新疆': '新疆',
    '香港特别行政区': '香港',
    '香港': '香港',
    '澳门特别行政区': '澳门',
    '澳门': '澳门',
    '台湾': '台湾'
};

// 反向映射（从游戏数据名称到地图 GeoJSON 名称）
const reverseProvinceNameMap = {};
Object.keys(provinceNameMap).forEach(key => {
    const value = provinceNameMap[key];
    if (!reverseProvinceNameMap[value]) {
        reverseProvinceNameMap[value] = [];
    }
    reverseProvinceNameMap[value].push(key);
});

// 标准化省份名称（从 ECharts 名称转换为游戏数据名称）
function normalizeProvinceName(echartsName) {
    // 直接匹配
    if (provinceNameMap[echartsName]) {
        return provinceNameMap[echartsName];
    }
    
    // 尝试移除后缀后匹配
    const nameWithoutSuffix = echartsName
        .replace(/省|市|自治区|特别行政区|壮族自治区|维吾尔自治区|回族自治区/g, '');
    if (provinceNameMap[nameWithoutSuffix]) {
        return provinceNameMap[nameWithoutSuffix];
    }
    
    return nameWithoutSuffix;
}

function getFeatureName(feature) {
    return (feature?.properties?.name || feature?.properties?.NAME || '').trim();
}

// 国家名称映射（Highcharts 世界地图英文名 -> 中文）
const countryNameMap = {
    'Russia': '俄罗斯',
    'China': '中国',
    'United States of America': '美国',
    'Canada': '加拿大',
    'Brazil': '巴西',
    'Russian Federation': '俄罗斯',
    'Australia': '澳大利亚',
    'India': '印度',
    'Argentina': '阿根廷',
    'Kazakhstan': '哈萨克斯坦',
    'Algeria': '阿尔及利亚',
    'Democratic Republic of the Congo': '刚果民主共和国',
    'Saudi Arabia': '沙特阿拉伯',
    'Mexico': '墨西哥',
    'Indonesia': '印度尼西亚',
    'Iran': '伊朗',
    'Mongolia': '蒙古',
    'Niger': '尼日尔',
    'Chad': '乍得',
    'Mali': '马里',
    'Angola': '安哥拉',
    'South Africa': '南非',
    'Colombia': '哥伦比亚',
    'Bolivia': '玻利维亚',
    'Mauritania': '毛里塔尼亚',
    'Libya': '利比亚',
    'Egypt': '埃及',
    'Sudan': '苏丹',
    'United Republic of Tanzania': '坦桑尼亚',
    'Nigeria': '尼日利亚',
    'Venezuela': '委内瑞拉',
    'Namibia': '纳米比亚',
    'Pakistan': '巴基斯坦',
    'Mozambique': '莫桑比克',
    'Turkey': '土耳其',
    'Chile': '智利',
    'Peru': '秘鲁',
    'Zambia': '赞比亚',
    'Myanmar': '缅甸',
    'Afghanistan': '阿富汗',
    'Somalia': '索马里',
    'Central African Republic': '中非共和国',
    'Ukraine': '乌克兰',
    'Madagascar': '马达加斯加',
    'Botswana': '博茨瓦纳',
    'Kenya': '肯尼亚',
    'France': '法国',
    'Yemen': '也门',
    'Thailand': '泰国',
    'Spain': '西班牙',
    'Turkmenistan': '土库曼斯坦',
    'Cameroon': '喀麦隆',
    'Papua New Guinea': '巴布亚新几内亚',
    'Sweden': '瑞典',
    'Uzbekistan': '乌兹别克斯坦',
    'Morocco': '摩洛哥',
    'Iraq': '伊拉克',
    'Paraguay': '巴拉圭',
    'Zimbabwe': '津巴布韦',
    'Japan': '日本',
    'Germany': '德国',
    'Finland': '芬兰',
    'Vietnam': '越南',
    'Malaysia': '马来西亚',
    'Norway': '挪威',
    "Cote d'Ivoire": '科特迪瓦',
    'Poland': '波兰',
    'Italy': '意大利',
    'Philippines': '菲律宾',
    'Ecuador': '厄瓜多尔',
    'Burkina Faso': '布基纳法索',
    'New Zealand': '新西兰',
    'Gabon': '加蓬',
    'Guinea': '几内亚',
    'United Kingdom': '英国',
    'Uganda': '乌干达',
    'Ghana': '加纳',
    'Romania': '罗马尼亚',
    'Lao PDR': '老挝',
    'Guyana': '圭亚那',
    'Belarus': '白俄罗斯',
    'Kyrgyzstan': '吉尔吉斯斯坦',
    'Senegal': '塞内加尔',
    'Syrian Arab Republic': '叙利亚',
    'Cambodia': '柬埔寨',
    'Uruguay': '乌拉圭',
    'Tunisia': '突尼斯',
    'Suriname': '苏里南',
    'Nepal': '尼泊尔',
    'Bangladesh': '孟加拉国',
    'Tajikistan': '塔吉克斯坦',
    'Greece': '希腊',
    'Nicaragua': '尼加拉瓜',
    "Dem. People's Rep. Korea": '朝鲜',
    'Malawi': '马拉维',
    'Eritrea': '厄立特里亚',
    'Benin': '贝宁',
    'Honduras': '洪都拉斯',
    'Liberia': '利比里亚',
    'Bulgaria': '保加利亚',
    'Cuba': '古巴',
    'Guatemala': '危地马拉',
    'Iceland': '冰岛',
    'Republic of Korea': '韩国',
    'Hungary': '匈牙利',
    'Portugal': '葡萄牙',
    'Jordan': '约旦',
    'Serbia': '塞尔维亚',
    'Azerbaijan': '阿塞拜疆',
    'Austria': '奥地利',
    'United Arab Emirates': '阿联酋',
    'Czech Republic': '捷克',
    'Panama': '巴拿马',
    'Sierra Leone': '塞拉利昂',
    'Ireland': '爱尔兰',
    'Georgia': '格鲁吉亚',
    'Sri Lanka': '斯里兰卡',
    'Lithuania': '立陶宛',
    'Latvia': '拉脱维亚',
    'Togo': '多哥',
    'Croatia': '克罗地亚',
    'Bosnia and Herzegovina': '波黑',
    'Costa Rica': '哥斯达黎加',
    'Slovakia': '斯洛伐克',
    'Dominican Republic': '多米尼加',
    'Bhutan': '不丹',
    'Estonia': '爱沙尼亚',
    'Denmark': '丹麦',
    'Netherlands': '荷兰',
    'Switzerland': '瑞士',
    'Guinea Bissau': '几内亚比绍',
    'Belgium': '比利时',
    'Lesotho': '莱索托',
    'Armenia': '亚美尼亚',
    'Solomon Is.': '所罗门群岛',
    'Albania': '阿尔巴尼亚',
    'Equatorial Guinea': '赤道几内亚',
    'Burundi': '布隆迪',
    'Haiti': '海地',
    'Rwanda': '卢旺达',
    'North Macedonia': '北马其顿',
    'Djibouti': '吉布提',
    'Belize': '伯利兹',
    'El Salvador': '萨尔瓦多',
    'Israel': '以色列',
    'Slovenia': '斯洛文尼亚',
    'Fiji': '斐济',
    'Kuwait': '科威特',
    'Eswatini': '斯威士兰',
    'Timor-Leste': '东帝汶',
    'Bahamas': '巴哈马',
    'Montenegro': '黑山',
    'Vanuatu': '瓦努阿图',
    'Qatar': '卡塔尔',
    'Gambia': '冈比亚',
    'Jamaica': '牙买加',
    'Lebanon': '黎巴嫩',
    'Cyprus': '塞浦路斯',
    'Brunei Darussalam': '文莱',
    'Trinidad and Tobago': '特立尼达和多巴哥',
    'Cabo Verde': '佛得角',
    'Samoa': '萨摩亚',
    'Luxembourg': '卢森堡',
    'Comoros': '科摩罗',
    'Mauritius': '毛里求斯',
    'Sao Tome and Principe': '圣多美和普林西比',
    'Kiribati': '基里巴斯',
    'Dominica': '多米尼克',
    'Tonga': '汤加',
    'Micronesia': '密克罗尼西亚',
    'Singapore': '新加坡',
    'Bahrain': '巴林',
    'Saint Lucia': '圣卢西亚',
    'Andorra': '安道尔',
    'Palau': '帕劳',
    'Seychelles': '塞舌尔',
    'Antigua and Barb.': '安提瓜和巴布达',
    'Barbados': '巴巴多斯',
    'St. Vin. and Gren.': '圣文森特和格林纳丁斯',
    'Grenada': '格林纳达',
    'Malta': '马耳他',
    'Maldives': '马尔代夫',
    'Saint Kitts and Nevis': '圣基茨和尼维斯',
    'Marshall Islands': '马绍尔群岛',
    'Liechtenstein': '列支敦士登',
    'San Marino': '圣马力诺',
    'Tuvalu': '图瓦卢',
    'Nauru': '瑙鲁',
    'Monaco': '摩纳哥',
    'Vatican': '梵蒂冈',
    'Taiwan': '台湾',
    'Hong Kong': '香港',
    'Macao': '澳门'
};

// 英文显示映射（在名称映射之后定义）
const provinceEnFromCn = {};
Object.entries(provinceNameMap).forEach(([en, cn]) => {
    if (!provinceEnFromCn[cn]) {
        provinceEnFromCn[cn] = en;
    }
});

const countryEnFromCn = {};
Object.entries(countryNameMap).forEach(([en, cn]) => {
    if (!countryEnFromCn[cn]) {
        countryEnFromCn[cn] = en;
    }
});

function displayName(name) {
    if (currentLanguage === 'en') {
        return provinceEnFromCn[name] || countryEnFromCn[name] || name;
    }
    // 日语暂时使用原文
    return name;
}

function normalizeCountryName(name) {
    const trimmed = (name || '').trim();
    return countryNameMap[trimmed] || trimmed;
}

// 构建大洲轮廓 FeatureCollection（按 continent 字段分组）
function buildContinentOverlay(geoJson) {
    const byContinent = new Map();
    (geoJson.features || []).forEach(f => {
        const continent = (f.properties?.continent || '').trim();
        if (!continent) return;
        if (!byContinent.has(continent)) {
            byContinent.set(continent, []);
        }
        const coords = byContinent.get(continent);
        if (f.geometry?.type === 'MultiPolygon') {
            coords.push(...f.geometry.coordinates);
        } else if (f.geometry?.type === 'Polygon') {
            coords.push(f.geometry.coordinates);
        }
    });

    const features = Array.from(byContinent.entries()).map(([continent, coords]) => ({
        type: 'Feature',
        properties: { continent },
        geometry: { type: 'MultiPolygon', coordinates: coords }
    }));

    return { type: 'FeatureCollection', features };
}

// 世界/欧洲地图范围集合
const topAreaCountries = [
    '俄罗斯', '加拿大', '中国', '美国', '巴西', '澳大利亚', '印度', '阿根廷', '哈萨克斯坦',
    '阿尔及利亚', '刚果民主共和国', '沙特阿拉伯', '墨西哥', '印度尼西亚', '苏丹', '利比亚',
    '伊朗', '蒙古', '秘鲁', '乍得'
];

const topGdpCountries = [
    '美国', '中国', '日本', '德国', '印度', '英国', '法国', '意大利', '加拿大', '俄罗斯',
    '韩国', '巴西', '澳大利亚', '西班牙', '墨西哥', '印度尼西亚', '荷兰', '沙特阿拉伯',
    '土耳其', '瑞士'
];

// 欧洲范围集合（按面积/经济大致排序）
const topAreaEurope = [
    '俄罗斯', '乌克兰', '法国', '西班牙', '瑞典', '挪威', '德国', '芬兰', '波兰', '意大利',
    '英国', '罗马尼亚', '白俄罗斯', '希腊', '保加利亚', '冰岛', '匈牙利', '葡萄牙', '奥地利', '捷克',
    '塞尔维亚', '爱尔兰', '立陶宛', '拉脱维亚', '克罗地亚', '波黑', '斯洛伐克', '瑞士', '摩尔多瓦', '丹麦',
    '爱沙尼亚', '荷兰', '比利时', '阿尔巴尼亚', '北马其顿', '斯洛文尼亚', '黑山', '科索沃', '卢森堡',
    '安道尔', '马耳他', '列支敦士登', '摩纳哥', '梵蒂冈', '圣马力诺'
];

const topGdpEurope = [
    '德国', '英国', '法国', '意大利', '俄罗斯', '西班牙', '荷兰', '瑞士', '土耳其', '波兰',
    '瑞典', '比利时', '挪威', '爱尔兰', '奥地利', '丹麦', '芬兰', '希腊', '捷克', '葡萄牙',
    '罗马尼亚', '匈牙利', '斯洛伐克', '乌克兰', '卢森堡', '保加利亚', '克罗地亚', '立陶宛', '斯洛文尼亚',
    '塞尔维亚', '白俄罗斯', '爱沙尼亚', '拉脱维亚', '冰岛', '塞浦路斯', '马耳他', '北马其顿', '波黑',
    '摩尔多瓦', '阿尔巴尼亚', '黑山', '科索沃'
];

function resolveTopList(list) {
    if (gameState.worldTopN === 'all') return list;
    const n = Number(gameState.worldTopN) || list.length;
    return list.slice(0, n);
}

function getAllowedSet(mode) {
    if (mode === 'world') {
        if (gameState.worldFilter === 'gdp') return new Set(resolveTopList(topGdpCountries));
        return new Set(resolveTopList(topAreaCountries));
    }
    if (mode === 'europe') {
        if (gameState.worldFilter === 'gdp') return new Set(resolveTopList(topGdpEurope));
        return new Set(resolveTopList(topAreaEurope));
    }
    return new Set();
}

// 兼容抽象地图使用的世界集合（若筛选为空则回退全部）
function getWorldAllowedSet() {
    const allowed = getAllowedSet('world');
    if (allowed.size > 0) return allowed;
    const allNames = worldGeoJson.features
        .map(f => normalizeCountryName(getFeatureName(f)))
        .filter(Boolean);
    return new Set(allNames);
}

// 基于 D3 渲染 GeoJSON
function renderD3Map(container, geoJson, normalizeFn, allowedNames = null, d3Lib = null, options = {}) {
    // 使用传入的 d3Lib 或导入的 d3
    const d3Instance = d3Lib || d3 || window.d3;
    
    if (!d3Instance) {
        console.error('D3.js 未加载');
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">D3.js 未加载</div>';
        return;
    }

    container.innerHTML = '';

    // 获取容器实际尺寸
    const rect = container.getBoundingClientRect();
    const width = rect.width || container.clientWidth || 800;
    const height = rect.height || container.clientHeight || 500;

    console.log('地图容器尺寸:', width, height);

    const rawFeatures = geoJson.features || [];
    console.log('原始特征数量:', rawFeatures.length);
    
    // 检查第一个特征的几何类型
    if (rawFeatures.length > 0) {
        const firstFeature = rawFeatures[0];
        console.log('第一个原始特征:', {
            type: firstFeature.type,
            geometryType: firstFeature.geometry?.type,
            properties: firstFeature.properties,
            coordinatesLength: firstFeature.geometry?.coordinates?.length
        });
    }
    
    let normalized = rawFeatures
        .map(feature => {
            const normalizedName = normalizeFn(getFeatureName(feature));
            return { feature, normalizedName };
        })
        .filter(item => item.normalizedName && (!allowedNames || allowedNames.has(item.normalizedName)));

    // 如果筛选后为空，回退到全部数据，避免空地图
    if (normalized.length === 0 && allowedNames) {
        console.warn('筛选后没有匹配的区域，回退到全部区域');
        normalized = rawFeatures
            .map(feature => {
                const normalizedName = normalizeFn(getFeatureName(feature));
                return { feature, normalizedName };
            })
            .filter(item => item.normalizedName);
    }

    console.log('标准化后特征数量:', normalized.length);
    
    // 检查标准化后的第一个特征
    if (normalized.length > 0) {
        const firstNormalized = normalized[0];
        console.log('第一个标准化特征:', {
            name: firstNormalized.normalizedName,
            geometryType: firstNormalized.feature.geometry?.type,
            coordinatesLength: firstNormalized.feature.geometry?.coordinates?.length
        });
    }

    if (normalized.length === 0) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">未找到匹配的数据</div>';
        return;
    }

    const filteredGeoJson = {
        type: 'FeatureCollection',
        features: normalized.map(item => item.feature)
    };

    const svg = d3Instance.select(container)
        .append('svg')
        .attr('class', 'd3-map')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .style('background', '#f5f5f5')
        .style('display', 'block')
        .style('overflow', 'visible');

    // 创建投影和路径
    // 使用 fitSize 自动调整投影以适应地图数据
    // Highcharts 世界地图使用投影坐标系，这里增加 identity 投影的兼容
    const useIdentity = options.forceIdentityProjection === true;
    const projection = useIdentity
        ? d3Instance.geoIdentity().reflectY(true).fitSize([width, height], filteredGeoJson)
        : d3Instance.geoMercator().fitSize([width, height], filteredGeoJson);
    
    const path = d3Instance.geoPath().projection(projection);
    const overlayPath = options.continentOverlay ? d3Instance.geoPath().projection(projection) : null;

    // 大洲轮廓（淡色描边层，置于底部）
    if (options.continentOverlay && overlayPath) {
        const overlayGroup = d3Instance.select(container.querySelector('svg'))
            .insert('g', ':first-child')
            .attr('class', 'continent-overlay');

        overlayGroup.selectAll('path')
            .data(options.continentOverlay.features || [])
            .enter()
            .append('path')
            .attr('d', d => overlayPath(d))
            .attr('fill', options.continentFillColor || 'none')
            .attr('fill-opacity', options.continentFillOpacity ?? 0.1)
            .attr('stroke', options.continentStrokeColor || '#94a3b8')
            .attr('stroke-width', options.continentStrokeWidth || 3)
            .attr('stroke-opacity', options.continentStrokeOpacity ?? 0.25)
            .attr('stroke-dasharray', options.continentDash ? '10 6' : null)
            .lower();
    }
    
    // 检查前3个特征的投影结果
    console.log('检查前3个特征的投影结果:');
    for (let i = 0; i < Math.min(3, normalized.length); i++) {
        const feature = normalized[i].feature;
        const pathData = path(feature);
        const bounds = path.bounds(feature);
        const centroid = path.centroid(feature);
        console.log(`特征 ${i} (${normalized[i].normalizedName}):`, {
            pathDataLength: pathData?.length || 0,
            pathDataPreview: pathData?.substring(0, 80) || 'null',
            bounds: bounds,
            centroid: centroid,
            geometryType: feature.geometry?.type
        });
    }
    
    // 检查投影后的边界和中心
    const bounds = path.bounds(filteredGeoJson);
    const center = path.centroid(filteredGeoJson);
    console.log('投影后边界:', bounds);
    console.log('地图中心点:', center);
    
    // 验证投影是否正确设置
    if (!useIdentity && typeof projection.center === 'function') {
        const projectionCenter = projection.center();
        const projectionScale = projection.scale();
        const projectionTranslate = projection.translate();
        console.log('投影中心:', projectionCenter);
        console.log('投影缩放:', projectionScale);
        console.log('投影平移:', projectionTranslate);
    } else {
        console.log('使用 identity 投影，跳过中心/缩放日志');
    }
    
    // 绘制地图路径
    let validPathCount = 0;
    let emptyPathCount = 0;
    
    const paths = svg.selectAll('path.map-region')
        .data(normalized)
        .enter()
        .append('path')
        .attr('class', 'map-region')
        .attr('d', d => {
            const pathData = path(d.feature);
            if (!pathData || pathData === '') {
                emptyPathCount++;
                console.warn('路径为空:', d.normalizedName);
                return 'M0,0'; // 返回一个最小路径，避免完全为空
            }
            validPathCount++;
            return pathData;
        })
        .attr('data-name', d => d.normalizedName)
        .attr('fill', null)
        .attr('stroke', MAP_STROKE)
        .attr('stroke-dasharray', options.dashedStroke ? '6 3' : null)
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('cursor', 'pointer')
        .style('pointer-events', 'all')
        .style('opacity', '1')
        .style('visibility', 'visible')
        .style('display', 'block')
        .style('fill-opacity', '1')
        .style('stroke-opacity', '1');

    console.log('已创建路径数量:', paths.size());
    if (paths.size() === 0) {
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}</div>`;
        return;
    }
    console.log('有效路径数量:', validPathCount);
    console.log('空路径数量:', emptyPathCount);
    
    // 检查实际渲染的路径元素
    setTimeout(() => {
        const allPaths = svg.selectAll('path.map-region').nodes();
        console.log('实际DOM中的路径数量:', allPaths.length);
        if (allPaths.length > 0) {
            // 检查前3个路径的边界框，看看它们是否重叠
            for (let i = 0; i < Math.min(3, allPaths.length); i++) {
                const path = allPaths[i];
                const rect = path.getBBox();
                const pathName = path.getAttribute('data-name');
                const pathData = path.getAttribute('d');
                console.log(`路径 ${i} (${pathName}):`, {
                    bbox: rect,
                    pathDataLength: pathData?.length || 0,
                    pathDataPreview: pathData?.substring(0, 100) || 'null'
                });
            }
            
            // 检查所有路径的边界框是否相同（如果相同，说明它们重叠）
            const firstBBox = allPaths[0].getBBox();
            let allSame = true;
            for (let i = 1; i < allPaths.length; i++) {
                const bbox = allPaths[i].getBBox();
                if (Math.abs(bbox.x - firstBBox.x) > 1 || 
                    Math.abs(bbox.y - firstBBox.y) > 1 ||
                    Math.abs(bbox.width - firstBBox.width) > 1 ||
                    Math.abs(bbox.height - firstBBox.height) > 1) {
                    allSame = false;
                    break;
                }
            }
            console.log('所有路径的边界框是否相同:', allSame);
            
            // 检查第一个路径的实际坐标范围
            const firstPath = allPaths[0];
            const firstPathData = firstPath.getAttribute('d');
            if (firstPathData) {
                // 提取所有坐标点
                const coords = firstPathData.match(/[ML][\d.-]+,[\d.-]+/g);
                if (coords && coords.length > 0) {
                    const points = coords.map(c => {
                        const match = c.match(/[\d.-]+/g);
                        return { x: parseFloat(match[0]), y: parseFloat(match[1]) };
                    });
                    const minX = Math.min(...points.map(p => p.x));
                    const maxX = Math.max(...points.map(p => p.x));
                    const minY = Math.min(...points.map(p => p.y));
                    const maxY = Math.max(...points.map(p => p.y));
                    console.log('第一个路径的实际坐标范围:', {
                        minX, maxX, minY, maxY,
                        width: maxX - minX,
                        height: maxY - minY,
                        pointCount: points.length
                    });
                }
            }
        }
    }, 100);
    
    // 检查第一个路径的数据和投影
    if (normalized.length > 0) {
        const firstFeature = normalized[0].feature;
        const firstPath = path(firstFeature);
        console.log('第一个省份:', normalized[0].normalizedName);
        console.log('第一个路径数据长度:', firstPath ? firstPath.length : 0);
        console.log('第一个路径数据预览:', firstPath ? firstPath.substring(0, 150) + '...' : 'null');
        
        // 检查投影后的坐标范围
        const featureBounds = path.bounds(firstFeature);
        console.log('第一个特征投影后边界:', featureBounds);
        console.log('边界是否在视图内:', featureBounds[0][0] >= 0 && featureBounds[0][1] >= 0 && 
                    featureBounds[1][0] <= width && featureBounds[1][1] <= height);
        
        // 检查第一个路径元素的实际样式
        const firstPathElement = svg.select('path.map-region').node();
        if (firstPathElement) {
            const computedStyle = window.getComputedStyle(firstPathElement);
            console.log('第一个路径元素计算样式:', {
                fill: computedStyle.fill,
                stroke: computedStyle.stroke,
                strokeWidth: computedStyle.strokeWidth,
                opacity: computedStyle.opacity,
                visibility: computedStyle.visibility,
                display: computedStyle.display
            });
        }
    }
    
    // 检查所有路径的边界
    const allBounds = path.bounds(filteredGeoJson);
    console.log('所有特征投影后边界:', allBounds);
    console.log('边界范围:', {
        minX: allBounds[0][0],
        minY: allBounds[0][1],
        maxX: allBounds[1][0],
        maxY: allBounds[1][1],
        width: allBounds[1][0] - allBounds[0][0],
        height: allBounds[1][1] - allBounds[0][1]
    });
    
    // 验证 SVG 元素本身
    const svgNode = svg.node();
    if (svgNode) {
        const svgComputedStyle = window.getComputedStyle(svgNode);
        console.log('SVG 元素计算样式:', {
            width: svgComputedStyle.width,
            height: svgComputedStyle.height,
            display: svgComputedStyle.display,
            visibility: svgComputedStyle.visibility,
            opacity: svgComputedStyle.opacity
        });
        console.log('SVG 元素属性:', {
            width: svgNode.getAttribute('width'),
            height: svgNode.getAttribute('height'),
            viewBox: svgNode.getAttribute('viewBox')
        });
    }

    gameState.svg = container.querySelector('svg');
    gameState.d3Svg = svg;
    gameState.d3Path = path;

    setupMapInteractions();
    generateQuestion();
}

// 加载中国地图（实际版 - 基于 D3.js）
async function loadChinaMapReal(container) {
    // 检查 D3.js 是否加载
    if (!d3 && !window.d3) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">D3.js 未加载，请刷新页面重试</div>';
        return;
    }
    
    // 使用导入的 d3 或全局 d3
    const d3Lib = d3 || window.d3;
    
    if (!d3Lib) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">D3.js 未加载，请刷新页面重试</div>';
        return;
    }
    
    try {
        const geoJson = await loadChinaGeoJson();
        if (!geoJson || !geoJson.features || geoJson.features.length === 0) {
            throw new Error('地图数据为空');
        }
        
        console.log('地图数据加载成功，特征数量:', geoJson.features.length);
        
        renderD3Map(
            container,
            geoJson,
            normalizeProvinceName,
            null,
            d3Lib,
            {
                // Highcharts China GeoJSON 使用投影坐标，需用 identity
                forceIdentityProjection: true,
                continentStrokeColor: MAP_STROKE,
                continentStrokeWidth: 2,
                continentStrokeOpacity: 0.35,
                continentDash: false,
                continentFillColor: '#e5edff',
                continentFillOpacity: 0.35
            }
        );
    } catch (error) {
        console.error('加载地图数据失败:', error);
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}: ${error.message}</div>`;
    }
}

// 加载世界地图
async function loadWorldMapReal(container) {
    const d3Lib = d3 || window.d3;
    if (!d3Lib) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">D3.js 未加载，请刷新页面重试</div>';
        return;
    }

    // 基于 Highcharts 世界 GeoJSON 生成国家列表（避免与地图不一致）
    const worldFeatures = worldGeoJson.features || [];
    const normalizedAll = worldFeatures
        .map(f => normalizeCountryName(getFeatureName(f)))
        .filter(Boolean);
    const allowedSet = getAllowedSet('world');
    const worldNames = normalizedAll.filter(n => allowedSet.size === 0 || allowedSet.has(n));
    // 如果筛选为空，回退全部
    gameData.world.countries = Array.from(new Set(worldNames.length > 0 ? worldNames : normalizedAll));

    try {
        const allowedNames = new Set(gameData.world.countries);
        if (!gameState.worldContinentOverlay) {
            gameState.worldContinentOverlay = buildContinentOverlay(worldGeoJson);
        }
        renderD3Map(
            container,
            worldGeoJson,
            normalizeCountryName,
            allowedNames,
            d3Lib,
            {
                forceIdentityProjection: true,
                continentOverlay: gameState.worldContinentOverlay,
                continentStrokeColor: MAP_STROKE,
                continentStrokeWidth: 3,
                continentStrokeOpacity: 0.18,
                continentDash: false
            }
        );
    } catch (error) {
        console.error('加载世界地图失败:', error);
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}: ${error.message}</div>`;
    }
}

// 世界地图抽象版（简化 SVG）
async function loadWorldMapAbstract(container) {
    const allowed = Array.from(getWorldAllowedSet());
    gameData.world.countries = allowed;

    const width = 800;
    const height = 520;
    const positions = abstractWorldPositions.filter(p => allowed.includes(p.name));

    if (positions.length === 0) {
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}</div>`;
        return;
    }

    const rects = positions.map(pos =>
        `<rect class="map-region" data-name="${pos.name}" x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}" rx="10" ry="10" />`
    ).join('');

    const svgContent = `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <g id="world-map" transform="scale(1,-1) translate(0,-${height})">
                ${rects}
            </g>
        </svg>
    `;

    container.innerHTML = svgContent;
    gameState.svg = container.querySelector('svg');
    if (gameState.svg) {
        setupMapInteractions();
        generateQuestion();
    }
}

// 欧洲地图实际版
async function loadEuropeMapReal(container) {
    const d3Lib = d3 || window.d3;
    if (!d3Lib) {
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">D3.js 未加载，请刷新页面重试</div>';
        return;
    }

    const features = europeGeoJson.features || [];
    const allowedSet = getAllowedSet('europe');
    gameData.europe.countries = Array.from(new Set(
        features
            .map(f => normalizeCountryName(getFeatureName(f)))
            .filter(Boolean)
            .filter(n => allowedSet.size === 0 || allowedSet.has(n))
    ));

    try {
        const allowedNames = new Set(gameData.europe.countries);
        renderD3Map(
            container,
            europeGeoJson,
            normalizeCountryName,
            allowedNames,
            d3Lib,
            {
                forceIdentityProjection: true,
                continentOverlay: buildContinentOverlay(europeGeoJson),
                continentStrokeColor: MAP_STROKE,
                continentStrokeWidth: 2.5,
                continentStrokeOpacity: 0.4,
                continentDash: true,
                continentFillColor: '#c7d2fe',
                continentFillOpacity: 0.12
            }
        );
    } catch (error) {
        console.error('加载欧洲地图失败:', error);
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}: ${error.message}</div>`;
    }
}

// 欧洲地图抽象版
async function loadEuropeMapAbstract(container) {
    const allowedSet = getAllowedSet('europe');
    const allowed = europeGeoJson.features
        .map(f => normalizeCountryName(getFeatureName(f)))
        .filter(Boolean)
        .filter(n => allowedSet.size === 0 || allowedSet.has(n));
    gameData.europe.countries = Array.from(new Set(allowed));

    const width = 600;
    const height = 420;
    const positions = abstractEuropePositions.filter(p => gameData.europe.countries.includes(p.name));

    if (positions.length === 0) {
        container.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #ff6b6b;">${t('loadFail')}</div>`;
        return;
    }

    const rects = positions.map(pos =>
        `<rect class="map-region" data-name="${pos.name}" x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}" rx="8" ry="8" />`
    ).join('');

    const svgContent = `
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <g id="europe-map" transform="scale(1,-1) translate(0,-${height})">
                ${rects}
            </g>
        </svg>
    `;

    container.innerHTML = svgContent;
    gameState.svg = container.querySelector('svg');
    if (gameState.svg) {
        setupMapInteractions();
        generateQuestion();
    }
}

// 显示省份选择器（用于省内城市模式）
function showProvinceSelector() {
    const container = document.getElementById('map-container');
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px;">
            <h3 style="color: #667eea; font-size: 1.5em;">请选择一个省份</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; width: 80%; max-width: 600px;">
                ${gameData.china.provinces.slice(0, 10).map(province => 
                    `<button class="province-select-btn" data-province="${province}" style="padding: 15px; border: 2px solid #667eea; background: white; border-radius: 8px; cursor: pointer; font-size: 1em; transition: all 0.3s;">
                        ${province}
                    </button>`
                ).join('')}
            </div>
        </div>
    `;
    
    // 绑定省份选择事件
    container.querySelectorAll('.province-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const province = e.target.dataset.province;
            loadProvinceMap(province);
        });
    });
}

// 确保高亮区域可见（对超小区域添加可视化标记）
function ensureHighlightVisibility(targetElement) {
    if (!gameState.svg || !targetElement) return;
    
    const bbox = targetElement.getBBox();
    const size = Math.max(bbox.width, bbox.height);
    
    // 对非常小的区域添加脉冲圆圈标记
    if (size < 10) {
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        marker.classList.add('highlight-marker');
        marker.setAttribute('cx', bbox.x + bbox.width / 2);
        marker.setAttribute('cy', bbox.y + bbox.height / 2);
        marker.setAttribute('r', Math.max(size * 2, 8));
        gameState.svg.appendChild(marker);
    }
}

// 加载省份地图
function loadProvinceMap(province) {
    // 这里应该加载具体省份的城市地图
    // 为了演示，我们显示一个提示
    const container = document.getElementById('map-container');
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666;">
            <h3>${province}地图</h3>
            <p style="margin-top: 20px;">此功能需要具体省份的地图数据</p>
        </div>
    `;
}

// 设置地图交互
function setupMapInteractions() {
    if (!gameState.svg) return;
    
    const regions = gameState.svg.querySelectorAll('.map-region');
    regions.forEach(region => {
        // 点击地图仅用于查看，不自动填充答案，避免误点显示正确答案
        region.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// 生成问题（SVG 模式）
function generateQuestion() {
    if (!gameState.svg) return;
    
    // 清理上一次的高亮辅助标记
    const oldMarker = gameState.svg.querySelector('.highlight-marker');
    if (oldMarker) oldMarker.remove();
    
    const regions = Array.from(gameState.svg.querySelectorAll('.map-region'))
        .map(r => ({
            element: r,
            name: r.getAttribute('data-name')
        }))
        .filter(r => r.name && !gameState.answeredRegions.has(r.name));
    
    if (regions.length === 0) {
        // 所有区域都已答完
        showGameComplete();
        return;
    }
    
    // 随机选择一个区域
    const target = regions[Math.floor(Math.random() * regions.length)];
    gameState.currentQuestion = target.name;
    
    setText('current-province', `${t('loading').includes('Loading') ? 'Remaining regions' : '剩余区域'}：${regions.length}`);
    
    // 高亮目标区域
    regions.forEach(r => {
        r.element.classList.remove('highlighted', 'correct', 'wrong');
        r.element.removeAttribute('stroke-width');
        r.element.removeAttribute('stroke');
        r.element.removeAttribute('fill');
    });
    target.element.classList.add('highlighted');
    target.element.style.fill = '#ffbf47';
    target.element.style.stroke = '#ff8a00';
    target.element.style.strokeWidth = '3px';
    ensureHighlightVisibility(target.element);
    
    // 生成选项
    generateOptions(target.name, regions.map(r => r.name));
    
    // 重置选择
    gameState.selectedAnswer = null;
    setDisabled('submit-btn', true);
    setText('feedback', '');
    const fbEl4 = document.getElementById('feedback');
    if (fbEl4) fbEl4.className = 'feedback';
}

// 生成选项
function generateOptions(correctAnswer, allRegions) {
    const optionsContainer = document.getElementById('options');
    let options = [correctAnswer];
    
    // 获取数据源
    const dataSource = gameState.mode === 'china' 
        ? gameData.china.provinces 
        : gameState.mode === 'world'
            ? gameData.world.countries
            : gameState.mode === 'europe'
                ? gameData.europe.countries
                : gameData.world.countries;
    
    // 添加3个错误选项
    const wrongOptions = dataSource
        .filter(name => name !== correctAnswer && allRegions.includes(name))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    
    options = [...options, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    optionsContainer.innerHTML = options.map(option => 
        `<button class="option-btn" data-answer="${option}">${displayName(option)}</button>`
    ).join('');
    
    // 绑定选项点击事件
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 移除其他选中状态
            optionsContainer.querySelectorAll('.option-btn').forEach(b => {
                b.classList.remove('selected');
            });
            // 添加选中状态
            e.target.classList.add('selected');
            selectAnswer(e.target.dataset.answer);
        });
    });
}

// 选择答案
function selectAnswer(answer) {
    gameState.selectedAnswer = answer;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.answer === answer);
    });
    
    setDisabled('submit-btn', false);
}

// 提交答案
function submitAnswer() {
    if (!gameState.selectedAnswer || !gameState.currentQuestion) return;
    
    const isCorrect = gameState.selectedAnswer === gameState.currentQuestion;
    
    // 更新统计
    if (isCorrect) {
        gameState.score += 10;
        gameState.correctCount++;
        gameState.answeredRegions.add(gameState.currentQuestion);
    } else {
        gameState.wrongCount++;
    }
    
    updateStats();
    
    // 显示反馈
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = isCorrect ? t('correctMsg') : `${t('wrongMsg')}${gameState.currentQuestion}`;
        feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    }
    
    // 更新地图区域颜色
    if (gameState.svg) {
        const regions = gameState.svg.querySelectorAll('.map-region');
        regions.forEach(region => {
            const regionName = region.getAttribute('data-name');
            if (regionName === gameState.currentQuestion) {
                region.classList.remove('highlighted');
                region.classList.add(isCorrect ? 'correct' : 'wrong');
                region.style.fill = '';
                region.style.stroke = '';
                region.style.strokeWidth = '';
            }
        });
        const oldMarker = gameState.svg.querySelector('.highlight-marker');
        if (oldMarker) oldMarker.remove();
    }
    
    // 禁用提交按钮
    setDisabled('submit-btn', true);
    
    // 2秒后生成新问题
    setTimeout(() => {
        generateQuestion();
    }, 2000);
}

// 更新统计
function updateStats() {
    setText('score', gameState.score);
    setText('correct-count', gameState.correctCount);
    setText('wrong-count', gameState.wrongCount);
    
    const total = gameState.correctCount + gameState.wrongCount;
    const accuracy = total > 0 
        ? Math.round((gameState.correctCount / total) * 100) 
        : 0;
    setText('accuracy', `${accuracy}%`);
}

// 显示游戏完成
function showGameComplete() {
    const container = document.getElementById('map-container');
    setText('current-province', '');
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px;">
            <h2 style="color: #667eea; font-size: 2em;">🎉 恭喜完成！</h2>
            <p style="font-size: 1.2em; color: #666;">你已经完成了所有区域</p>
            <button onclick="location.reload()" style="padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1.2em; cursor: pointer;">
                重新开始
            </button>
        </div>
    `;
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
