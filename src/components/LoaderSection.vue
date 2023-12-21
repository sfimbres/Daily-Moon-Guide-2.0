<script setup>
import { mvg_loader } from '../store/index.js'
const spinner_opts = { lines: 9, length: 6, width: 4, radius: 7, scale: 1, corners: 1, color: '#FFF', opacity: 0.2, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 1, className: 'spinner', left: '50%', shadow: false, hwaccel: false, position: 'absolute' }
</script>

<template>
    <div ref="mvg_loader" class="loader_container">
            <div class="loader">
                <div style="position: relative; left: 0px; top: 598px;">
                    <div
                        style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -1s infinite normal none running opacity-60-20;">
                        <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(0deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.888889s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(40deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.777778s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(80deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.666667s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(120deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.555556s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(160deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.444444s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(200deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.333333s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(240deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.222222s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(280deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
                <div
                    style="position: absolute; top: -2px; transform: translate3d(0px, 0px, 0px); animation: 1s linear -0.111111s infinite normal none running opacity-60-20;">
                    <div
                        style="position: absolute; width: 10px; height: 4px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px; transform-origin: left center; transform: rotate(320deg) translate(7px, 0px); border-radius: 100em;">
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

