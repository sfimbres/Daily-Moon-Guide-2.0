import { ref, reactive } from 'vue'
import { getMoonDataFor, getMoonPhase, todayIsSpecial } from '../helpers/functions';

//Initial Prop Values

const moon_json = await fetch("/src/assets/json/moon.json")
    .then((res) => {return res.json()});
const moon_phases = await fetch("/src/assets/json/moon_phases.json")
    .then((res) => {return res.json()});
const data_descriptions = [
        "This shows the Moon’s current phase in two ways: the percentage of the Moon’s nearside that is illuminated by the Sun, and how many days have passed since new moon. The complete lunar cycle, or time it takes the Moon to go through all of its phases once, is 29.5 days long.",
        "The Moon's orbit around Earth is not a perfect circle. Because of that, the Moon's distance from Earth varies between 28 through 32 times the diameter of the Earth, or about 221,457 miles (356,400 km) and 252,712 miles (406,700 km). The closest point to Earth in the Moon's orbit is called perigee, from Greek words meaning \"near Earth,\" while the farthest point is called apogee.",
        "Astronomers measure the size of objects and distance between them in the sky in terms of angular size. Angular diameter here refers to how large the Moon appears in the sky. This number changes as the Moon's distance varies from Earth throughout its orbit. Angular diameter is based on the division of a circle into 360 degrees. Each degree consists of 60 arcminutes, and each arcminute is divided into 60 arcseconds."
];
const promo = await fetch("/src/assets/json/promo.json")
    .then((res) => {return res.json()});;  
const faq_url = "/mvg-faq-overlay/";
const events =  await fetch("/src/assets/json/events.json")
    .then((res) => {return res.json()});
const hotspots = await fetch("/src/assets/json/hotspots.json")
    .then((res) => {return res.json()});
const positions = await fetch("/src/assets/json/feature_pos_2023.json")
    .then((res) => {return res.json()});
const visibility = await fetch("/src/assets/json/visibility.json")
    .then((res) => {return res.json()});
const single_day = false;

//export initial app props
export const appProps = reactive({
    moon_json,
    moon_phases,
    data_descriptions,
    promo,
    faq_url,
    events,
    hotspots,
    positions,
    visibility,
    single_day
})

//Setup State Values
let date = new Date()
const hash_value = window.location.hash.split('#')[1]
const h = hash_value ? hash_value.split('::') : null
let initial_date = h ? h[0] : ""
if (typeof initial_date != ""){
    date = new Date(unescape(initial_date))
    if (date == "Invalid Date"){
    date = new Date()
    }
} 
let moon_idx = getMoonDataFor(date);
let moon_data = moon_idx > -1 ? (moon_json[moon_idx]) : null
let moon_phase = moon_data ? getMoonPhase(moon_data.phase_name) : null
let first_day = Date.parse(moon_json[0].time)
let last_day = Date.parse(moon_json[moon_json.length - 1].time)
let special_event = todayIsSpecial(date);

//export app state 
export const store = reactive({
    modals_closed: false, // set with cookie
    faq_modal_open: false,
    detail_open: false,
    calendar_open: false,
    detail_type: null,
    moon_phase: moon_phase.length > 0 ? moon_phase[0] : null,
    mobile_view_frame_open: false,
    desktop_view_frame_open: true,
    more_options_open: single_day,
    events_menu_open: false,
    sights: 'recommended',
    filters: 0,
    hemisphere: 'north',
    units: 'mi',
    date,
    moon_idx,
    moon_data,
    expanded_data: [],
    first_day,    //set to 00:00 UTC
    last_day,
    first_day_z: first_day - 12 * 60 * 60 * 1000,
    last_day_z: last_day + 12 * 60 * 60 * 1000,
    current_site_detail_figure: 0,
    visible_hotspots: hotspots,
    zoomed: false,
    site: null,
    special_event,
    tags: [],
    active_tags: [],
    has_mounted_once: false,
    panzoom: {}
})

//setup and export Component refs
export const moon_and_hotspots_ref = ref(null);
export const hotspots_ref = ref(null);
export const scroll_to_show_more_ref = ref(null);
export const view_frame_wrapper_ref = ref(null); 
export const view_frame_toggle_ref = ref(null);
export const mvg_loader = ref(null);
