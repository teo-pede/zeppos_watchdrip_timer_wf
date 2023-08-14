import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";
import {DEVICE_HEIGHT, DEVICE_WIDTH} from "../../utils/config/device";

const colorProgBar = 0x262626;
const noneImg = 'watchdrip/arrows/None.png';

const bigNumArr = range(10).map((v) => {
    return img(`bigNum/${v}.png`);
});

const bigNumAODArr = range(10).map((v) => {
    return img(`bigNumAOD/${v}.png`);
});

const minNumArr = range(10).map((v) => {
    return img(`minNum/${v}.png`);
});

const minNumAODArr = range(10).map((v) => {
    return img(`minNumAOD/${v}.png`);
});

export const IMG_BG = {
    x: px(0),
    y: px(0),
    w: px(DEVICE_WIDTH),
    h: px(DEVICE_HEIGHT),
    src: img('bg/bg_1.png'),
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD
};

export const DIGITAL_TIME = {
    hour_startX: px(15),
    hour_startY: px(28),
    hour_zero: true,
    hour_space: 1,
    hour_align: hmUI.align.CENTER_H,
    hour_array: bigNumArr,
    minute_startX: px(100),
    minute_startY: px(28),
    minute_zero: true,
    minute_space: 0,
    minute_align: hmUI.align.CENTER_H,
    minute_array: minNumArr,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const DIGITAL_TIME_AOD = {
    ...DIGITAL_TIME,
    hour_array: bigNumAODArr,
    minute_array: minNumAODArr,
    show_level: hmUI.show_level.ONAL_AOD
};

const dayNumArr = range(10).map((v) => {
    return img(`dayNum/${v}.png`);
});

export const DATE_TEXT_IMG = {
    day_startX: px(160),
    day_startY: px(85),
    day_zero: 1,
    day_space: 1,
    day_follow: 0,
    day_is_character: false,
    day_align: hmUI.align.LEFT,
    day_sc_array: dayNumArr,
    day_tc_array: dayNumArr,
    day_en_array: dayNumArr,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

const weekEnArr = range(1, 8).map((v) => {
    return img(`week_en/${v}.png`);
});

export const WEEK_DAYS_IMG = {
    x: px(92),
    y: px(85),
    week_en: weekEnArr,
    week_tc: weekEnArr,
    week_sc: weekEnArr,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(104),
    y: px(154),
    w: px(80),
    h: px(24),
    color: Colors.white,
    text_size: px(20),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

const bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

const bgNumAODArr = range(10).map((v) => {
    return img(`bgNumAOD/${v}.png`);
});

export const BG_TEXT_IMG_W = 33;
export const BG_TEXT_IMG_DOT_W = 12;
export const BG_TEXT_IMG_POS = {x: 6, y: 118, w: BG_TEXT_IMG_W * 3 + BG_TEXT_IMG_DOT_W, h: 53};

export const BG_VALUE_TEXT_BG = {
    ...BG_TEXT_IMG_POS,
    radius: 0,
    color: Colors.black,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT | hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG = {
    ...BG_TEXT_IMG_POS,
    align_h: hmUI.align.RIGHT,
    visible: false,
    h_space: 0,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const BG_VALUE_TEXT_IMG_AOD = {
    ...BG_TEXT_IMG_POS,
    align_h: hmUI.align.RIGHT,
    visible: false,
    h_space: 0,
    dot_image: img('bgNumAOD/d.png'),
    font_array: bgNumAODArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_STALE_IMG = {
    ...BG_TEXT_IMG_POS,
    src: 'watchdrip/stale.png',
    visible: false,
};

export const BG_TIME_TEXT = {
    x: px(118),
    y: px(124),
    w: px(74),
    h: px(24),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT | hmUI.show_level.ONAL_AOD
};

export const BG_DELTA_TEXT = {
    x: px(118),
    y: px(106),
    w: px(74),
    h: px(24),
    color: Colors.defaultTransparent,
    text_size: px(20),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT | hmUI.show_level.ONAL_AOD
};

export const BG_TREND_IMAGE = {
    src: noneImg,
    x: px(136),
    y: px(158),
    w: px(60),
    h: px(41),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const WATCH_BATTERY_PROG = {
    x: px(99),
    y: px(7),
    w: px(88),
    h: px(10),
    radius: 5,
    color: Colors.defaultTransparent,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const WATCH_BATTERY_PROG_FULL = {
    ...WATCH_BATTERY_PROG,
    color: colorProgBar,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const WATCH_BATTERY_TEXT = {
    x: px(57),
    y: px(2),
    w: px(40),
    h: px(18),
    color: Colors.white,
    text_size: px(15),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const IMG_STATUS_BT_DISCONNECTED = {
    x: px(3),
    y: px(4),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD | hmUI.show_level.ONLY_EDIT
};

export const IMG_STATUS_DND = {
    x: px(21),
    y: px(4),
    src: img('status/dnd.png'),
    type: hmUI.system_status.DISTURB,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD | hmUI.show_level.ONLY_EDIT
};

export const IMG_STATUS_ALARM = {
    x: px(39),
    y: px(4),
    src: img('status/alarm.png'),
    type: hmUI.system_status.CLOCK,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const IMG_LOADING_PROGRESS = {
    x: px(130),
    y: px(114),
    src: 'watchdrip/progress.png',
    angle: 0,
    center_x: 20,
    center_y: 20,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const PHONE_BATTERY_TEXT = {
    x: px(26),
    y: px(270),
    w: px(40),
    h: px(18),
    color: Colors.white,
    text_size: px(15),
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const PHONE_BATTERY_IMG = {
    x: px(10),
    y: px(270),
    src: img('status/phone.png'),
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

const distanceArr = range(10).map((v) => {
    return img(`distance/${v}.png`);
});
export const DISTANCE_TEXT = {
    x: px(106),
    y: px(274),
    w: px(76),
    h: px(18),
    font_array: distanceArr,
    unit_sc: img('distance/km.png'),
    unit_tc: img('distance/km.png'),
    unit_en: img('distance/km.png'),
    imperial_unit_sc: img('distance/mi.png'),
    imperial_unit_tc: img('distance/mi.png'),
    imperial_unit_en: img('distance/mi.png'),
    dot_image: img('distance/d.png'),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    type: hmUI.data_type.DISTANCE,
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

// 100% edit mask
export const EDIT_MASK_100 = {
    x: px(0),
    y: px(0),
    w: px(194),
    h: px(368),
    src: img('mask/mask100.png'),
    show_level: hmUI.show_level.ONLY_EDIT
};

// 70% edit mask
export const EDIT_MASK_70 = {
    x: px(0),
    y: px(0),
    w: px(194),
    h: px(368),
    src: img('mask/mask70.png'),
    show_level: hmUI.show_level.ONLY_EDIT
};


// BEGIN edit group default styles
const editWidgetW = 86;
const editWidgetH = 86;

const editGroupTypes = [
    {
        type: hmUI.edit_type.HEART,
        preview: img('widgets/heart/heart.png')
    },
    {
        type: hmUI.edit_type.STEP,
        preview: img('widgets/steps/steps.png')
    },
    {
        type: hmUI.edit_type.CAL,
        preview: img('widgets/calories/calories.png')
    },
    {
        type: hmUI.edit_type.STAND,
        preview: img('widgets/stand/stand.png')
    },
    {
        type: hmUI.edit_type.PAI_DAILY,
        preview: img('widgets/pai/pai.png')
    },
    {
        type: hmUI.edit_type.WEATHER,
        preview: img('widgets/weather/weather_prev.png')
    },
    {
        type: hmUI.edit_type.UVI,
        preview: img('widgets/uvi/uvi.png')
    }
];

export const EDIT_GROUP_DEFAULTS = {
    w: px(editWidgetW),
    h: px(editWidgetH),
    select_image: img('mask/select.png'),
    un_select_image: img('mask/un_select.png'),
    optional_types: editGroupTypes,
    count: editGroupTypes.length,
    tips_BG: img('mask/text_tag.png'),
    tips_x: 0,
    tips_y: -45,
    tips_width: 88,
    tips_margin: 1, // optional, default value: 0
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

// Default styles for all IMG widgets 
export const EDIT_DEFAULT_IMG = {
    w: px(editWidgetW),
    h: px(editWidgetH),
    show_level: hmUI.show_level.ONLY_NORMAL
};

// Default styles for all IMG_POINT widgets 
export const EDIT_DEFAULT_IMG_POINT = {
    src: img('widgets/point.png'),
    start_angle: -139,
    end_angle: 140,
    show_level: hmUI.show_level.ONLY_NORMAL
};

const smallNumArr = range(10).map((v) => {
    return img(`widgets/f_${v}.png`);
});

// Default styles for all TEXT_IMG widgets
export const EDIT_DEFAULT_TEXT_IMG = {
    w: px(editWidgetW),
    padding: false,
    h_space: 1,
    align_h: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: smallNumArr,
    dot_image: img('widgets/d.png'),
    negative_image: img('widgets/negative.png')
};
// END edit group default styles

// BEGIN Left Edit Widgets
const leftX = 8;
const leftY = 184;

export const EDIT_LEFT_GROUP = {
    edit_id: 101,
    x: px(leftX),
    y: px(leftY),
    default_type: hmUI.edit_type.HEART
}; 
// Styles for all Left IMG widgets
export const EDIT_LEFT_IMG = {
    x: px(leftX),
    y: px(leftY)
};
// Styles for all Left TEXT_IMG widgets
export const EDIT_LEFT_TEXT_IMG = {
    x: px(leftX),
    y: px(leftY + (editWidgetH / 2) - 8 )
};
// Styles for all Left IMG_POINTER widgets
export const EDIT_LEFT_IMG_POINTER = {
    center_x: px(leftX + (editWidgetW / 2)),
    center_y: px(leftY + (editWidgetH / 2)),
    x: 4,
    y: 41,
};
// END Left Edit Widgets

// BEGIN Right Edit Widgets
const rightX = 100;
const rightY = 184;

export const EDIT_RIGHT_GROUP = {
    edit_id: 102,
    x: px(rightX),
    y: px(rightY),
    default_type: hmUI.edit_type.WEATHER
}; 
// Styles for all Right IMG widgets
export const EDIT_RIGHT_IMG = {
    x: px(rightX),
    y: px(rightY)
};
// Styles for all Right TEXT_IMG widgets
export const EDIT_RIGHT_TEXT_IMG = {
    x: px(rightX),
    y: px(rightY + (editWidgetH / 2) - 8 )
};
// Styles for all Right IMG_POINTER widgets
export const EDIT_RIGHT_IMG_POINTER = {
    center_x: px(rightX + (editWidgetW / 2)),
    center_y: px(rightY + (editWidgetH / 2)),
    x: 4,
    y: 41,
};
// END Right Edit Widgets

// BEGIN Edit Widgets
// These styles are merged with the above default styles.
// HEART widget
export const EDIT_HEART_IMG = {
    src: img('widgets/heart/heart.png')
};
export const EDIT_HEART_IMG_CLICK = {
    src: noneImg,
    type: hmUI.data_type.HEART
};
export const EDIT_HEART_IMG_POINTER = {
    type: hmUI.data_type.HEART
};
export const EDIT_HEART_TEXT_IMG = {
    type: hmUI.data_type.HEART
};

// STEP widget
export const EDIT_STEP_IMG = {
    src: img('widgets/steps/steps.png')
};
export const EDIT_STEP_IMG_CLICK = {
    src: noneImg,
    type: hmUI.data_type.STEP
};
export const EDIT_STEP_IMG_POINTER = {
    type: hmUI.data_type.STEP
};
export const EDIT_STEP_TEXT_IMG = {
    type: hmUI.data_type.STEP
};

// CAL widget
export const EDIT_CAL_IMG = {
    src: img('widgets/calories/calories.png')
};
export const EDIT_CAL_IMG_CLICK= {
    src: noneImg,
    type: hmUI.data_type.CAL
};
export const EDIT_CAL_IMG_POINTER = {
    type: hmUI.data_type.CAL
};
export const EDIT_CAL_TEXT_IMG = {
    type: hmUI.data_type.CAL,
};

// STAND widget
export const EDIT_STAND_IMG = {
    src: img('widgets/stand/stand.png')
};
export const EDIT_STAND_IMG_CLICK= {
    src: noneImg,
    type: hmUI.data_type.STAND
};
export const EDIT_STAND_IMG_POINTER = {
    type: hmUI.data_type.STAND
};
export const EDIT_STAND_TEXT_IMG = {
    type: hmUI.data_type.STAND,
    dot_image: img('widgets/slash.png')
};

const weatherArr = range(29).map((v) => {
    return img(`widgets/weather/${v}.png`);
});
// WEATHER widget
export const EDIT_WEATHER_CONDITION_IMG_LEVEL = {
    image_array: weatherArr,
    image_length: weatherArr.length,
    type: hmUI.data_type.WEATHER
};
export const EDIT_WEATHER_IMG = {
    src: img('widgets/weather/weather.png')
};
export const EDIT_WEATHER_IMG_CLICK= {
    src: noneImg,
    type: hmUI.data_type.WEATHER_CURRENT
};
export const EDIT_WEATHER_CURRENT_TEXT_IMG = {
    type: hmUI.data_type.WEATHER_CURRENT,
    unit_sc: img('widgets/deg.png'),
    unit_tc: img('widgets/deg.png'),
    unit_en: img('widgets/deg.png'),
    imperial_unit_sc: img('widgets/deg.png'),
    imperial_unit_tc: img('widgets/deg.png'),
    imperial_unit_en: img('widgets/deg.png'),
    negative_image: img('widgets/negative.png'),
    dont_path: img('widgets/d.png')
};

// PAI widget
export const EDIT_PAI_IMG = {
    src: img('widgets/pai/pai.png')
};
export const EDIT_PAI_IMG_CLICK= {
    src: noneImg,
    type: hmUI.data_type.PAI
};
export const EDIT_PAI_IMG_POINTER = {
    type: hmUI.data_type.PAI_DAILY
};
export const EDIT_PAI_TEXT_IMG = {
    type: hmUI.data_type.PAI_DAILY
};

// UVI widget
export const EDIT_UVI_IMG = {
    src: img('widgets/uvi/uvi.png')
};
export const EDIT_UVI_IMG_CLICK= {
    src: noneImg,
    type: hmUI.data_type.UVI
};
export const EDIT_UVI_IMG_POINTER = {
    type: hmUI.data_type.UVI
};
export const EDIT_UVI_TEXT_IMG = {
    type: hmUI.data_type.UVI
};

export const GRAPH_SETTINGS = {
    x: 1,
    y: 290,
    w: 192,
    h: 85,
    point_size: 6,
    treatment_point_size: 10,
    line_size: 3
};

// END Edit Widgets
