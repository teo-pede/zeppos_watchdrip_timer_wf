import {img} from "../../utils/helper";
import {DebugText} from "../../shared/debug";
import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";

import {
    IMG_BG,
    DIGITAL_TIME,
    DIGITAL_TIME_AOD,
    DATE_TEXT_IMG,
    WEEK_DAYS_IMG,

    BG_VALUE_NO_DATA_TEXT,
    BG_VALUE_TEXT_IMG,
    BG_VALUE_TEXT_IMG_AOD,
    BG_STALE_IMG,
    BG_VALUE_TEXT_BG,
    BG_TEXT_IMG_W,
    BG_TEXT_IMG_DOT_W,
    BG_TEXT_IMG_POS,

    BG_TIME_TEXT,
    BG_DELTA_TEXT,
    BG_TREND_IMAGE,
    PHONE_BATTERY_TEXT,
    PHONE_BATTERY_IMG,
    WATCH_BATTERY_TEXT,
    WATCH_BATTERY_PROG,
    WATCH_BATTERY_PROG_FULL,
    DISTANCE_TEXT,
    IMG_STATUS_BT_DISCONNECTED,
    IMG_STATUS_DND,
    IMG_STATUS_ALARM,
    IMG_LOADING_PROGRESS,
    EDIT_MASK_100,
    EDIT_MASK_70,

    EDIT_GROUP_DEFAULTS,
    EDIT_DEFAULT_IMG,
    EDIT_DEFAULT_IMG_POINT,
    EDIT_DEFAULT_TEXT_IMG,

    EDIT_LEFT_GROUP,
    EDIT_LEFT_IMG,
    EDIT_LEFT_TEXT_IMG,
    EDIT_LEFT_IMG_POINTER,

    EDIT_RIGHT_GROUP,
    EDIT_RIGHT_IMG,
    EDIT_RIGHT_TEXT_IMG,
    EDIT_RIGHT_IMG_POINTER,

    EDIT_HEART_IMG,
    EDIT_HEART_IMG_CLICK,
    EDIT_HEART_IMG_POINTER,
    EDIT_HEART_TEXT_IMG,

    EDIT_STEP_IMG,
    EDIT_STEP_IMG_CLICK,
    EDIT_STEP_IMG_POINTER,
    EDIT_STEP_TEXT_IMG,

    EDIT_CAL_IMG,
    EDIT_CAL_IMG_CLICK,
    EDIT_CAL_IMG_POINTER,
    EDIT_CAL_TEXT_IMG,

    EDIT_STAND_IMG,
    EDIT_STAND_IMG_CLICK,
    EDIT_STAND_IMG_POINTER,
    EDIT_STAND_TEXT_IMG,

    EDIT_WEATHER_CONDITION_IMG_LEVEL,
    EDIT_WEATHER_IMG,
    EDIT_WEATHER_IMG_CLICK,
    EDIT_WEATHER_CURRENT_TEXT_IMG,

    EDIT_PAI_IMG,
    EDIT_PAI_IMG_CLICK,
    EDIT_PAI_IMG_POINTER,
    EDIT_PAI_TEXT_IMG,

    EDIT_UVI_IMG,
    EDIT_UVI_IMG_CLICK,
    EDIT_UVI_IMG_POINTER,
    EDIT_UVI_TEXT_IMG,

    GRAPH_SETTINGS
} from "./styles";
import {PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS, TEST_DATA} from "../../utils/config/constants";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../utils/config/device";

let bgValNoDataTextWidget, bgValTextImgWidget, bgValTimeTextWidget, bgDeltaTextWidget, bgTrendImageWidget, progress, bgStaleLine;

let imgBg, bgRect, digitalClock, daysImg, dateTextImg, btDisconnected, dndStatus, alarmStatus, distanceText, 
    editGroupLeft, editGroupRight, phoneBattery, phoneBatteryImg, watchBattery, watch_battery_prog, watch_battery_prog_full;

let globalNS, progressTimer, progressAngle, screenType;

let debug, watchdrip;

export const logger = Logger.getLogger("timer-page");

function initDebug() {
    globalNS.debug = new DebugText();
    debug = globalNS.debug;
    debug.setLines(12);
}

function startLoader() {
    progress.setProperty(hmUI.prop.VISIBLE, true);
    progressAngle = 0;
    progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
    progressTimer = globalNS.setInterval(() => {
        updateLoader();
    }, PROGRESS_UPDATE_INTERVAL_MS);
}

function updateLoader() {
    progressAngle = progressAngle + PROGRESS_ANGLE_INC;
    if (progressAngle >= 360) progressAngle = 0;
    progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
}

function stopLoader() {
    if (progressTimer !== null) {
        globalNS.clearInterval(progressTimer);
        progressTimer = null;
    }
    progress.setProperty(hmUI.prop.VISIBLE, false);
}

function getPropsByVal(value, view) {
    let rate = view.w / 100;
    let progress = rate * value;
    return {
            x:view.x,
            y:view.y,
            h:view.h,
            w:progress
           }
}

function mergeStyles(styleObj1, styleObj2, styleObj3 = {}) {
    return Object.assign({}, styleObj1, styleObj2, styleObj3);
}

let bgColorNumber = 1;
let bgTotalColors = 5;

function click_Color() {
    if(bgColorNumber >= bgTotalColors) {
        bgColorNumber = 1;
    } else {
        bgColorNumber = bgColorNumber+1;
    }
    imgBg.setProperty(hmUI.prop.SRC, img(`bg/bg_${bgColorNumber}.png`));
}

WatchFace({
    // draws the editable widgets
    drawWidget(imgStyle, pointImgStyle, textImgStyle, editType){
        switch (editType) {
            case hmUI.edit_type.HEART:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_HEART_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_HEART_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_HEART_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_HEART_TEXT_IMG));
                break;
            case hmUI.edit_type.STEP:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_STEP_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_STEP_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_STEP_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_STEP_TEXT_IMG));
                break;
            case hmUI.edit_type.WEATHER:
                hmUI.createWidget(hmUI.widget.IMG_LEVEL, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_WEATHER_CONDITION_IMG_LEVEL));
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_WEATHER_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_WEATHER_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_WEATHER_CURRENT_TEXT_IMG));
                break;
            case hmUI.edit_type.UVI:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_UVI_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_UVI_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_UVI_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_UVI_TEXT_IMG));
                break;
            case hmUI.edit_type.PAI:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_PAI_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_PAI_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_PAI_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_PAI_TEXT_IMG));
                break;
            case hmUI.edit_type.CAL:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_CAL_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_CAL_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_CAL_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_CAL_TEXT_IMG));
                break;
            case hmUI.edit_type.STAND:
                hmUI.createWidget(hmUI.widget.IMG, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_STAND_IMG));
                hmUI.createWidget(hmUI.widget.IMG_CLICK, mergeStyles(EDIT_DEFAULT_IMG, imgStyle, EDIT_STAND_IMG_CLICK));
                hmUI.createWidget(hmUI.widget.IMG_POINTER, mergeStyles(EDIT_DEFAULT_IMG_POINT, pointImgStyle, EDIT_STAND_IMG_POINTER));
                hmUI.createWidget(hmUI.widget.TEXT_IMG, mergeStyles(EDIT_DEFAULT_TEXT_IMG, textImgStyle, EDIT_STAND_TEXT_IMG));
                break;     
        };
    },

    // Init View
    initView() {
        let digitalTimeParam = DIGITAL_TIME;
        let bgValTextImgParam = BG_VALUE_TEXT_IMG;
        screenType = hmSetting.getScreenType();
        if (screenType === hmSetting.screen_type.AOD) {
            digitalTimeParam = DIGITAL_TIME_AOD;
            bgValTextImgParam = BG_VALUE_TEXT_IMG_AOD;           
        };

        imgBg = hmUI.createWidget(hmUI.widget.IMG, IMG_BG);

        bgRect = hmUI.createWidget(hmUI.widget.FILL_RECT, BG_VALUE_TEXT_BG);

        digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, digitalTimeParam);
        
        daysImg = hmUI.createWidget(hmUI.widget.IMG_WEEK, WEEK_DAYS_IMG);

        dateTextImg = hmUI.createWidget(hmUI.widget.IMG_DATE, DATE_TEXT_IMG);
        
        btDisconnected = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_BT_DISCONNECTED);
        dndStatus = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_DND);
        alarmStatus = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_ALARM);

        watch_battery_prog_full = hmUI.createWidget(hmUI.widget.FILL_RECT, WATCH_BATTERY_PROG_FULL);
        watch_battery_prog = hmUI.createWidget(hmUI.widget.FILL_RECT, WATCH_BATTERY_PROG);
        watchBattery = hmUI.createWidget(hmUI.widget.TEXT, WATCH_BATTERY_TEXT);

        const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);
        batterySensor.addEventListener(hmSensor.event.CHANGE, function () { 
            updateWidgets();
        });

        distanceText = hmUI.createWidget(hmUI.widget.TEXT_IMG, DISTANCE_TEXT);
        
        const widgetDelegate = hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
            resume_call: (function () {
                screenType = hmSetting.getScreenType();
                updateWidgets();
            })
        });
        
        // BEGIN editable components init
        // 100% edit mask
        const maskCover = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_MASK, EDIT_MASK_100);
        // 70% edit mask
        const mask = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_FG_MASK, EDIT_MASK_70);
        // Left editable widget
        editGroupLeft = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, mergeStyles(EDIT_GROUP_DEFAULTS, EDIT_LEFT_GROUP));
        this.drawWidget(EDIT_LEFT_IMG, EDIT_LEFT_IMG_POINTER, EDIT_LEFT_TEXT_IMG, editGroupLeft.getProperty(hmUI.prop.CURRENT_TYPE));

        // Right editable widget
        editGroupRight = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, mergeStyles(EDIT_GROUP_DEFAULTS, EDIT_RIGHT_GROUP));
        this.drawWidget(EDIT_RIGHT_IMG, EDIT_RIGHT_IMG_POINTER, EDIT_RIGHT_TEXT_IMG, editGroupRight.getProperty(hmUI.prop.CURRENT_TYPE));

        // END editable components init

        //init watchdrip related widgets
        bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, bgValTextImgParam);
        bgValNoDataTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
        bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
        bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
        bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
        bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
        phoneBattery = hmUI.createWidget(hmUI.widget.TEXT, PHONE_BATTERY_TEXT);
        phoneBatteryImg = hmUI.createWidget(hmUI.widget.IMG, PHONE_BATTERY_IMG);
        progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);

        function updateWidgets() {
            if (typeof batterySensor !== 'undefined') {
                if (screenType !== hmSetting.screen_type.AOD) {
                    watchBattery.setProperty(hmUI.prop.TEXT, batterySensor.current + '%');
                    watch_battery_prog.setProperty(hmUI.prop.MORE, getPropsByVal(batterySensor.current, WATCH_BATTERY_PROG));
                    nextColor = 0xfabb00;
                    if (batterySensor.current > 70){
                        nextColor = 0x218c03;
                    } else if (batterySensor.current < 30){
                        nextColor = 0xa80702;
                    }
                    watch_battery_prog.setProperty(hmUI.prop.MORE, {color: nextColor});
                }
            }
        }

        stopLoader();
        updateWidgets();
    },
    updateStart() {
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, false);
        bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, false);
        startLoader();
    },
    updateFinish(isSuccess) {
        stopLoader();
        bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, true);
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateValuesWidget(watchdripData) {
        if (watchdripData === undefined) return;
        const bgObj = watchdripData.getBg();

        if (bgObj.isHasData()) {
            let bgValTextLen = bgObj.getBGVal().toString().replace('.','').length * BG_TEXT_IMG_W;
            if (bgObj.getBGVal().toString().includes('.')){
                bgValTextLen += BG_TEXT_IMG_DOT_W;
            }
            const dimBgValTextImgWidget = { x: BG_TEXT_IMG_POS.x + BG_TEXT_IMG_POS.w - bgValTextLen, w: bgValTextLen};
            
            if (bgObj.isHigh) {
                bgRect.setProperty(hmUI.prop.MORE, {...dimBgValTextImgWidget, color: 0xfabb00});
            } else if (bgObj.isLow) {
                bgRect.setProperty(hmUI.prop.MORE, {...dimBgValTextImgWidget, color: 0xa80702});
            } else {
                bgRect.setProperty(hmUI.prop.MORE, {...dimBgValTextImgWidget, color: 0xffffff});
            }

            bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
            bgValNoDataTextWidget.setProperty(hmUI.prop.VISIBLE, false);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        } else {
            bgValNoDataTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            //bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, false);
            bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
            bgRect.setProperty(hmUI.prop.MORE, {color: 0x000000});
        };

        bgDeltaTextWidget.setProperty(hmUI.prop.TEXT, bgObj.delta);

        bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());

        phoneBattery.setProperty(hmUI.prop.TEXT, watchdripData.getStatus().getBatVal());

        if (TEST_DATA) {
            bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
        }
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateTimesWidget(watchdripData) {
        if (watchdripData === undefined) return;
        const bgObj = watchdripData.getBg();
        bgValTimeTextWidget.setProperty(hmUI.prop.TEXT, watchdripData.getTimeAgo(bgObj.time));
        bgStaleLine.setProperty(hmUI.prop.VISIBLE, watchdripData.isBgStale());
    },

    onInit() {
        logger.log("wf on init invoke");
    },

    build() {
        try{
            logger.log("wf on build invoke");
            globalNS = getGlobal();
            initDebug();
            debug.log("build");
            this.initView();
            globalNS.watchdrip = new Watchdrip();
            watchdrip = globalNS.watchdrip;
            watchdrip.prepare();
            watchdrip.setUpdateValueWidgetCallback(this.updateValuesWidget);
            watchdrip.setUpdateTimesWidgetCallback(this.updateTimesWidget);
            watchdrip.setOnUpdateStartCallback(this.updateStart);
            watchdrip.setOnUpdateFinishCallback(this.updateFinish);

            let lineStyles = {};
            const POINT_SIZE = GRAPH_SETTINGS.point_size;
            const TREATMENT_POINT_SIZE = GRAPH_SETTINGS.treatment_point_size;
            const LINE_SIZE = GRAPH_SETTINGS.line_size;
            lineStyles['predict'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['high'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['low'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['inRange'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
            lineStyles['lineLow'] = new PointStyle("", LINE_SIZE);
            lineStyles['lineHigh'] = new PointStyle("", LINE_SIZE);
            lineStyles['treatment'] = new PointStyle(TREATMENT_POINT_SIZE, TREATMENT_POINT_SIZE);

            watchdrip.createGraph(GRAPH_SETTINGS.x,GRAPH_SETTINGS.y,GRAPH_SETTINGS.w,GRAPH_SETTINGS.h, lineStyles);

            watchdrip.start();
        }
        catch (e) {
            console.log('LifeCycle Error', e)
            e && e.stack && e.stack.split(/\n/).forEach((i) => console.log('error stack', i))
        }
    },

    onDestroy() {
        logger.log("wf on destroy invoke");
        watchdrip.destroy();
        stopLoader();
    },

    onShow() {
        debug.log("onShow");
    },

    onHide() {
        debug.log("onHide");
    },
});
