<template>
        <div class="login-container" style="margin: 0px;overflow: hidden;">
            <div id="canvascontainer" ref='can'></div>
            <h1 style="text-align: center; margin-top: 100px">买多多管理系统</h1>
            <div style="z-index: 33; position: absolute;left:38%;top: 20%" class="login_page">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" style="width: 300px" class="login_form">
                    <div class="select_login">
                        <span :class="login_type?'select_type':''" @click="select_login(true)">管理员登录</span>
                        <span :class="login_type?'':'select_type'" @click="select_login(false)">商家登录</span>
                    </div>
                    <FormItem prop="uname">
                        <Input type="text" v-model="formInline.uname" :placeholder="login_type?'管理员账号':'商家账号'">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="pwd">
                        <Input type="password" v-model="formInline.pwd" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit" style="width: 100%">登录</Button>
                    </FormItem>
                    <router-link to="/reg" style="color: #cdcdcd" v-if="!login_type">
                        申请开店
                    </router-link>
                </Form>
    
            </div>
        </div>
    
    
        </div>
    </template>
    
    <script>
        import axios from 'axios'
        import { ip1 } from '../../static/default_item.js';
        export default {
            name: 'login',
            data() {
                return {
                    login_type: true,
                    formInline: {
                        uname: '',
                        pwd: ''
                    },
                    ruleInline: {
                        uname: [
                            { required: true, message: '请输入账号', trigger: 'blur' }
                        ],
                        pwd: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            { type: 'string', min: 3, message: '密码必须大于六位', trigger: 'blur' }
                        ]
                    }
                }
            },
            methods: {
                handleSubmit() {
                    console.log(this.formInline)
                    if (this.login_type) {
                        axios.post(ip1 + '/login_andim', this.formInline).then(res => {
                            if (res.data.length > 0) {
                                this.$Message.success('登录成功!');
                                this.$router.push('./main')
                                this.$store.commit("save_login",res.data[0])
                            }
                            else
                                this.$Message.error('账号或密码有误');
                        })
                    } else {
                        axios.post(ip1 + '/login_shops', this.formInline).then(res => {
                            if (res.data.length > 0) {
                                this.$Message.success('登录成功!');
                                this.$router.push('./main')
                                this.$store.commit("save_login",res.data[0])
                            }
                            else
                                this.$Message.error('账号或密码有误');
                        })
                
    
                }
    
    
    
    
                // this.$Message.error('Fail!');
                // this.$router.push('/')
            },
            select_login(bool) {
                console.log(this.login_type)
                this.login_type = bool;
            }
        },
        //   绘制背景canvs
        mounted() {
            container = document.createElement('div');
            this.$refs.can.appendChild(container);
    
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
            camera.position.z = 1000;
    
            scene = new THREE.Scene();
    
            particles = new Array();
    
            var PI2 = Math.PI * 2;
            var material = new THREE.ParticleCanvasMaterial({
    
                color: 0x0078de,
                program: function (context) {
    
                    context.beginPath();
                    context.arc(0, 0, 1, 0, PI2, true);
                    context.fill();
    
                }
    
            });
    
            var i = 0;
    
            for (var ix = 0; ix < AMOUNTX; ix++) {
    
                for (var iy = 0; iy < AMOUNTY; iy++) {
    
                    particle = particles[i++] = new THREE.Particle(material);
                    particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                    particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                    scene.add(particle);
    
                }
    
            }
    
            renderer = new THREE.CanvasRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
    
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            
    
            window.addEventListener('resize', onWindowResize, false);
    
            animate();
        },
    
        }
    
        var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
    
        var container;
        var camera, scene, renderer;
    
        var particles, particle, count = 0;
    
        var mouseX = 0, mouseY = 0;
    
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
    
    
        // animate();
    
        function init() {
    
    
    
        }
    
        function onWindowResize() {
    
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
    
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
    
            renderer.setSize(window.innerWidth, window.innerHeight);
    
        }
    
        //
    
        function onDocumentMouseMove(event) {
    
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
    
        }
    
        function onDocumentTouchStart(event) {
    
            if (event.touches.length === 1) {
    
                event.preventDefault();
    
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
    
            }
    
        }
    
        function onDocumentTouchMove(event) {
    
            if (event.touches.length === 1) {
    
                event.preventDefault();
    
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
    
            }
    
        }
    
        //
    
        function animate() {
    
            requestAnimationFrame(animate);
    
            render();
    
    
        }
    
        function render() {
    
            camera.position.x += (mouseX - camera.position.x) * .01;
            camera.position.y += (- mouseY - camera.position.y) * .01;
            camera.lookAt(scene.position);
    
            var i = 0;
    
            for (var ix = 0; ix < AMOUNTX; ix++) {
    
                for (var iy = 0; iy < AMOUNTY; iy++) {
    
                    particle = particles[i++];
                    particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                    particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
    
                }
    
            }
    
            renderer.render(scene, camera);
    
            count += 0.1;
    
        }
    </script>
    <style>
       
    
        .login-container {
            width: 100%;
            overflow: hidden !important;
            overflow-x: hidden;
            height: 100%;
            background-color: #141a48;
            color: white;
            position: relative;
           
        }
    
        .login-container a {
            color: #0078de;
        }
    
        #canvascontainer {
            position: absolute;
            top: 200px;
            z-index: 1;
    
            white-space: nowrap
    
        }
    
     
    
        .login_form input {
            background: transparent !important;
            height: 40px;
            color: white;
        }
    
        .select_login {
            margin-bottom: 40px;
        }
    
        .select_login>span {
            display: inline-block;
            width: 49%;
            text-align: center;
            font-size: 15px;
            color: #cdcdcd;
            padding-bottom: 5px;
            cursor: pointer;
        }
    
        .select_type {
            border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    
        }
    
        .login_page {
            background: rgba(18, 82, 138, 0.1);
            /* border: 1px solid rgba(20, 140, 240, 0.8) ; */
            padding: 50px 40px;
            border-radius: 20px;
        }
    </style>