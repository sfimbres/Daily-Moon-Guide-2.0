import { store, appProps } from "../store";
import { moon_and_hotspots_ref, hotspots_ref, scroll_to_show_more_ref, view_frame_wrapper_ref, view_frame_toggle_ref, mvg_loader} from '../store/index.js'
import $ from 'jquery'
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let is_intro_modals_hidden = false;
let is_scroll_to_show_more_hidden = false;

export function animateDetailOpen(){
    // inline width added as a value to animate from
    let width = document.documentElement.clientWidth;
    moon_and_hotspots_ref.value.style.width = `${width}px`;
    //TweenMax.to(moon_and_hotspots_ref.value, 0.5, {css:{width:`${width - 700}px`}, onComplete: animateDetailOpenEnd, onCompleteScope: this, delay: 0.1, ease:Power2.easeOut});
    animateDetailOpenEnd();
}

export function animateDetailOpenEnd(){
    setHashFromState()
    formatSitespots();
    // inline width removed after detail is open to allow css to handle the width again
    moon_and_hotspots_ref.value.style.width = "";
}

export function changeSights(evt){
    let sights = evt.currentTarget.value
    if(sights == store.sights){
      return;
    }
    const filters = store.filters
    // let recommended_sights = sights == "recommended"
    const visible_hotspots = getHotspots(appProps.hotspots, sights, filters, store.moon_data.subsolar)
    store.sights = sights;
    store.visible_hotspots = visible_hotspots;
}

export function changeHemisphere(hemisphere){
    store.hemisphere = hemisphere;
}

export function changeUnits(e){
    store.units = e.currentTarget.value
}


export function closeCalendar(){
    let calendar_popover = document.querySelector('.toolbar .popover_menu.calendar')
    let calendar_arrow = document.querySelector('.toolbar .popover_menu_arrow.calendar_arrow')
    slideAndFadeOut(calendar_popover, () => {
      store.calendar_open = false
    });
    slideAndFadeOut(calendar_arrow);
}

export function closeDetail(){
    store.detail_open = false;
    store.detail_type = null;
    store.current_site_detail_figure = 0;

    document.body.classList.remove('detail_panel_open');
    positionViewFrameWrapper();
    setHashFromState()
    formatSitespots();
};

export function closeDesktopViewFrame() {
    view_frame_wrapper_ref.value.style.height = view_frame_wrapper_ref.value.clientHeight + "px";
    store.desktop_view_frame_open = false;
    let right = getRightForClosedDesktopViewFrame();
    //TweenMax.to(view_frame_wrapper_ref.value, 0.5, {css:{width:"58px", height:"73px", overflow:"hidden", right:right, backgroundColor:"#78CBFF", borderRadius:"4px 0 0 4px"}, onComplete: closeDesktopViewFrameEnd, onCompleteScope: this, delay: 0, ease:Power2.easeOut});
    view_frame_wrapper_ref.value.style.width = "58px";
    view_frame_wrapper_ref.value.style.height = "73px";
    view_frame_wrapper_ref.value.style.right = right;
    view_frame_wrapper_ref.value.style.backgroundColor = "#78CBFF";
    view_frame_wrapper_ref.value.style.borderRadius = "4px 0 0 4px";
    view_frame_wrapper_ref.value.style.overflow = "hidden";
    
    closeDesktopViewFrameEnd();
}

export function closeDesktopViewFrameEnd(){
    view_frame_toggle_ref.value.classList.remove("open");
}


export function closeEventsMenu(){
    let events_popover = document.querySelector('.toolbar .popover_menu.events_menu')
    let events_arrow = document.querySelector('.toolbar .popover_menu_arrow.events_arrow')
    slideAndFadeOut(events_popover, () => {
      store.events_menu_open = false
    });
    slideAndFadeOut(events_arrow);
}

export function closeMenus(){
    closeMobileViewFrame();
    closeCalendar();
    closeEventsMenu();
}

export function closeMobileViewFrame(){
    let mobile_view_frame = document.querySelector('.toolbar .view_frame_wrapper')
    slideAndFadeOut(mobile_view_frame, () => {
        store.mobile_view_frame_open = false;
    });
}

export function closeModals(){
    if (document.getElementsByClassName('onboard_modal')[0].classList.contains('open')) {
      // hide onboard modal
      document.getElementsByClassName('onboard_modal')[0].classList.remove('open');
      // show instruction modal
      document.getElementsByClassName('instruction_modal')[0].classList.add('open');
    } else {
      store.modals_closed = true;
      //mb_utils.createCookie("mvg_modals_closed", "true", 14); //todo hande cookies
    }
}

export function convertUnits(num){
    if(store.units == 'km'){
      return num
    } else {
      return Math.round(num * 0.621371)
    }
}

export function debounce(func, duration){
    let timeout
    return function (...args) {
    const effect = () => {
        timeout = null
        return func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(effect, duration);
    }
}

export function destroyPanzoom(){
    const elem = document.getElementById('moon_img')
    elem.style.removeProperty("transform");
    elem.style.removeProperty("transition");

    store.panzoom.resetStyle()
    store.panzoom.destroy()
}

export function determineTags() {
    let tags = []
    appProps.hotspots.map((v,i) => {
    v.tag_list.map((w,j) => {
        if(tags.indexOf(w) < 0){
        tags.push(w)
        }
    })
    })

    store.tags = tags;
}

export function detectScrollOffset(){
    // if we are going to be doing loading of hotspots after user scrolls into this view, this is where we would do that
    // the modals_cookie conditional should be taken off the adding of the scroll listener and placed around showIntroModals
    let moon_section = document.getElementById("moon_section");
    let ms_pos = moon_section.offsetTop

    if (window.scrollY >= ms_pos) {
        showIntroModals();
    }
}

export function expandData(num){
    const {expanded_data} = store;
    let idx = expanded_data.indexOf(num)
    let new_ex = []
    if(idx > -1){
      new_ex = expanded_data.filter(v => {
        return v != num
      })
    } else {
      new_ex = expanded_data.slice()
      new_ex.push(num)
    }

    store.expanded_data = new_ex;
}

export function formatEventDate(item){
    if (item.start_date) {
      let date = new Date(item.start_date);
      return (
        `${days[date.getDay()].toUpperCase()} - ${months[date.getMonth()].toUpperCase()} ${date.getDate()}`
      )
    }
}

export function formatSitespot(sitespot){
    let north = document.getElementById('moon_section').classList.contains('north');

    if (sitespot && sitespot.children && sitespot.children.length > 0) {
    if (north) {
        let container_right = hotspots_ref.value.getBoundingClientRect().right;
        let sitespot_right = getElementRight(sitespot);
        if (sitespot_right + 10 > container_right) {
            sitespot.classList.add('reverse');
        } else {
            sitespot.classList.remove('reverse');
        }
    } else {
            let container_left = hotspots_ref.value.getBoundingClientRect().left;
            let sitespot_left = getElementLeft(sitespot);
            if (sitespot_left - 10 < container_left) {
            sitespot.classList.add('reverse');
            } else {
            sitespot.classList.remove('reverse');
            }
        }
    }
}

export function formatSitespots(){
    let sitespots = hotspots_ref.value && hotspots_ref.value.children ? hotspots_ref.value.children : null;

    if (sitespots) {
        for (let i = 0; i < sitespots.length; i++) {
            formatSitespot(sitespots[i]);
        }
    }
}

export function getDayOfYear(date){
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

export function getDescriptionCredit(desc,credit){
    let d = ""
    if(desc){
        d += desc + " "
    }

    if(credit){
        d += `<span class='credit'>Source: ${credit}</span>`
    }
    return d
}

export function getElementLeft(element){
    if (element && element.classList) {
    element.classList.remove('reverse');

    return element.getBoundingClientRect().left;
    }
}

export function getElementRight(element){
    if (element && element.classList) {
        element.classList.remove('reverse');

        return element.getBoundingClientRect().right;
    }
}

export function getHotspots(hotspots, sights, view_category= 0, subsolar= null, date= null, tag= null,must_have= null){
    if(appProps.single_day){
      if(tag){
        return hotspots.filter(v => {return  v.tag_list.indexOf(tag) > -1})
      } else {
        return hotspots;
      }
    } else if(sights == 'recommended'){
      let randomized_hs = hotspots.sort(() => 0.5 - Math.random())
      let visible_hotspots = [];
      let same_view_overlappers = [];
      let other_views = []
      //grab all hotspots that are in this "view" AND don't overlap something that is in there already
      for(let i = 0; i < randomized_hs.length; i++){
        const v = randomized_hs[i]
        const vis = appProps.visibility.filter(w => w.formal_name == v.formal_name)
        const sub = vis[0]["subsolar_lon"]
        // console.log("subsolar", {lon: subsolar.lon, first: sub.first, last: sub.last})
        if(visible_hotspots.length < 3 && subsolar && sub && subsolar.lon < sub.first && subsolar.lon > sub.last  && v.view_category == view_category){
          //if(that.hotspotDoesntOverlap(visible_hotspots,v,date)){
          if(hotspotDoesntOverlap(visible_hotspots,v,date)){
            visible_hotspots.push(v)
          } else {
            // console.log("overlapper", v.title)
            same_view_overlappers.push(v)
          }
        } else {
          other_views.push(v)
        }
      }
      //if we haven't found 3 hotspots check the other views
      if(visible_hotspots.length < 3){
        for(let i = 0; i < other_views.length; i++){
          const v = other_views[i]
          const vis = appProps.visibility.filter(w => w.formal_name == v.formal_name)
          const sub = vis[0]["subsolar_lon"]
          if(visible_hotspots.length < 3 && subsolar && sub && subsolar.lon < sub.first && subsolar.lon > sub.last && v.view_category < view_category){
            if(hotspotDoesntOverlap(visible_hotspots,v,date)){
              visible_hotspots.push(v)
            }
          }
        }
      }
      if(must_have){
        console.log("must have ", must_have)
        let mh = hotspots.filter(v => {return  v.title == must_have})[0]
        visible_hotspots.push(mh)
      }
      return visible_hotspots
    } else if (sights == 'none'){
      console.log('no hotspots')
      return []
    } else {
      console.log("get all hotspots matching category", view_category)
      return hotspots.filter(v => {return  v.view_category <= view_category})
    }
}

export function getHotspotPositions(name){
    let positions = appProps.positions.filter((v) => {
      return name == v.formal_name
    })
    if(positions.length > 0){
      return positions[0]
    } else {
      console.log("Missing position for ", name)
      return null
    }
}

export function getMoonDataFor(date) {
    let found = -1;
    for(let i = 0; i < appProps.moon_json.length; i++){
      let v = appProps.moon_json[i]
      let d = new Date(v.time)
      if(d.getMonth() == date.getMonth() && d.getFullYear() == date.getFullYear() && d.getDate() == date.getDate()){
        found = i
        break;
      }
    }

    return found;
}

export function getMoonPhase(name){
    return appProps.moon_phases.filter(v => { return v.location == name})
}

export function getRightForClosedDesktopViewFrame(){
    let width = window.innerWidth;
    return (width < 1024) ? "0" : "700px";
}

export function getRightForOpenDesktopViewFrame(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    let right = "30px";

    if (height < 700 && width > height) {
    if (width >= 1024) {
        right = "720px";
    } else {
        right = "20px"
    }
    } else if (width >= 1024) {
        right = "750px";
    }

    return right;
}

export function getTransform(scale, x, y){
    if (store.hemisphere === "north") {
      return `rotate(0) scale(${scale}) translate(${x}px, ${y}px)`;
    } else {
      return `rotate(180deg) scale(${scale}) translate(${x}px, ${y}px)`;
    }
}

export function getViewFrameWrapperHeight(){
    // store height and width
    let height_now = view_frame_wrapper_ref.value.clientHeight;
    let width_now = view_frame_wrapper_ref.value.clientWidth;

    // set height and width to what it will be after animated
    view_frame_wrapper_ref.value.style.height = "auto";
    view_frame_wrapper_ref.value.style.width = "174px";

    // store the height
    let height_auto = view_frame_wrapper_ref.value.clientHeight;

    view_frame_wrapper_ref.value.style.height = height_now + "px";
    view_frame_wrapper_ref.value.style.width = width_now + "px";

    return height_auto;
}

export function gotoEventDate(v){
    let special_event = v ? v : store.special_event
    let date = new Date(Date.parse(special_event.start_date))

    selectDay(date, true);
}

export function gotoToday(){
    selectDay(new Date(), false)
}

export function hashChangeListener(e){
    // console.log('hashChangeListener', window.location.hash)

    e.preventDefault();
    e.stopPropagation();

    setStateFromHash()
}

export function hideScrollToShowMore() {
    let moon_section = document.getElementById("moon_section");
    let ms_pos = moon_section.offsetTop

    if (window.scrollY >= ms_pos + 150) { 
    // would like to remove the event listener here instead of this, but it's difficult in react
    if (!is_scroll_to_show_more_hidden) {
        is_scroll_to_show_more_hidden = true;
        scroll_to_show_more_ref.value.classList.add('fade');
    }
    }
}

//basically what we have to do here is that given an array of hotspots we need to create rectangles from the elements
// and see if those rectangles overlap each other
export function hotspotDoesntOverlap(arr,el,date= null){
    //let that = this; verify I do not need this
    const d = date ? date : store.date
    let no_overlap = true;
    const el_rect = rectangleForHotspot(el,d)
    if(el_rect){
      for(let i = 0; i < arr.length; i++){
        const v = arr[i]
        const rect = rectangleForHotspot(v,d)
        if(overlaps(el_rect,rect)){
          no_overlap = false;
          break;
        }
      }
    }
    return no_overlap
}

export function hotspotHover(){
    $('.sitespot').off('mouseenter mouseleave').hover(function(){
    $(this).find('.sightspot_circle').animate(
        { '_radius': 9, '_stroke_width': 6 },
        {
        step: function(now,fx){
            if(fx.prop == "_radius"){
            fx.start = 11
            $(fx.elem).attr('r', now)
            } else if (fx.prop == "_stroke_width"){
            fx.start = 2
            $(fx.elem).attr('stroke-width', now)
            }
        },
        duration: 200
        }
    )
    },function(){
    $(this).find('.sightspot_circle').animate(
        { '_radius': 11, '_stroke_width': 2 },
        {
        step: function(now,fx){
            if(fx.prop == "_radius"){
            fx.start = 9
            $(fx.elem).attr('r', now)
            } else if (fx.prop == "_stroke_width"){
            fx.start = 6
            $(fx.elem).attr('stroke-width', now)
            }
        },
        duration: 200
        }
    )
    })

}

export function initListeners() {
    //todo fix issue with mb_utils / cookies
    //let modals_cookie = mb_utils.readCookie("mvg_modals_closed");
    let modals_cookie = false; //todo remove this when fixed

    // if there is no cookie stored
    if (!modals_cookie) {
    // attach a listener that will show models when user scrolls the moon into view
    $(window).on('scroll', debounce(() => {
        return detectScrollOffset()
    }, 0) ); // set debouce to zero because it was delaying the modals from displaying on mobile
    }

    window.addEventListener('scroll', () => {
    hideScrollToShowMore();
    })

    window.addEventListener('resize', () => {
    formatSitespots();
    positionViewFrameWrapper();
    })

    window.addEventListener("hashchange", (e) => hashChangeListener(e));
    if (location.hash && location.hash != '') {
    setStateFromHash()
    }
}

export function initPanzoom(){
    const elem = document.getElementById('moon_img')
    const panzoom = Panzoom(elem, {
      maxScale: 5,
      // animate: false,
      easing: 'ease-out',
      duration: 600,
      // contain: 'outside',
      animate: true,
      setTransform: (elem, { scale, x, y }) => {
        panzoom.setStyle('transform', getTransform(scale, x, y))
      }
    })
    store.panzoom = panzoom;
}

export function isToday(){
    return (
      store.date.getFullYear() === new Date().getFullYear() &&
      store.date.getMonth() === new Date().getMonth() &&
      store.date.getDate() === new Date().getDate()
    )
}

export function nextDay(){
    let d = store.date
    selectDay(new Date(d.getTime() + 24 * 60 * 60 * 1000), false)
}

export function openCalendar(){
    store.calendar_open = true;
    store.more_options_open = true;

    if (store.mobile_view_frame_open) closeMobileViewFrame();
    if (store.events_menu_open) closeEventsMenu();

    let calendar_popover = document.querySelector('.toolbar .popover_menu.calendar')
    let calendar_arrow = document.querySelector('.toolbar .popover_menu_arrow.calendar_arrow')
    slideAndFadeIn(calendar_popover);
    slideAndFadeIn(calendar_arrow);
}

export function openDesktopViewFrame(){
    let height = getViewFrameWrapperHeight();
    let right = getRightForOpenDesktopViewFrame();
    view_frame_toggle_ref.value.classList.add("open");
    //TweenMax.to(view_frame_wrapper_ref.value, 0.5, {css:{width:"174px", height:height, right:right, backgroundColor:"#1C2027", borderRadius:"4px"}, onComplete: openDesktopViewFrameEnd, onCompleteScope: this, delay: 0, ease:Power2.easeOut});
    view_frame_wrapper_ref.value.style.width = "174px";
    view_frame_wrapper_ref.value.style.height = height;
    view_frame_wrapper_ref.value.style.right = right;
    view_frame_wrapper_ref.value.style.backgroundColor = "#1C2027";
    view_frame_wrapper_ref.value.style.borderRadius = "4px";

    openDesktopViewFrameEnd(); 
}

export function openDesktopViewFrameEnd(){
    view_frame_wrapper_ref.value.style.height = "auto";
    view_frame_wrapper_ref.value.style.overflowY = "auto";
    store.desktop_view_frame_open = true;
}

export function openEventDetail(){
    store.detail_open = true;
    store.detail_type = "event";
    document.body.classList.add('detail_panel_open');
    animateDetailOpen();
    scrollToMvg()
}

export function openEventsMenu(){
    store.events_menu_open = true;
    store.more_options_open = true;

    if (store.calendar_open) closeCalendar();
    if (store.mobile_view_frame_open) closeMobileViewFrame();

    let events_popover = document.querySelector('.toolbar .popover_menu.events_menu')
    let events_arrow = document.querySelector('.toolbar .popover_menu_arrow.events_arrow')
    slideAndFadeIn(events_popover);
    slideAndFadeIn(events_arrow);
}

export function openFaq(){
    store.faq_modal_open = true;
}

export function openMobileViewFrame() {
    store.mobile_view_frame_open = true;
    if (store.calendar_open) closeCalendar();
    if (store.events_menu_open) closeEventsMenu();
    let mobile_view_frame = document.querySelector('.toolbar .view_frame_wrapper')
    slideAndFadeIn(mobile_view_frame);
}

export function openPhaseDetail(){
    store.detail_open = true;
    store.detail_type = "phase";
    document.body.classList.add('detail_panel_open');
    animateDetailOpen();
    scrollToMvg()
}

export function openSiteDetail(vv){
    store.detail_open = true;
    store.detail_type = "site";
    store.site = vv;

    document.body.classList.add('detail_panel_open');
    animateDetailOpen();
    scrollToMvg()
}

export function overlaps(a, b) {
    // no horizontal overlap
    if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;

    // no vertical overlap
    if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;

    return true;
}

export function positionViewFrameWrapper(){
    if(view_frame_wrapper_ref && view_frame_wrapper_ref.value){
        if (store.desktop_view_frame_open) {
            view_frame_wrapper_ref.value.style.right = getRightForOpenDesktopViewFrame();
        } else {
            view_frame_wrapper_ref.value.style.right = getRightForClosedDesktopViewFrame();
        }
        }
}

export function prevDay(){
    let d = store.date
    selectDay(new Date(d.getTime() - 24 * 60 * 60 * 1000), false)
}

export function rectangleForHotspot(el,date){
    const moon_img_el = document.getElementById('moon_img')
    const moon_w = moon_img_el.offsetWidth;
    const moon_h = moon_img_el.offsetHeight;
    const length_mult = 9 //actual width of rect is a little different since depends on font and characters in the name... averaging here a bit
    const doy = getDayOfYear(date)
    const el_pos = getHotspotPositions(el.formal_name)
    if(el_pos){
      const el_uv = el_pos.pos[doy - 1]
      const el_len = length_mult * el.title.length
      const left =  el_uv.u * moon_w
      const top = el_uv.v * moon_h
      return {x1: left, y1: top, x2: left + el_len, y2: top + 30}
    } else {
      return null
    }
}

export function scrollToMvg(){
    if(!appProps.single_day){
        const moon_section = document.getElementById("moon_section");
        const ms_pos = moon_section.offsetTop
        window.scrollTo({ top: ms_pos, behavior: 'smooth'});
    }
}

export function selectAllSights(){
    const visible_hotspots = getHotspots(hotspots) 
    store.active_tags = [];
    store.visible_hotspots = visible_hotspots;
}

export function selectDay(date, closeandscroll, set_hash= true,site= {}){
    // console.log("select day", site)
    const {moon_json,hotspots} = appProps;
    const {first_day_z,last_day_z, filters,sights} = store;
    if(date >= first_day_z && date <= last_day_z){
        let moon_idx = getMoonDataFor(date)
        let moon_data = moon_idx > -1 ? moon_json[moon_idx] : null
        let mp = moon_data ? getMoonPhase(moon_data.phase_name) : null
        let moon_phase = mp.length > 0 ? mp[0] : null
        let special_event = todayIsSpecial(date)

        const visible_hotspots = getHotspots(hotspots,sights,filters, moon_data.subsolar,date,null,site.title)
        store.date = date;
        store.moon_data = moon_data;
        store.moon_idx = moon_idx;
        store.moon_phase = moon_phase;
        store.special_event = special_event;
        store.visible_hotspots = visible_hotspots
        if(set_hash){ setHashFromState();}
        if (closeandscroll) {
            closeCalendar();
            scrollToMvg();
    }
    } else {
      console.log("request outside available days", date, first_day_z,last_day_z)
    }
}

export function selectSite(tag){
    const visible_hotspots = getHotspots(appProps.hotspots, null, null, null, null, tag)
    store.active_tags = [tag];
    store.visible_hotspots = visible_hotspots;
}

export function setHashFromState(){
    let arr = new Array(3);
    if(store.date){
        arr[0] = store.date.getTime()
    }
        arr[1] = store.detail_open ? 1 : 0
    if(store.detail_type){
        arr[2] = store.detail_type === "phase" || store.detail_type === "event" ? store.detail_type : store.site.title
    } else {
        arr[2] = null
    }
    location.hash = arr.join('::')
};

export function setStateFromHash(){
    const hash_value = window.location.hash.split('#')[1]
    const h = hash_value ? hash_value.split('::') : null
    let date, detail_open, detail_type, site
    if(h && h[0]){
    date = new Date(parseInt(h[0]))
    } else {
    date = new Date()
    }
    if(h && h[1]){
    detail_open = h[1] === "1"
    } else {
    detail_open = false
    }
    if(h && h[2]){
    if(h[2] === "phase" || h[2] === "event" ){
        detail_type = h[2]
    } else {
        detail_type = "site"
        const t = decodeURIComponent(h[2])
        site = appProps.hotspots.filter(v => v.title === t )[0]
    }
    } else {
    detail_type = null
    site = {}
    }

    // if hash date is different than date in state
    // this should only be true when using the back and forward browser buttons to change the hash, not when writing to the hash
    // we only want to set date from hash if date has changed
    if(date.getTime() !== store.date.getTime()){
    selectDay(date, false, false,site)
    }

    // if hash detail_open is different than detail_open in state
    // this should only be true when using the back and forward browser buttons to change the hash, not when writing to the hash
    // we only want to set detail_open from hash if detail_open has changed
    // assumes that changes to detail_type and site do not matter unless detail_open has changed
    if (detail_open !== store.detail_open) {
        store.detail_open = detail_open;
        store.detail_type = detail_type;
        store.site = site;

        if(store.detail_open){
            document.body.classList.add('detail_panel_open');
            animateDetailOpen();
            scrollToMvg()
        } else {
            document.body.classList.remove('detail_panel_open');
            positionViewFrameWrapper();
            formatSitespots();
        }
    }
}

export function showIntroModals(){
    if (!is_intro_modals_hidden) {
        document.getElementsByClassName('onboard_modal')[0].classList.add('open');
        document.getElementsByClassName('intro_modals_container')[0].classList.add('open');
        is_intro_modals_hidden = true;
    }
}

export function slideAndFadeIn(element, callback){
    element.classList.add('open');
    setTimeout(function () {
      element.classList.add('slide_and_fade');
      element.addEventListener('transitionend', function(e) {
        if (typeof callback === 'function') callback();
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }, 20);
}

export function slideAndFadeOut(element, callback){
    element.classList.remove('slide_and_fade');
    setTimeout(function () {
        element.classList.remove('open');
        if (typeof callback === 'function') callback();
    }, 500);
}

export function todayIsSpecial(date){
    if (appProps.events) {
        const special_events_today = appProps.events.filter((v) => {
            const d = new Date(Date.parse(v.start_date))
            return d.getDate() == date.getDate() && d.getMonth() == date.getMonth() && d.getFullYear() == date.getFullYear()
        })
        if (special_events_today.length > 0) {
            return special_events_today[0]
        } else {
            return null
        }
    }
}

export function toggleFilter(val){
    if(val == store.filters){
      return
    }
    const visible_hotspots = getHotspots(appProps.hotspots, store.sights, val, store.moon_data.subsolar)
    store.filters = val;
    store.visible_hotspots = visible_hotspots;
}

export function toggleMoreOptions(e){
    if (store.more_options_open) {
      store.more_options_open = false;
    } else {
        store.more_options_open = true;
    }
}

export function toggleSwitchbox(e){
    if (e.target.dataset['figure'] != store.current_site_detail_figure) {
        store.current_site_detail_figure = (store.current_site_detail_figure === 0) ? 1 : 0
    }
}

export function zoomMap(zoomed){
    store.zoomed = !store.zoomed;
    
    if (zoomed) {
        const panzoom = store.panzoom
        hotspots_ref.value.classList.add('zooming_out')
        hotspots_ref.value.classList.remove('zooming_in')
        panzoom.reset({ animate: true })
        setTimeout(() => {
            destroyPanzoom()
            hotspots_ref.value.classList.remove('zooming_out')
        },700) // this needs to be longer than "duration" set in the initPanzoom method above.
    } else {
        initPanzoom()
        // console.log('NOT zoomed, ZOOOMING')
        hotspots_ref.value.classList.add('zooming_in')
        hotspots_ref.value.classList.remove('zooming_out')
        store.panzoom.zoom(2.5, { animate: true })
    }
}

/*
* Panzoom for panning and zooming elements using CSS transforms
* Copyright Timmy Willison and other contributors
* https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).Panzoom=e()}(this,function(){"use strict";var C=function(){return(C=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function T(t,e){for(var n=t.length;n--;)if(t[n].pointerId===e.pointerId)return n;return-1}function N(t,e){if(e.touches)for(var n=0,o=0,r=e.touches;o<r.length;o++){var a=r[o];a.pointerId=n++,N(t,a)}else-1<(n=T(t,e))&&t.splice(n,1),t.push(e)}function L(t){for(var e,n=(t=t.slice(0)).pop();e=t.pop();)n={clientX:(e.clientX-n.clientX)/2+n.clientX,clientY:(e.clientY-n.clientY)/2+n.clientY};return n}function V(t){if(t.length<2)return 0;var e=t[0],t=t[1];return Math.sqrt(Math.pow(Math.abs(t.clientX-e.clientX),2)+Math.pow(Math.abs(t.clientY-e.clientY),2))}"undefined"!=typeof window&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:null};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}));var G={down:"mousedown",move:"mousemove",up:"mouseup mouseleave"};function I(t,e,n,o){G[t].split(" ").forEach(function(t){e.addEventListener(t,n,o)})}function W(t,e,n){G[t].split(" ").forEach(function(t){e.removeEventListener(t,n)})}"undefined"!=typeof window&&("function"==typeof window.PointerEvent?G={down:"pointerdown",move:"pointermove",up:"pointerup pointerleave pointercancel"}:"function"==typeof window.TouchEvent&&(G={down:"touchstart",move:"touchmove",up:"touchend touchcancel"}));var a,i="undefined"!=typeof document&&!!document.documentMode;var l=["webkit","moz","ms"],c={};function Z(t){if(c[t])return c[t];var e=a=a||document.createElement("div").style;if(t in e)return c[t]=t;for(var n=t[0].toUpperCase()+t.slice(1),o=l.length;o--;){var r=""+l[o]+n;if(r in e)return c[t]=r}}function r(t,e){return parseFloat(e[Z(t)])||0}function s(t,e,n){var o="border"===e?"Width":"";return{left:r(e+"Left"+o,n=void 0===n?window.getComputedStyle(t):n),right:r(e+"Right"+o,n),top:r(e+"Top"+o,n),bottom:r(e+"Bottom"+o,n)}}function q(t,e,n){t.style[Z(e)]=n}function B(t){var e=t.parentNode,n=window.getComputedStyle(t),o=window.getComputedStyle(e),r=t.getBoundingClientRect(),a=e.getBoundingClientRect();return{elem:{style:n,width:r.width,height:r.height,top:r.top,bottom:r.bottom,left:r.left,right:r.right,margin:s(t,"margin",n),border:s(t,"border",n)},parent:{style:o,width:a.width,height:a.height,top:a.top,bottom:a.bottom,left:a.left,right:a.right,padding:s(e,"padding",o),border:s(e,"border",o)}}}var D=/^http:[\w\.\/]+svg$/;var F={animate:!1,canvas:!1,cursor:"move",disablePan:!1,disableZoom:!1,disableXAxis:!1,disableYAxis:!1,duration:200,easing:"ease-in-out",exclude:[],excludeClass:"panzoom-exclude",handleStartEvent:function(t){t.preventDefault(),t.stopPropagation()},maxScale:4,minScale:.125,overflow:"hidden",panOnlyWhenZoomed:!1,relative:!1,setTransform:function(t,e,n){var o=e.x,r=e.y,a=e.scale,e=e.isSVG;q(t,"transform","scale("+a+") translate("+o+"px, "+r+"px)"),e&&i&&(e=window.getComputedStyle(t).getPropertyValue("transform"),t.setAttribute("transform",e))},startX:0,startY:0,startScale:1,step:.3,touchAction:"none"};function t(d,f){if(!d)throw new Error("Panzoom requires an element as an argument");if(1!==d.nodeType)throw new Error("Panzoom requires an element with a nodeType of 1");if(t=(e=d).ownerDocument,e=e.parentNode,!(t&&e&&9===t.nodeType&&1===e.nodeType&&t.documentElement.contains(e)))throw new Error("Panzoom should be called on elements that have been attached to the DOM");var t;f=C(C({},F),f);var e,c=(e=d,D.test(e.namespaceURI)&&"svg"!==e.nodeName.toLowerCase()),n=d.parentNode;n.style.overflow=f.overflow,n.style.userSelect="none",n.style.touchAction=f.touchAction,(f.canvas?n:d).style.cursor=f.cursor,d.style.userSelect="none",d.style.touchAction=f.touchAction,q(d,"transformOrigin","string"==typeof f.origin?f.origin:c?"0 0":"50% 50%");var o,r,a,i,l,s,m=0,h=0,v=1,p=!1;function u(t,e,n){n.silent||(e=new CustomEvent(t,{detail:e}),d.dispatchEvent(e))}function g(e,n,t){var o={x:m,y:h,scale:v,isSVG:c,originalEvent:t};return requestAnimationFrame(function(){var t;"boolean"==typeof n.animate&&(n.animate?(t=n,q(d,"transition",Z("transform")+" "+t.duration+"ms "+t.easing)):q(d,"transition","none")),n.setTransform(d,o,n),u(e,o,n),u("panzoomchange",o,n)}),o}function y(){var t,e,n;f.contain&&(e=(n=B(d)).parent.width-n.parent.border.left-n.parent.border.right,t=n.parent.height-n.parent.border.top-n.parent.border.bottom,e=e/(n.elem.width/v),n=t/(n.elem.height/v),"inside"===f.contain?f.maxScale=Math.min(e,n):"outside"===f.contain&&(f.minScale=Math.max(e,n)))}function w(t,e,n,o){var r,a,i,l,c,s,p=C(C({},f),o),u={x:m,y:h,opts:p};return!p.force&&(p.disablePan||p.panOnlyWhenZoomed&&v===p.startScale)||(t=parseFloat(t),e=parseFloat(e),p.disableXAxis||(u.x=(p.relative?m:0)+t),p.disableYAxis||(u.y=(p.relative?h:0)+e),p.contain&&(t=((o=(a=(r=B(d)).elem.width/v)*n)-a)/2,e=((a=(e=r.elem.height/v)*n)-e)/2,"inside"===p.contain?(i=(-r.elem.margin.left-r.parent.padding.left+t)/n,l=(r.parent.width-o-r.parent.padding.left-r.elem.margin.left-r.parent.border.left-r.parent.border.right+t)/n,u.x=Math.max(Math.min(u.x,l),i),c=(-r.elem.margin.top-r.parent.padding.top+e)/n,s=(r.parent.height-a-r.parent.padding.top-r.elem.margin.top-r.parent.border.top-r.parent.border.bottom+e)/n,u.y=Math.max(Math.min(u.y,s),c)):"outside"===p.contain&&(i=(-(o-r.parent.width)-r.parent.padding.left-r.parent.border.left-r.parent.border.right+t)/n,l=(t-r.parent.padding.left)/n,u.x=Math.max(Math.min(u.x,l),i),c=(-(a-r.parent.height)-r.parent.padding.top-r.parent.border.top-r.parent.border.bottom+e)/n,s=(e-r.parent.padding.top)/n,u.y=Math.max(Math.min(u.y,s),c)))),u}function b(t,e){var n=C(C({},f),e),e={scale:v,opts:n};return!n.force&&n.disableZoom||(e.scale=Math.min(Math.max(t,n.minScale),n.maxScale)),e}function x(t,e,n,o){n=w(t,e,v,n);return m!==n.x||h!==n.y?(m=n.x,h=n.y,g("panzoompan",n.opts,o)):{x:m,y:h,scale:v,isSVG:c,originalEvent:o}}function S(t,e,n){var o=b(t,e),r=o.opts;if(r.force||!r.disableZoom){t=o.scale;var a=m,e=h;r.focal&&(a=((o=r.focal).x/t-o.x/v+m*t)/t,e=(o.y/t-o.y/v+h*t)/t);e=w(a,e,t,{relative:!1,force:!0});return m=e.x,h=e.y,v=t,g("panzoomzoom",r,n)}}function E(t,e){e=C(C(C({},f),{animate:!0}),e);return S(v*Math.exp((t?1:-1)*e.step),e)}function O(t,e,n,o){var r=B(d),a=r.parent.width-r.parent.padding.left-r.parent.padding.right-r.parent.border.left-r.parent.border.right,i=r.parent.height-r.parent.padding.top-r.parent.padding.bottom-r.parent.border.top-r.parent.border.bottom,l=e.clientX-r.parent.left-r.parent.padding.left-r.parent.border.left-r.elem.margin.left,e=e.clientY-r.parent.top-r.parent.padding.top-r.parent.border.top-r.elem.margin.top;c||(l-=r.elem.width/v/2,e-=r.elem.height/v/2);i={x:l/a*(a*t),y:e/i*(i*t)};return S(t,C(C({animate:!1},n),{focal:i}),o)}S(f.startScale,{animate:!1,force:!0}),setTimeout(function(){y(),x(f.startX,f.startY,{animate:!1,force:!0})});var M=[];function P(t){!function(t,e){for(var n,o,r=t;null!=r;r=r.parentNode)if(n=r,o=e.excludeClass,1===n.nodeType&&-1<(" "+(n.getAttribute("class")||"").trim()+" ").indexOf(" "+o+" ")||-1<e.exclude.indexOf(r))return 1}(t.target,f)&&(N(M,t),p=!0,f.handleStartEvent(t),u("panzoomstart",{x:o=m,y:r=h,scale:v,isSVG:c,originalEvent:t},f),t=L(M),a=t.clientX,i=t.clientY,l=v,s=V(M))}function A(t){var e;p&&void 0!==o&&void 0!==r&&void 0!==a&&void 0!==i&&(N(M,t),e=L(M),1<M.length?(0===s&&(s=V(M)),O(b((V(M)-s)*f.step/80+l).scale,e)):x(o+(e.clientX-a)/v,r+(e.clientY-i)/v,{animate:!1},t))}function z(t){1===M.length&&u("panzoomend",{x:m,y:h,scale:v,isSVG:c,originalEvent:t},f),function(t,e){if(e.touches)for(;t.length;)t.pop();else{e=T(t,e);-1<e&&t.splice(e,1)}}(M,t),p&&(p=!1,o=r=a=i=void 0)}var X=!1;function Y(){X||(X=!0,I("down",f.canvas?n:d,P),I("move",document,A,{passive:!0}),I("up",document,z,{passive:!0}))}return f.noBind||Y(),{bind:Y,destroy:function(){X=!1,W("down",f.canvas?n:d,P),W("move",document,A),W("up",document,z)},eventNames:G,getPan:function(){return{x:m,y:h}},getScale:function(){return v},getOptions:function(){return function(t){var e,n={};for(e in t)t.hasOwnProperty(e)&&(n[e]=t[e]);return n}(f)},pan:x,reset:function(t){var e=C(C(C({},f),{animate:!0,force:!0}),t);return v=b(e.startScale,e).scale,t=w(e.startX,e.startY,v,e),m=t.x,h=t.y,g("panzoomreset",e)},resetStyle:function(){n.style.overflow="",n.style.userSelect="",n.style.touchAction="",n.style.cursor="",d.style.cursor="",d.style.userSelect="",d.style.touchAction="",q(d,"transformOrigin","")},setOptions:function(t){for(var e in t=void 0===t?{}:t)t.hasOwnProperty(e)&&(f[e]=t[e]);(t.hasOwnProperty("cursor")||t.hasOwnProperty("canvas"))&&(n.style.cursor=d.style.cursor="",(f.canvas?n:d).style.cursor=f.cursor),t.hasOwnProperty("overflow")&&(n.style.overflow=t.overflow),t.hasOwnProperty("touchAction")&&(n.style.touchAction=t.touchAction,d.style.touchAction=t.touchAction),(t.hasOwnProperty("minScale")||t.hasOwnProperty("maxScale")||t.hasOwnProperty("contain"))&&y()},setStyle:function(t,e){return q(d,t,e)},zoom:S,zoomIn:function(t){return E(!0,t)},zoomOut:function(t){return E(!1,t)},zoomToPoint:O,zoomWithWheel:function(t,e){t.preventDefault();var n=C(C(C({},f),e),{animate:!1}),e=0===t.deltaY&&t.deltaX?t.deltaX:t.deltaY;return O(b(v*Math.exp((e<0?1:-1)*n.step/3),n).scale,t,n)}}}return t.defaultOptions=F,t});