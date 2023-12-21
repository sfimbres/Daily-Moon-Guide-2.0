<script setup>
import { store } from '../../store';

function toggleText(e){
    if(e.target.parentNode.nextSibling.classList.contains('open-text')){
        e.target.parentNode.nextSibling.classList.remove('open-text');
    }
    else{
        e.target.parentNode.nextSibling.classList.add('open-text');
    }
}
</script>

<template>
    
<div class="page_cover"></div>
    <div>
        <div id="dashboard_modal" class="dashboard_modal visible" style="height: 100%;" @click.self="() => { store.faq_modal_open = false }">
            <div class="loadedContent"></div><div id="dashboard_modal_content" class="content visible">
                <section class="module vital_signs overlay_template">
                    <div class="grid_layout">
                        <header>
                            <h2 class="module_title">
                                Moon Viewing Guide FAQ
                            </h2>
                            </header>
                        <div class='close' @click="() => { store.faq_modal_open = false }">
                            <div class="icon">✕</div>
                        </div>
                        <div class="column_container">
                            <div class="left_col">
                                <article class="vital_signs_teaser">
                                    <p>Answers to frequently asked questions about the viewing guide. If you have a question that is not answered here, please contact us through our <a href="/feedback/">Feedback form</a> </p>

                                    <section class="faq_section">
                                        <h2>
                                        General questions
                                        </h2>
                                        <ul class="q_and_a item_list">
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_33" name="question_33"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    Can I see the same view as the Detail Images from Earth? 

                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>No. These are taken by our Lunar Reconnaissance Orbiter, which has powerful cameras on board and is extremely close to the Moon. Getting those close-up views is one reason why we send satellites to other worlds!</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_34" name="question_34"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    Why are no sites highlighted on the Moon map?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>During the new moon phase and thinnest crescent phases, you will not see any sites highlighted because all (or almost all) of the Moon will be in shadow.</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_35" name="question_35"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    How do I look up a specific date?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>Click on the calendar button to the left of today’s date to choose a different day of the current year.</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_36" name="question_36"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    Why can’t I spin the Moon around?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>Because of tidal locking,&nbsp;only the near side of the Moon is ever visible from Earth. This viewing guide shows a view of the Moon from Earth on a specific day. Visit this&nbsp;<a href="/inside-and-out/overview">page</a>&nbsp;for an interactive feature that can show you the far side of the Moon.</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_37" name="question_37"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    What type of telescope or binoculars should I use? Do I need a device?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>Good news: the Moon’s proximity and brightness make it a great viewing object, even with your unaided eyes! If you choose to use an observing device, myriad factors might go into your decision, including how you will be using the device, what you will be viewing, and your budget if you are purchasing new equipment. We recommend consulting the many excellent guides on astronomy websites about what to look for in binoculars or telescopes.</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_38" name="question_38"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    Why do you ask for my hemisphere?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>The Moon looks different depending on your location on the globe. Sites appear “flipped” between the northern and southern hemispheres.</p>

                                                </div>
                                            </li>
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_39" name="question_39"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                    <div class="title">
                                                    How do you determine which sites are best for a particular viewing mode?
                                                    </div>
                                                </a>
                                                <div class="text answer">
                                                    <p>Our “recommended” sites are based on visibility, how easy they are to find, and how interesting they may be for viewers. You can also see many other sites that should be visible on your date by clicking on “all.”</p>

                                                </div>
                                            </li>
                                        </ul>
                                        <hr>     
                                    </section>

                                    <section class="faq_section">
                                        <h2>
                                        Lunar terminology
                                        </h2>
                                        <ul class="q_and_a item_list">
                                            <li class="question expanding_list_item">
                                                <a class="mb_anchor_faq" id="question_40" name="question_40"></a>
                                                <a class="title_container" @click="(e) => {toggleText(e)}">
                                                <div class="title">
                                                Why do so many sites on the Moon have two different names? Where do lunar place names come from?
                                                </div>
                                                </a>
                                                <div class="text answer">
                                                <p>Many Moon features have Latin names. We sometimes use translations to other languages, too. For instance, Mare Tranquillitatis is also called the Sea of Tranquility. Here are a few examples of Latin words that are often used in lunar place names:</p>

                                                <ul>
                                                    <li>Mare&nbsp;= Sea</li>
                                                    <li>Terra&nbsp;= Land</li>
                                                    <li>Rima&nbsp;= Rille&nbsp;(a valley or trench)</li>
                                                    <li>Oceanus&nbsp;= Ocean</li>
                                                    <li>Rupe&nbsp;= Cliff</li>
                                                </ul>

                                                </div>
                                            </li>
                                        </ul>
                                    </section>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            <div class="background_area" @click.self="() => { store.faq_modal_open = false }"></div>
        </div>
    </div>
</div>

</template>

<style class="scss" scoped>
    .title {
        font-weight: 700;
        font-size: 1.1em;
    }
    .grid_layout {
        width: 100%!important;
    }
    .icon_wrapper {
        width: 20px;
        height: 20px;
        color: #ffffff;
        margin-left: 8px;
    }

    .close {
        position: absolute;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        right: 0;
        top: 0;
        padding: 11px;
        cursor: pointer;
        transition: opacity 125ms ease-out;
    }

    .icon {
        color: white;
    }

    .question {
        margin-bottom: 1em!important;
    }

    .text.answer{
        display: none;
    }

    .open-text {
        display: block!important;
    }
</style>