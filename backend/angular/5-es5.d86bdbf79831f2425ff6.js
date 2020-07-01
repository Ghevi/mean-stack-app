function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,t){for(var e=0;e<t.length;e++){var a=t[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(n,a.key,a)}}function _createClass(n,t,e){return t&&_defineProperties(n.prototype,t),e&&_defineProperties(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Yj9t:function(n,t,e){"use strict";e.r(t),e.d(t,"AuthModule",(function(){return B}));var a=e("ofXK"),i=e("3Pt+"),o=e("rhD1"),r=e("tyNb"),c=e("fXoL"),s=e("qXBG"),u=e("Wp6s"),b=e("Xa2L"),l=e("kmnG"),m=e("qFsG"),f=e("bTqV");function d(n,t){1&n&&c.Ob(0,"mat-spinner")}function p(n,t){1&n&&(c.Sb(0,"mat-error"),c.xc(1,"Please enter a valid email"),c.Rb())}function g(n,t){1&n&&(c.Sb(0,"mat-error"),c.xc(1,"Please enter a valid password"),c.Rb())}function h(n,t){1&n&&(c.Sb(0,"button",9),c.xc(1," Login "),c.Rb())}function v(n,t){if(1&n){var e=c.Tb();c.Sb(0,"form",2,3),c.ac("submit",(function(){c.qc(e);var n=c.oc(1);return c.ec().onLogin(n)})),c.Sb(2,"mat-form-field"),c.Ob(3,"input",4,5),c.wc(5,p,2,0,"mat-error",0),c.Rb(),c.Sb(6,"mat-form-field"),c.Ob(7,"input",6,7),c.wc(9,g,2,0,"mat-error",0),c.Rb(),c.wc(10,h,2,0,"button",8),c.Rb()}if(2&n){var a=c.oc(4),i=c.ec();c.Bb(5),c.jc("ngIf",a.invalid),c.Bb(5),c.jc("ngIf",!i.isLoading)}}var w,S=((w=function(){function n(t){_classCallCheck(this,n),this.authService=t,this.isLoading=!1}return _createClass(n,[{key:"ngOnInit",value:function(){var n=this;this.authStatusSub$=this.authStatusSub$=this.authService.getAuthStatusListener().subscribe((function(t){n.isLoading=!1}))}},{key:"onLogin",value:function(n){n.invalid||(this.isLoading=!0,this.authService.login(n.value.email,n.value.password))}},{key:"ngOnDestroy",value:function(){this.authStatusSub$.unsubscribe()}}]),n}()).\u0275fac=function(n){return new(n||w)(c.Nb(s.a))},w.\u0275cmp=c.Hb({type:w,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["loginForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-Mail","required","","email",""],["emailInput","ngModel"],["name","password","ngModel","","type","password","matInput","","placeholder","Password","required","","password",""],["passwordInput","ngModel"],["mat-raised-button","","color","accent","type","submit",4,"ngIf"],["mat-raised-button","","color","accent","type","submit"]],template:function(n,t){1&n&&(c.Sb(0,"mat-card"),c.wc(1,d,1,0,"mat-spinner",0),c.wc(2,v,11,2,"form",1),c.Rb()),2&n&&(c.Bb(1),c.jc("ngIf",t.isLoading),c.Bb(1),c.jc("ngIf",!t.isLoading))},directives:[u.a,a.k,b.b,i.s,i.m,i.n,l.c,m.a,i.b,i.l,i.o,i.q,i.c,l.b,f.b],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{margin-top:1rem}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),w),y=e("bSwM");function I(n,t){1&n&&c.Ob(0,"mat-spinner")}function C(n,t){1&n&&(c.Sb(0,"mat-error"),c.xc(1,"Please enter a valid email"),c.Rb())}function L(n,t){1&n&&(c.Sb(0,"mat-error"),c.xc(1,"Please enter a valid password"),c.Rb())}function M(n,t){1&n&&(c.Sb(0,"mat-error"),c.xc(1,"You have to accept the terms and conditions"),c.Rb())}function k(n,t){1&n&&(c.Sb(0,"button",11),c.xc(1," Signup "),c.Rb())}function O(n,t){if(1&n){var e=c.Tb();c.Sb(0,"form",2,3),c.ac("submit",(function(){c.qc(e);var n=c.oc(1);return c.ec().onSignup(n)})),c.Sb(2,"mat-form-field"),c.Ob(3,"input",4,5),c.wc(5,C,2,0,"mat-error",0),c.Rb(),c.Sb(6,"mat-form-field"),c.Ob(7,"input",6,7),c.wc(9,L,2,0,"mat-error",0),c.Rb(),c.Sb(10,"section"),c.Sb(11,"mat-checkbox",8,9),c.xc(13,"Accept to Terms and Conditions"),c.Rb(),c.wc(14,M,2,0,"mat-error",0),c.Rb(),c.wc(15,k,2,0,"button",10),c.Rb()}if(2&n){var a=c.oc(4),i=c.oc(12),o=c.ec();c.Bb(5),c.jc("ngIf",a.invalid),c.Bb(9),c.jc("ngIf",i.dirty&&i.invalid),c.Bb(1),c.jc("ngIf",!o.isLoading)}}var P,R,_,j=[{path:"login",component:S},{path:"signup",component:(P=function(){function n(t){_classCallCheck(this,n),this.authService=t,this.isLoading=!1}return _createClass(n,[{key:"ngOnInit",value:function(){var n=this;this.authStatusSub$=this.authService.getAuthStatusListener().subscribe((function(t){n.isLoading=!1}))}},{key:"onSignup",value:function(n){n.invalid||(this.isLoading=!0,this.authService.createUser(n.value.email,n.value.password))}},{key:"ngOnDestroy",value:function(){this.authStatusSub$.unsubscribe()}}]),n}(),P.\u0275fac=function(n){return new(n||P)(c.Nb(s.a))},P.\u0275cmp=c.Hb({type:P,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["signupForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-Mail","required","","email",""],["emailInput","ngModel"],["name","password","ngModel","","type","password","matInput","","placeholder","Password","required","","password",""],["passwordInput","ngModel"],["name","agree","ngModel","","required","","color","primary"],["checkBox","ngModel"],["mat-raised-button","","color","accent","type","submit",4,"ngIf"],["mat-raised-button","","color","accent","type","submit"]],template:function(n,t){1&n&&(c.Sb(0,"mat-card"),c.wc(1,I,1,0,"mat-spinner",0),c.wc(2,O,16,3,"form",1),c.Rb()),2&n&&(c.Bb(1),c.jc("ngIf",t.isLoading),c.Bb(1),c.jc("ngIf",!t.isLoading))},directives:[u.a,a.k,b.b,i.s,i.m,i.n,l.c,m.a,i.b,i.l,i.o,i.q,i.c,y.a,y.c,l.b,f.b],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}button[_ngcontent-%COMP%]{margin-top:1rem}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]}),P)}],q=((_=function n(){_classCallCheck(this,n)}).\u0275mod=c.Lb({type:_}),_.\u0275inj=c.Kb({factory:function(n){return new(n||_)},imports:[[r.e.forChild(j)],r.e]}),_),B=((R=function n(){_classCallCheck(this,n)}).\u0275mod=c.Lb({type:R}),R.\u0275inj=c.Kb({factory:function(n){return new(n||R)},imports:[[a.c,o.a,i.h,q]]}),R)}}]);